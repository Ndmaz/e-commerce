"use client";

import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { useAGetpricedoffproducts } from "@/store/AsyncStore/useAGetpricedoffproducts";
import Productcard from "@/components/Productcard";

export default function Pricedoffproductscarousel() {
    const [emblaRef] = useEmblaCarousel();
    const { data: data2, isLoading: isLoading2 } = useAGetpricedoffproducts();
  return (
    <div className="flex flex-col">
    <p className="font-bold mx-auto my-4">محصولات تخفیف دار </p>
    <div className="flex " ref={emblaRef}>
      <div className="flex mx-auto space-x-4">
        {isLoading2 && "loading"}
        {data2?.map((item) => {
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
                priceoff={item.priceoff}
                images={item.images}
              />
            </Link>
          );
        })}
      </div>
    </div>
  </div>
  )
}
