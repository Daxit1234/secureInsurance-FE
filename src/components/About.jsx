import React from "react";

export default function About() {
  return (
    <div className="bg-[#fef9f6] py-20 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-12">
          {/* Left Heading */}
          <h2 className="text-4xl font-bold text-[#0b3554] mb-4 md:mb-0">
            Trusted Financial <br /> Partner
          </h2>

          {/* Right Paragraph */}
          <p className="text-gray-700 max-w-2xl text-lg leading-relaxed">
            Secure Invest is dedicated to empowering individuals and families in
            India with tailored insurance, investment, financial planning, and
            risk management solutions. We value trust, transparency, and
            personalized service to secure your financial future.
          </p>
        </div>

        {/* Bottom Images */}
        {/* Bottom Images */}
{/* Bottom Images */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <img
    src="https://images.pexels.com/photos/3184416/pexels-photo-3184416.jpeg?auto=compress&cs=tinysrgb&w=800"
    alt="Team discussion"
    className="rounded-xl shadow-md w-full h-[500px] object-cover"
  />
  <img
    src="https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=800"
    alt="Financial expert"
    className="rounded-xl shadow-md w-full h-[500px] object-cover"
  />
  <img
    src="https://images.pexels.com/photos/3184412/pexels-photo-3184412.jpeg?auto=compress&cs=tinysrgb&w=800"
    alt="Business meeting"
    className="rounded-xl shadow-md w-full h-[500px] object-cover"
  />
</div>


      </div>
    </div>
  );
}
