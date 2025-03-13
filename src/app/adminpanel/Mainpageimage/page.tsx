'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { S3 } from "aws-sdk";
import { useState } from "react";
import { CheckIcon } from "@radix-ui/react-icons";
import { CgSpinner } from "react-icons/cg";
import { MdImage } from "react-icons/md";

interface ImageUploadState {
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

export default function MainPageImage() {
  const [uploadState, setUploadState] = useState<ImageUploadState>({
    isLoading: false,
    error: null,
    success: false,
  });
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const ACCESSKEY = process.env.NEXT_PUBLIC_LIARA_ACCESS_KEY;
  const SECRETKEY = process.env.NEXT_PUBLIC_LIARA_SECRET_KEY;
  const ENDPOINT = process.env.NEXT_PUBLIC_LIARA_ENDPOINT;
  const BUCKET = process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setUploadState(prev => ({ ...prev, error: "لطفا یک فایل انتخاب کنید" }));
      return;
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setUploadState(prev => ({
        ...prev,
        error: "فرمت فایل باید jpeg، png یا webp باشد"
      }));
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setUploadState(prev => ({
        ...prev,
        error: "حجم فایل نمی‌تواند بیشتر از ۵ مگابایت باشد"
      }));
      return;
    }

    try {
      setUploadState(prev => ({ ...prev, isLoading: true, error: null }));

      const s3 = new S3({
        accessKeyId: ACCESSKEY,
        secretAccessKey: SECRETKEY,
        endpoint: ENDPOINT,
        region: "default",
      });

      const params = {
        Bucket: BUCKET,
        Key: `hero/${file.name}`,
        Body: file,
        ContentType: file.type,
      };

      await s3.upload(params).promise();

      const permanentSignedUrl = await s3.getSignedUrl("getObject", {
        Bucket: BUCKET,
        Key: `hero/${file.name}`,
        Expires: 131536000, // 4 years
      });

      setImageUrl(permanentSignedUrl);
      setUploadState(prev => ({ ...prev, success: true }));
    } catch (error) {
      console.error("Upload error:", error);
      setUploadState(prev => ({
        ...prev,
        error: "خطا در آپلود فایل. لطفا دوباره تلاش کنید"
      }));
    } finally {
      setUploadState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const handleSubmit = async () => {
    if (!imageUrl) {
      setUploadState(prev => ({
        ...prev,
        error: "لطفا ابتدا یک تصویر آپلود کنید"
      }));
      return;
    }

    try {
      setUploadState(prev => ({ ...prev, isLoading: true, error: null }));

      const response = await fetch("/api/hero-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl }),
      });

      if (!response.ok) {
        throw new Error("خطا در ذخیره تصویر");
      }

      setUploadState(prev => ({ ...prev, success: true }));
    } catch (error) {
      setUploadState(prev => ({
        ...prev,
        error: "خطا در ذخیره تصویر. لطفا دوباره تلاش کنید"
      }));
    } finally {
      setUploadState(prev => ({ ...prev, isLoading: false }));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">مدیریت تصویر صفحه اصلی</h1>
        <p className="mt-2 text-gray-600">
          تصویر پس‌زمینه صفحه اصلی را در این بخش می‌توانید تغییر دهید.
        </p>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          {/* Current Image Preview */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">تصویر فعلی</h2>
            <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Hero image preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <MdImage className="text-4xl text-gray-400" />
                </div>
              )}
            </div>
          </div>

          {/* Upload Section */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="image">انتخاب تصویر جدید</Label>
              <div className="mt-2">
                <Input
                  id="image"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFileUpload}
                  disabled={uploadState.isLoading}
                />
              </div>
            </div>

            {/* Status Messages */}
            {uploadState.error && (
              <p className="text-sm text-red-500">{uploadState.error}</p>
            )}
            {uploadState.success && (
              <p className="text-sm text-green-500 flex items-center gap-2">
                <CheckIcon className="text-green-500" />
                تصویر با موفقیت آپلود شد
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleSubmit}
              disabled={!imageUrl || uploadState.isLoading}
              className="min-w-[120px]"
            >
              {uploadState.isLoading ? (
                <>
                  <CgSpinner className="animate-spin mr-2" />
                  در حال پردازش...
                </>
              ) : (
                "ذخیره تغییرات"
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
