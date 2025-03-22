"use client";

import { usePE } from "@/store/usePE";
import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useMutation } from "@tanstack/react-query";
import { CgSpinner } from "react-icons/cg";
import { CheckIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { useAPostpriceoff } from "@/store/AsyncStore/useAPostpriceoff";
import { Product } from "@/types/product";
import { Card } from "./ui/card";

export default function PriceEdit() {
  const fieldname = usePE((state) => state.fieldname);
  const productinfo = usePE((state) => state.productsinfo) as Product;
  const [price, setPrice] = useState<string>("");
  const [discount, setDiscount] = useState<string>("");
  const [error, setError] = useState<string>("");

  const deductedPrice = productinfo.price - (productinfo.priceoff || 0);
  const priceoffmutation = useAPostpriceoff(discount, productinfo.id);

  const priceMutation = useMutation({
    mutationFn: async () => {
      if (!price.trim()) {
        throw new Error("لطفا قیمت را وارد کنید");
      }

      const response = await fetch("/api/PEmodifying", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Editinput: price,
          fieldname,
          id: productinfo.id,
        }),
      });

      if (!response.ok) {
        throw new Error("خطا در ثبت تغییرات");
      }

      return response.json();
    },
  });

  const handlePriceSubmit = () => {
    priceMutation.mutate();
  };

  const handleDiscountSubmit = () => {
    priceoffmutation.mutate();
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              {fieldname}
            </h2>
            <p className="text-sm text-gray-600">
              قیمت فعلی و تخفیف محصول را در این بخش می‌توانید مدیریت کنید.
            </p>
          </div>

          {/* Current Price */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="bg-gray-100 p-3 rounded-lg">
                <p className="text-lg font-medium">{productinfo.price.toLocaleString()} تومان</p>
              </div>
              <Label className="text-right">{fieldname}</Label>
              <Input
                className="w-[200px]"
                type="number"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                  setError("");
                }}
                placeholder="قیمت جدید"
              />
            </div>

            <Button
              onClick={handlePriceSubmit}
              disabled={priceMutation.isLoading || !price.trim()}
            >
              {priceMutation.isLoading ? (
                <>
                  <CgSpinner className="animate-spin ml-2" />
                  در حال ثبت...
                </>
              ) : (
                "ثبت تغییرات"
              )}
              {priceMutation.isSuccess && (
                <CheckIcon className="text-green-600 ml-2" />
              )}
            </Button>
          </div>

          {/* Discount Section */}
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">تخفیف محصول</h3>
              <p className="text-sm text-gray-600">
                قیمت با تخفیف:{" "}
                <span className="font-medium">
                  {productinfo.priceoff ? deductedPrice.toLocaleString() : "بدون تخفیف"}
                </span>{" "}
                تومان
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Label>مقدار تخفیف</Label>
              <Input
                className="w-[200px]"
                type="number"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                placeholder="مقدار تخفیف"
              />
              <span className="text-gray-600">تومان</span>
            </div>

            <Button
              variant="secondary"
              onClick={handleDiscountSubmit}
              disabled={priceoffmutation.isLoading || !discount.trim()}
            >
              {priceoffmutation.isLoading ? (
                <>
                  <CgSpinner className="animate-spin ml-2" />
                  در حال ثبت...
                </>
              ) : (
                "ثبت تخفیف"
              )}
              {priceoffmutation.isSuccess && (
                <CheckIcon className="text-green-600 ml-2" />
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
//