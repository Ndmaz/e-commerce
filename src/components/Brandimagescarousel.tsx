import { useAGetbrands } from "@/store/AsyncStore/useAGetbrands";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import Image from "next/image";
export default function Brandimagescarousel() {
  const { data } = useAGetbrands();
  const [emblaRef] = useEmblaCarousel();
  return (
    <div className="flex" ref={emblaRef}>
      <div className="flex mx-auto space-x-4">
        {data?.map((item) => {
          return <div key={item.id}>
             <Image
                    className="h-[20rem] rounded-md  "
                    width={200}
                    height={200}
                    alt="ss"
                    src={item.brandimage}
                  />
            {item.name}
            </div>;
        })}
      </div>
    </div>
  );
}
