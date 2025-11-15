// src/components/WhatsappButton.jsx

import React from "react";

const WhatsappBot = () => {
  return (
    <a
      href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NO}?text=I%20want%20to%20know%20more%20about%20your%20services.`}
      target="_blank"
      className="fixed bottom-5 right-5 z-50 bg-[#25D366] p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
    >
      <img
        src="https://img.icons8.com/color/48/000000/whatsapp--v1.png"
        alt="WhatsApp"
        className="w-8 h-8"
      />
    </a>
  );
};

export default WhatsappBot;
