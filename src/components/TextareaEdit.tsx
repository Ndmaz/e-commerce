"use client";

import { usePE } from "@/store/usePE";
import { useState } from "react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { CgSpinner } from "react-icons/cg";
import { CheckIcon } from "@radix-ui/react-icons";
import { Product } from "@/types/product";
import { Card } from "./ui/card";

export default function TextareaEdit() {
  const fieldname = usePE((state) => state.fieldname);
  const productinfo = usePE((state) => state.productsinfo) as Product;
  const [editInput, setEditInput] = useState("");
  const [error, setError] = useState<string>("");

  const fieldValue = fieldname === "توضیح کوتاه"
    ? (typeof productinfo.synopsis === 'string' ? productinfo.synopsis : "")
    : (typeof productinfo.description === 'string' ? productinfo.description : "");

  const mutation = useMutation({
    mutationFn: async () => {
      if (!editInput.trim()) {
        throw new Error("لطفا متن را وارد کنید");
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

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              {fieldname}
            </h2>
            <p className="text-sm text-gray-600">
              متن فعلی را در زیر مشاهده می‌کنید. برای ویرایش، متن جدید را در کادر بالا وارد کنید.
            </p>
          </div>

          {/* Edit Form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>متن جدید</Label>
              <Textarea
                value={editInput}
                onChange={(e) => {
                  setEditInput(e.target.value);
                  setError("");
                }}
                placeholder={`ویرایش ${fieldname}`}
                className="min-h-[150px]"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            <div className="flex justify-end gap-2">
              <Button
                variant="ghost"
                onClick={() => {
                  setEditInput("");
                  setError("");
                }}
              >
                پاک کردن
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={mutation.isLoading || !editInput.trim()}
              >
                {mutation.isLoading ? (
                  <>
                    <CgSpinner className="animate-spin ml-2" />
                    در حال ثبت...
                  </>
                ) : (
                  "ثبت تغییرات"
                )}
                {mutation.isSuccess && (
                  <CheckIcon className="text-green-600 ml-2" />
                )}
              </Button>
            </div>
          </div>

          {/* Current Text Preview */}
          <div className="space-y-2">
            <Label>متن فعلی</Label>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700 whitespace-pre-wrap">{fieldValue}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
