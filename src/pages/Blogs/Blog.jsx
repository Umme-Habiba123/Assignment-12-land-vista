// src/components/Blog.jsx
import { motion } from 'framer-motion';

const blogPosts = [
  {
    id: 1,
    title: '10 Tips for a Modern Kitchen',
    excerpt: 'Upgrade your kitchen with these simple tips that make a big difference...',
    image: '/src/assets/10 Tips for a Modern Kitchen.jpg',
    link: 'https://www.google.com/search?q=modern+kitchen+tips',
  },
  {
    id: 2,
    title: 'Designing a Cozy Bedroom',
    excerpt: 'Make your bedroom a relaxing sanctuary with these design tricks...',
    image: '/src/assets/Designing a Cozy Bedroom.jpg',
    link: 'https://www.google.com/search?q=cozy+bedroom+design',
  },
  {
    id: 3,
    title: 'Bathroom Organization Ideas',
    excerpt: 'Keep your bathroom neat and stylish with these organization hacks...',
    image: '/src/assets/Bathroom Organization Ideas.jpg',
    link: 'https://www.google.com/search?q=bathroom+organization+ideas',
  },
  {
    id: 4,
    title: 'Modern Garage Storage Solutions',
    excerpt: 'Organize your garage efficiently with these clever storage tips...',
    image: '/src/assets/Modern Garage Storage Solutions.jpg',
    link: 'https://www.google.com/search?q=garage+storage+solutions',
  },
];

const Blog = () => {
  return (
    <div className="p-6 lg:p-16 bg-gray-50">
      <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">Our Blog</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center">
        {blogPosts.map((post, idx) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            className="w-full max-w-7xl bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
          >
            <div className="overflow-hidden rounded-t-2xl">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-60 object-cover transform hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6 flex flex-col justify-between h-[220px]">
              <div>
                <h3 className="text-2xl font-semibold mb-3 text-gray-800">{post.title}</h3>
                <p className="text-gray-600 mb-5">{post.excerpt}</p>
              </div>
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="self-start px-6 py-2 border border-red-500 text-black font-semibold rounded-full shadow hover:bg-red-500 hover:text-white hover:shadow-lg transition-all duration-300"
              >
                Read More
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
