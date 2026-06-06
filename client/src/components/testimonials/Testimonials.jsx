import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Testimonials = () => {
  return (
    <section className="bg-gradient-to-r from-green-700 to-green-800 py-24 px-6">

      <div className="max-w-6xl mx-auto text-center">

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >

          <span className="inline-block bg-white/20 text-white px-5 py-2 rounded-full mb-6">
            Bulk Orders & Global Trade
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">

            Looking For Bulk Quantity
            <br />

            Fruits & Vegetables?

          </h2>

          <p className="text-green-100 text-lg mt-8 max-w-3xl mx-auto leading-8">

            FreshIndia supplies export-quality fruits, vegetables,
            spices and agricultural products to importers,
            distributors, wholesalers and retail chains worldwide.

          </p>

          <div className="flex flex-wrap justify-center gap-5 mt-12">

            <Link to="/bulk-enquiry">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold transition">
                Send Bulk Enquiry
              </button>
            </Link>

            <Link to="/catalogue">
              <button className="bg-white text-green-700 hover:bg-green-50 px-8 py-4 rounded-full font-semibold transition">
                View Catalogue
              </button>
            </Link>

          </div>

        </motion.div>

      </div>

    </section>
  );
};

export default Testimonials;