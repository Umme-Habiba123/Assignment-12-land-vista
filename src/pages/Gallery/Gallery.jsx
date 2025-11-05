// src/components/Gallery.jsx
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const bedroomImages = import.meta.glob('../../assets/bedroom/*.{jpg,jpeg,png}', { eager: true });
const kitchenImages = import.meta.glob('../../assets/kitchen/*.{jpg,jpeg,png}', { eager: true });
const washroomImages = import.meta.glob('../../assets/washroom/*.{jpg,jpeg,png}', { eager: true });
const barandaImages = import.meta.glob('../../assets/baranda/*.{jpg,jpeg,png}', { eager: true });
const basementImages = import.meta.glob('../../assets/basement/*.{jpg,jpeg,png}', { eager: true });
const garageImages = import.meta.glob('../../assets/garage/*.{jpg,jpeg,png}', { eager: true });

const images = {
  bedroom: Object.values(bedroomImages).map(m => m.default),
  kitchen: Object.values(kitchenImages).map(m => m.default),
  washroom: Object.values(washroomImages).map(m => m.default),
  baranda: Object.values(barandaImages).map(m => m.default),
  basement: Object.values(basementImages).map(m => m.default),
  garage: Object.values(garageImages).map(m => m.default),
};

const categories = Object.keys(images);

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('bedroom');
  const [selectedImage, setSelectedImage] = useState(null); // for modal

  return (
    <div className="p-4 mt-3 lg:my-5">
        <h1 className='text-center mb-3 lg:mb-5'><span className='text-red-500 lg:text-5xl text-3xl font-bold sansita-font '>Photo </span> <span className=' text-3xl lg:text-5xl urbanist-font '>  Gallery</span></h1>
      {/* Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2  font-semibold transition-all text-sm duration-300 transform lg:mb-5 ${
              activeCategory === cat
                ? 'bg-red-500 text-white shadow-lg scale-110 rounded-sm'
                : 'border-gray-300 border text-gray-700 rounded-sm hover:bg-red-500 hover:text-white hover:scale-105'
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
        <AnimatePresence mode="wait">
          {images[activeCategory].map((img, idx) => (
            <motion.div
              key={img}
              className="w-full rounded-lg overflow-hidden shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
            >
              <motion.img
                src={img}
                alt={`${activeCategory}-${idx}`}
                className="w-full object-cover cursor-pointer rounded-lg"
                onClick={() => setSelectedImage(img)}
                whileHover={{ scale: 1.05 }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Modal for selected image */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              src={selectedImage}
              className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-2xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()} // prevent closing on image click
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
