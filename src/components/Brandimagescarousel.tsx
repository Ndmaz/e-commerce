import { useAGetbrands } from "@/store/AsyncStore/useAGetbrands";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import Image from "next/image";
import { useCallback } from "react";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { CgSpinner } from "react-icons/cg";

type Brand = {
  id: string;
  name: string;
  brandimage: string;
}

export default function Brandimagescarousel() {
  const { data, isLoading } = useAGetbrands();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1
  });

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <CgSpinner className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  if (!data?.length) return null;

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {data.map((brand: Brand) => (
            <div key={brand.id} className="flex-[0_0_100%] md:flex-[0_0_33.33%] lg:flex-[0_0_25%] p-2">
              <Link
                href=""
                className="block bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
              >
                <div className="aspect-[3/2] relative overflow-hidden">
                  <Image
                    src={brand.brandimage}
                    alt={brand.name}
                    fill
                    className="object-contain p-4 transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-medium text-gray-900">
                    {brand.name}
                  </h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 
                 hover:bg-white shadow-md transition-all duration-200 hover:scale-110"
      >
        <MdKeyboardDoubleArrowLeft className="text-2xl text-gray-800" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 
                 hover:bg-white shadow-md transition-all duration-200 hover:scale-110"
      >
        <MdKeyboardDoubleArrowRight className="text-2xl text-gray-800" />
      </button>
    </div>
  );
}
