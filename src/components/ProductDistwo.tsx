"use client";

import { usePPD } from "@/store/usePPD";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { IoInformationCircleOutline } from "react-icons/io5";
import { TbListDetails } from "react-icons/tb";
import { FaRegComments } from "react-icons/fa";

type ProductInfo = {
  id: string;
  description: string;
  details: string;
}

type ProductDetail = {
  detailname: string;
  detailvalue: string;
}

export default function ProductDistwo() {
  const productInfo = usePPD((state) => state.productinfo) as ProductInfo;
  const [selectedTab, setSelectedTab] = useState("description");

  // Parse and validate details
  const details = (() => {
    try {
      const parsed = JSON.parse(productInfo.details) as ProductDetail[];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.error('Error parsing details:', e);
      return [];
    }
  })();

  return (
    <section className="max-w-7xl mx-auto px-4 py-8" dir="rtl">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <Tabs defaultValue="description" value={selectedTab} onValueChange={setSelectedTab} dir="rtl" className="w-full">
          <TabsList className="flex bg-gray-50 p-1 w-full">
            <TabsTrigger
              value="description"
              className="flex items-center gap-2 w-full py-3 px-4 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
            >
              <IoInformationCircleOutline className="text-xl ml-1" />
              توضیح کامل
            </TabsTrigger>
            <TabsTrigger
              value="specs"
              className="flex items-center gap-2 w-full py-3 px-4 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
            >
              <TbListDetails className="text-xl ml-1" />
              مشخصات
            </TabsTrigger>
            <TabsTrigger
              value="comments"
              className="flex items-center gap-2 w-full py-3 px-4 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
            >
              <FaRegComments className="text-xl ml-1" />
              دیدگاه ها
            </TabsTrigger>
          </TabsList>

          <div className="p-6">
            <TabsContent value="description">
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {productInfo.description}
                </p>
              </div>
            </TabsContent>

            <TabsContent value="specs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {details.map((detail) => (
                  <div
                    key={detail.detailname}
                    className="flex items-center p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-500">
                        {detail.detailname}
                      </h4>
                      <p className="mt-1 text-gray-900">
                        {detail.detailvalue}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="comments">
              <div className="text-center py-8 text-gray-500">
                بخش دیدگاه‌ها به زودی فعال خواهد شد
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  );
}
