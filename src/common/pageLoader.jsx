import React from "react";
import { Spin } from "antd";

const FullPageLoader = () => {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(255, 255, 255, 0.9)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <Spin size="large" />
    </div>
  );
};

export default FullPageLoader;
