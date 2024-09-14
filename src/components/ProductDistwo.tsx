"use client";

import { usePPD } from "@/store/usePPD";
import { useState } from "react";

export default function ProductDistwo() {
  const productinfo = usePPD((state) => state.productinfo);
  const details=JSON.parse(productinfo.details) 
  const [showitem, setshowitem] = useState(1);
  return (
    <div
      dir="rtl"
      className="flex flex-col min-h-[50vh] my-2 rounded-md  p-2 md:mx-4 bg-slate-400"
    >
      <div className="flex w-fit bg-[#a6d2e7] rounded-md">
        <div
          className="mx-4 hover:shadow-md cursor-pointer"
          onClick={() => {
            setshowitem(1);
          }}
        >
          توضیح کامل
        </div>
        <div
          className="mx-4 hover:shadow-md cursor-pointer"
          onClick={() => {
            setshowitem(2);
          }}
        >
          مشخصات
        </div>
        <div
          className="mx-4 hover:shadow-md cursor-pointer"
          onClick={() => {
            setshowitem(3);
          }}
        >
          دیدگاه ها
        </div>
      </div>
      {showitem == 1 && (
        <div className="mt-2">
          <p>{productinfo.description}</p>
        </div>
      )}
      {showitem == 2 && <div>{details.map((item)=>{
        return <div key={item.detailname}>{item.detailname}:{item.detailvalue}</div>
      })}</div>}
      {showitem == 3 && <div>3</div>}
    </div>
  );
}
