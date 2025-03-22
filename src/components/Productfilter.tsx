import React from "react";
import { Button } from "./ui/button";
import { useAGetcategories } from "@/store/AsyncStore/useAGetcategories";
import { useAGetbrands } from "@/store/AsyncStore/useAGetbrands";
import { useparameters } from "@/store/useparameters";
import { RiEqualizerLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { Slider } from "@/components/ui/slider";

interface ProductFilterProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PriceRange {
  price1: number;
  price2: number;
}

interface CategoryItem {
  id: string;
  name: string;
}

interface BrandItem {
  id: string;
  name: string;
}

export default function Productfilter({ isOpen, onClose }: ProductFilterProps) {
  const { data: categorydata } = useAGetcategories();
  const { data: brandsdata } = useAGetbrands();
  const { pagechange, categorychange, brandchange, pricechange, price, category, brand } = useparameters((state) => ({
    pagechange: state.pagechange,
    categorychange: state.categorychange,
    brandchange: state.brandchange,
    pricechange: state.pricechange,
    price: state.price as PriceRange,
    category: state.category,
    brand: state.brand,
  }));

  // Set default values if price is undefined
  const defaultPriceRange = { price1: 0, price2: 1000 };
  const currentPrice = price || defaultPriceRange;

  // Filter Content Component to avoid duplication
  const FilterContent = () => (
    <div className="h-full w-full">
      <p className="font-bold text-lg mb-4"> فیلتر بر اساس:</p>

      <div className="border-l-[1px] border-[#f7e0f0d0] p-2">
        <p className="font-bold border-t-[1px] pr-1 mb-4">قیمت:</p>
        <div className="space-y-6">
          {/* Price display */}
          <div className="flex justify-between items-center px-2">
            <span className="text-sm">از {currentPrice.price1} هزار تومان</span>
            <span className="text-sm">تا {currentPrice.price2} هزار تومان</span>
          </div>

          {/* Single Slider for max price */}
          <div className="px-2">
            <Slider
              defaultValue={[currentPrice.price2]}
              max={1000}
              min={currentPrice.price1}
              step={10}
              value={[currentPrice.price2]}
              onValueChange={(values) => {
                pricechange({
                  price1: currentPrice.price1, // Keep price1 fixed
                  price2: values[0] // Only update price2
                });
              }}
              className="w-full"
            />
          </div>
        </div>
      </div>

      <div className="p-2 mt-4">
        <p className="font-bold border-t-[1px] mb-2">نوع محصول:</p>
        <select
          className="rounded-sm my-2 w-full p-2 border-2"
          name="category"
          id="cate"
          value={category}
          onChange={(e) => categorychange(e.target.value)}
        >
          <option value="">همه موارد</option>
          {categorydata?.map((item: CategoryItem) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div className="p-2 mt-4">
        <p className="font-bold border-t-[1px] mb-2">برند محصول:</p>
        <select
          className="rounded-sm my-2 w-full p-2 border-2"
          name="brand"
          id="bra"
          value={brand}
          onChange={(e) => brandchange(e.target.value)}
        >
          <option value="">همه موارد</option>
          {brandsdata?.map((item: BrandItem) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  return (
    <div dir="rtl">
      {/* Mobile Filter Sidebar */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-[80%] bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="h-full p-4 overflow-y-auto pt-[6rem]">
          <div className="flex justify-between items-center mb-4  top-[6rem] bg-white pb-2 border-b">
            <h2 className="text-xl font-bold">فیلترها</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <IoClose className="text-2xl" />
            </button>
          </div>
          <FilterContent />
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={onClose}
        />
      )}

      {/* Desktop Filter Sidebar */}
      <div className="hidden md:block bg-[#f3f3f3] p-6 mt-12 rounded-lg shadow-md overflow-y-auto">
        <FilterContent />
      </div>
    </div>
  );
}

























/*import React, { useState } from "react";
import { Button } from "./ui/button";
import { useAGetcategories } from "@/store/AsyncStore/useAGetcategories";
import { useAGetproducts } from "@/store/AsyncStore/useAGetproducts";

import { useparameters } from "@/store/useparameters";
import { useAGetbrands } from "@/store/AsyncStore/useAGetbrands";


interface PriceFilter {
  price1: string;
  price2: string;
}

export default function Productfilter() {
  const { data: categorydata } = useAGetcategories();
  const { data: brandsdata } = useAGetbrands()
  const { pagechange, categorychange, brandchange, pricechange, flipchange, page, category, brand, price, flip } = useparameters((state) => ({
    pagechange: state.pagechange,
    categorychange: state.categorychange,
    brandchange: state.brandchange,
    pricechange: state.pricechange,

    page: state.page,
    category: state.category,
    brand: state.brand,
    price: state.price,


  }));




  return (
    <div className="flex flex-col fixed right-0 top-[6rem]  bg-white p-2 md:w-1/4 rounded-md pr-2 mb-8 ml-8 " dir="rtl">
      <p> فیلتر بر اساس:</p>

      <div className="border-l-[1px] border-[#f7e0f0d0] p-2">
        <p className="font-bold border-t-[1px]   pr-1">قیمت:</p>
        از
        <input
          className="w-[4em] mx-1 rounded-sm  border-2"
          type="text"
          value={price.price1}
          onChange={(e) =>
            pricechange({
              price1: parseFloat(e.target.value),
              price2: price.price2
            })
          }
        />
        هزار تومان

        تا
        <input
          className="w-[4em] mx-1 rounded-sm border-2"
          type="text"
          value={price.price2}
          onChange={(e) => pricechange({
            price1: price.price1,
            price2: parseFloat(e.target.value)
          })}
        />
        هزار تومان
      </div>

      <div className="p-2">
        <p className="font-bold border-t-[1px]    ">نوع محصول:</p>
        <select
          className="rounded-sm my-2 w-[30vw] md:w-full"
          name="category"
          id="cate"
          value={category}
          onChange={(e) => categorychange(e.target.value)}
        >
          <option className=" border-2 border-black" value="">همه موارد</option>
          {categorydata?.map((item) => {
            return (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>


      <div className="p-2">
        <p className="font-bold border-t-[1px]    ">برند محصول:</p>
        <select
          className="rounded-sm my-2 w-[30vw] md:w-full"
          name="brand"
          id="bra"
          value={brand}
          onChange={(e) => brandchange(e.target.value)}
        >
          <option className=" border-2 border-black" value="">همه موارد</option>
          {brandsdata?.map((item) => {
            return (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>




    </div>

  );
}
*/
