"use client";

import { Button } from "@/components/ui/button";
import { useCartproducts } from "@/store/useCartproducts";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";

interface CartProduct {
  id: string;
  productname: string;
  price: number;
  quantitytotake?: number;
}

export default function Cart() {
  const { products, productschange: productchange, orderchange } = useCartproducts(state => ({
    products: state.products as CartProduct[],
    productschange: state.productschange,
    orderchange: state.orderchange
  }));

  const [nextPageEnabled, setNextPageEnabled] = useState(false);
  const [error, setError] = useState('');

  const [quantity, setQuantity] = useState<Record<string, number>>(() => {
    return products.reduce((acc, product) => ({
      ...acc,
      [product.id]: product.quantitytotake || 1
    }), {});
  });

  const totalPrice = useMemo(() => {
    return products.reduce((total, product) => {
      const productQuantity = quantity[product.id] || 1;
      return total + (product.price * productQuantity);
    }, 0);
  }, [products, quantity]);

  const handleQuantityChange = (productId: string, delta: number) => {
    const currentQuantity = quantity[productId] || 1;
    const newQuantity = Math.max(1, currentQuantity + delta);

    setQuantity(prev => ({
      ...prev,
      [productId]: newQuantity
    }));
  };

  const handleRemoveProduct = (productId: string) => {
    const updatedProducts = products.filter(item => item.id !== productId);
    productchange(updatedProducts);
    localStorage.setItem("cartproducts", JSON.stringify(updatedProducts));
  };

  const handleProceedToCheckout = () => {
    if (products.length === 0) {
      setError('لطفا ابتدا محصولی را به سبد خرید اضافه کنید');
      return;
    }

    const productsWithQuantity = products.map(product => ({
      ...product,
      quantitytotake: quantity[product.id] || 1,
    }));

    orderchange({ productstobuy: productsWithQuantity, totalprice: totalPrice });
    setNextPageEnabled(true);
    setError('');
  };

  return (
    <div className="p-6" dir="rtl">
      <h1 className="text-2xl font-bold mb-6">سبد خرید</h1>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">سبد خرید شما خالی است</p>
          <Link href="/products" className="text-blue-600 hover:text-blue-700">
            مشاهده محصولات
          </Link>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-right py-4 px-4">محصول</th>
                  <th className="py-4 px-4">تعداد</th>
                  <th className="py-4 px-4">قیمت واحد</th>
                  <th className="py-4 px-4">قیمت کل</th>
                  <th className="py-4 px-4"></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  const productQuantity = quantity[product.id] || 1;
                  const productTotal = product.price * productQuantity;

                  return (
                    <tr key={product.id} className="border-b">
                      <td className="py-4 px-4">{product.productname}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleQuantityChange(product.id, 1)}
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            <CiSquarePlus className="text-2xl text-blue-600" />
                          </button>
                          <span className="w-8 text-center">{productQuantity}</span>
                          <button
                            onClick={() => handleQuantityChange(product.id, -1)}
                            className="p-1 hover:bg-gray-100 rounded"
                            disabled={productQuantity <= 1}
                          >
                            <CiSquareMinus className="text-2xl text-gray-400" />
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-4">{product.price} تومان</td>
                      <td className="py-4 px-4">{productTotal} تومان</td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => handleRemoveProduct(product.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                        >
                          <IoTrashOutline className="text-xl" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-8 border-t pt-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-medium">جمع کل:</span>
              <span className="text-xl font-bold">{totalPrice} تومان</span>
            </div>

            {error && (
              <p className="text-red-500 text-center mb-4">{error}</p>
            )}

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-end">
              <Button
                variant="outline"
                className="sm:w-auto"
                onClick={() => window.history.back()}
              >
                ادامه خرید
              </Button>

              <Button
                className="sm:w-auto"
                onClick={handleProceedToCheckout}
              >
                تکمیل خرید
              </Button>
            </div>

            {nextPageEnabled && (
              <Link
                href="/cart/step2"
                className="flex items-center justify-center gap-2 mt-4 text-blue-600 hover:text-blue-700"
              >
                <span>مرحله بعد</span>
                <FaArrowRight />
              </Link>
            )}
          </div>
        </>
      )}
    </div>
  );
}
