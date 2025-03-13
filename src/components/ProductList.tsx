"use client";

import Productcard from "@/components/Productcard";
import { useAGetproducts } from "@/store/AsyncStore/useAGetproducts";
import { useparameters } from "@/store/useparameters";

import Link from "next/link";

import { CgSpinner } from "react-icons/cg";


export default function ProductList() {
  const { page, category, brand, price, searchprop } = useparameters((state) => ({
    page: state.page,
    category: state.category,
    brand: state.brand,
    price: state.price,
    searchprop: state.searchprop
  }));

  const { data, isLoading } = useAGetproducts(page, price, category, brand, searchprop);

  if (isLoading) {
    return (
      <div className="flex w-full justify-center mt-20">
        <CgSpinner strokeWidth="1" className="animate-spin text-5xl blur-sm" />
      </div>
    );
  }

  return (
    <div className="flex flex-wrap md:w-3/4 gap-4 pt-[6rem] pb-16">
      {data?.map((item) => (
        <Link
          href={`/products/${item.id}`}
          key={item.id}
          className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)] hover:shadow-lg transition-shadow duration-200"
        >
          <Productcard
            productname={item.productname}
            productcode={item.productcode}
            price={item.price}
            priceoff={item.priceoff}
            images={item.images}
          />
        </Link>
      ))}
    </div>
  );
}
