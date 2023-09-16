import React, { useRef } from "react";
import Link from "next/link";

import toast from "react-hot-toast";
import {
  LeftOutlined,
  ShoppingOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
  DeleteOutlined
} from "@ant-design/icons";
import { useStateContext } from "../../context/StateContext";
import { urlFor } from "../../sanity/lib/client";
// import getStripe from '../lib/getStripe';

const Cart = () => {
  const cartRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuanitity,
    onRemove,
    cleaningRequest
  } = useStateContext();

  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify([...cartItems, cleaningRequest])
    });

    if (response.statusCode === 500) return;

    const data = await response.json();

    toast.loading("Redirecting...");

    stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}
        >
          <LeftOutlined /> <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && !cleaningRequest ? ( // Check if cleaningRequest exists
          <div className="empty-cart">
            <ShoppingOutlined size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        ) : null}

        <div className="product-container">
          {cartItems?.length >= 1 &&
            cartItems?.map((item) => (
              <div className="product" key={item._id}>
                <img
                  src={urlFor(item?.image[0])}
                  className="cart-product-image"
                />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.name}</h5>
                    <h4>${item.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span
                          className="minus"
                          onClick={() =>
                            toggleCartItemQuanitity(item._id, "dec")
                          }
                        >
                          <MinusCircleOutlined />
                        </span>
                        <span className="num" onClick="">
                          {item.quantity}
                        </span>
                        <span
                          className="plus"
                          onClick={() =>
                            toggleCartItemQuanitity(item._id, "inc")
                          }
                        >
                          <PlusCircleOutlined />{" "}
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => onRemove(item)}
                    >
                      <DeleteOutlined />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cleaningRequest && (
          <div className="product" key={cleaningRequest._id}>
            {/* Customize the display for the cleaning request */}
            {/* For example, you can display date, time, and address */}
            <div className="item-desc">
              <div className="flex top">
                <h5>Cleaning Request</h5>
              </div>
              <div className="flex bottom">
                <div>
                  {/* Display date, time, and address */}
                  <p className="quantity-desc">
                    <span>Date: {cleaningRequest.dateTime}</span>
                    <span>Address: {cleaningRequest.address}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button type="button" className="btn" onClick={handleCheckout}>
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
