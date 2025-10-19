import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Modules import v10+ style
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router';

const newsData = [
  {
    id: 1,
    title: 'VistaLand Launches New Apartment Complex',
    date: '19 Oct 2025',
    category: 'New Launch',
    summary: 'Discover modern living in the heart of the city with our latest luxurious apartments...',
    image: 'https://i.ibb.co.com/5ZW19sg/1.jpg',
  },
  {
    id: 2,
    title: 'Tips for Buying Your Dream Home',
    date: '15 Oct 2025',
    category: 'Tips',
    summary: 'Our expert team shares the essential tips to consider before investing in a property...',
    image: 'https://i.ibb.co.com/DH33NJLS/3.jpg',
  },
  {
    id: 3,
    title: 'Land Vista Expands to New Locations',
    date: '10 Oct 2025',
    category: 'Update',
    summary: 'We are proud to announce our expansion to new prime locations across the city...',
    image: 'https://i.ibb.co.com/hFdrf7KG/2.jpg',
  },
];

const NewsSection = () => {
  return (
    <section className="bg-[#F8F9FA] py-12">
      <div className="w-11/12 md:w-4/5 mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-purple-700">Latest News & Updates</h2>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {newsData.map((news) => (
            <SwiperSlide key={news.id}>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <span className="text-sm bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                    {news.category}
                  </span>
                  <h3 className="text-xl font-semibold mt-2 mb-2">{news.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{news.date}</p>
                  <p className="text-gray-700">{news.summary}</p>

                 <Link  to={`/news/${news.id}`}>
                  <button className="mt-4 text-purple-600 font-semibold hover:underline cursor-pointer">
                    Read More
                  </button>
                 </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default NewsSection;
