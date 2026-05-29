const Footer = () => {
  return (
    <footer className="bg-black border-t border-yellow-500/20 py-10 px-6">

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

        <div>
          <h2 className="text-3xl font-bold text-yellow-400">
            FreshIndia
          </h2>

          <p className="text-gray-400 mt-3">
            Premium Fruits From India To The World
          </p>
        </div>

        <div className="text-gray-400 text-center">
          © 2026 FreshIndia. All Rights Reserved.
        </div>

      </div>

    </footer>
  );
};

export default Footer;