"use client";

import Productcard from "@/components/Productcard";
import Link from "next/link";

import { useQuery } from "react-query";

export default function ProductList() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["datass"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/api/gettingproducts");
      if (!res.ok) {
      }
      const datas = await res.json();
      const products = datas.products;
      return products;
    },
  });

  return (
    <div className="flex flex-wrap mb-[1rem]">
      {data?.map((item) => {
        return (
          <Link href={`/products/${item.id}`} className="border-y-gray-700 border-2 hover:shadow-lg">
          <Productcard
            key={item.id}
            productname={item.productname}
            price={item.price}
            productid={item.id}
            images={item.images}
          /></Link>
        );
      })}
    </div>
  );
}
