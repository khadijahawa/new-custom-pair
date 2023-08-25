import React, { useState } from "react";
import { Menu, Space, Divider, Switch } from "antd";
import { useRouter } from "next/router";
import Image from "next/image";
import menuIcon from "../utils/icons/bytesize_menu.svg";
import logo1 from "../utils/images/logo1.png";
import Link from "next/link";
import type { MenuProps, MenuTheme } from "antd/es/menu";
import {
  MobileOutlined,
  ShoppingOutlined,
  HomeOutlined,
  ShopOutlined,
  ClearOutlined,
  DisconnectOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined
} from "@ant-design/icons";
import styles from "./styles.module.css";
import "../styles/tabs.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [current, setCurrent] = useState("mail");

  type MenuItem = Required<MenuProps>["items"][number];
  function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label
    } as MenuItem;
  }
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const items: MenuItem[] = [
    getItem(
      <Link href="/" passHref onClick={closeMenu} className="font-[BRegular]">
        Home
      </Link>,
      "1"
      // <HomeOutlined />
    ),
    getItem("Shop", "sub1", <ShoppingOutlined />, [
      getItem(
        <Link
          href="/forBusniuss"
          passHref
          onClick={closeMenu}
          className="font-[BRegular]"
        >
          For Business
        </Link>,
        "2"
        // <ShopOutlined />
      ),

      getItem(
        <Link
          href="/cleaning"
          passHref
          onClick={closeMenu}
          className=" font-[BRegular]"
        >
          Cleaning
        </Link>,
        "3"
        // <ClearOutlined />
      )
    ]),
    getItem(
      <Link
        href="/contact"
        passHref
        onClick={closeMenu}
        className="font-[BRegular]"
      >
        Contact Us
      </Link>,
      "4"
      // <DisconnectOutlined />
    ),
    getItem(
      <Link href="/" passHref onClick={closeMenu} className="font-[BRegular]">
        About Custom Pair
      </Link>,
      "5"
      // <MobileOutlined />
    ),
    getItem(
      <Link href="/contact">
        <ShoppingCartOutlined
          className="ml-2 mt-3"
          style={{ fontSize: "28px" }}
        />
      </Link>,
      "6"
      // <MobileOutlined />
    )
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click", e);
  };
  const onClickDesktop: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="relative flex items-center justify-between h-16 font-[BRegular] text-base">
      <div>
        <Link href="/">
          <Image src={logo1} alt="Logo" className={styles.logo} />
        </Link>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden flex items-center relative z-50">
        <button
          onClick={toggleMenu}
          className="mr-2 text-xl"
          aria-label="Toggle Menu"
        >
          <Image src={menuIcon} alt="menu" />
        </button>
        <div
          className={`${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } fixed top-0 right-0 h-full w-64 bg-white shadow-md transform transition-transform ease-in-out duration-300 z-50`}
        >
          <Menu
            items={items}
            mode="inline"
            onClick={onClick}
            className={`font-[BRegular] text-base ${styles.antmenu}`}
          />
        </div>
      </div>

      {/* Desktop menu */}
      <div className="hidden md:flex pr-14">
        <div>
          <Menu
            items={items}
            mode="horizontal"
            selectedKeys={[current]}
            onClick={onClickDesktop}
            style={{ minWidth: "500px", borderBottom: "none" }}
            className="header-menu"
          />
        </div>

        {/* <div>
          <Link href="/contact">
            <ShoppingCartOutlined
              className="ml-2 mt-3"
              style={{ fontSize: "28px" }}
            />
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default Header;
