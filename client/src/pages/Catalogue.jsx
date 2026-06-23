import { useState } from "react";

const catalogueProducts = [
  {
    name: "Imam Pasand",
    country: "India",
    flag: "🇮🇳",
    image:
      "https://images.unsplash.com/photo-1553279768-865429fa0078?w=800",
  },
  {
    name: "Jamun Fruit",
    country: "India",
    flag: "🇮🇳",
    image:
      "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=800",
  },
  {
    name: "Ice Apple",
    country: "India",
    flag: "🇮🇳",
    image:
      "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=800",
  },
  {
    name: "Banginapalli",
    country: "India",
    flag: "🇮🇳",
    image:
      "https://images.unsplash.com/photo-1591073113125-e46713c829ed?w=800",
  },
  {
    name: "Cherukurasaalu",
    country: "India",
    flag: "🇮🇳",
    image:
      "https://images.unsplash.com/photo-1553279768-865429fa0078?w=800",
  },
  {
    name: "Kesar",
    country: "India",
    flag: "🇮🇳",
    image:
      "https://images.unsplash.com/photo-1591073113125-e46713c829ed?w=800",
  },
  {
    name: "Alphonso",
    country: "India",
    flag: "🇮🇳",
    image:
      "https://images.unsplash.com/photo-1553279768-865429fa0078?w=800",
  },
  {
    name: "Watermelon",
    country: "Morocco",
    flag: "🇲🇦",
    image:
      "https://images.unsplash.com/photo-1563114773-84221bd62daa?w=800",
  },
  {
    name: "Hot Pepper",
    country: "Uganda",
    flag: "🇺🇬",
    image:
      "https://images.unsplash.com/photo-1583663848850-46af132dc08e?w=800",
  },
  {
    name: "Karela",
    country: "Uganda",
    flag: "🇺🇬",
    image:
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800",
  },
  {
    name: "Birdeye Chilli",
    country: "Uganda",
    flag: "🇺🇬",
    image:
      "https://images.unsplash.com/photo-1583663848850-46af132dc08e?w=800",
  },
  {
    name: "Garden Egg",
    country: "Uganda",
    flag: "🇺🇬",
    image:
      "https://images.unsplash.com/photo-1615485925873-1c4f0cf93b61?w=800",
  },
  {
    name: "Ginger",
    country: "Uganda",
    flag: "🇺🇬",
    image:
      "https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?w=800",
  },
  {
    name: "Peanuts",
    country: "Uganda",
    flag: "🇺🇬",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800",
  },
  {
    name: "Sweet Potato",
    country: "Uganda",
    flag: "🇺🇬",
    image:
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800",
  },
  {
    name: "Okra",
    country: "Honduras",
    flag: "🇭🇳",
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800",
  },
];

const Catalogue = () => {

  const [selectedCountry, setSelectedCountry] =
    useState("India");

  const countries = [
    ...new Map(
      catalogueProducts.map((item) => [
        item.country,
        item.flag,
      ])
    ),
  ];

  const filteredProducts =
    catalogueProducts.filter(
      (item) =>
        item.country === selectedCountry
    );

  return (
    <div className="min-h-screen bg-[#f8faf8] pt-36 pb-20 px-6">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="text-center mb-16">

          <span className="inline-block bg-green-100 text-green-700 px-5 py-2 rounded-full font-medium mb-5">
            FreshIndia Export Catalogue
          </span>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
            Product Catalogue
          </h1>

          <p className="text-gray-600 mt-5 max-w-3xl mx-auto">
            Browse our premium export products country-wise.
          </p>

        </div>

        {/* COUNTRY FILTER */}

        <div className="flex flex-wrap justify-center gap-4 mb-16">

          {countries.map(([country, flag]) => (

            <button
              key={country}
              onClick={() =>
                setSelectedCountry(country)
              }
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedCountry === country
                  ? "bg-green-700 text-white shadow-lg"
                  : "bg-white border border-green-200 text-gray-700 hover:bg-green-50"
              }`}
            >
              {flag} {country}
            </button>

          ))}

        </div>

        {/* SELECTED COUNTRY */}

        <div className="text-center mb-10">

          <h2 className="text-3xl font-bold text-green-700">
            {selectedCountry} Products
          </h2>

        </div>

        {/* PRODUCTS */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {filteredProducts.map((item, index) => (

            <div
              key={index}
              className="bg-white rounded-3xl overflow-hidden shadow-md border border-green-100 hover:shadow-2xl hover:-translate-y-2 transition duration-500"
            >

              <img
                src={item.image}
                alt={item.name}
                className="h-64 w-full object-cover"
              />

              <div className="p-5">

                <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm mb-3">
                  {item.flag} {item.country}
                </span>

                <h3 className="text-xl font-bold text-gray-900">
                  {item.name}
                </h3>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
};

export default Catalogue;