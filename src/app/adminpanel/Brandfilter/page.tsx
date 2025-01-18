"use client";
import { Input } from "@/components/ui/input";
import { useAGetcategories } from "@/store/AsyncStore/useAGetcategories";
import { S3 } from "aws-sdk";
import { useState } from "react";
import { CheckIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { useAPostcategoryimage } from "@/store/AsyncStore/useAPostcategoryimage";
import { CgSpinner } from "react-icons/cg";
import { useAPostbrandimage } from "@/store/AsyncStore/useAPostbrandimage";
import { useAGetbrands } from "@/store/AsyncStore/useAGetbrands";
export default function Brandfilter() {
  //aws s3 bucket call 
  const { data, isLoading } = useAGetbrands();
  const [brandvalue, setbrandvalue] = useState("");
  const [fileuploaderror, setfileuploaderror] = useState("");
  const [brandimageurl, setbrandimageurl] = useState();

  const ACCESSKEY: string | undefined =
    process.env.NEXT_PUBLIC_LIARA_ACCESS_KEY;
  const SECRETKEY: string | undefined =
    process.env.NEXT_PUBLIC_LIARA_SECRET_KEY;
  const ENDPOINT: string | undefined = process.env.NEXT_PUBLIC_LIARA_ENDPOINT;
  const BUCKET: string | undefined = process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME;

  const mutation = useAPostbrandimage(brandvalue, brandimageurl);

  async function uploadfile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files[0];
    if (!file) {
      setfileuploaderror("there is no file");
      return;
    }
    const allowedTypes = ['image/jpeg', 'image/png'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (!allowedTypes.includes(file.type)) {
      setfileuploaderror("Unsupported file type");
      return;
    }
    if (file.size > maxSize) {
      setfileuploaderror("File size exceeds limit");
      return;
    }
    try {
      const s3 = new S3({
        accessKeyId: ACCESSKEY,
        secretAccessKey: SECRETKEY,
        endpoint: ENDPOINT,
        region: "default",
      });
      const params = {
        Bucket: BUCKET,
        Key: file.name,
        Body: file,
      };
      await s3.upload(params).promise();

      const permanentSignedUrl = await s3.getSignedUrl("getObject", {
        Bucket: BUCKET,
        Key: file.name,
        Expires: 131536000, // 4 year
      });

      setbrandimageurl(permanentSignedUrl);
      console.log(brandimageurl);
    } catch (error) {
      console.error("File upload error:", error);
      setfileuploaderror("Failed to upload file. Please try again.");
    }
  }

  return (
    <div dir="rtl" className="md:pt-16">

      <div className="bg-white p-4  md:w-[90%] min-h-[100vh] md:mx-auto md:rounded-md">
        <div className="flex my-2">
          <p>برندها:</p>
          {isLoading && <CgSpinner className="animate-spin" />}
          <select
            name="brands"
            id="brands"
            value={brandvalue}
            onChange={(e) => setbrandvalue(e.target.value)}
          >
            <option value="">هیجکدام</option>
            {data?.map((categoryitem) => {
              return (
                <option key={categoryitem.id} value={categoryitem.id}>
                  {categoryitem.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex mb-2">
          <p>اضافه کردن عکس:{brandvalue}</p>
          {fileuploaderror}
          {brandimageurl && <CheckIcon className="text-green-600" />}
          <Input
            className="w-[50%]"
            type="file"
            onChange={uploadfile}
            disabled={brandvalue == ""}
          />
        </div>

        <Button onClick={mutation.mutate}>
          اعمال نغییرات
          {mutation.isLoading && <CgSpinner className="animate-spin" />}
        </Button>
        {mutation.isSuccess && <CheckIcon className="text-green-600" />}

      </div>
    </div>
  )
}
