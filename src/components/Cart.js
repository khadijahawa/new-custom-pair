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
import Image from "next/image";
// import getStripe from '../lib/getStripe';

const Cart = () => {
  const cartRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    updatedCartItems,
    setShowCart,
    toggleCartItemQuanitity,
    onRemove,
    cleaningRequest
  } = useStateContext();

  console.log("isnide the cart cartItems", cartItems);

  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify([...cartItems])
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

        {cartItems.length < 1 ? (
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
          {cartItems
            // ?.filter((item) => item._type !== "cleaning")
            ?.map((item) => (
              <div className="product" key={item._id}>
                {console.log("item", item)}
                {/* {item?.image ? (
                  <img src={item.image} className="cart-product-image" />
                ) : (
                  <span>No Image Available</span>
                )} */}
                {item.type === "cleaning" ? (
                  <div>
                    <h3>Service : {item._type}</h3>
                    <h5>Pickup Date: {item.dateTime}</h5>
                    <h4>Address: {item.address}</h4>
                    <h4>Extra Details: {item.details}</h4>
                    <h4>Quantity: {item.quantity}</h4>
                  </div>
                ) : (
                  <div>
                    {/* Render product info */}
                    {/* Replace this with your own logic */}
                    <h5>{item.product.name}</h5>
                    <h4>{item.product.price} DKK</h4>
                    <img src={item.product.image} alt={item.product.name} />
                    <h4>Size: {item.size}</h4>
                    {/* ... other product details */}
                  </div>
                )}
                {/* <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.name}</h5>
                    <h4>{item.price} DKK </h4>
                    <img src={item.image} />

                    <h4> Size: {item.size}</h4>
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
                </div> */}
              </div>
            ))}
        </div>
        {/* {console.log("cleaning", cleaningRequest)} */}
      </div>

      {/* <div ref={cartRef}>
        <div className="cart-container">
          {cleaningRequest &&
            cleaningRequest.map((request) => (
              <div className="" key={request._id}>
                <div className="">
                  <div className=" mx-4">
                    <h5>
                      <span className="font-bold mx-2">Picking Up Date:</span>

                      {request.dateTime}
                    </h5>
                    <br />

                    <h4>
                      <span className="font-bold mx-2">Address:</span>
                      {request.address}
                    </h4>
                    <br />

                    <h4>
                      <span className="font-bold mx-2">Extra Details:</span>
                      {request.details}
                    </h4>
                    <br />
                  </div>
                  <div className="flex quantity-desc1">
                    <div className="">
                      <p className="quantity-desc">
                        <span
                          className="minus"
                          onClick={() =>
                            toggleCartItemQuanitity(request._id, "dec")
                          }
                        >
                          <MinusCircleOutlined />
                        </span>
                        <span className="num" onClick="">
                          {request.quantity}
                        </span>
                        <span
                          className="plus"
                          onClick={() =>
                            toggleCartItemQuanitity(request._id, "inc")
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

          {cartItems.length >= 1 && (
            <div className="cart-bottom">
              <div className="total">
                <h3>Subtotal:</h3>
                <h3>${totalPrice}</h3>
                {console.log("totalPrice", totalPrice)}
              </div>
              <div className="btn-container">
                <button type="button" className="btn" onClick={handleCheckout}>
                  Pay with Stripe
                </button>
              </div>
            </div>
          )}
        </div>
      </div> */}
    </div>
  );
};

export default Cart;
