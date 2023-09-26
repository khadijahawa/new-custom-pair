import React, { useState } from "react";
import Image from "next/image";
import SwooshLogo from "../utils/nike-4-logo-pack/nike.svg"; // Import the swoosh SVG

const Sneakers = ({ nikeImageUrl }) => {
  const [swooshColor, setSwooshColor] = useState("#000000"); // Default color

  const handleColorChange = (color) => {
    setSwooshColor(color);
  };

  return (
    <div>
      {/* Nike shoe picture */}
      <Image
        src={nikeImageUrl}
        alt="Nike Shoe"
        width={400}
        height={400}
        unoptimized={true}
      />

      {/* Overlay "swoosh" SVG with dynamic color */}
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0"
        }}
      >
        <SwooshLogo
          width={400}
          height={400}
          fill={swooshColor}
          onClick={() => handleColorChange("#ff0000")} // Example: Change the color to red on click
        />
      </div>
    </div>
  );
};

export default Sneakers;
