import React from "react";
import Link from "next/link";
import Image from "next/image";

import { urlFor } from "../../sanity/lib/client";

const ForBusinessProduct = ({ product }) => {
  return (
    <div>
      <Link href={`/product/${product.slug.current}`}>
        <div className="product-card">
          <Image
            src={urlFor(product.image[0]).url()}
            width={350}
            height={350}
            className="product-image"
            alt={product.name}
            unoptimized={true}
          />
          <p className="product-name ">{product.name}</p>
          <p className="product-price ">${product.price}</p>
        </div>
      </Link>
    </div>
  );
};

export default ForBusinessProduct;
