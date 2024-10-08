"use client";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";

import Image from "next/image";
import { useAGetcategories } from "@/store/AsyncStore/useAGetcategories";

import Link from "next/link";
import { useparameters } from "@/store/useparameters";
import useEmblaCarousel from "embla-carousel-react";
import { useAGetpricedoffproducts } from "@/store/AsyncStore/useAGetpricedoffproducts";
import Productcard from "@/components/Productcard";
import Categoryimagecarousel from "@/components/Categoryimagecarousel";
import Pricedoffproductscarousel from "@/components/Pricedoffproductscarousel";
import Brandimagescarousel from "@/components/Brandimagescarousel";


export default function Home() {
  const { data } = useAGetcategories();
  const { data: data2, isLoading: isLoading2 } = useAGetpricedoffproducts();
  const categorychange = useparameters((state) => state.categorychange);
  const [emblaRef] = useEmblaCarousel();

  const image =
    "https://ecommercemountain.storage.iran.liara.space/beach-campfire-4184-x-2779-wallpaper-gauuk7tw4u9qof5v.jpg?AWSAccessKeyId=2m48k681k2lqbaa7&Expires=1858087191&Signature=Ml2PHpa%2B%2BfPFFdGXs1t0kwOEAQs%3D";
  return (
    <div className=" flex flex-col  ">
      <div className=" w-full h-[30rem] absolute top-0 -z-10 object-cover opacity-85 ">
        <Image
          className="w-full h-full object-cover "
          width={1920}
          height={1275}
          alt="bg"
          src={image}
        />
      </div>
      <div className="flex flex-col w-1/3 h-36 mr-7 ml-auto mt-[15rem] font-semibold  rounded-xl bg-[#698da5e5]">
        <p className="ml-auto w-[66%] font-bold">
          با جدیدترین مجموعه محصولات ما آشنا شوید
        </p>
        <button className=" bg-[#ad893d] hover:bg-[#eeb844] rounded-sm m-2 w-1/3 text-sm">
          رفتن به صفحه محصولات
        </button>
      </div>
      <Categoryimagecarousel/>
      <Pricedoffproductscarousel/>
      <Brandimagescarousel/>
     
    </div>
  );
}
