import Image from "next/image";
import pic from "@/app/1.jpg";

export default function Productcard({
  productname,
  productcode,
  price,
  priceoff,
  images,
}) {
  //handling image render
  const imagess = JSON.parse(images);
  const imagesss =
    images == `{"pic1":"","pic2":"","pic3":"","pic4":""}` ? false : imagess;
  //percent discounted
  const s = price - priceoff;
  const d = 100 / price;
  const discountedpercent = parseInt(s * d);
  return (
    <div
      className="flex flex-col relative content-between h-[16rem] md:block w-[15rem] mt-4 ml-7 p-1 "
      dir="rtl"
    >
      {priceoff != null && (
        <div className="absolute bg-[#f85284c7] rounded-bl-md">
          {discountedpercent}%
        </div>
      )}
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
        <div className="flex justify-between">
          <p>{priceoff != null ? priceoff : price}</p>
          <p className="line-through text-[#6868685b]">{price}</p>
        </div>
      </div>
    </div>
  );
}
3;
