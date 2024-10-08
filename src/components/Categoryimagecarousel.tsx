"use client";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";

import Image from "next/image";
import { useAGetcategories } from "@/store/AsyncStore/useAGetcategories";

import Link from "next/link";

import useEmblaCarousel from "embla-carousel-react";
import { useparameters } from "@/store/useparameters";

export default function Categoryimagecarousel() {
    const { data } = useAGetcategories();
    const [emblaRef] = useEmblaCarousel();
    const categorychange = useparameters((state) => state.categorychange);
  return (
    <div className="flex flex-col mt-24">
        <p className="font-bold mx-auto my-4">
          دسته بندی های مختلف محصولات را اینجا ببینید
        </p>
        <div className="flex" ref={emblaRef}>
          <div className="flex mx-auto space-x-4">
            {data?.map((item) => {
              return (
                <Link
                  className="hover:shadow-lg "
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
        </div>
      </div>
  )
}
