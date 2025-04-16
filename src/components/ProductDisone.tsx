'use client'
import React, { useState } from "react";
import { Button } from "./ui/button";
import { usePPD } from "@/store/usePPD";
import { FaImage } from "react-icons/fa";
import Image from "next/image";
import { useCartproducts } from "@/store/useCartproducts";
import { toast } from "@/store/use-toast";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

type ProductInfo = {
  id: number;
  productname: string;
  productcode?: string;
  synopsis?: string;
  description?: string;
  details?: string;
  price?: number;
  priceoff?: number;
  quanity?: number;
  images?: string;
  categoryid: number;
  brandid: number;
}

export default function ProductDisone() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<number[]>([0]);

  const productInfo = usePPD((state) => state.productinfo) as ProductInfo;
  const { products, productschange: setProducts } = useCartproducts((state) => ({
    products: state.products as ProductInfo[],
    productschange: state.productschange
  }));

  // Parse and validate images
  const images = (() => {
    if (!productInfo.images) return [];

    try {
      const parsed = JSON.parse(productInfo.images);
      if (parsed && typeof parsed === 'object') {
        // Create an array of image entries from pic2 to pic4 (skipping pic1)
        const imageEntries = ['pic2', 'pic3', 'pic4']
          .map(key => parsed[key])
          .filter(url => url && url !== "");

        return imageEntries.length > 0 ? imageEntries : [];
      }
    } catch (e) {
      console.error('Error parsing images:', e);
    }
    return [];
  })();

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
    setLoadedImages(prev => [...prev, (selectedIndex - 1 + images.length) % images.length]);
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
    setLoadedImages(prev => [...prev, (selectedIndex + 1) % images.length]);
  };

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
    setLoadedImages(prev => [...prev, index]);
  };

  const handleAddToCart = () => {
    if (products.some(item => item.id === productInfo.id)) {
      toast({
        title: "سبد خرید:",
        description: "این محصول قبلاً به سبد خرید اضافه شده است",
        variant: "destructive"
      });
      return;
    }

    const updatedProducts = [...products, productInfo];
    setProducts(updatedProducts);
    localStorage.setItem('cartproducts', JSON.stringify(updatedProducts));

    toast({
      title: "سبد خرید:",
      description: "محصول با موفقیت اضافه شد",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-8" dir="rtl">
        {/* Image Gallery Section */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
            {images.length > 0 ? (
              <>
                {loadedImages.includes(selectedIndex) && (
                  <Image
                    src={images[selectedIndex]}
                    fill
                    priority={selectedIndex === 0}
                    alt={`تصویر ${selectedIndex + 1} محصول`}
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                )}
                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrev}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 
                               hover:bg-white shadow-md transition-all duration-200 hover:scale-110"
                    >
                      <IoIosArrowBack className="text-2xl text-gray-800" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 
                               hover:bg-white shadow-md transition-all duration-200 hover:scale-110"
                    >
                      <IoIosArrowForward className="text-2xl text-gray-800" />
                    </button>
                  </>
                )}
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <FaImage className="w-24 h-24 text-gray-400" />
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {images.map((url, index) => (
                <button
                  key={index}
                  onClick={() => handleThumbnailClick(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all duration-200
                            ${selectedIndex === index
                      ? 'ring-2 ring-blue-500 opacity-100 scale-105'
                      : 'opacity-60 hover:opacity-100 hover:scale-105'}`}
                >
                  {loadedImages.includes(index) && (
                    <Image
                      src={url}
                      width={80}
                      height={80}
                      alt={`تصویر کوچک ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info Section */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {productInfo.productname}
            </h1>
            <div className="h-px bg-gray-200" />
          </div>

          <div className="prose prose-gray">
            <p className="text-gray-600 leading-relaxed">
              {productInfo.synopsis}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium text-gray-900">
                قیمت:
              </span>
              <span className="text-2xl font-bold text-blue-600">
                {productInfo.price ? new Intl.NumberFormat('fa-IR').format(productInfo.price) : 'قیمت موجود نیست'} تومان
              </span>
            </div>

            <Button
              onClick={handleAddToCart}
              className="w-full py-6 text-lg font-medium hover:scale-[1.02] transition-transform"
            >
              افزودن به سبد خرید
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
