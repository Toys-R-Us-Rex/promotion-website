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
    <section className="relative px-6 pb-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            3D <span className="bg-gradient-to-r from-purple-600 via-cyan-400 to-purple-600 bg-clip-text text-transparent">Models</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            What our powerful AI can produce
          </p>
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