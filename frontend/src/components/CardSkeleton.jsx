
import React from 'react'

const CardSkeleton = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-2 border border-[#e9bbc5] overflow-hidden">
      {/* Image Placeholder */}
      <div className="h-36 w-full skeleton-shimmer rounded-t-md"></div>

      <div className="p-1 text-left">
        {/* Title Placeholder */}
        <div className="h-4 skeleton-shimmer rounded w-3/4 my-2"></div>

        {/* Price Placeholder */}
        <div className="h-4 skeleton-shimmer rounded w-1/2"></div>

        {/* Original Price Placeholder */}
        <div className="h-3 skeleton-shimmer rounded w-1/4 mt-1"></div>
      </div>

      {/* Button Placeholder */}
      <div className="w-full px-4 py-2 skeleton-shimmer rounded-md mt-4"></div>
    </div>
  )
}

export default CardSkeleton
