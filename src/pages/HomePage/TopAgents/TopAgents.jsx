// src/components/TopAgents.jsx
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
      <h2 className="text-3xl font-bold text-center text-[#4C495D] mb-8">Top Real Estate Agencies</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
        {agents.map((agent) => (
          <div data-aos="fade-left"
            key={agent.id}
            className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-xl hover:shadow-amber-200"
          >
            {/* Full-width image */}
            {agent.image ? (
              <img
                src={agent.image}
                alt={agent.name}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-[#802BB1] text-4xl">
                <FaBuilding />
              </div>
            )}

            {/* Content */}
            <div data-aos="fade-right" className="p-4 text-center space-y-2">
              <h3 className="text-lg font-semibold text-[#2D283E]">{agent.name}</h3>
              <p className="text-sm text-[#802BB1]">{agent.agency}</p>

              <div className="flex justify-center items-center gap-1 text-yellow-500">
                <FaStar /> <span>{agent.rating}</span>
              </div>

              <div className="text-sm">
                {agent.verified ? (
                  <span className="text-green-600 flex justify-center items-center gap-1">
                    <FaCheckCircle /> Verified
                  </span>
                ) : (
                  <span className="text-red-500">Not Verified</span>
                )}
              </div>

              <a
                href={`tel:${agent.phone}`}
                className="btn btn-sm  btn-outline border-2 border-[#dddce1] mt-2 flex items-center justify-center gap-2 shadow-2xl  font-bold text-sm"
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
