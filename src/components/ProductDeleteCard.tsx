"use client";

import { Product } from "@/types/product";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { CgSpinner } from "react-icons/cg";
import { CheckIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Badge } from "./ui/badge";

interface ProductDeleteCardProps {
    product: Product;
    onDelete: (product: Product) => void;
    isDeleting: boolean;
    isSuccess: boolean;
}

export default function ProductDeleteCard({
    product,
    onDelete,
    isDeleting,
    isSuccess,
}: ProductDeleteCardProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleDelete = () => {
        onDelete(product);
        setIsDialogOpen(false);
    };

    return (
        <Card className="p-6">
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{product.productname}</h3>
                    <div className="flex items-center gap-2">
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button variant="destructive" disabled={isDeleting}>
                                    {isDeleting ? (
                                        <>
                                            <CgSpinner className="animate-spin ml-2" />
                                            در حال حذف...
                                        </>
                                    ) : (
                                        "حذف محصول"
                                    )}
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>تایید حذف محصول</DialogTitle>
                                    <DialogDescription>
                                        آیا از حذف محصول "{product.productname}" اطمینان دارید؟
                                        این عملیات قابل بازگشت نیست.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="flex justify-end gap-2 mt-4">
                                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                                        انصراف
                                    </Button>
                                    <Button variant="destructive" onClick={handleDelete}>
                                        حذف محصول
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                        {isSuccess && (
                            <CheckIcon className="text-green-600" />
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <p className="text-sm text-gray-500">کد محصول</p>
                        <p className="font-medium">{product.productcode}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">دسته‌بندی</p>
                        <p className="font-medium">{product.category}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">برند</p>
                        <p className="font-medium">{product.brand}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">موجودی</p>
                        <p className="font-medium">{product.quanity} عدد</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">قیمت</p>
                        <p className="font-medium">{product.price.toLocaleString()} تومان</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">تخفیف</p>
                        <p className="font-medium">{product.priceoff || 0}%</p>
                    </div>
                </div>

                {product.synopsis && (
                    <div>
                        <p className="text-sm text-gray-500">توضیح کوتاه</p>
                        <p className="font-medium">{product.synopsis}</p>
                    </div>
                )}

                {product.details && (
                    <div>
                        <p className="text-sm text-gray-500 mb-2">مشخصات محصول</p>
                        <div className="flex flex-wrap gap-2">
                            {(typeof product.details === 'string' ? JSON.parse(product.details) : product.details).map((detail: { detailname: string; detailvalue: string }, index: number) => (
                                <Badge key={index} variant="secondary">
                                    {detail.detailname}: {detail.detailvalue}
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </Card>
    );
} 