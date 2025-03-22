"use client";

import SearchToRemove from "@/components/Searchtoremove";

export default function ProductRemoving() {
  return (
    <div className="space-y-6" dir="rtl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">حذف محصول</h1>
        <p className="mt-2 text-gray-600">
          برای حذف محصول مورد نظر، ابتدا آن را جستجو کنید.
        </p>
      </div>

      <SearchToRemove />
    </div>
  );
}
