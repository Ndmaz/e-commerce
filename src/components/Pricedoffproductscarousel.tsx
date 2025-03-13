"use client";

import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { useAGetpricedoffproducts } from "@/store/AsyncStore/useAGetpricedoffproducts";
import Productcard from "@/components/Productcard";
import { useCallback } from "react";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { CgSpinner } from "react-icons/cg";

export default function Pricedoffproductscarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1
  });

  const { data, isLoading } = useAGetpricedoffproducts();

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

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
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {data.map((item) => (
            <div key={item.id} className="flex-[0_0_100%] md:flex-[0_0_33.33%] lg:flex-[0_0_25%] p-2">
              <Link
                href={`/products/${item.id}`}
                className="block h-full transform hover:scale-[1.02] transition-transform duration-200"
              >
                <Productcard
                  productname={item.productname}
                  productcode={item.productcode}
                  price={item.price}
                  priceoff={item.priceoff}
                  images={item.images}
                />
              </Link>
            </div>
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
