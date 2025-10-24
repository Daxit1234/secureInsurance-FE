import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import ContactForm from "../common/ContactForm";

export default function MourgageLoan() {
  return (
    <div className="bg-[#f0f9ff] min-h-screen">
      <Header />

      <div className="max-w-4xl mx-auto py-16 px-6 text-center">
        <h1 className="text-4xl font-bold text-[#0b3554] mb-4">
          Mourgage Loan
        </h1>

        <p className="text-gray-700 text-lg mb-8">
          Turn your dream home into reality with our easy and affordable
          mortgage loan options. Enjoy low interest rates, flexible EMIs, and a
          hassle-free approval process.
        </p>

        <ContactForm fields={["fullName", "contact", "email"]} />
      </div>
    </div>
  );
}
