import React, { useState } from "react";
import { Button } from "./ui/button";
import { useAGetcategories } from "@/store/AsyncStore/useAGetcategories";

export default function Productfilter() {
  const { data } = useAGetcategories();
  const [price1, setprice1] = useState();
  const [price2, setprice2] = useState();
  const [category, setcategory] = useState();
  const [formerr, setformerr] = useState("");
 

  return (
    <div className="w-[40vw] md:w-[20vw] pr-2">
      <p> فیلتر بر اساس:</p>
      <hr className="my-1 text-black" />
      <div>
        <p className="font-bold  my-1">قیمت</p>
        از
        <input
          className="w-[4em] mx-1 rounded-sm"
          type="text"
          value={price1}
          onChange={(e) => setprice1(e.target.value)}
        />
        تا
        <input
          className="w-[4em] mx-1 rounded-sm"
          type="text"
          value={price2}
          onChange={(e) => setprice2(e.target.value)}
        />
        هزار تومان
      </div>
      <hr className="my-1" />
      <div>
        <p className="font-bold my-1">نوع محصول</p>
        <select
          className="rounded-sm my-2 w-[30vw] md:w-full"
          name=""
          id=""
          value={category}
          onChange={(e) => setcategory(e.target.value)}
        >
          <option value="default">همه موارد</option>
          {data?.map((item) => {
            return (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
      <hr className="my-1" />
      <div>
        <p className="font-bold my-1">برند محصول</p>
        <select
          className="rounded-sm my-2  w-[30vw] md:w-full"
          name=""
          id=""
          value={category}
          onChange={(e) => setcategory(e.target.value)}
        >
          <option value="default">همه موارد</option>
          {data?.map((item) => {
            return (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
      <hr className="my-1" />
      {formerr}
      <Button onClick={()=>{}}>اعمال تغییرات</Button>
    </div>
  );
}
