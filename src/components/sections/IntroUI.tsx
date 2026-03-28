import { motion } from "framer-motion";

export default function IntroUI() {
  return (
    <section className="h-screen flex flex-col justify-center items-center text-center px-6">
      
      <motion.h1
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-7xl font-semibold tracking-tight"
      >
        {/* Changed to dark:text-white and text-slate-900 */}
        <span className="text-slate-900 dark:text-white transition-colors duration-500">Kartikey</span>{" "}
        <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Bisen
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        // Changed to text-slate-600 and dark:text-gray-400
        className="mt-6 text-slate-600 dark:text-gray-400 text-lg md:text-xl max-w-xl transition-colors duration-500"
      >
        Crafting immersive digital experiences with AI, code & design
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.2 }}
        className="mt-16 text-sm text-slate-500 dark:text-gray-500"
      >
        Scroll ↓
      </motion.div>

    </section>
  );
}