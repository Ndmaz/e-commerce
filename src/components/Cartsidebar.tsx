'use client'
import { useCartproducts } from "@/store/useCartproducts";
import { useHeaders } from "@/store/useheaders";
import Link from "next/link";
import { BsCartDash, BsCartX } from "react-icons/bs";
import Image from "next/image";
import pic from "@/app/1.jpg";
import { useEffect, useState } from "react";

export default function Cartsidebar() {
  const cartbooleanchange = useHeaders((state) => state.cartbooleanchange);
  const products = useCartproducts((state) => state.products);
  const productschange = useCartproducts((state) => state.productschange);
  
  useEffect(() => {
    const localcart = localStorage.getItem("cartproducts");
    //if there is no data in the cart then it shouldnt parse it
    if (localcart) {
      const parsed = JSON.parse(localcart);
      productschange(parsed);
    }
  }, [productschange]);

  return (<div className="w-full absolute flex">
    <div className=" bg-white w-1/3 h-[100vh] rounded-br-xl z-10 opacity-90">
      <div className="p-2 w-full flex justify-between">
        <BsCartX
          className="cursor-pointer text-xl"
          onClick={() => cartbooleanchange(false)}
        />
        <Link href="/cart" className="ml-auto font-bold shadow-md p-1 rounded-sm">رفتن به صفحه خرید</Link>
      </div>
      <div dir="rtl">
        {products.map((item) => {
          const imagess = JSON.parse(item.images);
          const imagesss =
            item.images == `{"pic1":"","pic2":"","pic3":"","pic4":""}`
              ? false
              : imagess;
          return (
            <div
              key={item.id}
              className="px-4 my-2 flex justify-between border-y-2 border-slate-300 space-x-2 shadow-xl"
            >
              <div className="flex">
                
                <Image
                  src={imagesss == false ? pic : imagesss.pic1}
                  width={300}
                  height={200}
                  alt="dd"
                  className="w-24 max-h-24 rounded-sm ml-1"
                />
                <p>{item.productname}</p>
                <p className="mr-2 mt-4">قیمت:{item.price}</p>
              </div>
              <BsCartDash className="text-red-500 text-xl mt-auto mb-2 " onClick={()=>productschange} />
            </div>
          );
        })}
      </div>
      
    </div>
    <div className="w-2/3 min-h-screen opacity-40 cursor-pointer bg-black" onClick={() => cartbooleanchange(false)}>
dd
    </div >
    </div>
  );
}
