"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCartproducts } from "@/store/useCartproducts";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { z } from "zod";

const shippingSchema = z.object({
  fullName: z
    .string()
    .min(2, "نام کامل باید حداقل دو حرف داشته باشد")
    .max(50, "نام کامل نمی‌تواند بیشتر از ۵۰ حرف باشد"),
  phoneNumber: z
    .string()
    .min(10, "شماره موبایل باید حداقل ۱۰ رقم باشد")
    .max(15, "شماره موبایل نمی‌تواند بیشتر از ۱۵ رقم باشد")
    .regex(/^[0-9]+$/, "شماره موبایل فقط می‌تواند شامل اعداد باشد"),
  postalCode: z
    .string()
    .min(10, "کد پستی باید ۱۰ رقم باشد")
    .max(10, "کد پستی باید ۱۰ رقم باشد")
    .regex(/^[0-9]+$/, "کد پستی فقط می‌تواند شامل اعداد باشد"),
  address: z
    .string()
    .min(10, "آدرس باید حداقل ۱۰ حرف داشته باشد")
    .max(200, "آدرس نمی‌تواند بیشتر از ۲۰۰ حرف باشد"),
});

type ShippingFormData = z.infer<typeof shippingSchema>;

interface FormErrors {
  [key: string]: string;
}

export default function Step2() {
  const router = useRouter();
  const { order, orderchange } = useCartproducts();
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const [formData, setFormData] = useState<ShippingFormData>({
    phoneNumber: "",
    address: "",
    fullName: "",
    postalCode: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = shippingSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = result.error.errors.reduce((acc, err) => ({
        ...acc,
        [err.path[0]]: err.message,
      }), {} as FormErrors);
      setErrors(fieldErrors);
      setIsNextEnabled(false);
    } else {
      setErrors({});
      orderchange({ ...order, userinfo: result.data });
      setIsNextEnabled(true);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6" dir="rtl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">اطلاعات ارسال</h1>
        <Link
          href="/cart"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <span>بازگشت</span>
          <FaArrowLeft />
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              نام و نام خانوادگی
            </label>
            <Input
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={errors.fullName ? "border-red-500" : ""}
              placeholder="نام و نام خانوادگی خود را وارد کنید"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
              شماره تماس
            </label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={errors.phoneNumber ? "border-red-500" : ""}
              placeholder="شماره موبایل خود را وارد کنید"
              dir="ltr"
            />
            {errors.phoneNumber && (
              <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>
            )}
          </div>

          {/* Postal Code */}
          <div>
            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
              کد پستی
            </label>
            <Input
              id="postalCode"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              className={errors.postalCode ? "border-red-500" : ""}
              placeholder="کد پستی ۱۰ رقمی را وارد کنید"
              dir="ltr"
            />
            {errors.postalCode && (
              <p className="mt-1 text-sm text-red-500">{errors.postalCode}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              آدرس کامل
            </label>
            <Textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={errors.address ? "border-red-500" : ""}
              placeholder="آدرس دقیق خود را وارد کنید"
              rows={4}
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-500">{errors.address}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-end pt-6 border-t">
          <Button
            type="submit"
            className="w-full sm:w-auto"
          >
            ثبت اطلاعات
          </Button>

          {isNextEnabled && (
            <Link
              href="/cart/step3"
              className="flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              <span>ادامه فرایند خرید</span>
              <FaArrowLeft className="text-sm" />
            </Link>
          )}
        </div>
      </form>
    </div>
  );
}
