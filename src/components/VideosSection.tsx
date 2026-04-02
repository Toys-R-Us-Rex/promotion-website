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
    <section className="relative px-6 pb-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Video <span className="bg-gradient-to-r from-purple-600 via-cyan-400 to-purple-600 bg-clip-text text-transparent">Showcase</span>
          </h2>
        </div>

        <div className="flex flex-wrap gap-8 justify-center">
          {videos.map((video) => (
            <div key={video.src} className="w-full md:w-[calc(50%-1rem)] p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
              <video
                className="w-full rounded-xl bg-slate-900"
                src={video.src}
                controls
                preload="metadata"
              />
              <p className="mt-3 text-center text-gray-300">{video.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default VideosSection;