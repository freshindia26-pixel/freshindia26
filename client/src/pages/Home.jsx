import Hero from "../components/hero/Hero";
import About from "../components/about/About";
import Products from "../components/products/Products";
import Testimonials from "../components/testimonials/Testimonials";
import ExportCountries from "../components/common/ExportCountries";

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Products />
      <ExportCountries />
      <Testimonials />
    </>
  );
};

export default Home;