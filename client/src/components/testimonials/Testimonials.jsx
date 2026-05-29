import { motion } from "framer-motion";

const reviews = [
  {
    name: "Michael Johnson",
    text: "FreshIndia delivered premium mangoes exactly as promised. Beautiful packaging and amazing taste.",
  },
  {
    name: "Sarah Williams",
    text: "Professional export service with excellent fruit quality and timely delivery.",
  },
  {
    name: "Ahmed Khan",
    text: "The best tropical fruit supplier we have worked with internationally.",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-gradient-to-b from-black to-green-950 py-24 px-6">

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-20">
          <p className="text-yellow-400 uppercase tracking-[5px] mb-4">
            Testimonials
          </p>

          <h2 className="text-5xl font-bold text-white">
            What Our Customers Say
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-10">

          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-xl border border-yellow-500/20 rounded-3xl p-8 hover:-translate-y-2 transition"
            >

              <div className="text-yellow-400 text-2xl mb-6">
                ⭐⭐⭐⭐⭐
              </div>

              <p className="text-gray-300 leading-8">
                “{review.text}”
              </p>

              <h3 className="text-white text-xl font-semibold mt-8">
                {review.name}
              </h3>

            </motion.div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default Testimonials;