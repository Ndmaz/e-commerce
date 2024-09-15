"use client";

import Productfilter from "@/components/Productfilter";
import ProductList from "@/components/ProductList";
import Providers from "@/components/Providers";

import { useState } from "react";
import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosArrowDropright } from "react-icons/io";

import { HiOutlineBars3 } from "react-icons/hi2";
import { useparameters } from "@/store/useparameters";

export default function Products() {
  const [filteron, setfilteron] = useState(false);
  const page = useparameters((state) => state.page);
  const pagechange = useparameters((state) => state.pagechange);
 
  return (
    <div className="mb-[14rem]  flex flex-col justify-between transition-all duration-100  h-full  ">
      
      <div dir="rtl" className={`bg-slate-300 ml-auto w-full backdrop-blur-lg border-t-2 border-slate-400  rounded-bl-md` }>
        <HiOutlineBars3
          className="text-3xl my-auto "
          onClick={() => setfilteron(!filteron)}
        />
        {filteron && <Productfilter />}
      </div>
      <ProductList />
      <div className="w-full flex justify-center space-x-1 text-lg h-8  ">
        <div
          className="bg-slate-200 p-1 rounded-sm hover:shadow-md cursor-pointer"
          onClick={() => {
            if (page == 1) {
              pagechange(1);
              return;
            }
            pagechange(page - 1);
            return;
          }}
        >
          <IoIosArrowDropleft />
        </div>
        {page == 1 ? (
          ""
        ) : (
          <div
            className="bg-slate-200 p-1 rounded-sm hover:shadow-md cursor-pointer"
            onClick={() => pagechange(page - 1)}
          >
            {page - 1}
          </div>
        )}

        <div className="bg-slate-300 p-1 rounded-sm hover:shadow-md cursor-pointer">
          {page}
        </div>
        <div
          className="bg-slate-200 p-1 rounded-sm hover:shadow-md cursor-pointer"
          onClick={() => pagechange(page + 1)}
        >
          {page + 1}
        </div>
        <div
          className="bg-slate-200 p-1 rounded-sm hover:shadow-md cursor-pointer"
          onClick={() => pagechange(page + 2)}
        >
          {page + 2}
        </div>
        <div
          className="bg-slate-200 p-1 rounded-sm hover:shadow-md cursor-pointer"
          onClick={() => pagechange(page + 1)}
        >
          <IoIosArrowDropright />
        </div>
      </div>
    </div>
  );
}
