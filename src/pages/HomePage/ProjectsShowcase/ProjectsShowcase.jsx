// src/components/ProjectsShowcase.jsx

const ProjectsShowcase = () => {
  return (
    <section className=" mx-auto px-4 py-16 sansita-font">
      {/* Top Title */}
      <div className="text-center mb-10">
        <p className="text-sm uppercase text-cyan-800 font-semibold tracking-wide">
          Our Works
        </p>
        <h2 className="text-3xl md:text-4xl sansita-font text-[#605b70]">
          HAVE A LOOK AT OUR PROJECTS
        </h2>
      </div>

      {/* 2-Column Images */}
      <div data-aos="fade-right" className="flex flex-col md:flex-row">
        {/* Ongoing */}
        <div className="relative w-full md:w-1/2 h-[300px] md:h-[600px] overflow-hidden shadow-md">
          <img
            src="https://i.ibb.co/cc36tTNM/aaron-huber-s95o-B2n9jng-unsplash.jpg"
            alt="Ongoing"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/60 to-transparent">
            <h3 className="text-white text-4xl sansita-font">ONGOING</h3>
          </div>
        </div>

        {/* Upcoming */}
        <div data-aos="fade-left" className="relative w-full md:w-1/2 h-[300px] md:h-[600px] overflow-hidden shadow-md">
          <img
            src="https://i.ibb.co/VWwmX9qh/jason-briscoe-UV81-E0o-XXWQ-unsplash.jpg"
            alt="Upcoming"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/60 to-transparent">
            <h3 className="text-white text-4xl sansita-font">UPCOMING</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsShowcase;
