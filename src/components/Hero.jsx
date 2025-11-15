import React from "react";
import { Carousel } from "antd";
const contentStyle = {
  margin: 0,
  height: "500px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
const App = () => (
  <Carousel autoplay autoplaySpeed={2000}>
    <div>
      <h3 style={contentStyle}>
        <div
          id="home"
          className="relative w-full h-[500px] bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/hero.webp')",
          }}
        ></div>
      </h3>
    </div>
    <div>
      <h3 style={contentStyle}>
        <div
          id="home"
          className="relative w-full h-[500px] bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/hero.webp')",
          }}
        ></div>
      </h3>
    </div>
    <div>
      <h3 style={contentStyle}>
        <div
          id="home"
          className="relative w-full h-[500px] bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/hero.webp')",
          }}
        ></div>
      </h3>
    </div>
    <div>
      <h3 style={contentStyle}>
        <div
          id="home"
          className="relative w-full h-[500px] bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/hero.webp')",
          }}
        ></div>
      </h3>
    </div>
  </Carousel>
);
export default App;
