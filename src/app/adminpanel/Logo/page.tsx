'use client';

import { useState, useRef, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/store/use-toast';
import { CgSpinner } from 'react-icons/cg';
import { FiUpload } from 'react-icons/fi';
import Image from 'next/image';
import { S3 } from 'aws-sdk';

export default function LogoPage() {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // S3 configuration
  const ACCESSKEY = process.env.NEXT_PUBLIC_LIARA_ACCESS_KEY;
  const SECRETKEY = process.env.NEXT_PUBLIC_LIARA_SECRET_KEY;
  const ENDPOINT = process.env.NEXT_PUBLIC_LIARA_ENDPOINT;
  const BUCKET = process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME;

  // Fetch current logo
  const { data: generalData, isLoading, refetch } = useQuery({
    queryKey: ['general'],
    queryFn: async () => {
      const response = await fetch('/api/getgeneral');
      if (!response.ok) throw new Error('Failed to fetch general data');
      return response.json();
    }
  });

  // Update logo URL in database
  const updateLogoMutation = useMutation({
    mutationFn: async (logoUrl: string) => {
      const response = await fetch('/api/updatelogo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ logoUrl })
      });

      if (!response.ok) {
        throw new Error('Failed to update logo in database');
      }

      return response.json();
    },
    onSuccess: () => {
      toast({
        title: 'ذخیره موفق',
        description: 'لوگو با موفقیت ذخیره شد',
      });
      refetch(); // Refresh the data
    },
    onError: (error) => {
      toast({
        title: 'خطا',
        description: error instanceof Error ? error.message : 'خطا در به‌روزرسانی لوگو',
        variant: 'destructive',
      });
    }
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'خطا',
        description: 'لطفا یک فایل تصویری انتخاب کنید',
        variant: 'destructive',
      });
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'خطا',
        description: 'حجم فایل نمی‌تواند بیشتر از ۵ مگابایت باشد',
        variant: 'destructive',
      });
      return;
    }

    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Start upload
    setIsUploading(true);

    try {
      // Initialize S3 client
      const s3 = new S3({
        accessKeyId: ACCESSKEY,
        secretAccessKey: SECRETKEY,
        endpoint: ENDPOINT,
        region: 'default',
      });

      // Generate a unique filename
      const fileExtension = file.name.split('.').pop();
      const uniqueFileName = `logos/${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExtension}`;

      // Upload to S3
      const params = {
        Bucket: BUCKET || '',
        Key: uniqueFileName,
        Body: file,
        ContentType: file.type,
      };

      await s3.upload(params).promise();

      // Get the permanent URL
      const permanentSignedUrl = await s3.getSignedUrl('getObject', {
        Bucket: BUCKET || '',
        Key: uniqueFileName,
        Expires: 131536000, // 15 years
      });

      // Update the database with the new logo URL
      updateLogoMutation.mutate(permanentSignedUrl);

    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: 'خطا',
        description: 'خطا در آپلود فایل. لطفا دوباره تلاش کنید',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleUpdateLogo = () => {
    if (previewUrl) {
      updateLogoMutation.mutate(previewUrl);
    } else {
      toast({
        title: 'خطا',
        description: 'لطفا یک لوگو آپلود کنید',
        variant: 'destructive',
      });
    }
  };

  // Set initial preview from database
  useEffect(() => {
    if (generalData?.logoimage) {
      setPreviewUrl(generalData.logoimage);
    }
  }, [generalData]);

  return (
    <div className="max-w-3xl mx-auto p-6" dir="rtl">
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">مدیریت لوگو</h1>
            <p className="mt-2 text-gray-600">
              در این بخش می‌توانید لوگوی سایت را آپلود و مدیریت کنید.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
              {isLoading ? (
                <div className="flex justify-center items-center h-40">
                  <CgSpinner className="animate-spin text-4xl text-gray-400" />
                </div>
              ) : (
                <>
                  {previewUrl ? (
                    <div className="relative w-48 h-48 mb-4">
                      <Image
                        src={previewUrl}
                        alt="Logo Preview"
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="text-center mb-4">
                      <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-500">
                        برای آپلود لوگو کلیک کنید یا فایل را اینجا رها کنید
                      </p>
                    </div>
                  )}

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />

                  <Button
                    onClick={handleUploadClick}
                    disabled={isUploading}
                    className="w-full sm:w-auto"
                  >
                    {isUploading ? (
                      <>
                        <CgSpinner className="animate-spin ml-2" />
                        در حال آپلود...
                      </>
                    ) : (
                      'آپلود لوگو'
                    )}
                  </Button>
                </>
              )}
            </div>

            <div className="text-sm text-gray-500 text-center">
              <p>فرمت‌های پشتیبانی شده: JPG، PNG، GIF</p>
              <p>حداکثر اندازه فایل: 5MB</p>
            </div>
            <div className='flex justify-center items-center'>
              <Button onClick={handleUpdateLogo}>
                ثبت تغییرات
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}