"use client";

import { CiEdit } from "react-icons/ci";
import { usePE } from "@/store/usePE";
import { Button } from "./ui/button";
import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useMutation } from "react-query";
import { CgSpinner } from "react-icons/cg";
import { CheckIcon } from "@radix-ui/react-icons";
import { Product } from "@/types/product";
import { Card } from "./ui/card";

interface TableField {
  id: string;
  label: string;
}

const PRODUCT_FIELDS: TableField[] = [
  { id: "productname", label: "نام محصول" },
  { id: "productcode", label: "کد محصول" },
  { id: "synopsis", label: "توضیح کوتاه" },
  { id: "description", label: "توضیح کامل" },
  { id: "price", label: "قیمت" },
  { id: "quanity", label: "تعداد" },
  { id: "details", label: "مشخصات" },
  { id: "images", label: "عکس" },
];

export default function Datatable() {
  const fieldname = usePE((state) => state.fieldname);
  const fieldnamechange = usePE((state) => state.fieldnamechange);
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

  const handleEditClick = (field: TableField) => {
    fieldnamechange(field.label);
    setEditInput(fieldValue);
  };

  return (
    <div className="overflow-x-auto" dir="rtl">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="p-3 text-right border-b">فیلد</th>
            <th className="p-3 text-right border-b">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {PRODUCT_FIELDS.map((field) => (
            <tr key={field.id} className="border-b hover:bg-gray-50">
              <td className="p-3 text-right">{field.label}</td>
              <td className="p-3 w-12 text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEditClick(field)}
                  className="hover:bg-primary/10"
                >
                  <CiEdit className="h-5 w-5" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
