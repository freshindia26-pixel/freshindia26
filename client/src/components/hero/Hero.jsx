import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-b from-white to-green-50 overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 py-32">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}

          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >

            <span className="inline-block bg-orange-100 text-orange-600 px-5 py-2 rounded-full font-medium mb-6">
              Global Fresh Produce Exporter
            </span>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">

              Exporting Premium
              <span className="text-green-700">
                {" "}Fruits & Vegetables{" "}
              </span>

              To International Markets

            </h1>

            <p className="mt-8 text-lg text-gray-600 max-w-xl leading-relaxed">

              FreshIndia specializes in sourcing and exporting
              high-quality fruits, vegetables, spices and agricultural
              products from trusted growers across India, Uganda,
              Morocco and Honduras.

            </p>

            <div className="flex flex-wrap gap-5 mt-10">

              <Link to="/catalogue">
                <button className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-full font-semibold transition">
                  View Catalogue
                </button>
              </Link>

              <Link to="/bulk-enquiry">
                <button className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-4 rounded-full font-semibold transition">
                  Bulk Enquiry
                </button>
              </Link>

            </div>

          </motion.div>

          {/* RIGHT CONTENT */}

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >

            <div className="bg-white rounded-3xl shadow-xl p-10 border border-green-100">

              <h3 className="text-3xl font-bold text-green-700 mb-6">
                Countries We Source From
              </h3>

              <div className="space-y-4">

                <div className="flex justify-between border-b pb-3">
                  <span>🇮🇳 India</span>
                  <span>Mangoes & Fruits</span>
                </div>

                <div className="flex justify-between border-b pb-3">
                  <span>🇺🇬 Uganda</span>
                  <span>Vegetables & Spices</span>
                </div>

                <div className="flex justify-between border-b pb-3">
                  <span>🇲🇦 Morocco</span>
                  <span>Watermelon</span>
                </div>

                <div className="flex justify-between">
                  <span>🇭🇳 Honduras</span>
                  <span>Okra</span>
                </div>

              </div>

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
};

export default Hero;