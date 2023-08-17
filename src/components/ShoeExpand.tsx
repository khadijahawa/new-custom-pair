/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import styles from "./styles.module.css";
import { StaticImageData } from "next/image";

interface ShoeSectionProps {
  imageSrc: StaticImageData;
  headerText: string;
  backgroundColor: string;
}

const ShoeSection: React.FC<ShoeSectionProps> = ({
  imageSrc,
  headerText,
  backgroundColor
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleMouseEnter = () => {
    setExpanded(true);
  };

  const handleMouseLeave = () => {
    setExpanded(false);
  };

  return (
    // <div className={styles.section}>
    <div
      className={`${styles.column} ${expanded ? styles.expanded : ""}`}
      style={{ backgroundColor }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* font-[OSemiBold] */}
      <div className={`  ${styles.header}`}>{headerText}</div>
      <img src={imageSrc.src} alt={headerText} className={styles.image} />
    </div>
    // </div>
  );
};

export default ShoeSection;
