import { GithubIcon} from 'lucide-react';

function Footer() {
  return (
    <footer className="relative py-12 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-2">
              Duckify by Toys'R'Us Rex
            </h3>
            <p className="text-gray-400">
              Where AI creativity meets robotic precision
            </p>
          </div>

          <div className="flex gap-4">
            <a
              href="https://github.com/Toys-R-Us-Rex/Duckify"
              className="w-12 h-12 flex items-center justify-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-300 group"
            >
              <GithubIcon className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-400 text-sm">
          <p>&copy; 2026 Duckify - A Toys'R'Us Rex Project Prototype</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
