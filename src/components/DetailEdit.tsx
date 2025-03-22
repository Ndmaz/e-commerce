"use client";

import { usePE } from "@/store/usePE";
import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { CgSpinner } from "react-icons/cg";
import { CheckIcon } from "@radix-ui/react-icons";
import { Product, ProductDetail } from "@/types/product";
import { Card } from "./ui/card";

interface DetailState {
  name: string;
  value: string;
}

export default function DetailEdit() {
  const productinfo = usePE((state) => state.productsinfo) as Product;
  const fieldname = usePE((state) => state.fieldname);

  // Initialize details state with proper type checking
  const [details, setDetails] = useState<ProductDetail[]>(() => {
    if (!productinfo.details) {
      return [];
    }

    // If details is already an array, use it directly
    if (Array.isArray(productinfo.details)) {
      return productinfo.details;
    }

    // If it's a string, try to parse it
    try {
      return JSON.parse(productinfo.details);
    } catch (e) {
      console.error("Error parsing details:", e);
      return [];
    }
  });

  const [selectedDetail, setSelectedDetail] = useState<{
    index: number;
    detail: ProductDetail;
  } | null>(null);
  const [editState, setEditState] = useState<DetailState>({
    name: "",
    value: "",
  });
  const [error, setError] = useState<string>("");

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/PEmodifying", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Editinput: JSON.stringify(details), // Ensure details are stringified
          id: productinfo.id,
          fieldname,
        }),
      });

      if (!response.ok) {
        throw new Error("خطا در ثبت تغییرات");
      }

      return response.json();
    },
  });

  const handleEdit = (detail: ProductDetail, index: number) => {
    setSelectedDetail({ detail, index });
    setEditState({
      name: detail.detailname,
      value: detail.detailvalue,
    });
  };

  const handleUpdate = () => {
    if (!selectedDetail) return;

    if (!editState.name.trim() || !editState.value.trim()) {
      setError("لطفا تمام فیلدها را پر کنید");
      return;
    }

    const newDetails = [...details];
    newDetails[selectedDetail.index] = {
      detailname: editState.name,
      detailvalue: editState.value,
    };
    setDetails(newDetails);
    setSelectedDetail(null);
    setEditState({ name: "", value: "" });
    setError("");
  };

  const handleDelete = (index: number) => {
    setDetails(prev => prev.filter((_, i) => i !== index));
    if (selectedDetail?.index === index) {
      setSelectedDetail(null);
      setEditState({ name: "", value: "" });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">مشخصات محصول</h2>

          {/* Details Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-3 text-right border">مشخصه</th>
                  <th className="p-3 text-right border">مقدار</th>
                  <th className="p-3 text-right border">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {details.map((detail, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-3 text-right border">{detail.detailname}</td>
                    <td className="p-3 text-right border">{detail.detailvalue}</td>
                    <td className="p-3 text-right border">
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(detail, index)}
                        >
                          ویرایش
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDelete(index)}
                        >
                          حذف
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Edit Form */}
          {selectedDetail && (
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900">ویرایش مشخصه</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>نام مشخصه</Label>
                  <Input
                    value={editState.name}
                    onChange={(e) => setEditState(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="نام مشخصه را وارد کنید"
                  />
                </div>
                <div className="space-y-2">
                  <Label>مقدار</Label>
                  <Input
                    value={editState.value}
                    onChange={(e) => setEditState(prev => ({ ...prev, value: e.target.value }))}
                    placeholder="مقدار را وارد کنید"
                  />
                </div>
              </div>
              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}
              <div className="flex gap-2">
                <Button onClick={handleUpdate}>
                  ثبت تغییرات
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setSelectedDetail(null);
                    setEditState({ name: "", value: "" });
                    setError("");
                  }}
                >
                  انصراف
                </Button>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              onClick={() => mutation.mutate()}
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? (
                <>
                  <CgSpinner className="animate-spin ml-2" />
                  در حال ثبت...
                </>
              ) : (
                "ذخیره تغییرات"
              )}
              {mutation.isSuccess && (
                <CheckIcon className="text-green-600 ml-2" />
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
