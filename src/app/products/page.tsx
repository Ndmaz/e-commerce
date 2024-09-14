"use client";

import Productfilter from "@/components/Productfilter";
import ProductList from "@/components/ProductList";
import Providers from "@/components/Providers";
import { useState } from "react";

import { HiOutlineBars3 } from "react-icons/hi2";

export default function Products() {
  const [filteron, setfilteron] = useState(false);

  return (
    <div className="mb-[14rem]  flex flex-row-reverse transition-all duration-100 h-full  ">
      
      <div dir="rtl" className={`bg-slate-300 backdrop-blur-lg border-t-2 border-slate-400 absolute h-full r-0`}>
        <HiOutlineBars3
          className="text-3xl my-auto "
          onClick={() => setfilteron(!filteron)}
        />
        {filteron && <Productfilter />}
      </div>
      <ProductList />
    </div>
  );
}
