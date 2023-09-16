import React, { useState } from "react";
import { useRouter } from "next/router";
import { useStateContext } from "../../context/StateContext";
import { client, urlFor } from "@/sanity/lib/client";

const cleaning = () => {
  const router = useRouter();
  const { qty, onAdd, setShowCart } = useStateContext();

  // Form state
  const [dateTime, setDateTime] = useState("");
  const [address, setAddress] = useState("");

  // Handle form submission

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data here (e.g., check if address is within Copenhagen)

    // Prepare data to add to cart
    const cleaningRequest = {
      _type: "cleaning", // Match the Sanity schema name
      dateTime,
      address
    };

    try {
      // Send the cleaning request data to Sanity
      await client.create(cleaningRequest);

      // Add the cleaning request to the cart
      onAdd(cleaningRequest);

      // Show the cart
      setShowCart(true);

      // Redirect or perform any other actions
      // router.push("/cart");
    } catch (error) {
      console.error("Error submitting cleaning request:", error);
    }
  };

  return (
    <div>
      <h1>Cleaning Process</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date and Time:</label>
          <input
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Address (within Copenhagen):</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default cleaning;
