"use client";

import { Button } from "@/components/ui/button";
import { useCartproducts } from "@/store/useCartproducts";
import Link from "next/link";
import React from "react";

import { useEffect, useMemo, useState } from "react";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa";

export default function Cart() {
  const productchange = useCartproducts((state) => state.productschange);
  const products = useCartproducts((state) => state.products);
  const order = useCartproducts((state) => state.order);
  const orderchange = useCartproducts((state) => state.orderchange);
  const prviousquantity = useMemo(() => {
    let quantityresult = {};
    for (let product in products) {
      if (product.quantitytotake) {
        quantityresult = {
          ...quantityresult,
          [product.id]: product.quantitytotake,
        }
      } else {
        quantityresult = { ...quantityresult, [product.id]: 1 };
      }
    }
    console.log(quantityresult);
    return quantityresult;
  }, [products]);

  const [quantity, setQuantity] = useState<{ [key: string]: number }>(prviousquantity);
  const [totalprice, settotalprice] = useState(0);

  useEffect(() => {
    const localcart = localStorage.getItem("cartproducts");

    if (localcart) {
      const parsed = JSON.parse(localcart);
      productchange(parsed);
      settotalprice(() => {
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
    settotalprice(() => {
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
                  <td className="p-2 pb-3  border-l-gray-300 border-b-black border-l-[1px] border-b-[1px]">
                    <div className="flex">
                      <CiSquarePlus
                        className="text-2xl ml-2 cursor-pointer"
                        onClick={() =>
                          updateQuantity(product.id, currentQuantity + 1)
                        }
                      />
                      {currentQuantity}
                      <CiSquareMinus
                        className="text-xl mr-2 cursor-pointer"
                        onClick={() =>
                          updateQuantity(product.id, currentQuantity - 1)
                        }
                      />
                    </div>
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
              <td>{totalprice}</td>
            </tr>
          </tbody>
        </table>
        <div className="w-1/2 mx-auto ">
          <Button
            className="w-full"
            onClick={() => {
              const newproducts = products.map((product) => {
                return {
                  ...product,
                  quantitytotake: quantity[product.id] || 1,
                  totalprice,
                };
              });
           
              orderchange({productstobuy:newproducts})

            }}
          >
            تائید
          </Button>
        </div>
        <Link className="font-bold flex-col" href="/cart/step2">

          <p>مرحله بعد </p>
          <FaArrowRight className="text-blue-500 " />
        </Link>
      </div>
    </div>
  );
}
