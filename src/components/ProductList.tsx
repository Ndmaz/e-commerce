"use client";

import Productcard from "@/components/Productcard";
import { useAGetproducts } from "@/store/AsyncStore/useAGetproducts";
import { useparameters } from "@/store/useparameters";
import Link from "next/link";
import { CgSpinner } from "react-icons/cg";
import { RiInboxArchiveLine } from "react-icons/ri";

interface Product {
  id: string;
  productname: string;
  productcode: string;
  price: number;
  priceoff: number | null;
  images: string;
}

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

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-full md:w-3/4 h-[60vh] gap-4">
        <RiInboxArchiveLine className="text-6xl text-gray-400" />
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">محصولی یافت نشد</h3>
          <p className="text-gray-500 text-sm">
            با معیارهای جستجوی فعلی هیچ محصولی پیدا نشد.
            <br />
            لطفاً فیلترها را تغییر دهید یا جستجوی دیگری را امتحان کنید.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap md:w-3/4 gap-4 pt-[6rem] pb-16">
      {data.map((item: Product) => (
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
