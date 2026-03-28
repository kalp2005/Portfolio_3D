import { motion } from "framer-motion";

export default function AboutUI() {
  return (
    <section className="h-screen flex items-center justify-center px-6">
      
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="
          backdrop-blur-xl 
          bg-white/40 dark:bg-white/5 
          border border-slate-200 dark:border-white/10 
          rounded-2xl 
          p-10 
          max-w-2xl
          shadow-xl dark:shadow-none
          dark:glow-purple
          transition-all duration-500
        "
      >
        <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white transition-colors duration-500">
          About Me
        </h2>

        <p className="text-slate-700 dark:text-gray-400 leading-relaxed transition-colors duration-500">
          I’m a developer focused on building modern, interactive and scalable
          applications. I enjoy blending clean design with powerful engineering
          to create experiences that feel smooth, fast and intuitive.
        </p>

      </motion.div>

    </section>
  );
}