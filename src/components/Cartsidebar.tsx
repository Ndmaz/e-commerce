'use client'
import { useCartproducts } from "@/store/useCartproducts";
import { useHeaders } from "@/store/useheaders";
import Link from "next/link";
import { BsCartDash, BsCartX } from "react-icons/bs";
import { IoCartOutline } from "react-icons/io5";
import { FaImage } from "react-icons/fa";
import Image from "next/image";
import { useState, useEffect } from "react";

type CartProduct = {
  id: string;
  productname: string;
  price: number;
  images: string;
};

export default function Cartsidebar() {
  const cartbooleanchange = useHeaders((state) => state.cartbooleanchange);
  const products = useCartproducts((state) => state.products) as unknown as CartProduct[];
  const productschange = useCartproducts((state) => state.productschange);
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => cartbooleanchange(false), 300);
  };

  const handleRemoveItem = (itemId: string) => {
    const updatedProducts = products.filter(item => item.id !== itemId);
    productschange(updatedProducts);
    localStorage.setItem("cartproducts", JSON.stringify(updatedProducts));
  };

  useEffect(() => {
    setIsOpen(true);
    return () => setIsOpen(false);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 transition-opacity duration-300 
                   ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={handleClose}
      />

      {/* Cart Sidebar */}
      <div
        className={`relative w-full md:w-[400px] bg-white h-screen shadow-2xl transform transition-transform duration-300 
                   ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between bg-white sticky top-0 z-10">
          <Link
            href="/cart"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
                     transition-colors duration-200 active:scale-95 text-sm font-medium"
          >
            رفتن به صفحه خرید
          </Link>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 active:scale-95"
          >
            <BsCartX className="text-2xl text-gray-600" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="overflow-y-auto h-[calc(100vh-4rem)]" dir="rtl">
          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-4">
              <IoCartOutline className="text-6xl" />
              <p className="text-lg">سبد خرید شما خالی است</p>
            </div>
          ) : (
            products.map((item) => {
              const images = JSON.parse(item.images);
              const hasImages = item.images !== `{"pic1":"","pic2":"","pic3":"","pic4":""}`;
              const productImage = hasImages ? images.pic1 : null;

              return (
                <div
                  key={item.id}
                  className="p-4 border-b hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-start space-x-4 space-x-reverse">
                    <div className="w-24 h-24 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center">
                      {productImage ? (
                        <Image
                          src={productImage}
                          width={300}
                          height={200}
                          alt={item.productname}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <FaImage className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-gray-900 truncate">
                        {item.productname}
                      </h3>
                      <p className="mt-1 text-gray-500">
                        قیمت: {new Intl.NumberFormat('fa-IR').format(item.price)} تومان
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-full 
                               transition-colors duration-200 active:scale-95"
                    >
                      <BsCartDash className="text-xl" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
