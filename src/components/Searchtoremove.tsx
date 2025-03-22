"use client";

import { useState } from "react";
import { HiOutlineChevronUp } from "react-icons/hi";
import { CiSearch } from "react-icons/ci";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useAPE } from "@/store/AsyncStore/useAPE";
import { Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { Product } from "@/types/product";
import ProductDeleteCard from "./ProductDeleteCard";

interface SearchState {
  value: string;
  isActive: boolean;
}

export default function SearchToRemove() {
  const [searchState, setSearchState] = useState<SearchState>({
    value: "",
    isActive: false,
  });

  const { data: products, isLoading, error, isError } = useAPE(searchState.value);

  const deleteMutation = useMutation({
    mutationFn: async (productId: string) => {
      const response = await fetch("/api/PR", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: productId }),
      });

      if (!response.ok) {
        throw new Error("خطا در حذف محصول");
      }

      return response.json();
    },
    onSuccess: () => {
      setSearchState({ value: "", isActive: false });
    },
  });

  const handleSearch = () => {
    if (searchState.value.trim()) {
      setSearchState(prev => ({ ...prev, isActive: true }));
    }
  };

  const handleClearSearch = () => {
    setSearchState({ value: "", isActive: false });
  };

  const handleDelete = async (product: Product) => {
    deleteMutation.mutate(product.id);
  };

  return (
    <Card className="p-6" dir="rtl">
      <div className="space-y-4">
        {/* Search Section */}
        <div className="flex gap-2">
          <Input
            className="flex-1"
            placeholder="جستجوی محصول..."
            value={searchState.value}
            onChange={(e) => setSearchState(prev => ({ ...prev, value: e.target.value }))}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button
            onClick={handleSearch}
            className="min-w-[100px]"
          >
            <CiSearch className="ml-2" />
            جستجو
          </Button>
        </div>

        {/* Search Results */}
        {searchState.isActive && (
          <div className="space-y-4">
            {isLoading ? (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : isError ? (
              <div className="text-center text-red-500">
                {error instanceof Error ? error.message : "خطا در جستجوی محصول"}
              </div>
            ) : !products || products.length === 0 ? (
              <div className="text-center text-gray-500">
                محصولی با این نام یافت نشد
              </div>
            ) : (
              <div className="space-y-4">
                {products.map((product) => (
                  <ProductDeleteCard
                    key={product.id}
                    product={product}
                    onDelete={handleDelete}
                    isDeleting={deleteMutation.isLoading && deleteMutation.variables === product.id}
                    isSuccess={deleteMutation.isSuccess && deleteMutation.variables === product.id}
                  />
                ))}
              </div>
            )}

            <Button
              variant="ghost"
              onClick={handleClearSearch}
              className="flex items-center gap-2"
            >
              <HiOutlineChevronUp />
              پاک کردن جستجو
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
