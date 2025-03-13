"use client";

import { usePE } from "@/store/usePE";
import DetailEdit from "./DetailEdit";
import TextareaEdit from "./TextareaEdit";
import ImageEdit from "./ImageEdit";
import PriceEdit from "./PriceEdit";
import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useMutation } from "react-query";
import { CgSpinner } from "react-icons/cg";
import { CheckIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { Product } from "@/types/product";
import { Card } from "./ui/card";

//there is 4 options:
//1. the fieldname is image so it does a radio button and a s3 action
//2. the fieldname is detail and again the array turns into radio button and based on choice there is changing and deleting
//3.the field name is eather description or syntax which just make the input type into textarea
//4. the rest are just a small string and an input gets shown

export default function Editfield() {
  const fieldname = usePE((state) => state.fieldname);
  const productinfo = usePE((state) => state.productsinfo) as Product;
  const [editInput, setEditInput] = useState("");
  const [error, setError] = useState<string>("");

  // Get field value with proper type checking
  const fieldValue = fieldname === "نام محصول"
    ? (typeof productinfo.productname === 'string' ? productinfo.productname : "")
    : fieldname === "کد محصول"
      ? (typeof productinfo.productcode === 'string' ? productinfo.productcode : "")
      : fieldname === "قیمت"
        ? (typeof productinfo.price === 'number' ? productinfo.price.toString() : "0")
        : fieldname === "تخفیف"
          ? (typeof productinfo.priceoff === 'number' ? productinfo.priceoff.toString() : "0")
          : fieldname === "موجودی"
            ? (typeof productinfo.quanity === 'number' ? productinfo.quanity.toString() : "0")
            : "";

  const mutation = useMutation({
    mutationFn: async () => {
      if (!editInput.trim()) {
        throw new Error("لطفا مقدار را وارد کنید");
      }

      const response = await fetch("/api/PEmodifying", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Editinput: editInput,
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

  const handleSubmit = () => {
    mutation.mutate();
  };

  // Render appropriate edit component based on field type
  switch (fieldname) {
    case "عکس":
      return <ImageEdit />;
    case "مشخصات":
      return productinfo.details.length === 0 ? (
        <div className="text-center p-4 text-gray-600">مشخصات وجود ندارد</div>
      ) : (
        <DetailEdit />
      );
    case "توضیح کوتاه":
    case "توضیح کامل":
      return <TextareaEdit />;
    case "قیمت":
      return <PriceEdit />;
    default:
      return (
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center gap-4">
            <div className="bg-gray-100 p-2 rounded">
              {fieldValue}
            </div>
            <Label className="text-right">{fieldname}</Label>
            <Input
              className="w-[40vw]"
              value={editInput}
              onChange={(e) => setEditInput(e.target.value)}
              placeholder={`ویرایش ${fieldname}`}
            />
          </div>

          <Button
            onClick={handleSubmit}
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? (
              <>
                <CgSpinner className="animate-spin ml-2" />
                در حال ثبت...
              </>
            ) : (
              "ثبت تغییر"
            )}
            {mutation.isSuccess && (
              <CheckIcon className="text-green-600 ml-2" />
            )}
          </Button>
        </div>
      );
  }
}
