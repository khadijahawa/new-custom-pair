import React, { useState } from "react";

const Faq = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-2">
      <div
        className="flex items-center justify-between p-5 bg-gray-50 cursor-pointer rounded-md"
        onClick={toggleAccordion}
      >
        <h2 className="text-lg ">{question}</h2>
        <svg
          className={`w-5 h-5 transition-transform transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      {isOpen && <div className="p-7">{answer}</div>}
    </div>
  );
};

export default Faq;
