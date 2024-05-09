import Image from "next/image"
import pic from '@/app/1.jpg'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
function Carouselhandle() {
   
  return (
  <div className="ml-10 w-[90vw]">
        
      
        <Carousel className="m-1 w-full h-40"> 
        
        <CarouselContent>
    <CarouselItem className="">
       
        <Image
        src={pic}
       fill={true}
        alt="dd"
        className=""
        /></CarouselItem>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
      <CarouselNext />
        </Carousel>
       
   </div>
  )
}

export default Carouselhandle