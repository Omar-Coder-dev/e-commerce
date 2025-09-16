'use client'
import Image from "next/image";
import React from "react";
import Slider from "react-slick";

export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
      {/* Main Slider */}
      <div className="lg:col-span-10">
        <Slider {...settings}>
          {["/images/slider-image-1.jpeg","/images/slider-image-2.jpeg","/images/slider-image-3.jpeg"].map((src, i) => (
            <div key={i} className="px-2">
              <Image
                src={src}
                alt={`slide-${i}`}
                width={1000}
                height={1000}
                className="w-full h-64 sm:h-80 md:h-[450px] object-cover rounded-xl shadow-lg"
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Side Images (only show on large screens) */}
      <div className="hidden lg:flex lg:col-span-2 flex-col gap-4">
        {["/images/slider-image-2.jpeg","/images/slider-image-3.jpeg"].map((src, i) => (
          <Image
            key={i}
            src={src}
            alt={`side-${i}`}
            width={300}
            height={300}
            className="w-full h-40 xl:h-[220px] object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
          />
        ))}
      </div>
    </div>
  );
}
