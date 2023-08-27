/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import styles from "./styles.module.css";
import { StaticImageData } from "next/image";

const ShoeSection = ({ imageSrc, headerText, backgroundColor }) => {
  const [expanded, setExpanded] = useState(false);

  const handleMouseEnter = () => {
    setExpanded(true);
  };

  const handleMouseLeave = () => {
    setExpanded(false);
  };

  return (
    <div
      className={`${styles.column} ${expanded ? styles.expanded : ""}`}
      style={{ backgroundColor }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={` ${styles.header}`}>{headerText}</div>
      <img src={imageSrc.src} alt={headerText} className={styles.image} />
    </div>
  );
};

export default ShoeSection;
