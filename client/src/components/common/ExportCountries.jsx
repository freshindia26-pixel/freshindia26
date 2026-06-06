import { motion } from "framer-motion";

const sourceCountries = [
  {
    flag: "🇮🇳",
    name: "India",
    products: "Mangoes & Fruits",
  },
  {
    flag: "🇺🇬",
    name: "Uganda",
    products: "Vegetables & Spices",
  },
  {
    flag: "🇲🇦",
    name: "Morocco",
    products: "Watermelon",
  },
  {
    flag: "🇭🇳",
    name: "Honduras",
    products: "Okra",
  },
];

const exportCountries = [
  "🇦🇪 UAE",
  "🇺🇸 USA",
  "🇬🇧 UK",
  "🇦🇺 Australia",
  "🇸🇬 Singapore",
  "🇨🇦 Canada",
];

const ExportCountries = () => {
  return (
    <section className="bg-white py-24 px-6">

      <div className="max-w-7xl mx-auto">

        {/* HEADING */}

        <div className="text-center mb-20">

          <p className="text-orange-500 uppercase tracking-[4px] font-semibold mb-4">
            Global Network
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Sourcing & Exporting Worldwide
          </h2>

          <p className="text-gray-600 mt-6 max-w-3xl mx-auto">
            We source premium agricultural products from trusted
            growers and deliver them to international markets
            across the globe.
          </p>

        </div>

        {/* SOURCE COUNTRIES */}

        <div className="mb-20">

          <h3 className="text-3xl font-bold text-green-700 mb-10 text-center">
            Countries We Source From
          </h3>

          <div className="grid md:grid-cols-4 gap-6">

            {sourceCountries.map((country, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-green-50 border border-green-100 rounded-3xl p-8 text-center"
              >

                <div className="text-5xl mb-4">
                  {country.flag}
                </div>

                <h4 className="text-xl font-bold text-gray-900">
                  {country.name}
                </h4>

                <p className="text-gray-600 mt-3">
                  {country.products}
                </p>

              </motion.div>
            ))}

          </div>

        </div>

        {/* EXPORT COUNTRIES */}

        <div>

          <h3 className="text-3xl font-bold text-orange-500 mb-10 text-center">
            Countries We Export To
          </h3>

          <div className="flex flex-wrap justify-center gap-5">

            {exportCountries.map((country, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
                className="px-8 py-4 rounded-full bg-orange-50 border border-orange-100 text-gray-800 font-medium hover:bg-orange-500 hover:text-white transition"
              >
                {country}
              </motion.div>
            ))}

          </div>

        </div>

      </div>

    </section>
  );
};

export default ExportCountries;