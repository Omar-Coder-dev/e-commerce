'use client'
import Image from "next/image";
import React from "react";
import Slider from "react-slick";

export default function DetailSlider({ images }: { images: string[] }) {
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
    <div className="w-full">
      <Slider {...settings}>
        {images.map((image) => (
          <div key={image} className="px-2">
            <Image
              src={image}
              alt="product"
              width={1000}
              height={1000}
              className="w-full h-64 sm:h-80 md:h-[450px] object-cover rounded-xl shadow-lg"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
