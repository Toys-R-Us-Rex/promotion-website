import { Brain, Route, Cpu, Printer } from 'lucide-react';

const steps = [
  {
    icon: Brain,
    title: 'AI Texture Generation',
    description: 'Advanced AI algorithms analyze and generate unique, artistic textures tailored specifically for each duck surface. Every pattern is one-of-a-kind.',
    gradient: 'from-cyan-500 to-blue-500',
    delay: '0s'
  },
  {
    icon: Route,
    title: 'Path Planning',
    description: 'Sophisticated algorithms compute the optimal painting path, ensuring every contour and curve is covered with precision and efficiency.',
    gradient: 'from-emerald-500 to-teal-500',
    delay: '0.2s'
  },
  {
    icon: Cpu,
    title: 'Robotic Execution',
    description: 'The robotic arm brings the design to life, executing each brushstroke with mechanical precision and consistency impossible to achieve by hand.',
    gradient: 'from-orange-500 to-red-500',
    delay: '0.4s'
  },
  {
    icon: Printer,
    title: '3D Printing',
    description: 'The design of 3D model provides tools and setup to help the robot achieving its artistic work.',
    gradient : 'from-yellow-500 to-orange-500',
    delay: '0.6s'
  }
];

function Process() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            How It <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Four seamless steps from concept to creation
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative group animate-fade-in-up"
                style={{ animationDelay: step.delay }}
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 from-white/5 to-white/0 rounded-2xl transition-opacity duration-500" />

                <div className="relative h-full p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-14 h-14 bg-gradient-to-br ${step.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <span className="text-6xl font-bold text-white/10">
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4">
                    {step.title}
                  </h3>

                  <p className="text-gray-400 leading-relaxed">
                    {step.description}
                  </p>

                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-2xl"
                       style={{ background: `linear-gradient(to right, ${step.gradient.includes('cyan') ? '#06b6d4, #3b82f6' : step.gradient.includes('emerald') ? '#10b981, #14b8a6' : step.gradient.includes('hot') ? '#fc7e00, #ff0000' : "#fff200, #fc7e00"})` }}
                  />
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-white/20 to-transparent" />
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-24 p-12 bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 backdrop-blur-sm border border-white/10 rounded-3xl">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-white mb-4">
              Precision Meets Creativity
            </h3>
            <p className="text-lg text-gray-400 leading-relaxed">
              By combining cutting-edge artificial intelligence with industrial robotics, we've created a system that transforms ordinary rubber ducks into extraordinary art pieces. Each duck is unique, painted with a level of precision and consistency that showcases the best of both human creativity and machine precision.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Process;
