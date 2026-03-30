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
    <article className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
      <h3 className="flex h-12 items-center justify-center text-center text-xl font-semibold text-white">{title}</h3>

      <div className="mt-4 h-[320px] overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80">
        {status === 'ready' && scene && (
          <Canvas camera={{ position: cameraPosition, fov: cameraFov }}>
            <color attach="background" args={['#0f172a']} />
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
          <div className="flex h-full w-full items-center justify-center px-6 text-center text-gray-300">
            Checking model file...
          </div>
        )}

        {status === 'missing' && (
          <div className="flex h-full w-full items-center justify-center px-6 text-center text-gray-300">
            Missing model at <span className="mx-1 text-white">{modelPath}</span>
          </div>
        )}

        {status === 'invalid' && (
          <div className="flex h-full w-full items-center justify-center px-6 text-center text-gray-300">
            File at <span className="mx-1 text-white">{modelPath}</span> is not a valid GLB.
          </div>
        )}
      </div>

      {caption && <p className="mt-3 text-sm text-gray-400">{caption}</p>}
    </article>
  );
}

export default ModelWidget;
