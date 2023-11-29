import React, { useState } from "react";
import footerLogo1 from "../utils/images/WhiteLogo.png";
import footerLogo2 from "../utils/images/logoBlack-removebg-preview.png";

import Link from "next/link";
import Image from "next/image";
import before from "../utils/images/before-removebg-preview.png";
import after from "../utils/images/after-removebg-preview.png";
import before2 from "../utils/images/before2-removebg-preview.png";
import {
  MobileOutlined,
  ShoppingOutlined,
  HomeOutlined,
  ShopOutlined,
  ClearOutlined,
  DisconnectOutlined
} from "@ant-design/icons";
import { Menu } from "antd";
import styles from "./styles.module.css";

const AppFooter = () => {
  const items = [
    {
      key: "1",
      label: (
        <Link href="/" passHref className="font-[BRegular]">
          Home
        </Link>
      )
    },

    {
      key: "2",
      label: (
        <Link href="/forBusiness " passHref className="font-[BRegular]">
          For Business
        </Link>
      )
    },
    {
      key: "3",
      label: (
        <Link href="/cleaning" passHref className=" font-[BRegular]">
          Cleaning
        </Link>
      )
    },

    {
      key: "4",
      label: (
        <Link href="/contact" passHref className="font-[BRegular]">
          Contact Us
        </Link>
      )
    },
    {
      key: "5",
      label: (
        <Link href="/" passHref className="font-[BRegular]">
          About Custom Pair
        </Link>
      )
    }
  ];

  return (
    <footer className="text-center bg-[#d0d0d0] p-16 relative ">
      <div className="absolute w-full bottom-0 ">
        {/* <div className="flex gap-3">
          <Link href="/">
            <Image src={footerLogo1} alt="Logo" className="w-60" />
          </Link>
          <Link href="/">
            <Image src={footerLogo2} alt="Logo" className="w-10 " />
          </Link>
        </div>
        <Menu
          items={items}
          mode="horizontal"
          className={`font-[BRegular] text-white ${styles.antmenu}`}
          overflowedIndicator={null}
        /> */}

        {/* <div className="mt-2 ">
          <div className="">
            <Image src={before} style={contentStyle} alt="before" />
          </div>
          <div>
            <Image src={before2} style={contentStyle} alt="before2" />
          </div>
          <div>
            <Image src={after} style={contentStyle} alt="after" />
          </div>
        </div> */}
        {/* <div className="grid gap-2">
          <div>
            <Image
              src={before}
              alt="before"
              className="h-auto max-w-full rounded-lg"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Image
                src={before}
                alt="before2"
                className="h-auto max-w-full rounded-lg"
              />
            </div>
            <div>
              <Image
                src={before2}
                alt="before2"
                className="h-auto max-w-full rounded-lg"
              />
            </div>
            <div>
              <Image
                className="h-auto max-w-full rounded-lg"
                src={after}
                alt=""
              />
            </div>
   
          </div>
        </div> */}
      </div>
    </footer>
  );
};

export default AppFooter;
