"use client";

import { Button } from "@/components/ui/button";
import { useCartproducts } from "@/store/useCartproducts";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

export default function Cart() {
  const productchange = useCartproducts((state) => state.productschange);
  const products = useCartproducts((state) => state.products);
  // Create a state object to keep track of individual quantities for each product
  const [quantity, setQuantity] = useState<{ [key: string]: number }>({});
  
  useEffect(() => {
    const localcart = localStorage.getItem("cartproducts");
    //if there is no data in the cart then it shouldnt parse it
    if (localcart) {
      const parsed = JSON.parse(localcart);
      productchange(parsed);
    }
  }, [productchange]);

  // Function to handle quantity change for a specific product
  const updateQuantity = (productId: string, newQuantity: number) => {
    setQuantity((prevQuantity) => ({
      ...prevQuantity,
      [productId]: newQuantity,
    }));
  };

  const router = useRouter();
  return (
    <div className="bg-white w-[75vw] mx-auto rounded-lg p-2" dir="rtl">
      <div>
        <div>محصولات منتخب:</div>
    
        <table className="mx-auto ">
          <thead>
            <tr className=" space-x-6 ">
              <td className="border-black border-y-[1px] p-2">اسم محصول</td>
              <td className="border-black border-y-[1px] p-2">تعداد</td>
              <td className="border-black border-y-[1px] p-2">قیمت</td>
              <td className="border-black border-y-[1px] p-2">--</td>
            </tr>
          </thead>
          <tbody className="" >
            { products?.map((product) => {
              const currentQuantity = quantity[product.id] || 1;

              return (
                <tr key={product.id} className="">
                  <td className="p-2 border-l-gray-300 border-b-black border-l-[1px] border-b-[1px]">
                    {product.productname}
                  </td>
                  <td className="p-2 border-l-gray-300 border-b-black border-l-[1px] border-b-[1px]">
                    <input
                      type="number"
                      value={currentQuantity}
                      onChange={(e) =>
                        updateQuantity(product.id, parseInt(e.target.value))
                      }
                    />
                  </td>
                  <td className="p-2 border-l-gray-300 border-b-black border-l-[1px] border-b-[1px]">
                    {product.price}
                  </td>
                  <td
                    className="p-2 border-l-gray-300 border-b-black border-l-[1px] border-b-[1px] bg-red-200 cursor-pointer"
                    onClick={() => {}}
                  >
                    حذف از لیست
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Button
        
          onClick={() => {
            router.push("/cart/step2");
            
          }}
        >
          تایید سفارش
        </Button>
      </div>
    </div>
  );
}
