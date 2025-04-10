'use client'
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/store/use-toast";
import { CgSpinner } from "react-icons/cg";
import { useFooterInfo } from "@/store/AsyncStore/useFooterInfo";

interface ContactInfo {
    phone: string;
    email: string;
    address: string;
}

interface SocialMedia {
    instagram: string;
    twitter: string;
    telegram: string;
}

interface FooterData {
    contactInfo: ContactInfo;
    socialMedia: SocialMedia;
}

export default function Footerinfo() {
    const { toast } = useToast();
    const { data: footerData, isLoading: isLoadingData } = useFooterInfo();

    const [formData, setFormData] = useState<FooterData>({
        contactInfo: {
            phone: "",
            email: "",
            address: "",
        },
        socialMedia: {
            instagram: "",
            twitter: "",
            telegram: "",
        }
    });

    // Update form data when footer data is loaded
    useEffect(() => {
        if (footerData?.contactInfo) {
            setFormData(prev => ({
                ...prev,
                contactInfo: footerData.contactInfo,
                socialMedia: footerData.socialMedia || prev.socialMedia
            }));
        }
    }, [footerData]);

    const mutation = useMutation({
        mutationFn: async (data: FooterData) => {
            const response = await fetch("/api/PostcContactInfo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error("Failed to update footer information");
            }

            return response.json();
        },
        onSuccess: () => {
            toast({
                title: "اطلاعات با موفقیت به‌روزرسانی شد",
                description: "تغییرات فوتر با موفقیت ذخیره شد",
            });
        },
        onError: (error) => {
            toast({
                title: "خطا",
                description: error instanceof Error ? error.message : "خطا در به‌روزرسانی اطلاعات",
                variant: "destructive",
            });
        }
    });

    const handleContactInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            contactInfo: {
                ...prev.contactInfo,
                [name]: value
            }
        }));
    };

    const handleSocialMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            socialMedia: {
                ...prev.socialMedia,
                [name]: value
            }
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate(formData);
    };

    if (isLoadingData) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <CgSpinner className="animate-spin text-4xl text-gray-400" />
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto p-6" dir="rtl">
            <Card className="p-6">
                <div className="space-y-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">مدیریت اطلاعات فوتر</h1>
                        <p className="mt-2 text-gray-600">
                            در این بخش می‌توانید اطلاعات تماس و شبکه‌های اجتماعی را ویرایش کنید.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Contact Information Section */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold text-gray-900">اطلاعات تماس</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="phone">شماره تماس</Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        type="text"
                                        placeholder="شماره تماس را وارد کنید"
                                        value={formData.contactInfo.phone}
                                        onChange={handleContactInfoChange}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">ایمیل</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="ایمیل را وارد کنید"
                                        value={formData.contactInfo.email}
                                        onChange={handleContactInfoChange}
                                        required
                                    />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <Label htmlFor="address">آدرس</Label>
                                    <Input
                                        id="address"
                                        name="address"
                                        type="text"
                                        placeholder="آدرس را وارد کنید"
                                        value={formData.contactInfo.address}
                                        onChange={handleContactInfoChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Social Media Section */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold text-gray-900">شبکه‌های اجتماعی</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="instagram">اینستاگرام</Label>
                                    <Input
                                        id="instagram"
                                        name="instagram"
                                        type="url"
                                        placeholder="لینک اینستاگرام"
                                        value={formData.socialMedia.instagram}
                                        onChange={handleSocialMediaChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="twitter">توییتر</Label>
                                    <Input
                                        id="twitter"
                                        name="twitter"
                                        type="url"
                                        placeholder="لینک توییتر"
                                        value={formData.socialMedia.twitter}
                                        onChange={handleSocialMediaChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="telegram">تلگرام</Label>
                                    <Input
                                        id="telegram"
                                        name="telegram"
                                        type="url"
                                        placeholder="لینک تلگرام"
                                        value={formData.socialMedia.telegram}
                                        onChange={handleSocialMediaChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={mutation.isPending}
                        >
                            {mutation.isPending ? (
                                <>
                                    <CgSpinner className="animate-spin ml-2" />
                                    در حال ذخیره...
                                </>
                            ) : (
                                "ذخیره تغییرات"
                            )}
                        </Button>
                    </form>
                </div>
            </Card>
        </div>
    );
}
