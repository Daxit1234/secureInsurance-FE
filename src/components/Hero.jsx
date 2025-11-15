import React from "react";
import { Carousel } from "antd";

const App = () => {
  const slides = [
    "/images/hero.webp",
    "/images/hero.webp",
    "/images/hero.webp",
    "/images/hero.webp",
  ];

  return (
    <Carousel autoplay autoplaySpeed={2000} className="w-full">
      {slides.map((img, index) => (
        <div key={index}>
          <div
            className="
              w-full 
              h-[250px]          // mobile height
              sm:h-[350px]       // small screens
              md:h-[450px]       // medium
              lg:h-[500px]       // large screens
              xl:h-[500px]       // big monitors
              relative
            "
          >
            <img
              src={img}
              alt="slide"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default App;
