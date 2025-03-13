"use client";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";

import Image from "next/image";
import { useAGetcategories } from "@/store/AsyncStore/useAGetcategories";

import Link from "next/link";
import { useparameters } from "@/store/useparameters";
import useEmblaCarousel from "embla-carousel-react";
import { useAGetpricedoffproducts } from "@/store/AsyncStore/useAGetpricedoffproducts";
import Productcard from "@/components/Productcard";
import Categoryimagecarousel from "@/components/Categoryimagecarousel";
import Pricedoffproductscarousel from "@/components/Pricedoffproductscarousel";
import Brandimagescarousel from "@/components/Brandimagescarousel";

export default function Home() {
  const heroImage = "https://ecommercemountain.storage.iran.liara.space/beach-campfire-4184-x-2779-wallpaper-gauuk7tw4u9qof5v.jpg?AWSAccessKeyId=2m48k681k2lqbaa7&Expires=1858087191&Signature=Ml2PHpa%2B%2BfPFFdGXs1t0kwOEAQs%3D";

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40rem] overflow-hidden">
        {/* Hero Background */}
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt="Hero background"
            width={1920}
            height={1080}
            priority
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" /> {/* Overlay */}
        </div>

        {/* Hero Content */}
        <div className="relative h-full container mx-auto px-4 flex items-center justify-end">
          <div className="md:w-1/2 lg:w-2/5 bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              با جدیدترین مجموعه محصولات ما آشنا شوید
            </h1>
            <p className="text-gray-600 mb-6">
              مجموعه‌ای از بهترین محصولات با کیفیت برتر و قیمت مناسب
            </p>
            <Link
              href="/products"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg
                       font-medium hover:bg-blue-700 transform hover:scale-105
                       transition-all duration-200 shadow-md"
            >
              مشاهده محصولات
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            دسته‌بندی‌های محصولات
          </h2>
          <Categoryimagecarousel />
        </div>
      </section>

      {/* Discounted Products Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            محصولات تخفیف‌دار ویژه
          </h2>
          <Pricedoffproductscarousel />
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            برندهای همکار
          </h2>
          <Brandimagescarousel />
        </div>
      </section>
    </div>
  );
}
