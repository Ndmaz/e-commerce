"use client";
import { S3 } from "aws-sdk";

import { CheckIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CgSpinner } from "react-icons/cg";

import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useMutation } from "react-query";

import { MdPlaylistAdd } from "react-icons/md";
import { Card } from "@/components/ui/card";

interface ProductDetail {
  detailname: string;
  detailvalue: string;
}

interface ProductImages {
  pic1: string;
  pic2: string;
  pic3: string;
  pic4: string;
}

interface ProductFormData {
  productname: string;
  productcode: string;
  category: string;
  brand: string;
  price: string;
  quanity: string;
  synopsis: string;
  description: string;
  details: ProductDetail[];
  permanentLink: ProductImages;
}

export default function ProductManagement() {
  // Form state
  const [formData, setFormData] = useState<ProductFormData>({
    productname: "",
    productcode: "",
    category: "",
    brand: "",
    price: "",
    quanity: "",
    synopsis: "",
    description: "",
    details: [],
    permanentLink: {
      pic1: "",
      pic2: "",
      pic3: "",
      pic4: "",
    },
  });

  // UI state
  const [selectedImageType, setSelectedImageType] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // AWS S3 configuration
  const ACCESSKEY = process.env.NEXT_PUBLIC_LIARA_ACCESS_KEY;
  const SECRETKEY = process.env.NEXT_PUBLIC_LIARA_SECRET_KEY;
  const ENDPOINT = process.env.NEXT_PUBLIC_LIARA_ENDPOINT;
  const BUCKET = process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME;

  // Handle file upload
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setError("لطفا یک فایل انتخاب کنید");
      return;
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError("فرمت فایل باید jpeg، png یا webp باشد");
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setError("حجم فایل نمی‌تواند بیشتر از ۵ مگابایت باشد");
      return;
    }

    try {
      const s3 = new S3({
        accessKeyId: ACCESSKEY,
        secretAccessKey: SECRETKEY,
        endpoint: ENDPOINT,
        region: "default",
      });

      const params = {
        Bucket: BUCKET || "",
        Key: `products/${file.name}`,
        Body: file,
        ContentType: file.type,
      };

      await s3.upload(params).promise();

      const permanentSignedUrl = await s3.getSignedUrl("getObject", {
        Bucket: BUCKET || "",
        Key: `products/${file.name}`,
        Expires: 131536000, // 4 years
      });

      setFormData(prev => ({
        ...prev,
        permanentLink: {
          ...prev.permanentLink,
          [selectedImageType]: permanentSignedUrl
        }
      }));

      setError("");
    } catch (error) {
      console.error("Upload error:", error);
      setError("خطا در آپلود فایل. لطفا دوباره تلاش کنید");
    }
  };

  // Handle form submission
  const submitForm = async () => {
    try {
      setIsSubmitting(true);
      const response = await fetch("/api/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("خطا در ثبت محصول");
      }

      // Reset form
      setFormData({
        productname: "",
        productcode: "",
        category: "",
        brand: "",
        price: "",
        quanity: "",
        synopsis: "",
        description: "",
        details: [],
        permanentLink: {
          pic1: "",
          pic2: "",
          pic3: "",
          pic4: "",
        },
      });
      setSelectedImageType("");
      alert("محصول با موفقیت ثبت شد");
    } catch (error) {
      console.error(error);
      setError("خطا در ثبت محصول. لطفا دوباره تلاش کنید");
    } finally {
      setIsSubmitting(false);
    }
  };

  const { mutate } = useMutation(submitForm);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">ثبت محصول جدید</h1>
            <p className="mt-2 text-gray-600">
              لطفا اطلاعات محصول را وارد کنید
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-50 text-red-600 rounded-md">
                {error}
              </div>
            )}

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="productname">نام محصول</Label>
                <Input
                  id="productname"
                  value={formData.productname}
                  onChange={(e) => setFormData(prev => ({ ...prev, productname: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="productcode">کد محصول</Label>
                <Input
                  id="productcode"
                  value={formData.productcode}
                  onChange={(e) => setFormData(prev => ({ ...prev, productcode: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">دسته‌بندی</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="brand">برند</Label>
                <Input
                  id="brand"
                  value={formData.brand}
                  onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">قیمت</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="quanity">تعداد</Label>
                <Input
                  id="quanity"
                  type="number"
                  value={formData.quanity}
                  onChange={(e) => setFormData(prev => ({ ...prev, quanity: e.target.value }))}
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="synopsis">توضیح کوتاه</Label>
              <Textarea
                id="synopsis"
                value={formData.synopsis}
                onChange={(e) => setFormData(prev => ({ ...prev, synopsis: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">توضیح کامل</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                required
              />
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              <Label>مشخصات محصول</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="نام مشخصه"
                  value={formData.details[formData.details.length - 1]?.detailname || ""}
                  onChange={(e) => {
                    const newDetails = [...formData.details];
                    if (!newDetails[newDetails.length - 1]) {
                      newDetails.push({ detailname: e.target.value, detailvalue: "" });
                    } else {
                      newDetails[newDetails.length - 1].detailname = e.target.value;
                    }
                    setFormData(prev => ({ ...prev, details: newDetails }));
                  }}
                />
                <Input
                  placeholder="مقدار"
                  value={formData.details[formData.details.length - 1]?.detailvalue || ""}
                  onChange={(e) => {
                    const newDetails = [...formData.details];
                    if (!newDetails[newDetails.length - 1]) {
                      newDetails.push({ detailname: "", detailvalue: e.target.value });
                    } else {
                      newDetails[newDetails.length - 1].detailvalue = e.target.value;
                    }
                    setFormData(prev => ({ ...prev, details: newDetails }));
                  }}
                />
                <Button
                  type="button"
                  onClick={() => {
                    if (formData.details[formData.details.length - 1]?.detailname &&
                      formData.details[formData.details.length - 1]?.detailvalue) {
                      setFormData(prev => ({
                        ...prev,
                        details: [...prev.details, { detailname: "", detailvalue: "" }]
                      }));
                    }
                  }}
                >
                  <MdPlaylistAdd className="ml-2" />
                  افزودن
                </Button>
              </div>

              {/* Display added details */}
              <div className="space-y-2">
                {formData.details.map((detail, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                    <span className="font-medium">{detail.detailname}:</span>
                    <span>{detail.detailvalue}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          details: prev.details.filter((_, i) => i !== index)
                        }));
                      }}
                    >
                      حذف
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-4">
              <Label>تصاویر محصول</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { key: "pic1", label: "تصویر کوچک" },
                  { key: "pic2", label: "تصویر اصلی" },
                  { key: "pic3", label: "تصویر جانبی 1" },
                  { key: "pic4", label: "تصویر جانبی 2" },
                ].map(({ key, label }) => (
                  <div key={key} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="imageType"
                        value={key}
                        checked={selectedImageType === key}
                        onChange={(e) => setSelectedImageType(e.target.value)}
                      />
                      <Label>{label}</Label>
                      {formData.permanentLink[key as keyof ProductImages] && (
                        <CheckIcon className="text-green-500" />
                      )}
                    </div>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleUpload}
                      disabled={!selectedImageType}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <CgSpinner className="animate-spin ml-2" />
                  در حال ثبت...
                </>
              ) : (
                "ثبت محصول"
              )}
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
