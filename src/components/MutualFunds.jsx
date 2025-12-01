import ContactForm from "../common/ContactForm";
import Header from "./Header";
import React from "react";

export default function MutualFunds() {
  return (
    <div className="bg-[#f0f9ff] min-h-screen">
      <Header />
      <div className="max-w-4xl mx-auto py-16 px-6 text-center">
        <h1 className="text-4xl font-bold text-[#0b3554] mb-4">Mutual Funds</h1>
        <p className="text-gray-700 text-lg mb-8">
          Invest in a wide range of mutual funds to secure your financial
          future.
        </p>

        <ContactForm />
      </div>
    </div>
  );
}
