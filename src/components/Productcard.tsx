import Image from "next/image";
import pic from "@/app/1.jpg";
import { useMemo } from "react";

type ProductCardProps = {
  productname: string;
  productcode: string;
  price: number;
  priceoff?: number | null;
  images: string;
};

export default function ProductCard({
  productname,
  productcode,
  price,
  priceoff,
  images,
}: ProductCardProps) {
  // Parse and validate images with useMemo for performance
  const productImage = useMemo(() => {
    try {
      const parsedImages = JSON.parse(images);
      return parsedImages?.pic1 || pic;
    } catch {
      return pic;
    }
  }, [images]);

  // Calculate discount percentage only if there's a valid priceoff
  const discountPercentage = useMemo(() => {
    if (!priceoff || priceoff >= price) return null;
    return Math.round(((price - priceoff) / price) * 100);
  }, [price, priceoff]);

  // Format price with Persian numbers and currency
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('fa-IR').format(amount) + ' تومان';
  };

  return (
    <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden" dir="rtl">
      {/* Discount Badge */}
      {discountPercentage && (
        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold z-10">
          {discountPercentage}٪ تخفیف
        </div>
      )}

      {/* Image Container */}
      <div className="aspect-square overflow-hidden bg-gray-50">
        <Image
          src={productImage}
          width={400}
          height={400}
          alt={productname}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-2">
        {/* Product Name */}
        <h3 className="text-gray-900 font-medium text-lg line-clamp-1 mb-1">
          {productname}
        </h3>

        {/* Product Code */}
        <p className="text-gray-500 text-sm">
          کد محصول: {productcode}
        </p>

        {/* Price Section */}
        <div className="mt-2 space-y-1">
          {priceoff && (
            <div className="flex items-center gap-2">
              <span className="text-gray-400 line-through text-sm">
                {formatPrice(price)}
              </span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-blue-600">
              {formatPrice(priceoff || price)}
            </span>
          </div>
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}
