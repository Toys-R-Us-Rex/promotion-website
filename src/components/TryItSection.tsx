import { useEffect, useMemo, useRef, useState } from 'react';
import ModelWidget from './ModelWidget';
import type { ModelViewConfig } from './ModelWidget';

type DemoModel = {
  title: string;
  modelPath: string;
  keywords: string[];
};

type DemoState = 'idle' | 'thinking' | 'rendering' | 'done';

const THINKING_DELAY_MS = 20500;
const REVEAL_DELAY_MS = 20500;

const PRESET_MODELS: DemoModel[] = [
  { title: 'Astronaut', modelPath: '/models/astronautV2_shaded.glb', keywords: ['space', 'astronaut', 'moon', 'nasa'] },
  { title: 'Batman', modelPath: '/models/batmanV2.glb', keywords: ['batman', 'hero', 'dark', 'gotham', 'superhero'] },
  { title: 'Firefighter', modelPath: '/models/firefighterV2.glb', keywords: ['fire', 'firefighter', 'rescue'] },
  { title: 'Geisha', modelPath: '/models/geisha.glb', keywords: ['geisha', 'japan', 'traditional', 'kimono'] },
  { title: 'Knight', modelPath: '/models/knightV2.glb', keywords: ['knight', 'medieval', 'armor', 'sword'] },
  { title: 'Military', modelPath: '/models/military.glb', keywords: ['military', 'soldier', 'army', 'combat'] },
  { title: 'Minecraft', modelPath: '/models/minecraftV2.glb', keywords: ['minecraft', 'blocky', 'voxel', 'cube'] },
  { title: 'Pikachu', modelPath: '/models/pikachuV2.glb', keywords: ['pikachu', 'pokemon', 'electric', 'cute'] },
  { title: 'Spiderman', modelPath: '/models/spiderman.glb', keywords: ['spiderman', 'spider', 'marvel', 'web'] },
  { title: 'Superman', modelPath: '/models/supermanV2.glb', keywords: ['superman', 'krypton', 'cape', 'dc'] },
  { title: 'Army', modelPath: '/models/army.glb', keywords: ['army', 'soldier', 'military', 'combat'] },
  { title: 'Construction Worker', modelPath: '/models/consworkerV2.glb', keywords: ['construction', 'worker', 'builder', 'helmet'] },
];

const TRY_IT_VIEW: ModelViewConfig = {
  autoFit: true,
  cameraPosition: [0, 1.4, 8],
  target: [0, 1, 0],
  boundsMargin: 1.2,
  modelRotation: [0, 0, 0],
  minDistance: 2.5,
  maxDistance: 40,
};

const WAITING_VIDEO_SRC = '/videos/accelerated_duck_3d_impression.mp4';

const PROMPT_SUGGESTIONS = [
  'A futuristic space explorer',
  'A dark caped vigilante hero',
  'A brave firefighter in action',
  'A traditional Japanese geisha',
  'A blocky Minecraft character',
  'A web-slinging spider hero',
  'A military soldier',
  'A construction worker with a helmet',
];

function hashToIndex(value: string, max: number) {
  if (max <= 0) {
    return 0;
  }

  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) % 2147483647;
  }

  return Math.abs(hash) % max;
}

function pickPresetModel(prompt: string) {
  const normalizedPrompt = prompt.toLowerCase().trim();

  let bestScore = 0;
  let bestModel: DemoModel | null = null;

  PRESET_MODELS.forEach((model) => {
    const score = model.keywords.reduce((total, keyword) => {
      return normalizedPrompt.includes(keyword) ? total + 1 : total;
    }, 0);

    if (score > bestScore) {
      bestScore = score;
      bestModel = model;
    }
  });

  if (bestModel) {
    return bestModel;
  }

  const fallbackIndex = hashToIndex(normalizedPrompt, PRESET_MODELS.length);
  return PRESET_MODELS[fallbackIndex];
}

function TryItSection() {
  const [state, setState] = useState<DemoState>('idle');
  const [selectedModel, setSelectedModel] = useState<DemoModel | null>(null);
  const thinkingTimerRef = useRef<number | null>(null);
  const renderTimerRef = useRef<number | null>(null);

  const statusLabel = useMemo(() => {
    if (state === 'thinking') {
      return 'Interpreting prompt...';
    }

    if (state === 'rendering') {
      return 'Building 3D preview...';
    }

    if (state === 'done') {
      return 'Preview ready';
    }

    return 'Select a prompt to generate a preview';
  }, [state]);

  useEffect(() => {
    return () => {
      if (thinkingTimerRef.current !== null) {
        window.clearTimeout(thinkingTimerRef.current);
      }

      if (renderTimerRef.current !== null) {
        window.clearTimeout(renderTimerRef.current);
      }
    };
  }, []);

  const handlePromptSelect = (selectedPrompt: string) => {
    const cleanPrompt = selectedPrompt.trim();
    if (!cleanPrompt) {
      return;
    }

    setState('thinking');
    setSelectedModel(null);

    const chosenModel = pickPresetModel(cleanPrompt);

    if (thinkingTimerRef.current !== null) {
      window.clearTimeout(thinkingTimerRef.current);
    }

    if (renderTimerRef.current !== null) {
      window.clearTimeout(renderTimerRef.current);
    }

    thinkingTimerRef.current = window.setTimeout(() => {
      setState('rendering');
    }, THINKING_DELAY_MS);

    renderTimerRef.current = window.setTimeout(() => {
      setSelectedModel(chosenModel);
      setState('done');
    }, REVEAL_DELAY_MS);
  };

  return (
    <section className="relative px-6 pb-24">
      <div className="mx-auto max-w-7xl rounded-3xl border border-cyan-300/20 bg-gradient-to-br from-slate-950/90 via-slate-900/70 to-cyan-950/25 p-6 md:p-8">
        <div className="mb-6 text-center">
          <h2 className="text-4xl font-bold text-white md:text-5xl">
            Try It <span className="bg-gradient-to-r from-cyan-300 via-emerald-300 to-cyan-300 bg-clip-text text-transparent">Now</span>
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-gray-300">
            Want to have your dream duck be real ?
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
            <h3 className="text-lg font-semibold text-gray-200 mb-4">Choose a prompt</h3>
            <div className="space-y-3">
              {PROMPT_SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => handlePromptSelect(suggestion)}
                  className="w-full text-left rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-gray-300 transition hover:border-cyan-300/60 hover:bg-white/10 hover:text-white"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            <p className="mt-6 text-sm text-cyan-100">{statusLabel}</p>
          </div>

          <div>
            {(state === 'thinking' || state === 'rendering') && !selectedModel ? (
              <div className="flex h-full min-h-[446px] flex-col overflow-hidden rounded-3xl border border-cyan-300/30 bg-slate-900/60 text-center">
                <div className="relative flex-1 min-h-[360px] bg-black">
                  <video
                    className="absolute inset-0 h-full w-full object-cover"
                    src={WAITING_VIDEO_SRC}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-left">
                    <p className="text-lg font-semibold text-cyan-100">Generating your 3D preview</p>
                    <p className="mt-2 text-sm text-gray-200">
                      {state === 'thinking' ? 'Analyzing prompt...' : 'Rendering model from preset library...'}
                    </p>
                  </div>
                </div>
              </div>
            ) : selectedModel ? (
              <ModelWidget
                title={selectedModel.title}
                modelPath={selectedModel.modelPath}
                caption="Selected from preset demo library"
                view={TRY_IT_VIEW}
              />
            ) : (
              <div className="flex h-full min-h-[446px] items-center justify-center rounded-3xl border border-dashed border-white/20 bg-slate-900/40 p-6 text-center text-gray-400">
                Submit a prompt to reveal a generated-style preview.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TryItSection;
