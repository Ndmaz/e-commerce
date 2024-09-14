import Image from "next/image";
import pic from "@/app/1.jpg";

export default function Productcard({
  productname,
  productcode,
  price,
  images,
}) {
  const imagess = JSON.parse(images);
  const imagesss =
    images == `{"pic1":"","pic2":"","pic3":"","pic4":""}` ? false : imagess;

  return (
    <div
      className="flex flex-col content-between h-full md:block w-[15rem] mt-4 ml-7 p-1 "
      dir="rtl"
    >
      <div className=" ">
        <Image
          src={imagesss == false ? pic : imagesss.pic1}
          width={300}
          height={200}
          alt="dd"
          className="h-[10rem] "
        />
      </div>
      <div className="felx   ">
        <p className="text-right ">{productname}</p>
        {productcode}
        <p>{price}</p>
      </div>
    </div>
  );
}
3;
