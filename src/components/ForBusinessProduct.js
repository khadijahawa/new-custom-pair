import React from "react";
import Link from "next/link";

import { urlFor } from "../../sanity/lib/client";

const ForBusinessProduct = ({ product }) => {
  return (
    <div>
      <Link href={`/product/${product.slug.current}`}>
        <div className="product-card">
          <img
            src={urlFor(product.image[0]).url()}
            width={250}
            height={250}
            className="product-image"
            alt={product.name} // Don't forget to add alt text for accessibility
          />
          <p className="product-name">{product.name}</p>
          <p className="product-price">${product.price}</p>
        </div>
      </Link>
    </div>
  );
};

export default ForBusinessProduct;
