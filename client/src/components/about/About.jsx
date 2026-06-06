import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="bg-white py-24 px-6">

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}

        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >

          <span className="inline-block bg-green-100 text-green-700 px-5 py-2 rounded-full font-medium mb-6">
            About FreshIndia
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">

            Delivering Fresh Produce
            <span className="text-green-700">
              {" "}Across Global Markets
            </span>

          </h2>

          <p className="mt-8 text-lg text-gray-600 leading-8">

            FreshIndia is a trusted exporter of premium fruits,
            vegetables, spices and agricultural products. We work
            closely with growers and suppliers across India,
            Uganda, Morocco and Honduras to deliver export-grade
            produce to international markets.

          </p>

          <p className="mt-6 text-lg text-gray-600 leading-8">

            Our focus is on quality sourcing, reliable logistics,
            international standards and long-term partnerships
            with importers worldwide.

          </p>

        </motion.div>

        {/* RIGHT STATS */}

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            <div className="bg-green-50 border border-green-100 rounded-3xl p-8 text-center">

              <h3 className="text-4xl font-bold text-green-700">
                100%
              </h3>

              <p className="mt-3 text-gray-600">
                Export Quality Produce
              </p>

            </div>

            <div className="bg-orange-50 border border-orange-100 rounded-3xl p-8 text-center">

              <h3 className="text-4xl font-bold text-orange-500">
                4+
              </h3>

              <p className="mt-3 text-gray-600">
                Source Countries
              </p>

            </div>

            <div className="bg-green-50 border border-green-100 rounded-3xl p-8 text-center">

              <h3 className="text-4xl font-bold text-green-700">
                50+
              </h3>

              <p className="mt-3 text-gray-600">
                Global Partners
              </p>

            </div>

            <div className="bg-orange-50 border border-orange-100 rounded-3xl p-8 text-center">

              <h3 className="text-4xl font-bold text-orange-500">
                24/7
              </h3>

              <p className="mt-3 text-gray-600">
                Customer Support
              </p>

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
};

export default About;