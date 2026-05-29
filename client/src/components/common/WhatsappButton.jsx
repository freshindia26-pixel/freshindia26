import { FaWhatsapp } from "react-icons/fa";

const WhatsappButton = () => {
  return (
    <a
      href="https://wa.me/447423585222"
      target="_blank"
      className="fixed bottom-6 right-6 z-50 bg-green-500 w-16 h-16 rounded-full flex items-center justify-center text-3xl text-white shadow-2xl hover:scale-110 transition"
    >
      <FaWhatsapp />
    </a>
  );
};

export default WhatsappButton;