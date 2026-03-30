import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import ModelWidget from './ModelWidget';
import type { ModelViewConfig } from './ModelWidget';

type DemoModel = {
  title: string;
  modelPath: string;
  keywords: string[];
};

type DemoState = 'idle' | 'thinking' | 'rendering' | 'done';

const THINKING_DELAY_MS = 600;
const REVEAL_DELAY_MS = 3200;

const PRESET_MODELS: DemoModel[] = [
  { title: 'Astronaut', modelPath: '/models/astronautV2_shaded.glb', keywords: ['space', 'astronaut', 'moon', 'nasa'] },
  { title: 'Batman', modelPath: '/models/batmanV2.glb', keywords: ['batman', 'hero', 'dark', 'gotham', 'superhero'] },
  { title: 'Firefighter', modelPath: '/models/firefighterV2.glb', keywords: ['fire', 'firefighter', 'rescue'] },
  { title: 'Geisha', modelPath: '/models/geisha.glb', keywords: ['geisha', 'japan', 'traditional', 'kimono'] },
  { title: 'Knight', modelPath: '/models/knightV2.glb', keywords: ['knight', 'medieval', 'armor', 'sword'] },
  { title: 'Military', modelPath: '/models/military.glb', keywords: ['military', 'soldier', 'army', 'combat'] },
  { title: 'Minecraft', modelPath: '/models/minecraftV2.glb', keywords: ['minecraft', 'blocky', 'voxel', 'cube'] },
  { title: 'Pikachu', modelPath: '/models/pikachuV2.glb', keywords: ['pikachu', 'pokemon', 'electric', 'cute'] },
  { title: 'Pirate', modelPath: '/models/pirateV2.glb', keywords: ['pirate', 'ship', 'captain', 'ocean'] },
  { title: 'Spiderman', modelPath: '/models/spiderman.glb', keywords: ['spiderman', 'spider', 'marvel', 'web'] },
  { title: 'Superman', modelPath: '/models/supermanV2.glb', keywords: ['superman', 'krypton', 'cape', 'dc'] },
  { title: 'Wizard', modelPath: '/models/wizardV2.glb', keywords: ['wizard', 'magic', 'mage', 'spell'] },
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

const PROMPT_SUGGESTIONS = [
  'A futuristic space explorer',
  'A medieval warrior with armor',
  'A comic superhero with a cape',
  'A magical fantasy character',
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
  const [prompt, setPrompt] = useState('A friendly superhero in red and blue');
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

    return 'Type a prompt and click Try It';
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

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanPrompt = prompt.trim();
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
            <form onSubmit={onSubmit} className="space-y-4">
              <label htmlFor="try-it-prompt" className="block text-sm font-medium text-gray-200">
                Describe your 3D character
              </label>
              <textarea
                id="try-it-prompt"
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                rows={5}
                className="w-full rounded-xl border border-white/15 bg-slate-950/80 px-4 py-3 text-gray-100 outline-none transition focus:border-cyan-300/60"
                placeholder="A duck hired as a doctor"
              />

              <button
                type="submit"
                className="inline-flex items-center rounded-xl bg-cyan-400 px-5 py-2.5 font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                Try It
              </button>
            </form>

            <p className="mt-4 text-sm text-cyan-100">{statusLabel}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {PROMPT_SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => setPrompt(suggestion)}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-gray-300 transition hover:border-cyan-300/60 hover:text-white"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          <div>
            {(state === 'thinking' || state === 'rendering') && !selectedModel ? (
              <div className="flex h-full min-h-[446px] flex-col items-center justify-center rounded-3xl border border-cyan-300/30 bg-slate-900/60 p-6 text-center">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-cyan-200/25 border-t-cyan-300" />
                <p className="mt-5 text-lg font-semibold text-cyan-100">Generating your 3D preview</p>
                <p className="mt-2 text-sm text-gray-300">{state === 'thinking' ? 'Analyzing prompt...' : 'Rendering model from preset library...'}</p>
                <div className="mt-6 h-2 w-full max-w-xs overflow-hidden rounded-full bg-white/10">
                  <div
                    className={`h-full rounded-full bg-cyan-300 transition-all duration-500 ${
                      state === 'thinking' ? 'w-1/3' : 'w-4/5'
                    }`}
                  />
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
