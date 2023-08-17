import React, { useState } from "react";
import { Menu, Space } from "antd";
import { useRouter } from "next/router";
import Image from "next/image";
import cartIcon from "../utils/icons/fluent_cart-16-regular.svg";
import userIcon from "../utils/icons/uiw_user.svg";
import menuIcon from "../utils/icons/bytesize_menu.svg";
import logo1 from "../utils/images/logo1.png";
import Link from "next/link";

const Header = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        {" "}
        {/* Set z-index to 50 */}
        <button
          onClick={toggleMenu}
          className=" mr-2 text-xl"
          aria-label="Toggle Menu"
        >
          <Image src={menuIcon} alt="menu" />
        </button>
        {isMenuOpen && (
          <div className="absolute top-16 right-0 w-48 bg-white shadow-md z-50 font-[BRegular]">
            {" "}
            {/* Set z-index to 50 */}
            <Menu>
              <Menu.Item key="1">
                <Link href="/" className="block  py-2">
                  Home
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link href="/about" className="block  py-2">
                  About
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link href="/contact" className="block  py-2">
                  Contact
                </Link>
              </Menu.Item>
            </Menu>
          </div>
        )}
      </div>

      {/* Desktop menu */}
      <div className="hidden md:flex my-3 ">
        <Link href="/" className="mx-6 text-xl">
          Home
        </Link>
        <Link href="/about" className="mx-6 text-xl">
          About
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
