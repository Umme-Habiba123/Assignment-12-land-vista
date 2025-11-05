import { motion } from "framer-motion";
import { Link } from "react-router";

// Import a few sample images directly from your assets folders
import bedroom1 from "../../../assets/bedroom/1.jpg";
import kitchen1 from "../../../assets/kitchen/kitchen1.jpg";
import washroom1 from "../../../assets/washroom/1.jpg";

const previewImages = [
  { src: bedroom1, label: "Modern Bedroom" },
  { src: kitchen1, label: "Luxury Kitchen" },
  { src: washroom1, label: "Stylish Bathroom" },
];

const HomeGallery = () => {
  return (
    <section className="max-w-6xl mx-auto py-10 px-4">
      {/* Heading */}
      <h2 className="text-center mb-8">
        <span className="text-red-500 font-bold text-3xl lg:text-5xl sansita-font">
          Explore
        </span>{" "}
        <span className="text-3xl lg:text-5xl urbanist-font">Our Gallery</span>
      </h2>

      {/* Image Preview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {previewImages.map((item, i) => (
          <motion.div
            key={i}
            className="relative group rounded-xl overflow-hidden shadow-lg cursor-pointer"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <img
              src={item.src}
              alt={item.label}
              className="w-full h-72 object-cover group-hover:scale-110 transition duration-500"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500">
              <p className="text-white text-xl font-semibold">{item.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View More Button */}
      <div className="text-center mt-10">
        <Link
          to="/gallery"
          className="inline-block px-8 py-3 rounded-lg bg-red-500 text-white font-semibold shadow-md hover:bg-red-600 hover:shadow-lg transition-all duration-300"
        >
          View Full Gallery
        </Link>
      </div>
    </section>
  );
};

export default HomeGallery;
