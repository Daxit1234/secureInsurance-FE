import React from "react";
import { Link } from "react-router-dom";
import PartnersSection from "./PartnersSection.jsx";

// At the bottom of your JSX return:
<PartnersSection />


export default function Services() {
  const services = [
    { title: "Term Life Insurance", img: "/images/term-life-insurance.png",link: "/TermLife" },
    { title: "Health Insurance", img: "/images/health-insurance.png", link:"/HealthInsurance" },
    { title: "Investment Plans", img: "/images/investment-plans.png",link: "/InvestmentPlans" },
    { title: "Car Insurance", img: "/images/car-insurance.png" ,link: "/CarInsurance"},
    { title: "2 Wheeler Insurance", img: "/images/two-wheeler.png", link: "/TwoWheeler" },
    { title: "Family Health Insurance", img: "/images/family-health.png", link: "/FamilyHealth" },
    { title: "Travel Insurance", img: "/images/travel-insurance.png", link: "/TravelInsurance" },
    { title: "Mourgage Loan", img: "/images/mourgage.png",link:"/MourgageLoan" },
    { title: "Term Plan with Return", img: "/images/term-return.png", link:"/TermPlanwithReturns"},
    { title: "Guaranteed Return Plan", img: "/images/guaranteed-return.png", link:"/GuaranteedReturnPlans"},
    { title: "Child Savings Plan", img: "/images/child-savings.png", link:"/ChildSavingsPlans" },
    { title: "Retirement Plan", img: "/images/retirement-plans.png", link:"/RetirementPlans"},
    { title: "Home Loan", img: "/images/home-loan.png", link: "/HomeLoan" },
    { title: "Personal Loan", img: "/images/personal-insurance.png", link: "/PersonalLoan" },
  ];

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
  {services.map((service, index) => {
    const card = (
      <div
        key={index}
        className="flex flex-col items-center hover:scale-105 transition-transform duration-300"
      >
        {/* Icon Box */}
        <div className="bg-[#f0f7ff] rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-8 flex items-center justify-center w-28 h-28">
          <img
            src={service.img}
            alt={service.title}
            className="w-16 h-16 object-contain"
          />
        </div>

        {/* Text Below Box */}
        <p className="mt-3 text-[#0b3554] font-medium text-sm text-center">
          {service.title}
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

      {/* Insurance Section */}
      <div className="py-16">
        <h2 className="text-4xl font-bold text-[#0b3554] mb-4">
          Comprehensive Insurance Plans
        </h2>
        <p className="text-gray-700 max-w-3xl mx-auto mb-12">
          Get peace of mind with our tailored insurance plans meeting your
          protection needs.
        </p>

        {/* Life Insurance */}
        <div className="max-w-5xl mx-auto mt-16 bg-[#eaf4fa] rounded-2xl shadow-md border border-gray-200 flex flex-col md:flex-row overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
          <div className="md:w-1/2 w-full overflow-hidden">
            <img
              src="/images/insurance-plan.webp"
              alt="Life Insurance"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
          <div className="md:w-1/2 w-full text-left p-8 flex flex-col justify-center">
            <h3 className="text-2xl font-semibold text-[#0b3554] mb-4">
              Life Insurance
            </h3>
            <p className="text-gray-700 mb-4">
              Protect your family with reliable life insurance plans.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-blue-600 text-lg">✔</span>
                <span>Affordable premiums</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-600 text-lg">✔</span>
                <span>Wide coverage</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-600 text-lg">✔</span>
                <span>Easy claims</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Health Insurance */}
        <div className="max-w-5xl mx-auto mt-16 bg-[#eaf4fa] rounded-2xl shadow-md border border-gray-200 flex flex-col md:flex-row overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
          <div className="md:w-1/2 w-full overflow-hidden">
            <img
              src="/images/health.webp"
              alt="Health Insurance"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
          <div className="md:w-1/2 w-full text-left p-8 flex flex-col justify-center">
            <h3 className="text-2xl font-semibold text-[#0b3554] mb-4">
              Health Insurance
            </h3>
            <p className="text-gray-700 mb-4">
              Secure your health and medical costs with our plans.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-blue-600 text-lg">✔</span>
                <span>Cashless treatment</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-600 text-lg">✔</span>
                <span>Comprehensive health cover</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-600 text-lg">✔</span>
                <span>Nationwide network</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Home Insurance */}
        <div className="max-w-5xl mx-auto mt-16 bg-[#eaf4fa] rounded-2xl shadow-md border border-gray-200 flex flex-col md:flex-row overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
          <div className="md:w-1/2 w-full overflow-hidden">
            <img
              src="/images/home.webp"
              alt="Home Insurance"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
          <div className="md:w-1/2 w-full text-left p-8 flex flex-col justify-center">
            <h3 className="text-2xl font-semibold text-[#0b3554] mb-4">
              Home Insurance
            </h3>
            <p className="text-gray-700 mb-4">
              Safeguard your home from unexpected damages today.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-blue-600 text-lg">✔</span>
                <span>Protects property</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-600 text-lg">✔</span>
                <span>Covers natural disasters</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-600 text-lg">✔</span>
                <span>Affordable rates</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Investment Section */}
      <div className="py-16">
        <h2 className="text-4xl font-bold text-[#0b3554] mb-4">
          Smart Investment Services
        </h2>
        <p className="text-gray-700 max-w-3xl mx-auto mb-12">
          Achieve your financial goals with our expert investment solutions.
        </p>

        {/* Retirement Planning */}
        <div className="max-w-5xl mx-auto mt-16 bg-[#eaf4fa] rounded-2xl shadow-md border border-gray-200 flex flex-col md:flex-row overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
          <div className="md:w-1/2 w-full overflow-hidden">
            <img
              src="/images/retierement-planning.webp"
              alt="Retirement Planning"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
          <div className="md:w-1/2 w-full text-left p-8 flex flex-col justify-center">
            <h3 className="text-2xl font-semibold text-[#0b3554] mb-4">
              Retirement Planning
            </h3>
            <p className="text-gray-700 mb-4">
              Plan your retirement for a stress-free golden age.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-blue-600 text-lg">✔</span>
                <span>Secure future</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-600 text-lg">✔</span>
                <span>Tax benefits</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-600 text-lg">✔</span>
                <span>Personalized plans</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Mutual Funds */}
        <div className="max-w-5xl mx-auto mt-16 bg-[#eaf4fa] rounded-2xl shadow-md border border-gray-200 flex flex-col md:flex-row overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
          <div className="md:w-1/2 w-full overflow-hidden">
            <img
              src="/images/mutual-funds.webp"
              alt="Mutual Funds"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
          <div className="md:w-1/2 w-full text-left p-8 flex flex-col justify-center">
            <h3 className="text-2xl font-semibold text-[#0b3554] mb-4">
              Mutual Funds
            </h3>
            <p className="text-gray-700 mb-4">
              Grow your wealth smartly with expertly managed funds.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-blue-600 text-lg">✔</span>
                <span>Diversified portfolios</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-600 text-lg">✔</span>
                <span>Professional management</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-600 text-lg">✔</span>
                <span>Growth potential</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Education Savings */}
        <div className="max-w-5xl mx-auto mt-16 bg-[#eaf4fa] rounded-2xl shadow-md border border-gray-200 flex flex-col md:flex-row overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
          <div className="md:w-1/2 w-full overflow-hidden">
            <img
              src="/images/education-savings.webp"
              alt="Education Savings"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
          <div className="md:w-1/2 w-full text-left p-8 flex flex-col justify-center">
            <h3 className="text-2xl font-semibold text-[#0b3554] mb-4">
              Education Savings
            </h3>
            <p className="text-gray-700 mb-4">
              Save effectively for your child's education expenses.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-blue-600 text-lg">✔</span>
                <span>Goal oriented</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-600 text-lg">✔</span>
                <span>Flexible contributions</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-600 text-lg">✔</span>
                <span>Secure child's future</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Financial Planning Section */}
      <div className="py-16">
        <h2 className="text-4xl font-bold text-[#0b3554] mb-4">
          Expert Financial Planning
        </h2>
        <p className="text-gray-700 max-w-3xl mx-auto mb-12">
          Get custom financial plans designed to boost your wealth and savings.
        </p>

        {/* Estate Planning */}
        <div className="max-w-5xl mx-auto mt-16 bg-[#eaf4fa] rounded-2xl shadow-md border border-gray-200 flex flex-col md:flex-row overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
          <div className="md:w-1/2 w-full overflow-hidden">
            <img
              src="/images/estate-planning.webp"
              alt="Estate Planning"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
          <div className="md:w-1/2 w-full text-left p-8 flex flex-col justify-center">
            <h3 className="text-2xl font-semibold text-[#0b3554] mb-4">
              Estate Planning
            </h3>
            <p className="text-gray-700 mb-4">
              Plan the smooth transfer of your assets and legacy.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-blue-600 text-lg">✔</span>
                <span>Asset distribution</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-600 text-lg">✔</span>
                <span>Legal compliance</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-600 text-lg">✔</span>
                <span>Family protection</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Tax Planning */}
        <div className="max-w-5xl mx-auto mt-16 bg-[#eaf4fa] rounded-2xl shadow-md border border-gray-200 flex flex-col md:flex-row overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
          <div className="md:w-1/2 w-full overflow-hidden">
            <img
              src="/images/tax-planing.webp"
              alt="Tax Planning"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
          <div className="md:w-1/2 w-full text-left p-8 flex flex-col justify-center">
            <h3 className="text-2xl font-semibold text-[#0b3554] mb-4">
              Tax Planning
            </h3>
            <p className="text-gray-700 mb-4">
              Optimize your taxes with smart planning and advice.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-blue-600 text-lg">✔</span>
                <span>Tax savings</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-600 text-lg">✔</span>
                <span>Compliance support</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-600 text-lg">✔</span>
                <span>Efficient filing</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Budget Management */}
        <div className="max-w-5xl mx-auto mt-16 bg-[#eaf4fa] rounded-2xl shadow-md border border-gray-200 flex flex-col md:flex-row overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
          <div className="md:w-1/2 w-full overflow-hidden">
            <img
              src="/images/budget-management.webp"
              alt="Budget Management"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
          <div className="md:w-1/2 w-full text-left p-8 flex flex-col justify-center">
            <h3 className="text-2xl font-semibold text-[#0b3554] mb-4">
              Budget Management
            </h3>
            <p className="text-gray-700 mb-4">
              Manage your budget to maximize savings and reduce expenses.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-blue-600 text-lg">✔</span>
                <span>Expense tracking</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-600 text-lg">✔</span>
                <span>Savings growth</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-600 text-lg">✔</span>
                <span>Financial discipline</span>
              </li>
            </ul>
          </div>
        </div>
        {/* Partners Section at bottom */}
        <PartnersSection />
      </div>
    </div>
  );
}

