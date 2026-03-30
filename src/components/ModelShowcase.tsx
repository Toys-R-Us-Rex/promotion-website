import ModelWidget from './ModelWidget';
import type { ModelViewConfig } from './ModelWidget';

type ModelEntry = {
  title: string;
  modelPath: string;
  caption?: string;
  view?: ModelViewConfig;
};

const MODELS: ModelEntry[] = [
  {
    title: 'Geisha',
    modelPath: '/models/geisha.glb',
    view: {
      autoFit: true,
      cameraPosition: [0, 1.2, 7],
      boundsMargin: 1.25,
    },
  },
  {
    title: 'Batman',
    modelPath: '/models/batmanV2.glb',
    view: {
      autoFit: true,
      cameraPosition: [2.2, 1.4, 4.2],
      target: [0, 0, 0],
      modelScale: 1,
      modelPosition: [0, 0, 0],
      minDistance: 2.5,
      maxDistance: 8,
    },
  },
  {
    title: 'Spiderman',
    modelPath: '/models/spiderman.glb',
    view: {
      autoFit: false,
      cameraPosition: [0, 1.6, 180],
      target: [0, 20, 0],
      modelScale: 0.95,
      modelRotation: [Math.PI/5, Math.PI/4, -0.2],
      modelPosition: [0, 0, 0],
      minDistance: 2.8,
      maxDistance: 200,
    },
  },
  {
    title: 'Military',
    modelPath: '/models/military.glb'
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
        </div>

        <div className="grid gap-6 md:grid-cols-2">
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