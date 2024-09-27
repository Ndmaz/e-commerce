"use client";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";

import Image from "next/image";
import { useAGetcategories } from "@/store/AsyncStore/useAGetcategories";
import Link from "next/link";
import { useparameters } from "@/store/useparameters";
import useEmblaCarousel from "embla-carousel-react";

export default function Home() {
  const { data } = useAGetcategories();
  const categorychange = useparameters((state) => state.categorychange);
  const [emblaRef] = useEmblaCarousel()
  const image =
    "https://ecommercemountain.storage.iran.liara.space/beach-campfire-4184-x-2779-wallpaper-gauuk7tw4u9qof5v.jpg?AWSAccessKeyId=2m48k681k2lqbaa7&Expires=1858087191&Signature=Ml2PHpa%2B%2BfPFFdGXs1t0kwOEAQs%3D";
  return (
    <div className=" flex flex-col  ">
      <div className=" w-full h-[30rem] absolute top-0 -z-10 object-cover opacity-85 ">
        <Image
          className="w-full h-full "
          width={1920}
          height={1275}
          alt="bg"
          src={image}
        />
      </div>
      <div className="flex flex-col w-1/3 h-36 mr-7 ml-auto mt-[15rem] font-semibold  rounded-xl bg-[#3d80ade5]">
        <p className="ml-auto w-[66%] font-bold">
          با جدیدترین مجموعه محصولات ما آشنا شوید{" "}
        </p>
        <button className=" bg-[#ad893d] hover:bg-[#eeb844] rounded-sm m-2 w-1/3 text-sm">
          {" "}
          رفتن به صفحه محصولات
        </button>
      </div>
      <div className="flex flex-col mt-24">
        <p className="font-bold mx-auto my-4">
          دسته بندی های مختلف محصولات را اینجا ببینید
        </p>
        <div className="flex" ref={emblaRef}>
          <div className="flex mx-auto space-x-4" >
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
      <div>
        <p>تخفیفات ویژه</p>     
      </div>
    </div>
  );
}
