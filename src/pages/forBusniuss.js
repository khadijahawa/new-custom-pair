/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

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
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

  async function fetchProducts() {
    const products = await client?.fetch(
      groq`*[_type == "product"] {
      _id,
      name,
      image,
      slug,
      price,
      details,
      size,
      color,
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
      {/* <div className="flex items-center justify-center py-4 md:py-8 flex-wrap"></div> */}
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
