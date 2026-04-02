import ModelWidget from './ModelWidget';
import type { ModelViewConfig } from './ModelWidget';

type ModelEntry = {
  title: string;
  modelPath: string;
  caption?: string;
  view?: ModelViewConfig;
};

const SHARED_INITIAL_VIEW: ModelViewConfig = {
  autoFit: true,
  cameraPosition: [0, 1.4, 8],
  target: [0, 1, 0],
  boundsMargin: 1.2,
  modelRotation: [0, 0, 0],
  minDistance: 2.5,
  maxDistance: 40,
};

const MODELS: ModelEntry[] = [
  {
    title: 'Military',
    modelPath: '/models/military.glb',
    view: SHARED_INITIAL_VIEW,
  },
  {
    title: 'Superman',
    modelPath: '/models/supermanV2.glb',
    view: SHARED_INITIAL_VIEW,
  },
  {
    title: 'Knight',
    modelPath: '/models/knightV2.glb',
    view: SHARED_INITIAL_VIEW,
  },
  {
    title: 'Pikachu',
    modelPath: '/models/pikachuV2.glb',
    view: SHARED_INITIAL_VIEW,
  }
];

function ModelShowcase() {
  return (
    <section className="relative py-24 md:py-32 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">
        <div className="mb-16 md:mb-24">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-1 bg-[#FF6B35]" />
            <span className="mono text-[11px] tracking-widest text-white/40 uppercase">Output Gallery</span>
          </div>
          <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.95] tracking-tighter text-white">
            3D MODELS
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          {MODELS.map((model) => (
            <ModelWidget
              key={model.modelPath}
              title={model.title}
              modelPath={model.modelPath}
              caption={model.caption}
              view={model.view}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ModelShowcase;