import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center bg-black overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-green-950"></div>

      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center px-6"
      >
        <h1 className="text-6xl md:text-8xl font-bold text-white leading-tight">
          Premium Fruits <br />
          <span className="text-yellow-400">
            From India To The World
          </span>
        </h1>

        <p className="text-gray-300 mt-6 text-lg max-w-2xl mx-auto">
          Exporting handpicked mangoes, tropical fruits, and farm-fresh produce
          with global quality standards.
        </p>

        <div className="flex gap-6 justify-center mt-10 flex-wrap">
          <button className="bg-yellow-500 text-black px-8 py-4 rounded-full font-semibold hover:scale-105 transition">
            Explore Products
          </button>

          <button className="border border-yellow-500 text-yellow-400 px-8 py-4 rounded-full font-semibold hover:bg-yellow-500 hover:text-black transition">
            WhatsApp Order
          </button>
        </div>
      </motion.div>

    </section>
  );
};

export default Hero;