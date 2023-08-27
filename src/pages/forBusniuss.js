/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import product1 from "../utils/images/1.jpeg";
import product2 from "../utils/images/1.png";
import product3 from "../utils/images/2.png";
import product4 from "../utils/images/3.png";
import product5 from "../utils/images/4.png";
import product6 from "../utils/images/5.png";
import { client, urlFor } from "@/sanity/lib/client";
import {
  StarOutlined,
  StarFilled,
  MinusOutlined,
  PlusOutlined
} from "@ant-design/icons";
import { useStateContext } from "../../context/StateContext";
import { groq } from "next-sanity";
import ForBusinessProduct from "../components/ForBusinessProduct";

function forBusniuss() {
  const [products, setProducts] = useState([]);
  const [index, setIndex] = useState(0);
  const [selectedBrand, setSelectedBrand] = useState(null);
  // const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

  async function fetchProducts() {
    const products = await client?.fetch(
      groq`*[_type == "product"] {
      _id,
      name,
      image,
      slug,
      price,
      details,
      brand
    }`
    );
    console.log("Fetched products:", products);
    return products;
  }
  const handleBrandFilter = (brand) => {
    setSelectedBrand(brand);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const productsData = await fetchProducts();
        console.log("Setting products:", productsData);
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-center py-4 md:py-8 flex-wrap">
        <button
          type="button"
          className="text-black-700 border border-black-200 bg-white hover:ring-black-800 hover:text-black-400 focus:ring-2 focus:outline-none focus:ring-black-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:border-black-500 dark:text-black-500 dark:hover:text-white dark:hover:bg-black-500 dark:bg-black-900 dark:focus:ring-black-800"
          onClick={() => handleBrandFilter(null)}
        >
          All Brands
        </button>

        <button
          type="button"
          onClick={() => handleBrandFilter("nike")}
          className="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:text-white dark:focus:ring-gray-800"
        >
          Nike
        </button>
        <button
          type="button"
          onClick={() => handleBrandFilter("adidas")}
          className="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:text-white dark:focus:ring-gray-800"
        >
          Adidas
        </button>
      </div>
      <div className="product-detail-container">
        {products.length > 0 ? (
          products
            .filter((product) =>
              selectedBrand ? product.brand === selectedBrand : true
            )
            .map((product) => (
              <ForBusinessProduct key={product._id} product={product} />
            ))
        ) : (
          <p>Loading products...</p>
        )}
      </div>
    </div>
  );
}

export default forBusniuss;
