// src/components/FAQ.jsx
import React from "react";

const faqs = [
  {
    question: "What is your return policy?",
    answer:
      "You can return most items within 30 days of purchase for a full refund. Items must be in original condition and packaging.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Standard shipping usually takes 5-7 business days. Expedited shipping options are available at checkout.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship to most countries worldwide. Shipping fees and delivery times vary depending on the destination.",
  },
  {
    question: "Can I track my order?",
    answer:
      "Yes, once your order has shipped, you will receive a tracking number via email to monitor its delivery status.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "You can reach our support team via email at support@example.com or call us at +123 456 7890 during business hours.",
  },
  {
    question: "Do you offer gift cards?",
    answer:
      "Yes, we offer gift cards in various denominations. They can be purchased online and redeemed at checkout.",
  },
  {
    question: "Are there any discounts available?",
    answer:
      "We occasionally offer promotions and discounts. Subscribe to our newsletter to stay updated on current deals.",
  },
  {
    question: "How do I reset my password?",
    answer:
      "Click on the 'Forgot Password' link on the login page and follow the instructions to reset your password.",
  },
  {
    question: "Can I change my order after placing it?",
    answer:
      "Orders can be modified within 1 hour of placement. Please contact customer support immediately to make changes.",
  },
  
 
];

const FAQ = () => {
  return (
    <section className="max-w-4xl mx-auto py-16 bg-white lg:mb-20">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-4 sansita-font ">Frequently Asked Questions</h2>
        <p className="text-center text-gray-500 mb-12 sansita-font">
          If you have any concerns please read this collection of frequently asked questions before contacting us. If you are still unclear about something feel free to contact.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {faqs.map((faq, index) => (
            <div key={index}>
              <h3 className="font-bold mb-2 text-gray-800">{faq.question}</h3>
              <p className="text-gray-500">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
