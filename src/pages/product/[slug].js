import React, { useState, useEffect } from "react";
import {
  StarOutlined,
  StarFilled,
  MinusOutlined,
  PlusOutlined
} from "@ant-design/icons";
import { client, urlFor } from "../../../sanity/lib/client";
import ForBusinessProduct from "../../components/ForBusinessProduct";
import { useStateContext } from "../../../context/StateContext";
import { BlockPicker, CirclePicker } from "react-color";

import Sneakers from "@/src/components/Sneakers";
import Image from "next/image";

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price, size } = product;
  const [index, setIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("#37d67a");
  const [hueRotation, setHueRotation] = useState(0);

  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

  const handleBuyNow = () => {
    // onAdd(product, qty);

    // setShowCart(true);

    if (!selectedSize) {
      alert("Please select a size before buying.");
      return;
    }
    onAdd(product, qty, selectedSize);

    setShowCart(true);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };
  const handleColorChange = (color) => {
    setSelectedColor(color.hex);
  };
  function hexToHSL(hex) {
    let r = (hex >> 16) & 255;
    let g = (hex >> 8) & 255;
    let b = hex & 255;

    r /= 255;
    g /= 255;
    b /= 255;

    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);

    let h,
      s,
      l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // grayscale
    } else {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  }
  useEffect(() => {
    // console.log("selectedColor:", selectedColor);

    // Check if selectedColor is a valid color string
    if (/^#[0-9A-Fa-f]{6}$/i.test(selectedColor)) {
      // Remove the '#' character and convert the remaining string to a number
      const colorValue = parseInt(selectedColor.slice(1), 16);

      // Calculate hue rotation based on colorValue
      const hslColor = hexToHSL(colorValue);
      const hueValue = hslColor.h / 360;

      setHueRotation(hueValue);
    } else {
      console.error("Invalid color format:", selectedColor);
    }
  }, [selectedColor]);

  // console.log("hueRotation", hueRotation);

  return (
    <div>
      <div className="product-detail-container">
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
          <div className="reviews">
            <div>
              <StarOutlined />
              <StarFilled />
              <StarFilled />
              <StarFilled />
              <StarFilled />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details:</h4>
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
                  />
                  <span className="size-label">{availableSize}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="blockpicker">
            <h6 className="mt-3">Choose a color for the whoosh</h6>
            {/* Div to display the color  */}
            <CirclePicker
              color={selectedColor}
              onChange={handleColorChange}
              className="mt-3"
            />
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => onAdd(product, qty, selectedSize)}
            >
              Add to Cart
            </button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <ForBusinessProduct key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div> */}
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
