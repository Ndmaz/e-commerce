"use client";

import Productcard from "@/components/Productcard";
import { useAGetproducts } from "@/store/AsyncStore/useAGetproducts";
import { useparameters } from "@/store/useparameters";

import Link from "next/link";

import { CgSpinner } from "react-icons/cg";


export default function ProductList() {
  const page = useparameters((state) => state.page);
  const category = useparameters((state) => state.category);
  const price = useparameters((state) => state.price);
  const flip=useparameters((state)=>state.flip)
  
  const { data, isLoading } = useAGetproducts(page,price,category,flip);

  if (isLoading) {
    return (
      <div className="flex  w-full justify-center">
        <CgSpinner strokeWidth="1" className="animate-spin text-5xl blur-sm" />
      </div>
    );
  }

  return (
    <div className="flex flex-wrap mb-[1rem] pr-4 ">
      {data?.map((item) => {
        return (
          <Link
            href={`/products/${item.id}`}
            key={item.id}
            className=" hover:shadow-lg"
          >
            <Productcard
              productname={item.productname}
              productcode={item.productcode}
              price={item.price}
              images={item.images}
            />
          </Link>
        );
      })}
     
    </div>
  );
}
