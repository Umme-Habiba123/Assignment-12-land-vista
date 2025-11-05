import { NavLink, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

const ExploreButton = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleExplore = () => {
    if (user) {
      // If logged in, take them to properties or main explore page
      navigate("/");
    } else {
      // If not logged in, take them to login
      navigate("/login");
    }
  };

  return (
    <button
      onClick={handleExplore}
      className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
    >
      Explore Now
    </button>
  );
};

export default ExploreButton;
