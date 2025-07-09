// src/components/Advertisement.jsx
import { Link } from "react-router";
import { FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";

const mockData = [
  {
    id: "1",
    image: "/images/property1.jpg",
    location: "Gulshan, Dhaka",
    price: "৳ 80 Lac – ৳ 1.2 Cr",
    verified: true,
  },
  {
    id: "2",
    image: "/images/property2.jpg",
    location: "Dhanmondi, Dhaka",
    price: "৳ 60 Lac – ৳ 90 Lac",
    verified: true,
  },
  {
    id: "3",
    image: "/images/property3.jpg",
    location: "Uttara, Dhaka",
    price: "৳ 50 Lac – ৳ 70 Lac",
    verified: false,
  },
  {
    id: "4",
    image: "/images/property4.jpg",
    location: "Bashundhara, Dhaka",
    price: "৳ 75 Lac – ৳ 95 Lac",
    verified: true,
  },
];

const AdvertisementSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-[#4C495D]">Featured Properties</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockData.map((property) => (
          <div key={property.id} className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
            <img
              src={property.image}
              alt={property.location}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-[#2D283E]">
                <FaMapMarkerAlt className="text-[#802BB1]" /> {property.location}
              </h3>
              <p className="text-sm text-[#4C495D]">Price: {property.price}</p>

              <p className="text-sm flex items-center gap-2">
                Verification:
                {property.verified ? (
                  <span className="text-green-600 flex items-center gap-1">
                    <FaCheckCircle /> Verified
                  </span>
                ) : (
                  <span className="text-red-500">Not Verified</span>
                )}
              </p>

              <Link to={`/properties/${property.id}`}>
                <button className="btn btn-sm btn-primary mt-2">View Details</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdvertisementSection;
