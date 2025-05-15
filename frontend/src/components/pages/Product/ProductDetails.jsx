import { useSelector } from "react-redux";
import { DISCOUNT_PERCENTAGE } from "../../../utils/constants";
import parse from "html-react-parser";
const ProductDetails = () => {
  const { selectedProduct } = useSelector((state) => state.items);

  const finalPrice = Math.round(((100 - DISCOUNT_PERCENTAGE) / 100) * selectedProduct?.price);
  const discountedPrice = selectedProduct?.price - finalPrice;
  return (
    <div className="bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-2xl rounded-3xl p-10 border border-gray-100 max-w-5xl mx-auto flex flex-col md:flex-row gap-12 relative overflow-hidden">
      {/* Decorative background blob */}
      <div className="absolute -top-16 -right-24 w-96 h-96 bg-yellow-100 rounded-full opacity-30 blur-2xl pointer-events-none z-0"></div>



      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between z-10">
        <div>
          <h1 className="font-extrabold text-4xl md:text-5xl text-gray-900 mb-3 tracking-tight">
            {selectedProduct?.title || "Product Name"}
          </h1>
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center text-yellow-400 text-xl">
              {/* Placeholder for rating stars */}
              ★★★★☆
            </span>
            <span className="text-gray-500 text-base font-medium">
              {selectedProduct?.numReviews || 4} ratings
            </span>

          </div>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            {selectedProduct?.description ? parse(selectedProduct.description) : "No description available."}
          </p>
          <div className="text-lg text-gray-700 mb-8 leading-relaxed">
            {selectedProduct?.description ? parse(selectedProduct.description) : "No description available."}
          </div>
          <div className="flex items-center gap-4 mb-2">
            <span className="bg-yellow-200 text-yellow-900 text-sm font-bold px-4 py-1 rounded-full shadow">
              {DISCOUNT_PERCENTAGE}% OFF
            </span>
            <span className="text-green-700 font-bold text-lg">
              Save ₹{discountedPrice}
            </span>
          </div>
          <div className="flex items-end gap-4">
            <span className="text-4xl md:text-5xl font-extrabold text-gray-900 drop-shadow">
              ₹{finalPrice || "N/A"}
            </span>
            <span className="line-through text-gray-400 text-xl">
              ₹{selectedProduct?.price}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-2">Inclusive of all taxes</p>
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;
