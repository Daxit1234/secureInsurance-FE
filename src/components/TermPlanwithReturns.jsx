import ContactForm from "../common/ContactForm";
import Header from "./Header";
import React from "react";

export default function TermPlanwithReturns() {
  return (
    <div className="bg-[#f0f9ff] min-h-screen">
      <Header />

      <div className="max-w-4xl mx-auto py-16 px-6 text-center">
        <h1 className="text-4xl font-bold text-[#0b3554] mb-4">
          Term Plan with Return
        </h1>
        <p className="text-gray-700 text-lg mb-8">
          Secure your family's future with a term plan that also gives you
          returns. Get life cover protection along with maturity benefits for
          smarter financial planning.
        </p>

        <ContactForm />
      </div>
    </div>
  );
}
