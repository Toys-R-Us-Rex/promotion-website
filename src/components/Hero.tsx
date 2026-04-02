function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute top-0 right-0 w-[1px] h-full bg-white/5" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/5" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FF6B35]/30 to-transparent animate-draw-line" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 md:px-16 py-24">
        <div className="flex flex-col gap-2 mb-12">
          <div className="flex items-center gap-3 mb-6 animate-fade-in">
            <div className="w-1.5 h-1.5 bg-[#FF6B35]" />
            <span className="mono text-[11px] tracking-widest text-white/40 uppercase">Toys'R'Us Rex</span>
          </div>

          <h1 className="text-[clamp(3.5rem,12vw,9rem)] font-black leading-[0.9] tracking-tighter text-white animate-slide-in-left">
            DUCKIFY
          </h1>

          <div className="flex items-baseline gap-4 mt-2 animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
            <div className="h-[1px] w-12 bg-[#FF6B35]" />
            <h2 className="text-[clamp(1.2rem,3vw,2.5rem)] font-light tracking-tight text-white/60">
              AI Generation + Robotic Painting
            </h2>
          </div>
        </div>

        <div className="max-w-2xl animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
          <p className="mono text-xs md:text-sm text-white/40 leading-relaxed mb-8 border-l border-white/10 pl-4">
            NEURAL NETWORK TEXTURE SYNTHESIS / AUTONOMOUS PATH PLANNING / 6-AXIS ROBOTIC ARM EXECUTION / PRECISION PAINTING SYSTEM
          </p>

          <div className="flex items-center gap-6 text-[11px] mono text-white/30">
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-[#FF6B35]/60" />
              <span>AI-DRIVEN</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-[#FF6B35]/60" />
              <span>AUTOMATED</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-[#FF6B35]/60" />
              <span>INDUSTRIAL</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 right-12 hidden md:block">
        <div className="flex flex-col items-end gap-1 text-[10px] mono text-white/20">
          <span>SCROLL</span>
          <div className="w-[1px] h-16 bg-white/10 relative overflow-hidden">
            <div className="w-full h-8 bg-gradient-to-b from-transparent via-[#FF6B35]/40 to-transparent absolute animate-scan" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
