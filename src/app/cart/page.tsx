"use client";


import { useCartproducts } from "@/store/useCartproducts";
import Link from "next/link";

import { useEffect, useState } from "react";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";

export default function Cart() {
  const productchange = useCartproducts((state) => state.productschange);
  const products = useCartproducts((state) => state.products);
  const [quantity, setQuantity] = useState<{ [key: string]: number }>({});
  const [totalp, settotalp] = useState();

  useEffect(() => {
    const localcart = localStorage.getItem("cartproducts");

    if (localcart) {
      const parsed = JSON.parse(localcart);
      productchange(parsed);
      settotalp(() => {
        return parsed.reduce((acumulater, product) => {
          return acumulater + product.price;
        }, 0);
      });
    }
  }, [productchange]);

  const updateQuantity = (productId: string, newQuantity: number) => {
    setQuantity((prevQuantity) => ({
      ...prevQuantity,
      [productId]: newQuantity,
    }));
    settotalp(() => {
      return products.reduce((acumulator, product) => {
        if (productId == product.id) {
          const qunityprice = newQuantity * product.price;

          return acumulator + qunityprice;
        }
        const currentquanity = quantity[product.id] || 1;
        const qunaityprice = product.price * currentquanity;

        return acumulator + qunaityprice;
      }, 0);
    });
  };

  return (
    <div
      className="bg-white overflow-x-auto  md:w-[75vw] md:mx-auto md:rounded-lg p-2"
      dir="rtl"
    >
      <div>
        <div>محصولات منتخب:</div>

        <table className="mx-auto  ">
          <thead>
            <tr className=" space-x-6 ">
              <td className="border-black border-y-[1px] p-2">اسم محصول</td>
              <td className="border-black border-y-[1px] p-2">تعداد</td>
              <td className="border-black border-y-[1px] p-2">قیمت</td>
              <td className="border-black border-y-[1px] p-2">--</td>
            </tr>
          </thead>
          <tbody className="">
            {products?.map((product, index) => {
              const currentQuantity = quantity[product.id] || 1;
              const qunaityprice = product.price * currentQuantity;

              return (
                <tr key={product.id} className="">
                  <td className="p-2 border-l-gray-300 border-b-black border-l-[1px] border-b-[1px]">
                    {product.productname}
                  </td>
                  <td className="p-2 pb-3 flex border-l-gray-300 border-b-black border-l-[1px] border-b-[1px]">
                    <CiSquarePlus
                      className="text-2xl ml-2 cursor-pointer"
                      onClick={() =>
                        updateQuantity(product.id, currentQuantity + 1)
                      }
                    />
                    <input
                      type="text"
                      value={currentQuantity}
                      onChange={(e) =>
                        updateQuantity(product.id, parseInt(e.target.value))
                      }
                    />
                    <CiSquareMinus
                      className="text-xl mr-2 cursor-pointer"
                      onClick={() =>
                        updateQuantity(product.id, currentQuantity - 1)
                      }
                    />
                  </td>
                  <td className="p-2 border-l-gray-300 border-b-black border-l-[1px] border-b-[1px]">
                    {qunaityprice}
                  </td>
                  <td
                    className="p-2 border-l-gray-300 border-b-black border-l-[1px] border-b-[1px] bg-red-200 cursor-pointer"
                    onClick={() => {
                      const spliced = products.toSpliced(index);
                      productchange(spliced);
                      const stringified = JSON.stringify(spliced);
                      localStorage.setItem("cartproducts", stringified);
                    }}
                  >
                    حذف از لیست
                  </td>
                </tr>
              );
            })}
            <tr>
              <td>قیمت کل</td>
              <td>{totalp}</td>
            </tr>
          </tbody>
        </table>
        <Link href="/cart/step2"> مرحله بعد</Link>
      </div>
    </div>
  );
}
