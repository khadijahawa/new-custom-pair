import React, { useState } from "react";
import { Menu, Space, Divider, Switch } from "antd";
import { useRouter } from "next/router";
import Image from "next/image";
import cartIcon from "../utils/icons/fluent_cart-16-regular.svg";
import userIcon from "../utils/icons/uiw_user.svg";
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
} from "@ant-design/icons";
import styles from "./styles.module.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      label,
    } as MenuItem;
  }
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  const items: MenuItem[] = [
    getItem(
      <Link href="/" passHref onClick={closeMenu} className="block py-2">
        Home
      </Link>,
      "1",
      <HomeOutlined />
    ),
    getItem("Shop", "sub1", <ShoppingOutlined />, [
      getItem(
        <Link href="/" passHref onClick={closeMenu} className="block py-2">
          For Business
        </Link>,
        "2",
        <ShopOutlined />
      ),

      getItem(
        <Link href="/" passHref onClick={closeMenu} className="block py-2">
          Cleaning
        </Link>,
        "3",
        <ClearOutlined />
      ),
    ]),
    getItem(
      <Link href="/" passHref onClick={closeMenu} className="block py-2">
        Contact Us
      </Link>,
      "4",
      <DisconnectOutlined />
    ),
    getItem(
      <Link href="/" passHref onClick={closeMenu} className="block py-2">
        About Custom Pair
      </Link>,
      "5",
      <MobileOutlined />
    ),
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click", e);
  };

  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="relative flex items-center justify-between h-16 font-[BRegular]">
      <div className="w-80">
        <Link href="/">
          <Image src={logo1} alt="Logo" className="w-100" />
        </Link>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden flex items-center relative z-50">
        {/* Set z-index to 50 */}
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
          <div className="p-4">
            <Menu items={items} mode="inline" onClick={onClick} />
          </div>
        </div>
      </div>

      {/* Desktop menu */}
      <div className="hidden md:flex my-3 ">
        <Link href="/" className="mx-6 text-xl">
          Home
        </Link>
        <Link href="/about" className="mx-6 text-xl">
          Products
        </Link>
        <Link href="/contact" className="mx-6 text-xl">
          Contact
        </Link>
      </div>

      <div className="flex">
        <Link href="/about">
          <Image src={userIcon} alt="user" className="p-2" />
        </Link>
        <Link href="/contact">
          <Image src={cartIcon} alt="cart" className="p-2" />
        </Link>
      </div>
    </div>
  );
};

export default Header;
