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
    <div className="grid grid-cols-12 gap-4 items-center ">
      <div className="col-span-10">
        <Slider {...settings}>
          <div>
            <Image
              src="/images/slider-image-1.jpeg"
              alt="img1"
              width={1000}
              height={1000}
              className="w-full h-[450px] object-cover rounded-2xl shadow-lg"
            />
          </div>
          <div>
            <Image
              src="/images/slider-image-2.jpeg"
              alt="img2"
              width={1000}
              height={1000}
              className="w-full h-[450px] object-cover rounded-2xl shadow-lg"
            />
          </div>
          <div>
            <Image
              src="/images/slider-image-3.jpeg"
              alt="img3"
              width={1000}
              height={1000}
              className="w-full h-[450px] object-cover rounded-2xl shadow-lg"
            />
          </div>
        </Slider>
      </div>

      <div className="col-span-2 flex flex-col gap-4">
        <Image
          src="/images/slider-image-2.jpeg"
          alt="side1"
          width={300}
          height={300}
          className="w-full h-[220px] object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
        />
        <Image
          src="/images/slider-image-3.jpeg"
          alt="side2"
          width={300}
          height={300}
          className="w-full h-[220px] object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
        />
      </div>
    </div>
  );
}
