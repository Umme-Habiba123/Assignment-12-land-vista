import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { Link } from "react-router";

const newsData = [
  {
    id: 1,
    title: "VistaLand Launches New Apartment Complex",
    date: "19 Oct 2025",
    category: "New Launch",
    summary:
      "Discover modern living in the heart of the city with our latest luxurious apartments...",
    image: "https://i.ibb.co/5ZW19sg/1.jpg",
  },
  {
    id: 2,
    title: "Tips for Buying Your Dream Home",
    date: "15 Oct 2025",
    category: "Tips",
    summary:
      "Our expert team shares essential tips to consider before investing in a property...",
    image: "https://i.ibb.co/DH33NJLS/3.jpg",
  },
  {
    id: 3,
    title: "Land Vista Expands to New Locations",
    date: "10 Oct 2025",
    category: "Update",
    summary:
      "We are proud to announce our expansion to new prime locations across the city...",
    image: "https://i.ibb.co/hFdrf7KG/2.jpg",
  },
];

const AnimatedNewsSection = () => {
  return (
    <section className="py-16 bg-white text-black transition-colors duration-500">
      <div className="w-11/12 md:w-4/5 mx-auto">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center text-4xl font-bold mb-10"
        >
          <span className="text-red-500">Latest</span> News & Updates
        </motion.h2>

        {/* Swiper */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={25}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {newsData.map((news, index) => (
            <SwiperSlide key={news.id}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500"
              >
                {/* Image */}
                <div className="overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    src={news.image}
                    alt={news.title}
                    className="w-full h-52 object-cover transform transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <span className="text-xs bg-red-100 text-red-600 px-3 py-1 rounded-full uppercase tracking-wide">
                    {news.category}
                  </span>
                  <h3 className="text-xl font-semibold mt-3 mb-2 text-black group-hover:text-red-600 transition-colors duration-300">
                    {news.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-3">{news.date}</p>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {news.summary}
                  </p>

                  <Link to={`/news/${news.id}`}>
                    <motion.button
                      whileHover={{ x: 6 }}
                      className="text-red-600 font-semibold hover:underline"
                    >
                      Read More →
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default AnimatedNewsSection;
