"use client"
import { S3 } from 'aws-sdk';
 
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useMutation } from "react-query";


export default function Productmanagement(){


//state declaration state

  const [productname,setProductname]=useState('')
// const [productcode,setProductcode]=useState('')
   const [category,setcategory]=useState('')
   const [price,setprice]=useState('')
   const [img1,setimg1]=useState('')
   const [img2,setimg2]=useState('')
   const [img3,setimg3]=useState('') 
   const [img4,setimg4]=useState('')
   const [synopsis,setSynopsis]=useState('')
  // const [discripstion,setDiscription]=useState('')
 // const [details,setditals]=useState('')
const [returnvalue,setreturnvalue]=useState<Boolean>()
const [datasback,setdatasback]=useState()



  const [error, setError] = useState(null);
   const [uploadLink, setUploadLink] = useState(null);
  const [permanentLink, setPermanentLink] = useState<String[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [allFiles, setAllFiles] = useState([]);
  const [buckets, setBuckets] = useState([]);


//env variable section
const ACCESSKEY = process.env.NEXT_PUBLIC_LIARA_ACCESS_KEY               
const SECRETKEY = process.env.NEXT_PUBLIC_LIARA_SECRET_KEY                 
const ENDPOINT  =  process.env.NEXT_PUBLIC_LIARA_ENDPOINT
const BUCKET    = process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME




const handleUpload = async () => {
  const files=[img1,img2,img3,img4]
  files.map(async (file) => {

     try {
    //on no file the error state asks for the file
    if (!file) {
    
      return;
    }

    const s3 = new S3({
      accessKeyId: ACCESSKEY,
      secretAccessKey: SECRETKEY,
      endpoint: ENDPOINT,
    });
//the params has the bucket env and the file name as key and the file content as body
    const params = {
      Bucket: BUCKET,
      Key: file.name,
      Body: file,
    };
//the response uses the upload method of the s3 method and takes in the prams
    const response = await s3.upload(params).promise();

    // Get permanent link
    const permanentSignedUrl = s3.getSignedUrl('getObject', {
      Bucket: BUCKET,
      Key: file.name,
      Expires: 131536000, // 4 year
    });
    setPermanentLink((pervarray)=>[...pervarray,permanentSignedUrl]);

    console.log('File uploaded successfully');
  } catch (error) {
    setError('Error uploading file: ' + error.message);
  }
    
  })
 
}

const submitForm = async () => {

  try {
     
    const res= await fetch('/api/product',{
      method: 'POST'
       ,headers:{  'Content-Type':'application/json'}
      ,body:JSON.stringify({
        productname
        ,category
         ,price
         ,synopsis
         ,...permanentLink
      })
     

    })
    const datas= await res.json
   
    if (res.ok) {

      alert('Product created successfully!');
      setreturnvalue(true)
      setdatasback(datas) 
      
    } else {
      alert('Failed to create product!'+datas);
      
    }

  } catch (error) {
    console.log(error)
  }
}
const { mutate } = useMutation(submitForm);

  function Handlesubmit(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault()
    mutate()
   }


   

   // returned datas of the products, how can i 
    return (
    <div className="flex flex-col grow  bg-white md:w-[60vw] md:max-w-xl md:mx-auto pt-6 px-8 md:pt-3  md:mt-6  md:rounded-xl md:shadow-lg">

    <div className="text-right mr-6 space-y-4 p-4">
     
     <p className="font-bold ">ثبت محصول </p>
     <p>با وارد کردن اطلاعات محصول آنرا ثبت نمایید</p>
    </div>
    
     <form  onSubmit={Handlesubmit} className="p-4 space-y-4 text-right">
 {returnvalue?`'datasent' ${datasback}`:'not sent' }
   


         <div className="space-y-4">
         <Label className="" htmlFor="name">نام محصول 
           <Input name="name" type="text"  value={productname} onChange={(e)=>setProductname(e.target.value)} />
          </Label>
           <br />
           <Label className="" htmlFor="category">نوع محصول
           <Input name="category" type="text"  value={category} onChange={(e)=>setcategory(e.target.value)} />
           </Label>
           <br />
           <Label className="" htmlFor="price">قیمت
           <Input name="price" type="text"  value={price} onChange={(e)=>setprice(e.target.value)} />
        </Label>
           <br />
           <Label className="ml-auto" htmlFor="image">عکس کوچک محصول
           <Input name="image"  type="file"  value={img1} onChange={(e)=>setimg1(e.target.value)}/>
           </Label>
           <br />
           <Label className="ml-auto" htmlFor="image">عکس اصلی محصول
           <Input name="image"  type="file"  value={img2} onChange={(e)=>setimg2(e.target.value)}/>
           </Label> 
           <br />
           <Label className="ml-auto" htmlFor="image">عکس محصول جانبی1 
           <Input name="image"  type="file"  value={img3} onChange={(e)=>setimg3(e.target.value)}/>

           </Label>
           <br />
           <Label className="ml-auto" htmlFor="image">عکس محصول جانبی 2
           <Input name="image"  type="file"  value={img4} onChange={(e)=>setimg4(e.target.value)}/>
           </Label>
           <br />
           <Label className="" htmlFor="synopsis">توضیح کوتاه
           <Textarea name="synopsis"  value={synopsis} onChange={(e)=>setSynopsis(e.target.value)}  />
           </Label>
           </div>
           <Button  type="submit" className="w-full">ثبت محصول</Button>
        
 
     </form>
     <div className="mt-4 mb-28 md:mb-4 mx-auto text-right">
           
     </div>
     </div>
 )
} 

