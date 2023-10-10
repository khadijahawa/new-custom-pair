import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router"; // Import the useRouter hook

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

function ForBusiness() {
  const [products, setProducts] = useState([]);
  const [index, setIndex] = useState(0);
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();
  const router = useRouter(); // Initialize the useRouter

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

  const handleProductClick = (slug, brand) => {
    let path = "";
    if (brand === "adidas") {
      path = `/product/${slug}`;
    } else if (brand === "nike") {
      path = `/product/${slug}`;
    } else if (brand === "treec") {
      path = `/product/${slug}`;
    }
    router.push(path);
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
      <div className="product-detail-container">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="product-card"
              onClick={() =>
                handleProductClick(product.slug.current, product.brand)
              }
            >
              <Image
                src={urlFor(product.image[0]).url()}
                width={350}
                height={350}
                className="product-image"
                alt={product.name}
                unoptimized={true}
              />
              <p className="product-name">{product.name}</p>
              <p className="product-price">${product.price}</p>
            </div>
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </div>
    </div>
  );
}

export default ForBusiness;
