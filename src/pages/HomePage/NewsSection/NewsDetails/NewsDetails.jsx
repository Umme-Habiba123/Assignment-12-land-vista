import React from 'react';
import { useParams, Link } from 'react-router';

const newsData = [
  {
    id: 1,
    title: 'VistaLand Launches New Apartment Complex',
    date: '19 Oct 2025',
    category: 'New Launch',
    content: `VistaLand proudly launches its newest apartment complex in the heart of the city. 
              Featuring modern design, state-of-the-art facilities, and prime locations, this project 
              ensures luxury living for every resident. The apartments are thoughtfully designed with 
              spacious rooms, energy-efficient utilities, and scenic views. 
              Investors and homebuyers are invited to explore this landmark project.`,
    image: 'https://i.ibb.co.com/hFdrf7KG/2.jpg',
  },
  {
    id: 2,
    title: 'Tips for Buying Your Dream Home',
    date: '15 Oct 2025',
    category: 'Tips',
    content: `Buying your dream home is an exciting journey. Before making any decisions, consider 
              your budget, location preferences, and long-term goals. Our experts recommend visiting 
              multiple properties, checking the neighborhood, and consulting with financial advisors 
              to ensure a smooth purchase. Remember, a home is not just an investment, but a lifestyle choice.`,
    image: 'https://i.ibb.co.com/hFdrf7KG/2.jpg',
  },
  {
    id: 3,
    title: 'Land Vista Expands to New Locations',
    date: '10 Oct 2025',
    category: 'Update',
    content: `Land Vista is expanding its reach to multiple new prime locations across the city. 
              With a focus on urban development and sustainable living, the expansion will bring 
              top-quality housing options closer to residents. This initiative reflects our commitment 
              to providing accessible and luxurious living spaces for everyone.`,
    image: 'https://i.ibb.co.com/DH33NJLS/3.jpg',
  },
];

const NewsDetail = () => {
  const { id } = useParams();
  const news = newsData.find(n => n.id === parseInt(id));

  if (!news) return <p className="text-center text-red-500 mt-10">News not found!</p>;

  return (
    <div className="w-11/12 md:w-4/5 mx-auto py-12">
      <Link to="/" className="text-purple-600 hover:underline mb-6 inline-block">
        &larr; Back to Home
      </Link>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <img
          src={news.image}
          alt={news.title}
          className="w-full h-80 object-cover"
        />
        <div className="p-6">
          <span className="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
            {news.category}
          </span>
          <p className="text-gray-400 text-sm mt-2">{news.date}</p>
          <h1 className="text-3xl font-bold mt-4 mb-4">{news.title}</h1>
          <p className="text-gray-700 leading-relaxed text-justify">{news.content}</p>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
