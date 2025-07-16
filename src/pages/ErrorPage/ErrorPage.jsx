import React from "react";
import { useNavigate } from "react-router";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-100 p-6">
      <h1 className="text-6xl font-bold text-red-500 mb-6">404</h1>
      <p className="text-4xl font-extrabold mb-2">Ooops....</p>
      <p className="text-2xl font-semibold mb-1">Page Not Found</p>
      <p className="text-lg text-gray-600 mb-8">Page Is Not Found Plz Go Back</p>

      <div className="flex gap-4">
        <button
          onClick={() => window.history.back()}
          className="bg-red-500 text-white font-semibold px-6 py-3 rounded hover:bg-red-600 transition"
        >
          Back to Previous
        </button>

        <button
          onClick={() => navigate("/")}
          className="bg-red-500 text-white font-semibold px-6 py-3 rounded hover:bg-red-600 transition"
        >
          Back to Home Page
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
