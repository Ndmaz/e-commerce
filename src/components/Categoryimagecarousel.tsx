"use client";

import Image from "next/image";
import { useAGetcategories } from "@/store/AsyncStore/useAGetcategories";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { useparameters } from "@/store/useparameters";
import { useCallback } from "react";
import { CgSpinner } from "react-icons/cg";

export default function Categoryimagecarousel() {
  const { data, isLoading } = useAGetcategories();
  const [emblacarouselRef, emblacarouselApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1
  });

  const categorychange = useparameters((state) => state.categorychange);

  const scrollNext = useCallback(() => {
    if (emblacarouselApi) emblacarouselApi.scrollNext();
  }, [emblacarouselApi]);

  const scrollPrev = useCallback(() => {
    if (emblacarouselApi) emblacarouselApi.scrollPrev();
  }, [emblacarouselApi]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <CgSpinner className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  if (!data?.length) return null;

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblacarouselRef}>
        <div className="flex">
          {data.map((item) => (
            <Link
              key={item.id}
              href="/products"
              onClick={() => categorychange(item.id)}
              className="flex-[0_0_100%] md:flex-[0_0_33.33%] lg:flex-[0_0_25%] p-2 group"
            >
              <div className="relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300">
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={item.categoryimage}
                    alt={item.name}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 bg-white">
                  <h3 className="text-lg font-medium text-gray-900">
                    {item.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 
                 hover:bg-white shadow-md transition-all duration-200 hover:scale-110"
      >
        <MdKeyboardDoubleArrowLeft className="text-2xl text-gray-800" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 
                 hover:bg-white shadow-md transition-all duration-200 hover:scale-110"
      >
        <MdKeyboardDoubleArrowRight className="text-2xl text-gray-800" />
      </button>
    </div>
  );
}
