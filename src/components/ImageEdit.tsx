"use client";

import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useMutation } from "react-query";
import { CgSpinner } from "react-icons/cg";
import { CheckIcon } from "@radix-ui/react-icons";
import { S3 } from "aws-sdk";
import { usePE } from "@/store/usePE";
import { Product, ProductImages } from "@/types/product";

interface ImageUploadState {
  [key: string]: boolean;
}

export default function ImageEdit() {
  const productinfo = usePE((state) => state.productsinfo) as Product;
  const fieldname = usePE((state) => state.fieldname);
  const [selectedImageType, setSelectedImageType] = useState<string>("");

  // Initialize images state with proper type checking
  const [images, setImages] = useState<ProductImages>(() => {
    if (!productinfo.images) {
      return {
        pic1: "",
        pic2: "",
        pic3: "",
        pic4: "",
      };
    }

    // If images is already an object, use it directly
    if (typeof productinfo.images === 'object') {
      return productinfo.images as ProductImages;
    }

    // If it's a string, try to parse it
    try {
      return JSON.parse(productinfo.images);
    } catch (e) {
      console.error("Error parsing images:", e);
      return {
        pic1: "",
        pic2: "",
        pic3: "",
        pic4: "",
      };
    }
  });

  const [uploadSuccess, setUploadSuccess] = useState<ImageUploadState>({
    pic1: false,
    pic2: false,
    pic3: false,
    pic4: false,
  });
  const [error, setError] = useState<string>("");

  // AWS S3 configuration
  const ACCESSKEY = process.env.NEXT_PUBLIC_LIARA_ACCESS_KEY;
  const SECRETKEY = process.env.NEXT_PUBLIC_LIARA_SECRET_KEY;
  const ENDPOINT = process.env.NEXT_PUBLIC_LIARA_ENDPOINT;
  const BUCKET = process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME;

  // Validate environment variables
  if (!ACCESSKEY || !SECRETKEY || !ENDPOINT || !BUCKET) {
    console.error("Missing AWS S3 configuration");
    setError("خطا در تنظیمات سیستم");
    return null;
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
        Bucket: BUCKET,
        Key: `products/${file.name}`,
        Body: file,
        ContentType: file.type,
      };

      await s3.upload(params).promise();

      const permanentSignedUrl = await s3.getSignedUrl("getObject", {
        Bucket: BUCKET,
        Key: `products/${file.name}`,
        Expires: 131536000, // 4 years
      });

      setImages(prev => ({
        ...prev,
        [selectedImageType]: permanentSignedUrl
      }));

      setUploadSuccess(prev => ({
        ...prev,
        [selectedImageType]: true
      }));

      setError("");
    } catch (error) {
      console.error("Upload error:", error);
      setError("خطا در آپلود فایل. لطفا دوباره تلاش کنید");
    }
  };

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/PEmodifying", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Editinput: JSON.stringify(images), // Ensure images are stringified
          id: productinfo.id,
          fieldname,
        }),
      });

      if (!response.ok) {
        throw new Error("خطا در ثبت تغییرات");
      }

      return response.json();
    }
  });

  const imageTypes = [
    { key: "pic1", label: "عکس کوچک محصول" },
    { key: "pic2", label: "عکس اصلی محصول" },
    { key: "pic3", label: "عکس محصول جانبی 1" },
    { key: "pic4", label: "عکس محصول جانبی 2" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {imageTypes.map(({ key, label }) => (
          <div key={key} className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="imageType"
                value={key}
                checked={selectedImageType === key}
                onChange={(e) => setSelectedImageType(e.target.value)}
                className="form-radio"
              />
              <Label>{label}</Label>
              {uploadSuccess[key] && (
                <CheckIcon className="text-green-500" />
              )}
            </div>
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              disabled={!selectedImageType}
            />
          </div>
        ))}
      </div>

      {error && (
        <div className="p-3 bg-red-50 text-red-600 rounded-md">
          {error}
        </div>
      )}

      <div className="flex justify-center">
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
            "ثبت تغییرات"
          )}
          {mutation.isSuccess && (
            <CheckIcon className="text-green-600 ml-2" />
          )}
        </Button>
      </div>

      <div className="bg-gray-50 p-4 rounded-md overflow-x-scroll">
        <pre className="text-sm">
          {JSON.stringify(images, null, 2)}
        </pre>
      </div>
    </div>
  );
}
