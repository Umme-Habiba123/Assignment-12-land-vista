// src/components/TopAgents.jsx
import React from "react";
import { FaPhoneAlt, FaStar, FaCheckCircle, FaBuilding } from "react-icons/fa";

const agents = [
  {
    id: 1,
    name: "DreamNest Team",
    agency: "DreamNest Ltd.",
    rating: 4.8,
    verified: true,
    phone: "+8801234567890",
    image: "https://i.ibb.co/jPGQr9hC/dream-Nest-team.jpg",
  },
  {
    id: 2,
    name: "UrbanHomes Experts",
    agency: "UrbanHomes BD",
    rating: 4.9,
    verified: true,
    phone: "+8801987654321",
    image: "https://i.ibb.co/Jjbhn528/urbans-Home-expert.jpg",
  },
  {
    id: 3,
    name: "SkyHigh Group",
    agency: "SkyHigh Properties",
    rating: 4.7,
    verified: false,
    phone: "+8801711223344",
    image: "https://i.ibb.co/35d4kqt4/skyhign-team.jpg",
  },
];

const TopAgents = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-red-600 mb-8 sansita-font lg:mt-20">
        Top Real Estate Agencies
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <div
            data-aos="fade-left"
            key={agent.id}
            className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-xl hover:shadow-amber-200"
          >
            {/* Image */}
            {agent.image ? (
              <img
                src={agent.image}
                alt={agent.name}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-red-600 text-4xl">
                <FaBuilding />
              </div>
            )}

            {/* Content */}
            <div data-aos="fade-right" className="p-4 text-center space-y-2">
              <h3 className="text-lg font-semibold text-black">{agent.name}</h3>
              <p className="text-sm text-red-600">{agent.agency}</p>

              <div className="flex justify-center items-center gap-1 text-red-600">
                <FaStar /> <span className="text-black">{agent.rating}</span>
              </div>

              <div className="text-sm">
                {agent.verified ? (
                  <span className="flex justify-center items-center gap-1 text-red-600">
                    <FaCheckCircle /> Verified
                  </span>
                ) : (
                  <span className="text-black">Not Verified</span>
                )}
              </div>

              <a
                href={`tel:${agent.phone}`}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-md border-1 border-red-500 px-4 py-2 font-bold text-sm text-black hover:bg-red-500 hover:text-white transition-colors"
              >
                <FaPhoneAlt /> Contact
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopAgents;
