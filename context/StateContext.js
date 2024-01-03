import React, { createContext, useContext, useState, useEffect } from "react";
import { NikeProvider } from "./NikeContext";
import { AdidasProvider } from "./AdidasContext";
import { TreecProvider } from "./TreecContext";

import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  const [cleaningRequest, setCleaningRequest] = useState(null);
  const [shipmentPrice, setShipmentPrice] = useState(0);
  // const [updatedCartItems, setUpdatedCartItems] = useState([]);

  let foundProduct;

  const calculateCleaningPrice = (quantity) => {
    let pricePerPair = 0;

    if (quantity <= 3) {
      pricePerPair = 239;
    } else if (quantity <= 10) {
      pricePerPair = 179;
    } else {
      pricePerPair = 149;
    }

    return pricePerPair * quantity;
  };

  const addCleaningRequest = (cleaningRequest, quantity) => {
    if (quantity < 3) {
      alert("Minimum quantity for ordering is 3");
      return;
    }
    const totalPrice = calculateCleaningPrice(quantity);
    const updatedCartItems = [...cartItems, cleaningRequest];
    setCartItems(updatedCartItems);
    setCleaningRequest(updatedCartItems);
    setTotalPrice((prevTotal) => prevTotal + totalPrice);
    console.log("total price in the state", totalPrice);
    setTotalQuantities((prevQuantity) => prevQuantity + quantity);
  };

  const handleProductAdd = (
    product,
    quantity,
    selectedSize,
    customizationData
  ) => {
    const cartItem = {
      Image: customizationData.orderImage,
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity,
      size: selectedSize,
      customizationData
    };

    const updatedCartItems = [...cartItems, cartItem];
    // setUpdatedCartItems((prevItems) => [...prevItems, cartItem]);
    return updatedCartItems;
  };

  const onAdd = (product, quantity, selectedSize, customizationData) => {
    let updatedCartItems;

    updatedCartItems = handleProductAdd(
      product,
      quantity,
      selectedSize,
      customizationData
    );
    // console.log("updatedCartItems", updatedCartItems);
    if (updatedCartItems) {
      // setUpdatedCartItems(updatedCartItems);
      setCartItems(updatedCartItems);
    }
  };

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    );
    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
    );
    setCartItems(newCartItems);
  };

  const toggleCartItemQuanitity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id);

    if (value === "inc") {
      setCartItems([
        ...newCartItems,
        { ...foundProduct, quantity: foundProduct.quantity + 1 }
      ]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        setCartItems([
          ...newCartItems,
          { ...foundProduct, quantity: foundProduct.quantity - 1 }
        ]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  };

  return (
    <NikeProvider>
      <AdidasProvider>
        <TreecProvider>
          <Context.Provider
            value={{
              showCart,
              setShowCart,
              cartItems,
              totalPrice,
              // updatedCartItems,
              totalQuantities,
              qty,
              incQty,
              decQty,
              onAdd,
              addCleaningRequest,
              toggleCartItemQuanitity,
              onRemove,
              setCartItems,
              setTotalPrice,
              setTotalQuantities,
              selectedSize,
              setSelectedSize,
              // selectedColor,
              // setSelectedColor,
              cleaningRequest,
              setCleaningRequest,
              shipmentPrice,
              setShipmentPrice
            }}
          >
            {children}
          </Context.Provider>
        </TreecProvider>
      </AdidasProvider>
    </NikeProvider>
  );
};

export const useStateContext = () => useContext(Context);
