import logo from "../../assets/freshindia-logo.jpeg";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-green-100 py-16 px-6">

      <div className="max-w-7xl mx-auto">

        <div className="grid md:grid-cols-3 gap-12">

          {/* COMPANY */}

          <div>

            <img
              src={logo}
              alt="FreshIndia"
              className="h-20 mb-5"
            />

            <p className="text-gray-600 leading-7">

              FreshIndia is a trusted exporter of premium fruits,
              vegetables, spices and agricultural products sourced
              from reliable growers across multiple countries.

            </p>

          </div>

          {/* QUICK LINKS */}

          <div>

            <h3 className="text-xl font-bold text-green-700 mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 text-gray-600">

              <li>Home</li>

              <li>Products</li>

              <li>Catalogue</li>

              <li>Bulk Enquiry</li>

            </ul>

          </div>

          {/* GLOBAL TRADE */}

          <div>

            <h3 className="text-xl font-bold text-green-700 mb-5">
              Global Network
            </h3>

            <ul className="space-y-3 text-gray-600">

              <li>🇮🇳 India</li>

              <li>🇺🇬 Uganda</li>

              <li>🇲🇦 Morocco</li>

              <li>🇭🇳 Honduras</li>

            </ul>

          </div>

        </div>

        {/* BOTTOM */}

        <div className="border-t border-green-100 mt-12 pt-8 text-center text-gray-500">

          © 2026 FreshIndia. All Rights Reserved.

        </div>

      </div>

    </footer>
  );
};

export default Footer;