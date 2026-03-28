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
          bg-white/5 
          border border-white/10 
          rounded-2xl 
          p-10 
          max-w-2xl
          glow-purple
        "
      >
        <h2 className="text-2xl font-semibold mb-4 text-white">
          About Me
        </h2>

        <p className="text-gray-400 leading-relaxed">
          I’m a developer focused on building modern, interactive and scalable
          applications. I enjoy blending clean design with powerful engineering
          to create experiences that feel smooth, fast and intuitive.
        </p>

      </motion.div>

    </section>
  );
}