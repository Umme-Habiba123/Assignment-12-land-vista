import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaAngleRight,
} from "react-icons/fa";
import { Link } from "react-router"; 
import VistaLand from "../ProjectLogo/VistaLand";
import bgImage from "../../../assets/footer-bg.png"; 

const Footer = () => {
  return (
    <footer
      className="relative text-white bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.85)), url(${bgImage})`,
      }}
    >
      {/* Content Overlay */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo & Name */}
          <div>
            <VistaLand />
            <p className="mt-2 text-sm text-[#D1D7E0] leading-relaxed">
              Your trusted real estate partner. Explore premium properties with confidence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-[#D1D7E0]">Quick Links</h3>
            <ul className="space-y-2 text-sm text-[#D1D7E0]">
              <li className="flex items-center gap-2">
              <span className="text-red-500">  <FaAngleRight /></span> <Link to="/" className="hover:text-red-500">Home</Link>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-500">   <FaAngleRight /></span> <Link to="/properties" className="hover:text-red-500">All Properties</Link>
              </li>
              <li className="flex items-center gap-2">
                 <span className="text-red-500">  <FaAngleRight /></span> <Link to="/dashboard" className="hover:text-red-500">Dashboard</Link>
              </li>
              <li className="flex items-center gap-2">
                  <span className="text-red-500"> <FaAngleRight /></span><Link to="/login" className="hover:text-red-500">Login</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-[#D1D7E0]">Contact</h3>
            <ul className="space-y-2 text-sm text-[#D1D7E0]">
              <li className="flex items-center gap-2">
                <FaPhoneAlt className="text-red-500" /> +880 1873333199
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-red-500" /> habibaislammim@gmail.com
              </li>
              <li className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-500" /> 123 Gulshan, Dhaka
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-[#D1D7E0]">Follow Us</h3>
            <div className="flex gap-4 text-white text-lg">
              <a href="https://www.facebook.com/mahiya.rahman.540132" target="_blank" rel="noreferrer" className="hover:text-red-500">
                <FaFacebookF />
              </a>
              <a href="https://www.instagram.com/mahiya_mimu/" target="_blank" rel="noreferrer" className="hover:text-red-500">
                <FaInstagram />
              </a>
              <a href="https://www.linkedin.com/in/mahiya-rehman-mim-a9b3a7210/" target="_blank" rel="noreferrer" className="hover:text-red-500">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-[#564F6F] mt-10 pt-4 text-center text-sm text-[#D1D7E0]">
          Copyright © {new Date().getFullYear()} - All right reserved by{" "}
          <span className="text-red-500 font-bold text-lg">LandVista</span>.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
