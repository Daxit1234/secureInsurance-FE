import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import ContactForm from "../common/ContactForm";

export default function TwoWheeler() {
  return (
    <div className="bg-[#f0f9ff] min-h-screen">
      <Header />

      <div className="max-w-4xl mx-auto py-16 px-6 text-center">
        <h1 className="text-4xl font-bold text-[#0b3554] mb-4">
          Two Wheeler Insurance
        </h1>
        <p className="text-gray-700 text-lg mb-8">
          Keep your ride and yourself protected with affordable two-wheeler
          insurance. Stay worry-free on every journey with coverage for
          accidents, theft, and damages.
        </p>
        <ContactForm fields={["fullName", "contact", "email"]} />
      </div>
    </div>
  );
}
