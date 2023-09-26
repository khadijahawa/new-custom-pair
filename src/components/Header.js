import React, { useState } from "react";
import { Menu } from "antd";
import { useRouter } from "next/router";
import Image from "next/image";
import logo1 from "../utils/images/logo1.png";
import Link from "next/link";
import {
  MobileOutlined,
  ShoppingOutlined,
  HomeOutlined,
  ShopOutlined,
  ClearOutlined,
  DisconnectOutlined,
  ShoppingCartOutlined,
  MenuUnfoldOutlined
} from "@ant-design/icons";
import styles from "./styles.module.css";
import "../styles/tabs.css";
import { useStateContext } from "../../context/StateContext";
import Cart from "./Cart";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [current, setCurrent] = useState("mail");
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const items = [
    {
      key: "1",
      label: (
        <Link href="/" passHref onClick={closeMenu} className="font-[BRegular]">
          Home
        </Link>
      )
    },
    {
      key: "sub1",
      label: "Shop",
      // icon: <ShoppingOutlined />,
      children: [
        {
          key: "2",
          label: (
            <Link
              href="/forBusniuss"
              passHref
              onClick={closeMenu}
              className="font-[BRegular]"
            >
              For Business
            </Link>
          )
          // icon: <ShopOutlined />
        },
        {
          key: "3",
          label: (
            <Link
              href="/cleaning"
              passHref
              onClick={closeMenu}
              className=" font-[BRegular]"
            >
              Cleaning
            </Link>
          )
          // icon: <ClearOutlined />
        }
      ]
    },
    {
      key: "4",
      label: (
        <Link
          href="/contact"
          passHref
          onClick={closeMenu}
          className="font-[BRegular]"
        >
          Contact Us
        </Link>
      )
      // icon: <DisconnectOutlined />
    },
    {
      key: "5",
      label: (
        <Link href="/" passHref onClick={closeMenu} className="font-[BRegular]">
          About Custom Pair
        </Link>
      )
      // icon: <MobileOutlined />
    },
    {
      key: "6",
      label: (
        <div>
          <button
            onClick={() => setShowCart(true)}
            type="button"
            className="cart-icon"
          >
            <ShoppingCartOutlined
              className="ml-2 mt-3"
              style={{ fontSize: "28px" }}
            />
            <span className="cart-item-qty">{totalQuantities}</span>
          </button>
          {showCart && <Cart />}
        </div>
      )
    }
  ];

  const onClick = (e) => {
    console.log("click", e);
  };
  const onClickDesktop = (e) => {
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
          <MenuUnfoldOutlined />
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
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
