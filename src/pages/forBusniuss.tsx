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
import { groq } from "next-sanity";
import { SanityProduct } from "@/config/inventory";
// import { urlFor } from "@/sanity/lib/client";

interface Product {
  _id: string;
  name: string;
  image: { url: string }[];
  price: number;
  details: string;
}

function forBusniuss() {
  const [products, setProducts] = useState<Product[]>([]);

  async function fetchProducts() {
    const products = await client?.fetch<Product[]>(
      groq`*[_type == "product"] {
      _id,
      name,
      image,
      price,
      details
    }`
    );
    console.log("Fetched products:", products);
    return products;
  }

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
          className="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:text-white dark:focus:ring-gray-800"
        >
          Nike
        </button>
        <button
          type="button"
          className="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:text-white dark:focus:ring-gray-800"
        >
          Adidas
        </button>
      </div>
      <div>
        {products.length > 0 ? (
          <div>
            {products.map((product) => (
              <div key={product._id}>
                {product.image.map((img, index) => (
                  <Image
                    key={index}
                    className="h-auto max-w-full rounded-lg"
                    src={urlFor(img).url()}
                    alt={product.name}
                    width="100"
                    height="100"
                    unoptimized={true}
                  />
                ))}

                <p>{product.name}</p>
                <p>Price: ${product.price}</p>
                <p>{product.details}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading products...</p>
        )}
      </div>
    </div>
  );
}

export default forBusniuss;
