import React, { useState } from "react";
import { Button } from "./ui/button";
import { useAGetcategories } from "@/store/AsyncStore/useAGetcategories";
import { useAGetproducts } from "@/store/AsyncStore/useAGetproducts";

import { useparameters } from "@/store/useparameters";

export default function Productfilter() {
  const { data } = useAGetcategories();
  
  const pagechange = useparameters((state) => state.pagechange);
  const categorychange = useparameters((state) => state.categorychange);
  const pricechange = useparameters((state) => state.pricechange);
  const flipchange = useparameters((state) => state.flipchange);
  const flip = useparameters((state) => state.flip);
  type pricetype = {
    price1: string;
    price2: string;
  };
  const [pricefilter, setpricefilter] = useState<pricetype>({
    price1: "",
    price2: "",
  });

  const [categoryfilter, setcategoryfilter] = useState("");
  

  return (
    <div className="flex pr-2 mb-8 ml-8 ">
      <p> فیلتر بر اساس:</p>
     
      <div className="border-l-[1px] border-[#f7e0f0d0] p-2">
        <p className="font-bold border-t-[1px]  border-[#922b7383] pr-1">قیمت:</p>
        از
        <input
          className="w-[4em] mx-1 rounded-sm"
          type="text"
          value={pricefilter.price1}
          onChange={(e) =>
            setpricefilter((prev) => ({ ...prev, price1: e.target.value }))
          }
        />
        تا
        <input
          className="w-[4em] mx-1 rounded-sm"
          type="text"
          value={pricefilter.price2}
          onChange={(e) =>
            setpricefilter((prev) => ({ ...prev, price2: e.target.value }))
          }
        />
        هزار تومان
      </div>
      
      <div className="p-2">
        <p className="font-bold border-t-[1px]   border-[#922b7383] ">نوع محصول:</p>
        <select
          className="rounded-sm my-2 w-[30vw] md:w-full"
          name=""
          id=""
          value={categoryfilter}
          onChange={(e) => setcategoryfilter(e.target.value)}
        >
          <option value="">همه موارد</option>
          {data?.map((item) => {
            return (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
     

      

      <Button className="mr-2"
        onClick={() => {
          if (pricefilter.price1 == "" && pricefilter.price2 == "") {
            categorychange(categoryfilter);
            flipchange(!flip)
            return;
          }
          if (categoryfilter == "") {
            pricechange(pricefilter);
            flipchange(!flip)
            return
          }
          pricechange(pricefilter);
          categorychange(categoryfilter);
          flipchange(!flip)
        }}
      >
        اعمال تغییرات
      </Button>
    </div>
  );
}
