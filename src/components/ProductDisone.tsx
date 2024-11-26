import React, { useCallback, useState } from "react";
import { Button } from "./ui/button";
import { usePPD } from "@/store/usePPD";
import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosArrowDropright } from "react-icons/io";
import Image from "next/image";
import pic from "@/app/1.jpg";
import { useCartproducts } from "@/store/useCartproducts";
import useEmblaCarousel from "embla-carousel-react";
import { toast } from "@/store/use-toast";

export default function ProductDisone() {
  const [emblamainref, emblamainapi] = useEmblaCarousel();
  const [emblathumbref, emblathumbapi] = useEmblaCarousel();
  const productinfo = usePPD((state) => state.productinfo);
  const productchange = useCartproducts((state) => state.productschange);
  const products = useCartproducts((state) => state.products);

 const bigcarouselnext=useCallback(()=>{
if(emblamainapi) emblamainapi.canScrollNext
 },[emblamainapi])
 const bigcarouselprev=useCallback(()=>{
  if(emblamainapi) emblamainapi.canScrollPrev
   },[emblamainapi])
  const imagess = JSON.parse(productinfo.images);
  const imagesss =
    productinfo.images == `{"pic1":"","pic2":"","pic3":"","pic4":""}`
      ? false
      : imagess;

  const imagesarray = Object.entries(imagesss);

  return (
    <div
      dir="rtl"
      className="flex flex-col md:flex-row my-2 rounded-md  p-2 md:mx-4  bg-slate-100"
    >
      <div className="flex flex-col w-[20vw]">
        <div className="overflow-hidden flex" ref={emblamainref}>
          <div className="flex">
            {imagesarray.map(([key, value], index) => {
              if (index == 0) {
                return;
              }
              return (
                <Image
                  key={key}
                  width={800}
                  height={800}
                  alt="dd"
                  src={value}
                  className="flex-[0_0_100%] w-40 h-40 rounded-sm"
                />
              );
            })}
          </div>
          <div className="absolute" onClick={bigcarouselnext}>next</div>
          <div className="absolute  bg-white" onClick={bigcarouselprev}>prev</div>
        </div>
        <div className="overflow-hidden" ref={emblathumbref}>
          <div className="flex space-x-1">
            {imagesarray.map(([key, value], index) => {
              if (index == 0) {
                return;
              }
              return (
                <Image
                  key={key}
                  width={500}
                  height={500}
                  alt="dd"
                  src={value}
                  className="flex-[0_0_30%] m-1 h-10 rounded-sm opacity-60"
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="md:w-[60vw] h-full flex flex-col">
        <h1>نام محصول:{productinfo.productname}</h1>
        <hr />

        <p>{productinfo.synopsis}</p>
        <hr />
        <br />
        <div className=" flex-col flex ">
          <p>قیمت:{productinfo.price}تومان</p>
          <Button
            className="mr-auto"
            onClick={(e) => {
              e.preventDefault;
              if (products.includes(productinfo)) {
                return;
              }
              productchange([...products, productinfo]);
              const strigified=JSON.stringify([...products,productinfo])
              localStorage.setItem('cartproducts',strigified)
              
              toast({
                title: "سبد خرید:",
                description: "محصول با موفقیت اضافه شد",
              });
            }}
          >
            اضافه به سبد خرید
          </Button>
        </div>
      </div>
    </div>
  );
}
