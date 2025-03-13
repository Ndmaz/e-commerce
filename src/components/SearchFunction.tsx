"use client";

import { useAPE } from "@/store/AsyncStore/useAPE";
import { Product } from "@/types/product";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import Datatable from "./Datatable";
import Editfield from "./Editfield";
import { usePE } from "@/store/usePE";

//datafetched is displaied in the infofield and edited in the editfield, the feilds to be determined to be taken action on ...
// ... get selected in the datatable

interface SearchFunctionProps {
  searchValue: string;
}

export default function SearchFunction({ searchValue }: SearchFunctionProps) {
  const fieldname = usePE((state) => state.fieldname);
  const selectedProduct = usePE((state) => state.selectedProduct);
  const setSelectedProduct = usePE((state) => state.setSelectedProduct);

  const { data: products, isLoading, error, isError } = useAPE(searchValue);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <Card className="p-6">
        <div className="text-center text-red-500">
          {error instanceof Error ? error.message : "خطا در جستجوی محصول"}
        </div>
      </Card>
    );
  }

  if (!products || products.length === 0) {
    return (
      <Card className="p-6">
        <div className="text-center text-gray-500">
          محصولی با این نام یافت نشد
        </div>
      </Card>
    );
  }

  // If a product is selected, show the edit interface
  if (selectedProduct) {
    return (
      <div className="space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{selectedProduct.productname}</h3>
              <Button
                variant="outline"
                onClick={() => setSelectedProduct(null)}
              >
                تغییر محصول
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm text-gray-500">قیمت</p>
                <p className="font-medium">{selectedProduct.price} تومان</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">تخفیف</p>
                <p className="font-medium">{selectedProduct.priceoff || 0}%</p>
              </div>
            </div>
          </div>
        </Card>

        <Datatable />
        {fieldname && <Editfield />}
      </div>
    );
  }

  // Show list of matching products
  return (
    <div className="space-y-4">
      {products.map((product) => (
        <Card key={product.id} className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{product.productname}</h3>
              <Button
                variant="outline"
                onClick={() => setSelectedProduct(product)}
              >
                انتخاب برای ویرایش
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm text-gray-500">قیمت</p>
                <p className="font-medium">{product.price} تومان</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">تخفیف</p>
                <p className="font-medium">{product.priceoff || 0}%</p>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}


