import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import HealthInsurance from "./HealthInsurance";
import CarInsurance from "./CarInsurance";
import InvestmentPlans from "./InvestmentPlans";
import TwoWheeler from "./TwoWheeler";
import FamilyHealth from "./FamilyHealth";
import TravelInsurance from "./TravelInsurance";

const Plans = () => {
  const location = useLocation();
  const { name, age } = location.state || {};

  return (
    <div className="bg-[#f0f9ff] min-h-screen">
      <Header />
      <div className="max-w-6xl mx-auto py-16 px-6">
        <h1 className="text-4xl font-bold text-[#0b3554] mb-8 text-center">
          Our Plans
        </h1>

        {/* Optional personalized message */}
        {name && (
          <p className="text-center text-lg text-gray-700 mb-8">
            Welcome, <span className="font-semibold">{name}</span>! {age && `You are ${age} years old.`}
          </p>
        )}

        {/* Plans Sections */}
        <section id="health-insurance" className="mb-16">
          <HealthInsurance />
        </section>

        <section id="car-insurance" className="mb-16">
          <CarInsurance />
        </section>

        <section id="investment-plans" className="mb-16">
          <InvestmentPlans />
        </section>

        <section id="two-wheeler" className="mb-16">
          <TwoWheeler />
        </section>

        <section id="family-health" className="mb-16">
          <FamilyHealth />
        </section>

        <section id="travel-insurance" className="mb-16">
          <TravelInsurance />
        </section>
      </div>
    </div>
  );
};

export default Plans;
