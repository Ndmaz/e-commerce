import React, { useCallback, useState, useEffect } from "react";
import { Button } from "./ui/button";
import { usePPD } from "@/store/usePPD";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import Image from "next/image";
import pic from "@/app/1.jpg";
import { useCartproducts } from "@/store/useCartproducts";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType } from "embla-carousel";
import { toast } from "@/store/use-toast";

type ProductInfo = {
  id: string;
  productname: string;
  price: number;
  synopsis: string;
  images: string;
}

export default function ProductDisone() {
  const mainCarouselOptions = {
    align: 'start',
    containScroll: false,
    dragFree: false,
    loop: true
  } as const;

  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(mainCarouselOptions);
  const [emblaThumbRef, emblaThumbApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
    align: 'start'
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const productInfo = usePPD((state) => state.productinfo) as ProductInfo;
  const { products, productschange: setProducts } = useCartproducts((state) => ({
    products: state.products as ProductInfo[],
    productschange: state.productschange
  }));

  // Parse and validate images
  const images = (() => {
    try {
      const parsed = JSON.parse(productInfo.images);
      if (parsed && typeof parsed === 'object') {
        // Create an array of image entries from pic2 to pic4 (skipping pic1)
        const imageEntries = ['pic2', 'pic3', 'pic4']
          .map(key => parsed[key])
          .filter(url => url && url !== "");

        return imageEntries.length > 0 ? imageEntries : [pic];
      }
    } catch (e) {
      console.error('Error parsing images:', e);
    }
    return [pic];
  })();

  const scrollPrev = useCallback(() => {
    if (emblaMainApi) emblaMainApi.scrollPrev();
  }, [emblaMainApi]);

  const scrollNext = useCallback(() => {
    if (emblaMainApi) emblaMainApi.scrollNext();
  }, [emblaMainApi]);

  const onThumbClick = useCallback((index: number) => {
    if (!emblaMainApi || !emblaThumbApi) return;
    emblaMainApi.scrollTo(index);
  }, [emblaMainApi, emblaThumbApi]);

  // Update selectedIndex when carousel scrolls
  const onSelect = useCallback(() => {
    if (!emblaMainApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi]);

  // Subscribe to carousel select event
  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on('select', onSelect);
    emblaMainApi.reInit();
    return () => {
      emblaMainApi.off('select', onSelect);
    };
  }, [emblaMainApi, onSelect, images]);

  const handleAddToCart = () => {
    if (products.some(item => item.id === productInfo.id)) {
      toast({
        title: "سبد خرید:",
        description: "این محصول قبلاً به سبد خرید اضافه شده است",
        variant: "destructive"
      });
      return;
    }

    const updatedProducts = [...products, productInfo];
    setProducts(updatedProducts);
    localStorage.setItem('cartproducts', JSON.stringify(updatedProducts));

    toast({
      title: "سبد خرید:",
      description: "محصول با موفقیت اضافه شد",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-8" dir="rtl">
        {/* Image Gallery Section */}
        <div className="space-y-4">
          {/* Main Carousel */}
          <div className="relative rounded-lg overflow-hidden bg-gray-100">
            <div ref={emblaMainRef} className="overflow-hidden">
              <div className="flex">
                {images.map((url, index) => (
                  <div key={`main-${index}`} className="flex-[0_0_100%] min-w-0 relative aspect-square">
                    <Image
                      src={url}
                      fill
                      priority={index === 0}
                      alt={`تصویر ${index + 1} محصول`}
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Only show navigation buttons if there are multiple images */}
            {images.length > 1 && (
              <>
                <button
                  onClick={scrollPrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 
                           hover:bg-white shadow-md transition-all duration-200 hover:scale-110"
                >
                  <IoIosArrowDropleft className="text-2xl text-gray-800" />
                </button>
                <button
                  onClick={scrollNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 
                           hover:bg-white shadow-md transition-all duration-200 hover:scale-110"
                >
                  <IoIosArrowDropright className="text-2xl text-gray-800" />
                </button>
              </>
            )}
          </div>

          {/* Only show thumbnails if there are multiple images */}
          {images.length > 1 && (
            <div ref={emblaThumbRef} className="overflow-hidden">
              <div className="flex gap-2">
                {images.map((url, index) => (
                  <button
                    key={`thumb-${index}`}
                    onClick={() => onThumbClick(index)}
                    className={`flex-[0_0_20%] min-w-0 relative aspect-square rounded-lg overflow-hidden transition-all duration-200
                              ${selectedIndex === index ? 'ring-2 ring-blue-500 opacity-100' : 'opacity-60 hover:opacity-100'}`}
                  >
                    <Image
                      src={url}
                      fill
                      alt={`تصویر کوچک ${index + 1}`}
                      className="object-cover"
                      sizes="20vw"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Product Info Section */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {productInfo.productname}
            </h1>
            <div className="h-px bg-gray-200" />
          </div>

          <div className="prose prose-gray">
            <p className="text-gray-600 leading-relaxed">
              {productInfo.synopsis}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium text-gray-900">
                قیمت:
              </span>
              <span className="text-2xl font-bold text-blue-600">
                {new Intl.NumberFormat('fa-IR').format(productInfo.price)} تومان
              </span>
            </div>

            <Button
              onClick={handleAddToCart}
              className="w-full py-6 text-lg font-medium hover:scale-[1.02] transition-transform"
            >
              افزودن به سبد خرید
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
