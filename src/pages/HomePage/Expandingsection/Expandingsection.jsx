import React from "react";

const ExpandingSection = () => {
  return (
    <section className="bg-gray-800 text-white py-16 px-6 md:px-20 overflow-hidden">
      {/* Headline */}
      <h2 className="text-center text-3xl md:text-5xl font-light tracking-widest mb-10">
        EXPANDING THE <span className="text-red-500">HORIZON</span>
      </h2>

      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Left Side - Stats */}
        <div className="flex flex-col gap-10">
          <div className="grid grid-cols-2 gap-8 text-center">
            <div>
              <h3 className="text-red-500 text-5xl font-bold">28+</h3>
              <p className="text-gray-300 mt-2">Years Of Experience</p>
            </div>
            <div>
              <h3 className="text-red-500 text-5xl font-bold">235+</h3>
              <p className="text-gray-300 mt-2">Projects Completed</p>
            </div>
            <div>
              <h3 className="text-red-500 text-5xl font-bold">4500+</h3>
              <p className="text-gray-300 mt-2">Units Delivered</p>
            </div>
            <div>
              <h3 className="text-red-500 text-5xl font-bold">1300+</h3>
              <p className="text-gray-300 mt-2">Plots Handed Over</p>
            </div>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="relative">
          <img
            src="https://i.ibb.co.com/F4mHdD85/premium-photo-1725404428224-664f5f0217b3.jpg"
            alt="Luxury interior"
            className="rounded-2xl shadow-lg object-cover w-full h-[700px]"
          />
        </div>
      </div>

      {/* Marquee Text */}
      <div className="mt-16 w-full overflow-hidden whitespace-nowrap border-t border-pink-500/30 pt-6">
        <div className="animate-marquee text-[70px] md:text-[120px] font-light tracking-[0.2em] text-white/80">
         • BROADEN LIFE BOUNDARIES
        </div>
      </div>

      {/* Custom CSS */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }

          .animate-marquee {
            display: inline-block;
            white-space: nowrap;
            animation: marquee 15s linear infinite;
          }
        `}
      </style>
    </section>
  );
};

export default ExpandingSection;
