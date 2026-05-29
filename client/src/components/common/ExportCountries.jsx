import { motion } from "framer-motion";

const countries = [
  "UAE",
  "USA",
  "UK",
  "Australia",
  "Singapore",
  "Canada",
];

const ExportCountries = () => {
  return (
    <section className="bg-black py-24 px-6">

      <div className="max-w-7xl mx-auto text-center">

        <p className="text-yellow-400 uppercase tracking-[5px] mb-4">
          Global Exports
        </p>

        <h2 className="text-5xl font-bold text-white mb-16">
          Exporting Worldwide
        </h2>

        <div className="flex flex-wrap justify-center gap-8">

          {countries.map((country, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="px-10 py-5 rounded-full bg-white/5 border border-yellow-500/20 backdrop-blur-xl text-white hover:bg-yellow-500 hover:text-black transition cursor-pointer"
            >
              {country}
            </motion.div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default ExportCountries;