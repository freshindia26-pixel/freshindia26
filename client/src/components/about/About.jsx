import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="bg-gradient-to-b from-black to-green-950 py-24 px-6">

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT IMAGE */}

        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <img
            src="https://images.unsplash.com/photo-1619566636858-adf3ef46400b?q=80&w=1200&auto=format&fit=crop"
            alt="Mango"
            className="rounded-3xl shadow-2xl border border-yellow-500/20"
          />
        </motion.div>

        {/* RIGHT CONTENT */}

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-yellow-400 uppercase tracking-[5px] mb-4">
            About FreshIndia
          </p>

          <h2 className="text-5xl font-bold text-white leading-tight">
            Exporting India’s Finest Fruits Worldwide
          </h2>

          <p className="text-gray-300 mt-8 leading-8 text-lg">
            FreshIndia delivers premium-quality mangoes, tropical fruits,
            and farm-fresh produce directly from Indian farms to global markets.
            We combine authentic taste, export-grade packaging, and trusted
            international delivery standards.
          </p>

          {/* GLASS CARDS */}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">

            <div className="bg-white/5 backdrop-blur-md border border-yellow-500/20 rounded-2xl p-6 text-center hover:scale-105 transition">
              <h3 className="text-yellow-400 text-3xl font-bold">100%</h3>
              <p className="text-gray-300 mt-2">Freshness</p>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-yellow-500/20 rounded-2xl p-6 text-center hover:scale-105 transition">
              <h3 className="text-yellow-400 text-3xl font-bold">50+</h3>
              <p className="text-gray-300 mt-2">Export Partners</p>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-yellow-500/20 rounded-2xl p-6 text-center hover:scale-105 transition">
              <h3 className="text-yellow-400 text-3xl font-bold">24/7</h3>
              <p className="text-gray-300 mt-2">Support</p>
            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
};

export default About;