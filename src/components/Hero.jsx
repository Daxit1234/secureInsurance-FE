import React from "react";

const Hero = () => {
  return (
    <div
      id="home"
      className="relative w-full h-[500px] bg-cover bg-center"
      style={{
        backgroundImage:
          "url('/images/hero.webp')",
      }}
    >
      {/* Overlay card */}
      <div className="absolute top-1/2 right-10 transform -translate-y-1/2 bg-[#fefefe] rounded-2xl shadow-lg p-8 max-w-lg">
        <h1 className="text-4xl font-bold text-[#0b3554] mb-4 leading-snug">
          Secure Your Future <br /> with Expert <br /> Investment Solutions
        </h1>
        <p className="text-gray-700 mb-6 text-lg">
          Tailored insurance, investment, and financial planning services to
          protect and grow your wealth effectively.
        </p>
        <button className="bg-[#0b3554] text-white px-6 py-3 rounded-md">
          Get Secure Now
        </button>
      </div>
    </div>
  );
};

export default Hero;
