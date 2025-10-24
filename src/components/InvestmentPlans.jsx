import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import ContactForm from "../common/ContactForm";

export default function InvestmentPlans() {
  return (
    <div className="bg-[#f0f9ff] min-h-screen">
      <Header />

      <div className="max-w-4xl mx-auto py-16 px-6 text-center">
        <h1 className="text-4xl font-bold text-[#0b3554] mb-4">
          Investment Plans
        </h1>
        <p className="text-gray-700 text-lg mb-8">
          Grow your wealth with smart investment strategies tailored to your
          goals. Secure your financial future and make your money work for you.
        </p>

        <ContactForm />
      </div>
    </div>
  );
}
