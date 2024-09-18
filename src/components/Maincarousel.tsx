'use client'

import useEmblaCarousel from "embla-carousel-react"
import { useEffect } from "react"



export default function Maincarousel() {
    const [emblaRef,emblaApi] = useEmblaCarousel({loop:false})
    useEffect(() => {
        if (emblaApi) {
          console.log(emblaApi.slideNodes()) // Access API
        }
      }, [emblaApi])
  return (
    <div className="mt-4">
         <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        <div className=" min-w-0 flex-[0_0_100%]">Slide 1</div>
        <div className=" min-w-0 flex-[0_0_100%]">Slide 2</div>
        <div className="min-w-0 flex-[0_0_100%]">Slide 3</div>
      </div>
    </div>
    </div>
  )
}
