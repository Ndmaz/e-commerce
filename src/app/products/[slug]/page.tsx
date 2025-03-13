"use client";

import { useEffect } from "react";
import { useAPF } from "@/store/AsyncStore/useAPF";
import { usePPD } from "@/store/usePPD";
import ProductDisone from "@/components/ProductDisone";
import RelatedCarousel from "@/components/RelatedCarousel";
import ProductDistwo from "@/components/ProductDistwo";
import { CgSpinner } from "react-icons/cg";
import { BiErrorCircle } from "react-icons/bi";

type ProductPageProps = {
  params: {
    slug: string;
  };
};

export default function ProductPage({ params }: ProductPageProps) {
  const { data, isLoading, isError, error } = useAPF(params.slug);
  const productInfoChange = usePPD((state) => state.productinfochange);

  useEffect(() => {
    if (data) {
      productInfoChange(data);
    }
  }, [data, productInfoChange]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <CgSpinner className="animate-spin text-5xl text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">در حال بارگذاری محصول...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
          <BiErrorCircle className="text-6xl text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">خطا در بارگذاری محصول</h2>
          <p className="text-gray-600">
            {error instanceof Error ? error.message : "متأسفانه در بارگذاری اطلاعات محصول مشکلی پیش آمده است. لطفاً دوباره تلاش کنید."}
          </p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
          <BiErrorCircle className="text-6xl text-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">محصول یافت نشد</h2>
          <p className="text-gray-600">محصول مورد نظر شما در سیستم موجود نیست.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <ProductDisone />
        <div className="bg-white rounded-xl shadow-lg p-6">
          <RelatedCarousel />
        </div>
        <ProductDistwo />
      </div>
    </div>
  );
}
