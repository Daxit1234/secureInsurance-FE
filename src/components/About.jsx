import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { filterSystemData } from "../helper";

export default function About() {
  const { systemData } = useSelector((state) => state.systemReducer);
  const [aboutData, setAboutData] = useState([]);
  useEffect(() => {
    if (systemData.length > 0) {
      const aboutUsData = filterSystemData(systemData, "about_us");
      setAboutData(aboutUsData);
    }
  }, [systemData]);
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
          {aboutData.map((item) => (
            <>
              <img
                src={item?.imageUrl}
                alt={item?.details?.title || ""}
                className="rounded-xl shadow-md w-full h-[500px] object-cover"
              />
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
