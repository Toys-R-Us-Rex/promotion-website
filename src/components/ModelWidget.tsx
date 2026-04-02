import { useEffect, useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Bounds, OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type { Object3D } from 'three';

type ModelStatus = 'checking' | 'ready' | 'missing' | 'invalid';

type Vec3 = [number, number, number];

export type ModelViewConfig = {
  autoFit?: boolean;
  cameraPosition?: Vec3;
  cameraFov?: number;
  target?: Vec3;
  boundsMargin?: number;
  modelScale?: number;
  modelPosition?: Vec3;
  modelRotation?: Vec3;
  minDistance?: number;
  maxDistance?: number;
  minPolarAngle?: number;
  maxPolarAngle?: number;
};

type ModelWidgetProps = {
  modelPath: string;
  title: string;
  caption?: string;
  view?: ModelViewConfig;
};

function ModelScene({ scene, view }: { scene: Object3D; view?: ModelViewConfig }) {
  const clonedScene = useMemo(() => scene.clone(), [scene]);
  const modelScale = view?.modelScale ?? 1;
  const modelPosition = view?.modelPosition ?? [0, 0, 0];
  const modelRotation = view?.modelRotation ?? [0, 0, 0];

  return (
    <primitive
      object={clonedScene}
      scale={modelScale}
      position={modelPosition}
      rotation={modelRotation}
    />
  );
}

function ModelWidget({ modelPath, title, caption, view }: ModelWidgetProps) {
  const [status, setStatus] = useState<ModelStatus>('checking');
  const [scene, setScene] = useState<Object3D | null>(null);
  const autoFit = view?.autoFit ?? true;
  const cameraPosition = view?.cameraPosition ?? [0, 1.5, 8];
  const cameraFov = view?.cameraFov ?? 45;
  const target = view?.target ?? [0, 0, 0];
  const boundsMargin = view?.boundsMargin ?? 1.2;

  useEffect(() => {
    let cancelled = false;
    const loader = new GLTFLoader();

    fetch(modelPath)
      .then((response) => {
        if (!response.ok) {
          throw new Error('missing');
        }

        return response.arrayBuffer();
      })
      .then((buffer) => {
        if (cancelled) {
          return;
        }

        const signature = new TextDecoder().decode(buffer.slice(0, 4));
        if (signature !== 'glTF') {
          setStatus('invalid');
          return;
        }

        loader.parse(
          buffer,
          '',
          (gltf) => {
            if (!cancelled) {
              setScene(gltf.scene);
              setStatus('ready');
            }
          },
          () => {
            if (!cancelled) {
              setStatus('invalid');
            }
          }
        );
      })
      .catch(() => {
        if (!cancelled) {
          setStatus('missing');
        }
      });

    return () => {
      cancelled = true;
    };
  }, [modelPath]);

  return (
    <article className="border border-white/5 bg-[#0a0a0a] overflow-hidden">
      <div className="h-[360px] overflow-hidden border-b border-white/5 bg-black">
        {status === 'ready' && scene && (
          <Canvas camera={{ position: cameraPosition, fov: cameraFov }}>
            <color attach="background" args={['#000000']} />
            <ambientLight intensity={0.8} />
            <directionalLight position={[3, 5, 4]} intensity={1.2} />
            <pointLight position={[-3, 2, -2]} intensity={0.6} />
            {autoFit ? (
              <Bounds fit clip observe margin={boundsMargin}>
                <ModelScene scene={scene} view={view} />
              </Bounds>
            ) : (
              <ModelScene scene={scene} view={view} />
            )}
            <OrbitControls
              makeDefault
              enablePan={false}
              target={target}
              minDistance={view?.minDistance}
              maxDistance={view?.maxDistance}
              minPolarAngle={view?.minPolarAngle}
              maxPolarAngle={view?.maxPolarAngle}
            />
          </Canvas>
        )}

        {status === 'checking' && (
          <div className="flex h-full w-full items-center justify-center px-6 text-center mono text-xs text-white/30">
            LOADING MODEL...
          </div>
        )}

        {status === 'missing' && (
          <div className="flex h-full w-full items-center justify-center px-6 text-center mono text-xs text-white/30">
            MODEL NOT FOUND: {modelPath}
          </div>
        )}

        {status === 'invalid' && (
          <div className="flex h-full w-full items-center justify-center px-6 text-center mono text-xs text-white/30">
            INVALID GLB FILE: {modelPath}
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
        {caption && <p className="mono text-[10px] text-white/30">{caption}</p>}
      </div>
    </article>
  );
}

export default ModelWidget;
