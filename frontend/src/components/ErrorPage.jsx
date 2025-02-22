import React from 'react'
import { Link } from 'react-router-dom'

const ErrorSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 500 300"
    className="w-3/4 max-w-md mb-8"
  >
    {/* Background Rectangle */}
    {/* <rect width="500" height="300" fill="#f3f4f6" /> */}
    
    {/* Decorative Curved Shape */}
    <path
      d="M250 50 C300 80, 300 150, 250 180 C200 150, 200 80, 250 50Z"
      fill="#38b000"
      opacity="0.2"
    />
    
    {/* Main 404 Text */}
    <text
      x="50%"
      y="50%"
      dominantBaseline="middle"
      textAnchor="middle"
      fontSize="80"
      fill="#38b000"
      fontFamily="Arial, sans-serif"
    >
      404
    </text>
    
    {/* Subtext */}
    <text
      x="50%"
      y="70%"
      dominantBaseline="middle"
      textAnchor="middle"
      fontSize="20"
      fill="#555"
      fontFamily="Arial, sans-serif"
    >
      Page Not Found
    </text>
  </svg>
)

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      {/* Inline SVG Illustration */}
      <ErrorSVG />

      {/* Error Message */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Oops!</h1>
        <p className="text-xl text-gray-600 mb-8">
          The page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-2  bg-[#38b000] text-white font-semibold rounded-full hover:bg-[#70e000] transition duration-300"
        >
          Go back home
        </Link>
      </div>
    </div>
  )
}

export default ErrorPage
