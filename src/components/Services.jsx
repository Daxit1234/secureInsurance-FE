import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PartnersSection from "./PartnersSection.jsx";
import { useSelector } from "react-redux";
import { filterSystemData } from "../helper/index.jsx";
import About from "./About.jsx";
import { useNavigate } from "react-router-dom";

// At the bottom of your JSX return:
<PartnersSection />;

const navigateUrl = {
  "Life Insurance": "/TermLife",
  "Health Insurance": "/HealthInsurance",
  "Home Insurance": "/HomeLoan",
};
export default function Services() {
  const { systemData } = useSelector((state) => state.systemReducer);
  const [serviceList, setServiceList] = useState([]);
  const [insurancePlan, setInsurancePlane] = useState([]);
  const [investmentPlan, setInvestmentPlan] = useState([]);
  const [financialPlan, setFinancialPlan] = useState([]);
  const navigate = useNavigate();
  const services = {
    "Term Life Insurance": "/TermLife",
    "Health Insurance": "/HealthInsurance",
    "Investment Plans": "/InvestmentPlans",
    "Car Insurance": "/CarInsurance",
    "Two Wheeler Insurance": "/TwoWheeler",
    "Family Health Insurance": "/FamilyHealth",
    "Travel Insurance": "/TravelInsurance",
    "Mortgage Loan": "/MortgageLoan",
    "Term Plan with Return": "/TermPlanwithReturns",
    "Guaranteed Return Plans": "/GuaranteedReturnPlans",
    "Child Savings Plans": "/ChildSavingsPlans",
    "Retirement Plans": "/RetirementPlans",
    "Home Loan": "/HomeLoan",
    "Personal Loan": "/PersonalLoan",
    "SIP":"/SIP",
    "Mutual Funds":"/MutualFunds"
  };
  useEffect(() => {
    if (systemData.length > 0 && serviceList.length === 0) {
      const service = filterSystemData(systemData, "services");
      setInsurancePlane(filterSystemData(systemData, "insurance_plans"));
      setInvestmentPlan(filterSystemData(systemData, "investment_services"));
      setFinancialPlan(filterSystemData(systemData, "financial_planning"));
      setServiceList(
        service.map((item) => ({
          ...item,
          link: services[item?.details?.title], // pulls link from map
        }))
      );
    }
  }, [systemData]);
  return (
    <div className="py-16 px-8 bg-white text-center">
      {/* Main Title */}
      <h2 className="text-4xl font-bold text-[#0b3554] mb-4">
        Explore Our Comprehensive Services Gallery
      </h2>

      {/* Subtitle */}
      <p className="text-gray-700 max-w-3xl mx-auto mb-12">
        At Secure Invest, we offer a wide range of trusted financial solutions
        tailored to the needs of small businesses in India.
      </p>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-8">
        {serviceList.map((service, index) => {
          const card = (
            <div
              key={index}
              className="flex flex-col items-center hover:scale-105 transition-transform duration-300"
            >
              {/* Icon Box */}
              <div className="bg-[#f0f7ff] rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-8 flex items-center justify-center w-28 h-28">
                <img
                  src={service.imageUrl}
                  alt={service.details.title}
                  className="w-16 h-16 object-contain"
                />
              </div>

              {/* Text Below Box */}
              <p className="mt-3 text-[#0b3554] font-medium text-sm text-center">
                {service.details.title}
              </p>
            </div>
          );

          // If the service has a link, wrap the card in a Link
          return service.link ? (
            <Link to={service.link} key={index}>
              {card}
            </Link>
          ) : (
            card
          );
        })}
      </div>

      <section id="about">
        <About />
      </section>
      {/* Insurance Section */}
      <div className="py-16">
        <h2 className="text-4xl font-bold text-[#0b3554] mb-4">
          Comprehensive Insurance Plans
        </h2>
        <p className="text-gray-700 max-w-3xl mx-auto mb-12">
          Get peace of mind with our tailored insurance plans meeting your
          protection needs.
        </p>
        {insurancePlan.map((item) => (
          <div
            onClick={() => navigate(navigateUrl[item?.details?.title])}
            className="max-w-5xl mx-auto mt-16 bg-[#eaf4fa] rounded-2xl shadow-md border border-gray-200 flex flex-col md:flex-row overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
          >
            <div className="md:w-1/2 w-full overflow-hidden">
              <img
                src={item?.imageUrl}
                alt={item?.details?.title || ""}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
            <div className="md:w-1/2 w-full text-left p-8 flex flex-col justify-center">
              <h3 className="text-2xl font-semibold text-[#0b3554] mb-4">
                {item?.details?.title || ""}
              </h3>
              <p className="text-gray-700 mb-4">
                {item?.details?.description || ""}
              </p>
              <ul className="space-y-2">
                {item?.details?.benefits.map((i) => (
                  <li className="flex items-center gap-2">
                    <span className="text-blue-600 text-lg">✔</span>
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Investment Section */}
      <div className="py-16">
        <h2 className="text-4xl font-bold text-[#0b3554] mb-4">
          Smart Investment Services
        </h2>
        <p className="text-gray-700 max-w-3xl mx-auto mb-12">
          Achieve your financial goals with our expert investment solutions.
        </p>
        {investmentPlan.map((item) => (
          <div className="max-w-5xl mx-auto mt-16 bg-[#eaf4fa] rounded-2xl shadow-md border border-gray-200 flex flex-col md:flex-row overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
            <div className="md:w-1/2 w-full overflow-hidden">
              <img
                src={item?.imageUrl}
                alt={item?.details?.title || ""}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
            <div className="md:w-1/2 w-full text-left p-8 flex flex-col justify-center">
              <h3 className="text-2xl font-semibold text-[#0b3554] mb-4">
                {item?.details?.title || ""}
              </h3>
              <p className="text-gray-700 mb-4">
                {item?.details?.description || ""}
              </p>
              <ul className="space-y-2">
                {item?.details?.benefits.map((i) => (
                  <li className="flex items-center gap-2">
                    <span className="text-blue-600 text-lg">✔</span>
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      {/* Financial Planning Section */}
      <div className="py-16">
        <h2 className="text-4xl font-bold text-[#0b3554] mb-4">
          Expert Financial Planning
        </h2>
        <p className="text-gray-700 max-w-3xl mx-auto mb-12">
          Get custom financial plans designed to boost your wealth and savings.
        </p>

        {financialPlan.map((item) => (
          <div className="max-w-5xl mx-auto mt-16 bg-[#eaf4fa] rounded-2xl shadow-md border border-gray-200 flex flex-col md:flex-row overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
            <div className="md:w-1/2 w-full overflow-hidden">
              <img
                src={item?.imageUrl}
                alt={item?.details?.title || ""}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
            <div className="md:w-1/2 w-full text-left p-8 flex flex-col justify-center">
              <h3 className="text-2xl font-semibold text-[#0b3554] mb-4">
                {item?.details?.title || ""}
              </h3>
              <p className="text-gray-700 mb-4">
                {item?.details?.description || ""}
              </p>
              <ul className="space-y-2">
                {item?.details?.benefits.map((i) => (
                  <li className="flex items-center gap-2">
                    <span className="text-blue-600 text-lg">✔</span>
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
        {/* Partners Section at bottom */}
        <PartnersSection />
      </div>
    </div>
  );
}
