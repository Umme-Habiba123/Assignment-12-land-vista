// src/components/LatestReviews.jsx
const reviews = [
  {
    id: 1,
    name: "Arefin Tanim",
    propertyTitle: "Lakeview Apartment, Bashundhara",
    review:
      "Loved the environment and facilities. The property was exactly as described. Highly recommended!",
    image: "https://i.ibb.co/qMcrs81z/myself1.jpg",
  },
  {
    id: 2,
    name: "Nusrat Jahan",
    propertyTitle: "Green Vista Villa, Uttara",
    review:
      "Very cooperative agent and smooth booking process. I'm happy with my new home!",
    image: "https://i.ibb.co/qMcrs81z/myself1.jpg",
  },
  {
    id: 3,
    name: "Rakib Hasan",
    propertyTitle: "Sky Tower Flat, Dhanmondi",
    review:
      "Affordable and modern. The property matched all my expectations. Great service by LandVista!",
    image: "https://i.ibb.co/qMcrs81z/myself1.jpg",
  },
];

const LatestReviews = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      {/* Section title */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-[#2D283E]">Latest User Reviews</h2>
        <p className="text-[#802BB1] mt-2">What our clients are saying</p>
      </div>

      {/* Reviews Grid */}
      <div data-aos="fade-down-right" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((review) => (
          <div data-aos="flip-left"
            key={review.id}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-md"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={review.image}
                alt={review.name}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold text-[#2D283E]">{review.name}</h4>
                <p className="text-sm text-[#564F6F] italic">{review.propertyTitle}</p>
              </div>
            </div>
            <p className="text-[#4C495D] text-sm">{review.review}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestReviews;
