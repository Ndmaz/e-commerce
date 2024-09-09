import Image from "next/image";
import pic from "@/app/1.jpg";

export default function Productcard({
  productname,
  price,
  productid,
  images
}) {
    
    const imagess=JSON.parse(images)
  const imagesss = (images == `{"pic1":"","pic2":"","pic3":"","pic4":""}`) ? false:imagess

  return (
    <div className="flex flex-col content-between h-full md:block w-[20rem] mt-4 ml-7 p-1 border-[0.01rem] ">
      <div className="w-[12rem]  pl-[3px] border-[0.01rem] border-l-green-600 ">
        <Image
          src={(imagesss==false)?pic:imagesss.pic1}
          width={300}
          height={200}
          
          alt="dd"
          className="object-cover"
        />
      </div>
      <div className="felx   ">
        <p className="text-right ">{productname}</p>
        {productid}
        <p>{price}</p>
      </div>
    </div>
  );
}
3;
