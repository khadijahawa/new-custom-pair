import React from "react";
import ShoeSection from "../components/ShoeExpand";
import image1 from "../utils/images/4.png";
import image2 from "../utils/images/5.png";
import image3 from "../utils/images/6.png";

const About = () => {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <ShoeSection
          imageSrc={image1}
          headerText="Column 1"
          backgroundColor="#ececec"
        />
        <ShoeSection
          imageSrc={image2}
          headerText="Column 2"
          backgroundColor="#e1e1e1"
        />
        <ShoeSection
          imageSrc={image3}
          headerText="Column 2"
          backgroundColor="#d0d0d0"
        />
      </div>
    </div>
  );
};

export default About;
