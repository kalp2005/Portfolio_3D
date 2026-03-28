import { motion } from "framer-motion";
import { useCursorStore } from "../../store/cursorStore";

// Upgraded GlassCard: Solid feel, Framer Motion viewport triggers, and Cursor integration
const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const setVariant = useCursorStore((state) => state.setVariant);

  return (
    <motion.div
      onMouseEnter={() => setVariant("card")}
      onMouseLeave={() => setVariant("default")}
      initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, margin: "-10%" }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
      className={`
        relative overflow-hidden
        backdrop-blur-3xl 
        bg-white/70 dark:bg-slate-900/80
        border border-white/60 dark:border-white/10 
        rounded-3xl p-10 md:p-14 
        shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.6)]
        transition-colors duration-500 
        ${className}
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 dark:to-transparent pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default function PortfolioUI() {
  const setVariant = useCursorStore((state) => state.setVariant);

  return (
    <div className="w-full pointer-events-none text-slate-900 dark:text-white transition-colors duration-500 font-sans">
      
      {/* 1. INTRO */}
      <section className="h-screen flex flex-col justify-center px-8 md:px-24">
        <div 
          onMouseEnter={() => setVariant("card")}
          onMouseLeave={() => setVariant("default")}
          className="max-w-5xl z-10 pointer-events-auto backdrop-blur-md bg-white/30 dark:bg-black/40 p-10 md:p-16 rounded-[3rem] border border-white/40 dark:border-white/10 shadow-2xl transition-colors duration-500"
        >
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="text-[4rem] md:text-[8rem] font-black leading-none tracking-tighter"
          >
            <span className="block text-outline uppercase">Kartikey</span>
            <span className="block bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent uppercase drop-shadow-lg">
              Bisen
            </span>
          </motion.h1>
          <p className="mt-8 text-xl md:text-2xl font-medium text-slate-800 dark:text-gray-200 transition-colors duration-500">
            Creative Developer & 3D Experience Designer
          </p>
        </div>
      </section>

      {/* 2. ABOUT */}
      <section className="h-screen flex items-center justify-end px-8 md:px-24">
        <GlassCard className="max-w-xl pointer-events-auto">
          <h2 className="text-4xl font-bold mb-4">About Me</h2>
          <p className="text-lg leading-relaxed text-slate-700 dark:text-gray-300">
            I bridge the gap between heavy engineering and stunning visual design. Focusing on modern React architectures and immersive interactive experiences that leave a lasting impression. I thrive on creating digital environments that feel alive.
          </p>
        </GlassCard>
      </section>

      {/* 3. SKILLS */}
      <section className="h-screen flex items-center justify-start px-8 md:px-24">
        <GlassCard className="max-w-lg pointer-events-auto">
          <h2 className="text-4xl font-bold mb-6 text-cyan-600 dark:text-cyan-400">Arsenal</h2>
          <div className="flex flex-wrap gap-3">
            {['React', 'Three.js', 'TypeScript', 'TailwindCSS', 'Node.js', 'WebGL', 'Framer Motion', 'Zustand', 'Next.js'].map((skill) => (
              <span key={skill} className="px-5 py-2 rounded-full border border-slate-300 dark:border-white/20 bg-white/50 dark:bg-black/50 text-sm font-semibold shadow-sm transition-colors duration-500">
                {skill}
              </span>
            ))}
          </div>
        </GlassCard>
      </section>

      {/* 4. PROJECTS */}
      <section className="h-screen flex flex-col items-center justify-center px-8 text-center">
        <motion.h2 
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} 
          className="text-5xl font-bold mb-10 text-purple-600 dark:text-purple-400 drop-shadow-md"
        >
          Selected Works
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl pointer-events-auto">
          <GlassCard className="!p-8 hover:-translate-y-2 transition-transform cursor-pointer">
            <h3 className="text-2xl font-bold mb-2">E-Commerce 3D</h3>
            <p className="text-slate-700 dark:text-gray-300 font-medium">Interactive product configurator built with React Three Fiber.</p>
          </GlassCard>
          <GlassCard className="!p-8 hover:-translate-y-2 transition-transform cursor-pointer">
            <h3 className="text-2xl font-bold mb-2">AI Dashboard</h3>
            <p className="text-slate-700 dark:text-gray-300 font-medium">Real-time data visualization interface using D3 and WebSockets.</p>
          </GlassCard>
        </div>
      </section>

      {/* 5. EDUCATION */}
      <section className="h-screen flex items-center justify-end px-8 md:px-24">
        <GlassCard className="max-w-xl pointer-events-auto">
          <h2 className="text-4xl font-bold mb-6">Education</h2>
          <div className="border-l-4 border-cyan-500 pl-6 space-y-6">
            <div>
              <h3 className="text-xl font-bold">B.Tech in Computer Science</h3>
              <p className="text-slate-600 dark:text-gray-400 font-medium">University Name • 2020 - 2024</p>
            </div>
            <div>
              <h3 className="text-xl font-bold">Advanced WebGL Certification</h3>
              <p className="text-slate-600 dark:text-gray-400 font-medium">Three.js Journey • 2023</p>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* 6. CONTACT */}
      <section className="h-screen flex items-center justify-start px-8 md:px-24">
        <GlassCard className="max-w-md w-full pointer-events-auto">
          <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
          <form className="space-y-4 flex flex-col">
            <input 
              type="text" 
              placeholder="Name" 
              onMouseEnter={() => setVariant("hover")}
              onMouseLeave={() => setVariant("card")}
              className="w-full p-4 rounded-xl bg-white/60 dark:bg-black/50 border border-slate-300 dark:border-white/20 outline-none focus:border-cyan-500 font-medium text-slate-900 dark:text-white transition-colors" 
            />
            <input 
              type="email" 
              placeholder="Email" 
              onMouseEnter={() => setVariant("hover")}
              onMouseLeave={() => setVariant("card")}
              className="w-full p-4 rounded-xl bg-white/60 dark:bg-black/50 border border-slate-300 dark:border-white/20 outline-none focus:border-cyan-500 font-medium text-slate-900 dark:text-white transition-colors" 
            />
            <textarea 
              placeholder="Message" 
              rows={4} 
              onMouseEnter={() => setVariant("hover")}
              onMouseLeave={() => setVariant("card")}
              className="w-full p-4 rounded-xl bg-white/60 dark:bg-black/50 border border-slate-300 dark:border-white/20 outline-none focus:border-cyan-500 font-medium text-slate-900 dark:text-white transition-colors"
            ></textarea>
            <button 
              onMouseEnter={() => setVariant("hover")}
              onMouseLeave={() => setVariant("card")}
              className="py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl hover:scale-[1.02] transition-transform shadow-lg"
            >
              Send Message
            </button>
          </form>
        </GlassCard>
      </section>

      {/* 7. CONNECT WITH ME */}
      <section className="h-screen flex flex-col items-center justify-center text-center">
        <GlassCard className="pointer-events-auto flex flex-col items-center">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.8 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            className="text-5xl md:text-6xl font-black mb-10"
          >
            Let's Build <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-600">Together.</span>
          </motion.h2>
          <div className="flex flex-wrap justify-center gap-4">
            {['GitHub', 'LinkedIn', 'Twitter', 'Resume'].map((link) => (
              <a 
                key={link} 
                href="#" 
                onMouseEnter={() => setVariant("hover")}
                onMouseLeave={() => setVariant("card")}
                className="px-8 py-4 rounded-full border-2 border-slate-300 dark:border-white/30 bg-white/50 dark:bg-black/30 hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all font-bold shadow-md hover:shadow-xl"
              >
                {link}
              </a>
            ))}
          </div>
        </GlassCard>
      </section>

    </div>
  );
}