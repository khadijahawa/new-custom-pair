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
  AppstoreOutlined,
  CalendarOutlined,
  LinkOutlined,
  MailOutlined,
  SettingOutlined
} from "@ant-design/icons";

const Header = () => {
  type MenuItem = Required<MenuProps>["items"][number];

  const items: MenuItem[] = [
    getItem("Navigation One", "1", <MailOutlined />),
    getItem("Navigation Two", "2", <CalendarOutlined />),
    getItem("Navigation Two", "sub1", <AppstoreOutlined />, [
      getItem("Option 3", "3"),
      getItem("Option 4", "4"),
      getItem("Submenu", "sub1-2", null, [
        getItem("Option 5", "5"),
        getItem("Option 6", "6")
      ])
    ]),
    getItem("Navigation Three", "sub2", <SettingOutlined />, [
      getItem("Option 7", "7"),
      getItem("Option 8", "8"),
      getItem("Option 9", "9"),
      getItem("Option 10", "10")
    ]),
    getItem(
      <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        Ant Design
      </a>,
      "link",
      <LinkOutlined />
    )
  ];
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
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
            <Menu>
              <Menu.Item key="1">
                <Link href="/" className="block py-2" onClick={closeMenu}>
                  Home
                </Link>
              </Menu.Item>
              <SubMenu key="products" title="Products" className="block py-2">
                <Menu.Item key="2">
                  <Link href="/products/category1" onClick={closeMenu}>
                    Category 1
                  </Link>
                </Menu.Item>
                <Menu.Item key="3">
                  <Link href="/products/category2" onClick={closeMenu}>
                    Category 2
                  </Link>
                </Menu.Item>
              </SubMenu>
              <Menu.Item key="4">
                <Link
                  href="/contact"
                  className="block py-2"
                  onClick={closeMenu}
                >
                  Contact
                </Link>
              </Menu.Item>
            </Menu>
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
