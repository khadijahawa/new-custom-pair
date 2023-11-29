import React, { useState } from "react";
import { useRouter } from "next/router";
import { useStateContext } from "../../context/StateContext";
import { client, urlFor } from "@/sanity/lib/client";
import image from "../utils/images/2.png";
import Image from "next/image";

const cleaning = () => {
  const router = useRouter();
  const { qty, onAdd, setShowCart } = useStateContext();

  const [dateTime, setDateTime] = useState("");
  const [address, setAddress] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [details, setDetails] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleaningRequest = {
      _type: "cleaning",
      dateTime,
      address,
      quantity,
      details
    };

    if (quantity < 3) {
      alert("Minimum quantity for ordering is 3");
      return;
    }

    try {
      await client.create(cleaningRequest);
      onAdd(cleaningRequest, qty);
      setShowCart(true);
    } catch (error) {
      console.error("Error submitting cleaning request:", error);
    }
  };

  return (
    <div>
      <h1 className="text-5xl font-[HUltraLight] text-center my-14 ">
        Cleaning Process
      </h1>
      <div className="flex min-h-screen">
        <div className="flex flex-col md:flex-row gap-16 ">
          <div className="md:w-1/2">
            <Image src={image} alt="Cleaning" className="w-full p-4" />
          </div>
          <div className="md:w-1/2 my-10 p-1">
            <div className="flex flex-col">
              <form onSubmit={handleSubmit}>
                <ol className="relative border-l border-gray-200 dark:border-gray-700 ">
                  <li className="mb-4 ml-4">
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                    <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                      Step 1
                    </time>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Choose Date and Time{" "}
                      <span className="text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                        {" "}
                        (To Pick Up Your Shoes)
                      </span>
                    </h3>
                    <input
                      type="datetime-local"
                      value={dateTime}
                      onChange={(e) => setDateTime(e.target.value)}
                      required
                      className="py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 my-2"
                    />
                  </li>
                  <li className="mb-4 ml-4">
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                    <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                      Step 2
                    </time>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Enter Your Adress
                      <span className="text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                        {" "}
                        (Within Copenhagen Only)
                      </span>
                    </h3>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                      className="py-2 px-7 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 my-2"
                    />
                  </li>
                  <li className="mb-4 ml-4">
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                    <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                      Step 3
                    </time>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Enter Quantity
                      <span className="text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                        {" "}
                        (Minimum 3 Pairs)
                      </span>
                    </h3>
                    <input
                      type="number"
                      id="quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      required
                      min="1"
                      className="py-2 px-7 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 my-2"
                    />
                  </li>
                  <li className="mb-4 ml-4">
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                    <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                      Step 4
                    </time>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Add Additional Details{" "}
                      <span className="text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                        {" "}
                        (Optional)
                      </span>
                    </h3>
                    <textarea
                      id="Details"
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      className="py-2 px-9 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 my-2"
                    />
                  </li>
                  <li className="ml-4">
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                    <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                      Step 5
                    </time>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Add To Cart & Payment
                    </h3>
                    <div className="buttons">
                      <button type="submit" className="add-to-cart">
                        Add To Cart
                      </button>
                    </div>
                  </li>
                </ol>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default cleaning;
