import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { getCustomizationData } from "../../components/shoeCustomization/Adidas";
import { client, urlFor } from "../../../sanity/lib/client";
import { useStateContext } from "../../../context/StateContext";
import Adidas from "../../components/shoeCustomization/Adidas";
import Nike from "../../components/shoeCustomization/Nike";
import Treec from "../../components/shoeCustomization/Treec";
import { useAdidasContext } from "../../../context/AdidasContext";
import { useNikeContext } from "../../../context/NikeContext";
import { useTreecContext } from "../../../context/TreecContext";

import Image from "next/image";

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price, size } = product;
  const [index, setIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [hueRotation, setHueRotation] = useState(0);

  const { decQty, incQty, qty, onAdd, setShowCart, cartItems } =
    useStateContext();
  const { adidasCustomization, setAdidasCustomization } = useAdidasContext();
  const { nikeCustomization, setNikeCustomization } = useNikeContext();
  const { treecCustomization, setTreecCustomization } = useTreecContext();

  const renderCustomizationComponent = () => {
    switch (product.brand) {
      case "adidas":
        return <Adidas product={product} />;
      case "nike":
        return <Nike product={product} />;
      case "treec":
        return <Treec product={product} />;
      default:
        return null;
    }
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size before buying.");
      return;
    }

    // console.log("test product", product);
    let customizationData;

    switch (product.brand) {
      case "adidas":
        customizationData = adidasCustomization;
        break;
      case "nike":
        customizationData = nikeCustomization;
        break;
      case "treec":
        customizationData = treecCustomization;
        break;

      default:
        customizationData = null;
        break;
    }

    onAdd(product, qty, selectedSize, customizationData);

    const updatedProduct = cartItems.find(
      (item) => item.productId === product._id
    );

    console.log("Updated Product Details before the cart:", updatedProduct);

    setShowCart(true);
  };

  const router = useRouter();
  const { brand } = router.query;

  useEffect(() => {
    if (brand) {
      setSelectedBrand(brand);
    }
  }, [brand]);

  useEffect(() => {
    console.log("Updated Cart Items:", cartItems);
  }, [cartItems]);

  return (
    <div>
      <div className="product-detail-container ">
        <div>
          <div className="image-container">
            <img
              src={urlFor(image && image[index])}
              className="product-detail-image"
              style={{ filter: `hue-rotate(${hueRotation}turn)` }}
            />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item)}
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <p>{details}</p>
          <p className="price">${price}</p>
          {/* <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}>
                <MinusOutlined />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}>
                <PlusOutlined />
              </span>
            </p>
          </div> */}
          <div className="size-selection">
            <h3>Select Size:</h3>
            <div className="size-options">
              {size.map((availableSize, i) => (
                <label key={i} className="size-option">
                  <input
                    type="radio"
                    value={availableSize}
                    checked={selectedSize === availableSize}
                    onChange={() => handleSizeChange(availableSize)}
                    className=""
                  />
                  <span className="size-label">{availableSize}</span>
                </label>
              ))}
            </div>
          </div>
          {renderCustomizationComponent(product)}

          {/* Render the live preview */}
          {/* <Preview
            selectedBrand={selectedBrand}
            selectedColor={selectedColor}
            selectedColors={selectedColors}
            uploadedImage={uploadedImage}
          /> */}

          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => onAdd(product, qty, selectedSize)}
            >
              Add to Cart
            </button>
            <button type="button" className="buy-now" onClick={handleAddToCart}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current
    }
  }));

  return {
    paths,
    fallback: "blocking"
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: { products, product }
  };
};

export default ProductDetails;
