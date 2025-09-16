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
    <Slider {...settings}>
      {images.map((image) => (
        <div key={image}>
          <Image
            src={image}
            alt="product"
            width={1000}
            height={1000}
            className="w-full h-[450px] object-cover rounded-2xl shadow-lg"
          />
        </div>
      ))}
    </Slider>
  );
}
