type VideoItem = {
  title: string;
  src: string;
};

const videos: VideoItem[] = [
  {
    title: 'The robot is capable to automatically change color',
    src: '/videos/Pen_transition.mp4',
  },
  {
    title: 'The robot can fluently paint on the duck',
    src: '/videos/Robot_paint.mp4',
  },
  {
    title: 'The complete painting process',
    src: '/videos/whole_process.mp4',
  },
];

function VideosSection() {
  return (
    <section className="relative py-24 md:py-32 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">
        <div className="mb-16 md:mb-24">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-1 bg-[#FF6B35]" />
            <span className="mono text-[11px] tracking-widest text-white/40 uppercase">Live Documentation</span>
          </div>
          <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.95] tracking-tighter text-white">
            SYSTEM<br />IN ACTION
          </h2>
        </div>

        <div className="flex flex-wrap gap-8 justify-center">
          {videos.map((video) => (
            <div key={video.src} className="w-full md:w-[calc(50%-1rem)] p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
              <video
                className="w-full bg-black"
                src={video.src}
                controls
                preload="metadata"
              />
              <div className="p-6 border-t border-white/5">
                <div className="mono text-[10px] tracking-widest text-[#FF6B35]/60 mb-2">
                  VIDEO {(index + 1).toString().padStart(2, '0')}
                </div>
                <p className="mono text-xs text-white/40">{video.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default VideosSection;