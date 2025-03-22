"use client";
import { S3 } from "aws-sdk";
import { CheckIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CgSpinner } from "react-icons/cg";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { MdPlaylistAdd } from "react-icons/md";
import { Card } from "@/components/ui/card";
import { useToast } from "@/store/use-toast";

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

const initialFormState: ProductFormData = {
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
};

export default function ProductManagement() {
  const { toast } = useToast();
  const [formData, setFormData] = useState(initialFormState);
  const [selectedImageType, setSelectedImageType] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ACCESSKEY = process.env.NEXT_PUBLIC_LIARA_ACCESS_KEY;
  const SECRETKEY = process.env.NEXT_PUBLIC_LIARA_SECRET_KEY;
  const ENDPOINT = process.env.NEXT_PUBLIC_LIARA_ENDPOINT;
  const BUCKET = process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME;

  const resetForm = () => {
    setFormData(initialFormState);
    setSelectedImageType("");
    setError("");
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setError("لطفا یک فایل انتخاب کنید");
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        variant: "destructive",
        title: "خطا در آپلود",
        description: "فرمت فایل باید jpeg، png یا webp باشد",
      });
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast({
        variant: "destructive",
        title: "خطا در آپلود",
        description: "حجم فایل نمی‌تواند بیشتر از ۵ مگابایت باشد",
      });
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
        Expires: 131536000,
      });

      setFormData(prev => ({
        ...prev,
        permanentLink: {
          ...prev.permanentLink,
          [selectedImageType]: permanentSignedUrl
        }
      }));

      toast({
        title: "آپلود موفق",
        description: "تصویر با موفقیت آپلود شد",
      });

    } catch (error) {
      console.error("Upload error:", error);
      toast({
        variant: "destructive",
        title: "خطا در آپلود",
        description: "خطا در آپلود فایل. لطفا دوباره تلاش کنید",
      });
    }
  };

  const { mutate: submitForm, isLoading } = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("خطا در ثبت محصول");
      }

      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "ثبت موفق",
        description: "محصول با موفقیت ثبت شد",
      });
      resetForm();
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "خطا",
        description: error instanceof Error ? error.message : "خطا در ثبت محصول",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitForm();
  };

  const addDetail = () => {
    const lastDetail = formData.details[formData.details.length - 1];
    if (lastDetail?.detailname && lastDetail?.detailvalue) {
      setFormData(prev => ({
        ...prev,
        details: [...prev.details, { detailname: "", detailvalue: "" }]
      }));
    }
  };

  const removeDetail = (index: number) => {
    setFormData(prev => ({
      ...prev,
      details: prev.details.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="max-w-3xl mx-auto p-6" dir="rtl">
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">ثبت محصول جدید</h1>
            <p className="mt-2 text-gray-600">
              لطفا اطلاعات محصول را وارد کنید
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { id: "productname", label: "نام محصول", type: "text" },
                { id: "productcode", label: "کد محصول", type: "text" },
                { id: "category", label: "دسته‌بندی", type: "text" },
                { id: "brand", label: "برند", type: "text" },
                { id: "price", label: "قیمت", type: "number" },
                { id: "quanity", label: "تعداد", type: "number" },
              ].map(({ id, label, type }) => (
                <div key={id} className="space-y-2">
                  <Label htmlFor={id}>{label}</Label>
                  <Input
                    id={id}
                    type={type}
                    value={formData[id as keyof typeof formData] as string}
                    onChange={(e) => setFormData(prev => ({ ...prev, [id]: e.target.value }))}
                    required
                  />
                </div>
              ))}
            </div>

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
                  onClick={addDetail}
                >
                  <MdPlaylistAdd className="ml-2" />
                  افزودن
                </Button>
              </div>

              <div className="space-y-2">
                {formData.details.map((detail, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                    <span className="font-medium">{detail.detailname}:</span>
                    <span>{detail.detailvalue}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeDetail(index)}
                    >
                      حذف
                    </Button>
                  </div>
                ))}
              </div>
            </div>

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
                      {formData.permanentLink[key as keyof typeof formData.permanentLink] && (
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

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
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
