import { Phone, Mail } from "lucide-react";
import React, { useState } from "react";

const BookingContactSection = () => {
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contactData = {
      phone,
      status: "pending", // default
      createdAt: new Date(),
    };

    try {
      const res = await fetch("http://localhost:5000/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactData),
      });

      if (res.ok) {
        alert("✅ Thanks! We’ll contact you soon.");
        setPhone("");
      } else {
        alert("❌ Failed to send. Try again.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="bg-gradient-to-r from-white via-gray-50 to-gray-100 py-20 px-6 md:px-20 flex items-center justify-center min-h-[80vh]">
      <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl w-full">
        {/* Left Side */}
        <div>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
            Interested To <span className="text-pink-500">Book?</span>
          </h2>
          <p className="text-gray-600 mb-8">
            Please provide your phone number, our representative will contact you.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex items-center max-w-md border border-gray-300 rounded-lg overflow-hidden"
          >
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="flex-1 px-4 py-3 outline-none text-gray-700 placeholder-gray-400 bg-transparent"
            />
            <button
              type="submit"
              className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 font-medium transition-all"
            >
              Send
            </button>
          </form>
        </div>

        {/* Right Side */}
        <div className="space-y-6">
          <div className="border border-pink-300 rounded-lg p-5 inline-block">
            <p className="text-gray-700 text-lg font-medium">
              Hotline: <span className="text-pink-500 font-semibold">16254</span>
            </p>
          </div>

          <div className="flex items-center gap-3 text-gray-700">
            <Phone className="text-pink-500" />
            <p className="text-base">58816306-11</p>
          </div>

          <div className="flex items-center gap-3 text-gray-700">
            <Mail className="text-pink-500" />
            <p className="text-base">sales@navana-realestate.com</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingContactSection;
