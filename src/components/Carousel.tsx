import Image from "next/image"
import pic from '@/app/1.jpg'
import { Suspense } from "react"
function Carousel() {
    const bootstrap= [
        {
          "id": 1,
          "title": "Photography",
          "body": "Bootstrap Carousel Example",
          "imageUrl": "https://res.cloudinary.com/kizmelvin/image/upload/v1586799813/kizmelvin/persons_pigeon_nurkq2.jpg",
          "docs": "https://getbootstrap.com/docs/4.0/components/carousel/"
        },
        {
          "id": 2,
          "title": "City Views",
          "body": "Bootstrap Carousel Example",
          imageUrl: "https://res.cloudinary.com/kizmelvin/image/upload/v1587785064/kizmelvin/michael-BcgEo2CNeYA-unsplash_cdaruk.jpg",
          "docs": "https://getbootstrap.com/docs/4.0/components/carousel/"
        },
        {
          "id": 3,
          "title": "Wild Life",
          "body": "Bootstrap Carousel Example",
          "imageUrl": "https://res.cloudinary.com/kizmelvin/image/upload/v1586799827/kizmelvin/brownlion_qm8hah.jpg",
          "docs": "https://getbootstrap.com/docs/4.0/components/carousel/"
        },
        {
          "id": 4,
          "title": "Foods and Culture",
          "body": "Bootstrap Carousel Example",
          "imageUrl": "https://res.cloudinary.com/kizmelvin/image/upload/v1587870308/kizmelvin/edvin-johansson-5AylXcpJn1I-unsplash_lbhgod.jpg",
          "docs": "https://getbootstrap.com/docs/4.0/components/carousel/"
        }
      ]
  return (
  <div className="">
        
        carousel
        <Suspense>
        <Image
        src={pic}
        width={600}
        height={500}
        alt="dd"
        className=""
        /></Suspense>
   </div>
  )
}

export default Carousel