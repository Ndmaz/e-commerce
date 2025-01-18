"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCartproducts } from "@/store/useCartproducts";
import Link from "next/link";
import React, { useState } from "react";
import { z } from "zod";
import { FaArrowLeft } from "react-icons/fa"
export default function Step2() {
  const order = useCartproducts((state) => state.order);
  const orderchange = useCartproducts((state) => state.orderchange);
  const [disableboolean,setdisableboolean]=useState(false)
  const [formData, setFormData] = useState({
    phoneNumber: "",
    address: "",
    fullName: "",
    postalCode: "",
  });
  const [errors, setErrors] = useState({});
  const schema = z.object({
    phoneNumber: z
      .string()
      .min(10, "شماره موبایل باید حداقل 10  عدد  باشد")
      .max(15, "شماره موبایل باید کمتر از 15 عدد باشد"),
    address: z.string().min(5, "آدرس باید حداقل 5 حرف داشته باشد"),
    fullName: z.string().min(2, "نام کامل باید حداقل دو حرف داشته باشد"),
    postalCode: z
      .string()
      .min(5, "کد پستی باید حداقل دو عدد داشته باشد")
      .max(10, "کد پستی باید حداکثر ده عدد باشد"),
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {

    e.preventDefault();
    const result = schema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = result.error.errors.reduce((acc, err) => {
        acc[err.path[0]] = err.message;
        return acc;
      }, {});
      setErrors(fieldErrors);
    } else {
      setErrors({});
      orderchange({...order,userinfo:formData})
      setdisableboolean(true)
    }
  };
  return (
    <div
      className="flex flex-col bg-white md:w-2/3 mx-auto md:shadow-md md:rounded-md p-2 md:mt-6"
      dir="rtl"
    >
      <Link href='/cart' className="flex font-bold mr-auto hover:shadow-md rounded-md p-1" dir="">
        برگشت
      <FaArrowLeft className="mr-1 text-red-300"/>
    

      </Link>
      
      <h1 className="text-xl font-bold m-4">
        آدرس و راه های ارتباطی خود را وارد کنید:
      </h1>
      <div className="flex flex-col font-medium mx-auto md:w-2/3">
        <label htmlFor="name"> نام و نام خانوادگی</label>
        <Input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="w-1/2 "
        />
        {errors.fullName && <p className="text-red-400">{errors.fullName}</p>}
        <label htmlFor="postalcode">کدپستی</label>
        <Input
          type="text"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
          className="w-1/2 "
        />
        {errors.postalCode && <p className="text-red-400">{errors.postalCode}</p>}
        <label htmlFor="phonenumber">شماره تماس</label>
        <Input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="w-1/2 "
        />
        {errors.phoneNumber && <p className="text-red-400">{errors.phoneNumber}</p>}
        <label htmlFor="address">ادرس</label>
        <Textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
        {errors.address && <p className="text-red-400">{errors.address}</p>}
        <Button  onClick={handleSubmit} className=" m-3">تایید</Button>
       {disableboolean&&<Link  href="/cart/step3" className="m-2 bg-slate-100 rounded-sm p-1">
          بعدی
        </Link>} 
      </div>
    </div>
  );
}
