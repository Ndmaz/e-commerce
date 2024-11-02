"use client";

import Image from "next/image";
import { useAGetcategories } from "@/store/AsyncStore/useAGetcategories";

import Link from "next/link";

import useEmblaCarousel from "embla-carousel-react";
import { useparameters } from "@/store/useparameters";
import { useCallback } from "react";

export default function Categoryimagecarousel() {
    const { data } = useAGetcategories();
    const [emblacarouselRef,emblacarouselApi] = useEmblaCarousel({loop:true});
    const categorychange = useparameters((state) => state.categorychange);
    const scrollNext = useCallback(() => {
      if (emblacarouselApi) emblacarouselApi.scrollNext()
    }, [emblacarouselApi])
    const scrollPrev = useCallback(() => {
      if (emblacarouselApi) emblacarouselApi.scrollPrev()
    }, [emblacarouselApi])
  
  return (
    <div className="flex flex-col mt-24 relative">
        <p className="font-bold mx-auto my-4 ">
          دسته بندی های مختلف محصولات را اینجا ببینید
        </p>
        <div className="flex overflow-hidden relative "ref={emblacarouselRef} >
          <div className="flex mx-auto  space-x-4 " >
            {data?.map((item) => {
              return (
                <Link
                  className="hover:shadow-lg w-[15vw] flex-[0_0_30%] md:flex-[0_0_15%]"
                  href="/products"
                  onClick={() => {
                    categorychange(item.id);
                  }}
                  key={item.id}
                >
                  <Image
                    className="h-[20rem] rounded-md  "
                    width={200}
                    height={200}
                    alt="ss"
                    src={item.categoryimage}
                  />
                  {item.name}
                </Link>
              );
            })}
          </div>
          <div className="absolute right-0 top-1/2" onClick={scrollNext}>next</div>
          <div className="absolute  top-1/2" onClick={scrollPrev}>perv</div>
        </div>
      </div>
  )
}
