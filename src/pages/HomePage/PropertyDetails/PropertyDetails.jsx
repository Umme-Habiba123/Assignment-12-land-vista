import { FaBath, FaBed, FaCar, FaHome, FaCalendarAlt, FaUtensils } from "react-icons/fa";

const PropertyDetails = () => {
  const propertyInfo = [
    { icon: <FaCalendarAlt size={40} className="text-red-500" />, title: "Year of Build", value: "2008" },
    { icon: <FaBed size={40} className="text-red-500" />, title: "Bedrooms", value: "5" },
    { icon: <FaBath size={40} className="text-red-500" />, title: "Bathrooms", value: "2" },
    { icon: <FaHome size={40} className="text-red-500" />, title: "Square Feet", value: "3450" },
    { icon: <FaUtensils size={40} className="text-red-500" />, title: "Kitchen", value: "1" },
    { icon: <FaCar size={40} className="text-red-500" />, title: "Car Parking", value: "3" },
  ];

  return (
    <section className="py-16 bg-white text-center">
      {/* Section Heading */}
      <h2 className="text-3xl font-bold mb-4">
        ABOUT <span className="text-red-500">PROPERTY</span>
      </h2>

      {/* Description */}
      <p className="text-gray-800 max-w-4xl mx-auto mb-12 leading-relaxed">
        A perfect blend of comfort, style, and modern living. Built with high-quality materials and elegant design, this property offers spacious interiors, natural lighting, and a peaceful environment ideal for families. Every corner reflects thoughtful architecture and functionality, ensuring a luxurious yet cozy living experience.
      </p>

      {/* Property Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {propertyInfo.map((item, index) => (
          <div
            key={index}
            className="border-1 border-red-500 rounded-2xl shadow-sm py-8 transform transition duration-300 hover:-translate-y-2 hover:shadow-xl hover:scale-[1.02]"
          >
            <div className="flex justify-center mb-4">{item.icon}</div>
            <h3 className="text-sm font-semibold text-black uppercase">{item.title}</h3>
            <p className="text-3xl font-bold mt-2 text-black">{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PropertyDetails;
