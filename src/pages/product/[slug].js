import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

// import {
//   StarOutlined,
//   StarFilled,
//   MinusOutlined,
//   PlusOutlined
// } from "@ant-design/icons";
import { client, urlFor } from "../../../sanity/lib/client";
import ForBusinessProduct from "../../components/ForBusinessProduct";
import { useStateContext } from "../../../context/StateContext";
import { BlockPicker, CirclePicker } from "react-color";

import AdidasCustomization from "../../components/AdidasCustomization";
import NikeCustomization from "../../components/NikeCustomization";
import CustomCustomization from "../../components/CustomCustomization";
// import Preview from "../../components/SneakerCustomization";

import Image from "next/image";

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price, size } = product;
  const [index, setIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [hueRotation, setHueRotation] = useState(0);
  // const [selectedBrand, setSelectedBrand] = useState("nike");
  const [selectedColor, setSelectedColor] = useState("#37d67a");
  const [selectedColors, setSelectedColors] = useState({
    toe: "#37d67a",
    heel: "#000000",
    sole: "#ffffff"
    // Add more shoe parts and default colors as needed
  });
  const [uploadedImage, setUploadedImage] = useState(null);
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

  const renderCustomizationComponent = () => {
    switch (product.brand) {
      case "adidas":
        return <AdidasCustomization product={product} />;
      case "nike":
        return <NikeCustomization product={product} />;
      case "treec":
        return <CustomCustomization product={product} />;
      default:
        return null;
    }
  };

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
    setSelectedColor(color);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setUploadedImage(file);
  };
  // const router = useRouter();
  // const { brand } = router.query;
  // console.log("brand", selectedBrand);
  // useEffect(() => {
  //   if (brand) {
  //     setSelectedBrand(brand);
  //   }
  // }, [brand]);

  const router = useRouter();
  const { brand } = router.query;

  useEffect(() => {
    if (brand) {
      setSelectedBrand(brand);
    }
  }, [brand]);

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
