const steps = [
  {
    num: '01',
    title: 'AI Texture Generation',
    code: 'NEURAL.GEN',
    description: 'Neural network synthesizes unique artistic textures optimized for 3D duck surface topology.',
  },
  {
    num: '02',
    title: 'Path Planning',
    code: 'PATH.CALC',
    description: 'Autonomous path computation ensuring complete surface coverage with collision avoidance.',
  },
  {
    num: '03',
    title: 'Robotic Execution',
    code: 'ARM.EXEC',
    description: '6-axis robotic arm executes painting sequence with sub-millimeter precision control.',
  },
  {
    num: '04',
    title: '3D Printing',
    code: 'PRINT.FAB',
    description: 'Additive manufacturing provides custom tooling and fixtures for automated workflow.',
  }
];

function Process() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">
        <div className="mb-16 md:mb-24">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-1 bg-[#FF6B35]" />
            <span className="mono text-[11px] tracking-widest text-white/40 uppercase">Process Pipeline</span>
          </div>
          <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.95] tracking-tighter text-white">
            SYSTEM<br />WORKFLOW
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/5 hidden md:block" />

          <div className="space-y-1">
            {steps.map((step, index) => (
              <div
                key={index}
                className="group relative border-b border-white/5 hover:border-[#FF6B35]/20 transition-colors duration-300"
              >
                <div className="relative py-8 md:py-12 grid grid-cols-1 md:grid-cols-[120px_1fr_1fr] gap-6 md:gap-12 items-start">
                  <div className="flex items-center gap-4 md:gap-6">
                    <span className="text-5xl md:text-6xl font-black text-white/5 group-hover:text-white/10 transition-colors mono">
                      {step.num}
                    </span>
                    <div className="h-[1px] w-8 bg-white/10 group-hover:bg-[#FF6B35]/40 transition-colors" />
                  </div>

                  <div>
                    <div className="mono text-[10px] tracking-widest text-[#FF6B35]/60 mb-2">
                      {step.code}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                      {step.title}
                    </h3>
                  </div>

                  <div>
                    <p className="text-sm md:text-base text-white/40 leading-relaxed mono">
                      {step.description}
                    </p>
                  </div>

                  <div className="absolute left-0 bottom-0 h-[1px] w-0 bg-[#FF6B35]/60 group-hover:w-full transition-all duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Process;
