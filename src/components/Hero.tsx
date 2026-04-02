function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-secondary/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full mb-8 animate-fade-in">
          <img src="/images/logo.png" alt="Toys'R'Us Rex logo" className="h-4 w-4 rounded-sm object-contain" />
          <span className="text-sm text-gray-300">Toys'R'Us Rex Presents</span>
        </div>

        <h1 className="text-6xl md:text-7xl font-bold mb-6 animate-fade-in-up">
          <span className="bg-gradient-to-r from-purple-600 via-cyan-400 to-purple-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
            Duckify
          </span>
          <br />
          <span className="text-white">AI-Powered Robotic Painting</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Watch as artificial intelligence generates artistic textures, intelligently plans painting paths, and a precision robot arm brings each unique duck design to life
        </p>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full p-1">
          <div className="w-1.5 h-3 bg-white/50 rounded-full mx-auto animate-scroll" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
