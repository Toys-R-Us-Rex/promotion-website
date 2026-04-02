import { Github as GithubIcon } from 'lucide-react';

function Footer() {
  return (
    <footer className="relative border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <h3 className="text-4xl md:text-5xl font-black text-white mb-3">
              DUCKIFY
            </h3>
            <p className="mono text-xs text-white/40 leading-relaxed max-w-md">
              AI-powered robotic painting system developed by Toys'R'Us Rex. Combining neural network texture generation with industrial robotic precision.
            </p>
          </div>

          <div className="flex items-start justify-end">
            <a
              href="https://github.com/Toys-R-Us-Rex/Duckify"
              className="group flex items-center gap-3 border border-white/10 px-6 py-3 transition-colors hover:border-[#FF6B35]/40"
            >
              <GithubIcon className="w-4 h-4 text-white/40 group-hover:text-white/60 transition-colors" />
              <span className="mono text-xs text-white/40 group-hover:text-white/60 transition-colors">
                VIEW SOURCE
              </span>
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="mono text-[10px] text-white/30">
              &copy; 2026 DUCKIFY - TOYS'R'US REX PROJECT
            </p>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-[#FF6B35]/60" />
              <span className="mono text-[10px] text-white/30">PROTOTYPE V1.0</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
