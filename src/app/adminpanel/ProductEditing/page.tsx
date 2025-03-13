"use client";

import { useState } from "react";
import { HiOutlineChevronUp } from "react-icons/hi";
import { CiSearch } from "react-icons/ci";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePE } from "@/store/usePE";
import SearchFunction from "@/components/SearchFunction";

interface SearchState {
  value: string;
  isActive: boolean;
}

export default function ProductEditing() {
  const [searchState, setSearchState] = useState<SearchState>({
    value: "",
    isActive: false,
  });
  const fieldnameChange = usePE((state) => state.fieldnamechange);

  const handleSearch = () => {
    if (searchState.value.trim()) {
      setSearchState(prev => ({ ...prev, isActive: true }));
    }
  };

  const handleClearSearch = () => {
    setSearchState({ value: "", isActive: false });
    fieldnameChange("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">ویرایش محصول</h1>
        <p className="mt-2 text-gray-600">
          برای ویرایش محصول مورد نظر، ابتدا آن را جستجو کنید.
        </p>
      </div>

      <Card className="p-6">
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
              <SearchFunction searchValue={searchState.value} />

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
    </div>
  );
}
