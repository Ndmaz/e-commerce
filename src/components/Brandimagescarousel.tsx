import { useAGetbrands } from "@/store/AsyncStore/useAGetbrands";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import Image from "next/image";
export default function Brandimagescarousel() {
  const { data } = useAGetbrands();
  const [emblaRef] = useEmblaCarousel();
  return (
    <div className="flex overflow-hidden" ref={emblaRef}>
      <div className="flex mx-auto space-x-4">
        {data?.map((item) => {
          return <Link className="flex-[0_0_40%] md:flex-[0_0_20%]" key={item.id} href=''>
             <Image
                    className="h-[20rem] rounded-md  "
                    width={200}
                    height={200}
                    alt="ss"
                    src={item.brandimage}
                  />
            {item.name}
            </Link>;
        })}
      </div>
    </div>
  );
}
