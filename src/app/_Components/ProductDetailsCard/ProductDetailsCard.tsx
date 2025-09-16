import React from "react";
import { productDetailsData } from "images/types/productDetails.types";
import DetailSlider from "../DetailSlider/DetailSlider";
import AddCartBtn from "./../ProductCard/AddCartBtn";
import { redirect } from "next/navigation";
import { AddProductToCart } from "images/CartAction/CartAction";

export default function ProductDetailsCard({
  product,
}: {
  product: productDetailsData;
}) {
  const {
    title,
    price,
    ratingsAverage,
    category: { name },
    description,
    images,
    _id,
  } = product;

  // Server Action for Buy Now
  async function handleBuyNow() {
    "use server";

    try {
      const result = await AddProductToCart(_id);
      if (result.status === "success") {
        redirect(`/checkoutsession/${result.data._id}`);
      } else {
        redirect(`/cart?error=add-failed`);
      }
    } catch (error) {
      console.error("Buy now error:", error);
      redirect(`/cart?error=something-went-wrong`);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 flex items-center justify-center p-4 sm:p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl w-full bg-white/80 backdrop-blur-lg rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden">
        {/* Left: Image Slider */}
        <div className="relative p-4 sm:p-6 flex items-center justify-center bg-gray-50">
          <div className="w-full max-w-md aspect-square overflow-hidden rounded-xl sm:rounded-2xl shadow-lg">
            <DetailSlider images={images} />
          </div>
          <span className="absolute top-4 sm:top-6 left-4 sm:left-6 bg-indigo-600 text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold shadow-md">
            {name}
          </span>
        </div>

        {/* Right: Product Info */}
        <div className="p-6 sm:p-10 flex flex-col justify-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            {title}
          </h1>
          <p className="mt-3 sm:mt-4 text-gray-600 leading-relaxed text-base sm:text-lg">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-5 sm:mt-6 gap-3 sm:gap-0">
            <div className="flex items-center text-yellow-500">
              <i className="fa-solid fa-star mr-2"></i>
              <span className="text-gray-800 font-semibold text-base sm:text-lg">
                {ratingsAverage}
              </span>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-indigo-600 drop-shadow-sm">
              EGP {price}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
            <AddCartBtn id={_id} />

            <form action={handleBuyNow} className="flex-1">
              <button
                type="submit"
                className="w-full py-3 px-5 sm:px-6 rounded-xl sm:rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-purple-700 hover:scale-105 transform transition-all duration-300 ease-in-out text-sm sm:text-base"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  Buy Now
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
