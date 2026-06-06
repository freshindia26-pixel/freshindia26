import { useState } from "react";
import API from "../services/api";

const BulkEnquiry = () => {

  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    country: "",
    email: "",
    phone: "",
    product: "",
    quantity: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post(
        "/bulk-enquiry",
        formData
      );

      alert(
        "Bulk enquiry submitted successfully!"
      );

      setFormData({
        fullName: "",
        companyName: "",
        country: "",
        email: "",
        phone: "",
        product: "",
        quantity: "",
        message: "",
      });

    } catch (error) {

      console.log(error);

      alert(
        "Failed to submit enquiry"
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#f8faf8] pt-36 pb-20 px-6">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}

        <div className="text-center mb-16">

          <span className="inline-block bg-orange-100 text-orange-500 px-5 py-2 rounded-full font-medium mb-5">
            Global Trade Enquiry
          </span>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
            Bulk Enquiry
          </h1>

          <p className="text-gray-600 mt-5 max-w-3xl mx-auto">
            Looking for bulk quantities of export-quality
            fruits, vegetables or agricultural products?
            Send us your enquiry and our team will contact you.
          </p>

        </div>

        {/* FORM */}

        <div className="bg-white rounded-3xl shadow-sm border border-green-100 p-10">

          <form
            onSubmit={handleSubmit}
            className="space-y-8"
          >

            <div className="grid md:grid-cols-2 gap-6">

              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="border border-green-200 rounded-2xl px-5 py-4 outline-none focus:border-green-600"
                required
              />

              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={formData.companyName}
                onChange={handleChange}
                className="border border-green-200 rounded-2xl px-5 py-4 outline-none focus:border-green-600"
              />

            </div>

            <div className="grid md:grid-cols-2 gap-6">

              <input
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
                className="border border-green-200 rounded-2xl px-5 py-4 outline-none focus:border-green-600"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="border border-green-200 rounded-2xl px-5 py-4 outline-none focus:border-green-600"
                required
              />

            </div>

            <div className="grid md:grid-cols-2 gap-6">

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="border border-green-200 rounded-2xl px-5 py-4 outline-none focus:border-green-600"
              />

              <input
                type="text"
                name="product"
                placeholder="Product Interested In"
                value={formData.product}
                onChange={handleChange}
                className="border border-green-200 rounded-2xl px-5 py-4 outline-none focus:border-green-600"
                required
              />

            </div>

            <input
              type="text"
              name="quantity"
              placeholder="Quantity Required"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full border border-green-200 rounded-2xl px-5 py-4 outline-none focus:border-green-600"
            />

            <textarea
              rows="6"
              name="message"
              placeholder="Additional Requirements / Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full border border-green-200 rounded-2xl px-5 py-4 outline-none focus:border-green-600"
            />

            {/* BUTTONS */}

            <div className="flex flex-wrap gap-5">

              <button
                type="submit"
                className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-full font-semibold transition"
              >
                Submit Enquiry
              </button>

              <a
                href="https://wa.me/919959140718"
                target="_blank"
                rel="noreferrer"
                className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-4 rounded-full font-semibold transition"
              >
                WhatsApp Us
              </a>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
};

export default BulkEnquiry;