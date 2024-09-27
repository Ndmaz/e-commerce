"use client";
import { usePE } from "@/store/usePE";

import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useMutation } from "react-query";
import { CgSpinner } from "react-icons/cg";
import { CheckIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { useAPostpriceoff } from "@/store/AsyncStore/useAPostpriceoff";
export default function PriceEdit() {
  const fieldname = usePE((state) => state.fieldname);
  const productinfo = usePE((state) => state.productsinfo);
  const [Editinput, setEditinput] = useState("");
  const [Editinput2, setEditinput2] = useState("");
  const deductedprice=productinfo.price - productinfo.priceoff
  const id = productinfo.id;
  const priceoffmutation=useAPostpriceoff(Editinput2, id)
  async function mutate() {
    try {
      const res = await fetch("http://localhost:3000/api/PEmodifying", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Editinput, fieldname, id }),
      });
      if (res.ok) {
        return res.json();
      }
    } catch (error) {}
  }
  const mutation = useMutation(mutate);
  return (
    <div className="flex flex-col space-x-4 items-center ">
      <div className="flex space-x-4 items-center ">
        <p className="bg-[#fce1af] rounded-sm ml-1">{productinfo.price}</p>
        <Label className="m-4  ">{fieldname}</Label>
        <Input
          className="w-[40vw] shadow-md"
          name={fieldname}
          type="text"
          value={Editinput}
          onChange={(e) => setEditinput(e.target.value)}
        />
      </div>

      <Button type="button" className=" my-auto" onClick={mutation.mutate}>
        ثبت تغیر
        {mutation.isLoading && (
          <CgSpinner strokeWidth="1" className="animate-spin text-5xl" />
        )}
        {mutation.isSuccess && <CheckIcon className="text-green-600 " />}
      </Button>
      <div className="mt-4 space-y-3">
        <p className="font-bold">
          {" "}
          تخفیفات:{(productinfo.priceoff == null)? "بدون تخفیف":deductedprice}
        </p>
        <div>
          <label>اضافه کردن تخفیف</label>
          <input
            className="rounded-md mr-2"
            type="text"
            value={Editinput2}
            onChange={(e) => setEditinput2(e.target.value)}
          />
          هزار تومان
        </div>
        <Button variant={"secondary"} onClick={priceoffmutation.mutate}>
        {priceoffmutation.isLoading && (
          <CgSpinner strokeWidth="1" className="animate-spin text-5xl" />
        )}
        {priceoffmutation.isSuccess && <CheckIcon className="text-green-600 " />}
          تائید تخفیف
        </Button>
      </div>
    </div>
  );
}
//