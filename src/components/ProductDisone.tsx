import React, { useState } from "react";
import { Button } from "./ui/button";
import { usePPD } from "@/store/usePPD";
import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosArrowDropright } from "react-icons/io";
import Image from "next/image";
import pic from "@/app/1.jpg";
export default function ProductDisone() {
  const productinfo = usePPD((state) => state.productinfo);
  const [slidenum, setslidenum] = useState(1);
  const imagess = JSON.parse(productinfo.images);
  const imagesss =
    productinfo.images == `{"pic1":"","pic2":"","pic3":"","pic4":""}`
      ? false
      : imagess;
  return (
    <div
      dir="rtl"
      className="flex flex-col md:flex-row m-2 rounded-md  p-2 md:mx-4 bg-slate-400"
    >
      <div className="md:w-[30vw] relative ">
        {slidenum == 1 && (
          <div className="">
            <div> 1/3</div>
            <Image
              className="mx-auto rounded-sm"
              width={200}
              height={200}
              src={imagesss == false ? pic : imagesss.pic2}
              alt="rrr"
            />
          </div>
        )}
        {slidenum == 2 && (
          <div>
            <div> 2/3</div>
            <Image
              className="mx-auto rounded-sm"
              width={200}
              height={200}
              src={imagesss == false ? pic : imagesss.pic3}
              alt="rrr"
            />
          </div>
        )}
        {slidenum == 3 && (
          <div>
            <div> 3/3</div>
            <Image
              className="mx-auto rounded-sm"
              width={200}
              height={200}
              src={imagesss == false ? pic : imagesss.pic4}
              alt="rrr"
            />
          </div>
        )}
        <div className="cursor-pointer hover:bg-opacity-75 absolute top-[40%] left-0 w-auto p-4 mt-[-50px] text-white font-bold text-lg rounded-r select-none ">
          <IoIosArrowDropleft
            onClick={() =>
              setslidenum((prev) => (prev == 1 ? prev + 2 : prev - 1))
            }
          />
        </div>
        <div className="cursor-pointer hover:bg-opacity-75 absolute top-[40%] right-0 w-auto p-4 mt-[-50px] text-white font-bold text-lg rounded-l select-none ">
          <IoIosArrowDropright
            onClick={() =>
              setslidenum((prev) => (prev == 3 ? prev - 2 : prev + 1))
            }
          />
        </div>
        <br />
        <div className="after:content-none after:table after:clear-both flex justify-center">
          <div className="float-left w-[15%]">
            <Image
              onClick={() => setslidenum(3)}
              className="opacity-60 hover:opacity-100 max-h-12"
              width={200}
              height={200}
              src={imagesss == false ? pic : imagesss.pic4}
              alt="rrr"
            />
          </div>

          <div className="float-left w-[15%]">
            <Image
              onClick={() => setslidenum(2)}
              className="opacity-60 hover:opacity-100 max-h-12"
              width={200}
              height={200}
              src={imagesss == false ? pic : imagesss.pic3}
              alt="rrr"
            />
          </div>
          <div className="float-left w-[15%]">
            <Image
              onClick={() => setslidenum(1)}
              className="opacity-60 hover:opacity-100 max-h-12"
              width={200}
              height={200}
              src={imagesss == false ? pic : imagesss.pic2}
              alt="rrr"
            />
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
          <Button className="mr-auto"> اضافه به سبد خرید</Button>
        </div>
      </div>
    </div>
  );
}
