"use client"
import { S3 } from 'aws-sdk';
import{ S3Client, PutObjectCommand ,GetObjectCommand} from '@aws-sdk/client-s3'
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { CheckIcon } from '@radix-ui/react-icons';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CgSpinner } from "react-icons/cg";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useMutation } from "react-query";
import Image from 'next/image';
import { MdPlaylistAdd } from "react-icons/md"

export default function Productmanagement(){


//state declaration 
//input value states
   const [productname,setProductname]=useState('')
   const [productcode,setProductcode]=useState('')
   const [category,setcategory]=useState('')
   const [price,setprice]=useState('')
   const [quanity,setquanity]=useState('')
   const [synopsis,setSynopsis]=useState('')
   const [description,setDescription]=useState('')
   //permenant link is an object that holds the value to the urls
   interface Linktypes{
    pic1:string
    pic2:string
    pic3:string
    pic4:string
   }
   const [permanentLink, setPermanentLink] = useState<Linktypes>({
    pic1:""
    ,pic2:""
    ,pic3:""
    ,pic4:""
   });
   const [details,setdetails]=useState([])
   const [key1,setkey1]=useState('')
   const [key2,setkey2]=useState('')
//runtime handling states
  const [returnvalue,setreturnvalue]=useState<Boolean>()
  const [datasback,setdatasback]=useState()
  const [error, setError] = useState<String>();
 const [issubmiting,setissubmiting]=useState<Boolean>(false)
//env variable section
const ACCESSKEY : string|undefined = process.env.NEXT_PUBLIC_LIARA_ACCESS_KEY               
const SECRETKEY : string|undefined= process.env.NEXT_PUBLIC_LIARA_SECRET_KEY                 
const ENDPOINT : string|undefined =  process.env.NEXT_PUBLIC_LIARA_ENDPOINT
const BUCKET : string|undefined   = process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME



async function handleUpload(e:React.ChangeEvent<HTMLInputElement>) {

  const file=e.target.files[0]
 
 try {

    if (!file) {
    setError('there is no file selected')
      return;
    }
/*
    const client = new S3Client({ 
         region: "default"
    ,endpoint:  ENDPOINT
    ,credentials: {
      accessKeyId: ACCESSKEY as string
      ,secretAccessKey: SECRETKEY as string
    }
  })

  const params = {
    Bucket: BUCKET,
    Key: file.name,
    Body: file,
  }
  await client.send(new PutObjectCommand(params))
  
  const command = new GetObjectCommand(params);
  await getSignedUrl(client, command,{ expiresIn:  131536000 }).then((url) =>setPermanentLink((pervarray)=>[...pervarray,url]));
*/

    const s3 = new S3(
      
      {
      accessKeyId: ACCESSKEY,
      secretAccessKey: SECRETKEY,
      endpoint: ENDPOINT,
      region: "default"
    });
    const params = {
      Bucket: BUCKET,
      Key: file.name,
      Body: file,
      
    }
  
    console.log(s3)
    const response = await s3.upload(params).promise();

    console.log(response)
    // Get permanent link
    const permanentSignedUrl = await s3.getSignedUrl('getObject', {
      Bucket: BUCKET,
      Key: file.name,
      Expires: 131536000, // 4 year
    });
    
    setPermanentLink();


    console.log('File uploaded successfully');

  } catch (error) {
    setError('Error uploading file: ' + error.message);
  }
  
}

const submitForm = async () => {
  try {
    setissubmiting(true)
    const res= await fetch('/api/product',{
      method: 'POST'
       ,headers:{  'Content-Type':'application/json'}
      ,body:JSON.stringify({
        productname
        ,productcode
        ,category
         ,price
         ,quanity
         ,synopsis
         ,description
         ,details
         ,permanentLink
      })
     
    })
    const datas= await res.json
    setissubmiting(false)
    if (res.ok) {

      alert('Product created successfully!');
    
      
      
    } else {
      alert('Failed to create product!');
      
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
 
   
  {error}

         <div className="space-y-4">
         <Label className="" htmlFor="name">نام محصول 
           <Input name="name" type="text"  value={productname} onChange={(e)=>setProductname(e.target.value)} />
          </Label>
           <br />
           <Label className="" htmlFor="productcode">کد محصول
           <Input name="productcode" type="text"  value={productcode} onChange={(e)=>setProductcode(e.target.value)} />
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

<Label className="" htmlFor="quanity">تعداد
<Input name="quanity" type="text"  value={quanity} onChange={(e)=>setquanity(e.target.value)} />
</Label>
        <br />
           <Label className="" htmlFor="synopsis">توضیح کوتاه
           <Textarea name="synopsis"  value={synopsis} onChange={(e)=>setSynopsis(e.target.value)}  />
           </Label>
           <br />
           <Label className="" htmlFor="description">توضیح کامل
           <Textarea name="description"  value={description} onChange={(e)=>setDescription(e.target.value)}  />
           </Label>
           <br />
            <Label  htmlFor="detail">
       مشخصات      
       <div className='flex ' dir='rtl'>
        <Input className='ml-1' name="detailname" type="text"  placeholder='مشخصه'  value={key1} onChange={(e)=>setkey1(e.target.value)}/>
        <Input  name="detailvalue" type="text"  placeholder='توصیف' value={key2} onChange={(e)=>setkey2(e.target.value)}/>
        </div>
        <MdPlaylistAdd className='text-xl' onClick={()=>{
          setdetails((perv)=>[...perv,{detailname:key1,detailvalue:key2}])
          setkey1('')
          setkey2('')
        }}/>
  
            </Label>
            <div>
{details.map((detail)=>{

return <div className='flex flex-grow justify-center' key={detail.detailname}><p className=''>{detail.detailvalue}:{detail.detailname}</p></div>
})}
            </div>


           <br /> 
           <Label className="ml-auto" htmlFor="image">عکس کوچک محصول
           <Input name="image"  type="file"   onChange={handleUpload}/>
            {permanentLink[0]&&<CheckIcon className='text-green-600 ' />}
           </Label>
           <br />
           <Label className="ml-auto" htmlFor="image">عکس اصلی محصول
           <Input name="image"  type="file"   onChange={handleUpload}/>
           {permanentLink[1]&&<CheckIcon className='text-green-600 ' />} 
           </Label> 
           <br />
           <Label className="ml-auto" htmlFor="image">عکس محصول جانبی1 
           <Input name="image"  type="file"   onChange={handleUpload}/>
           {permanentLink[2]&&<CheckIcon className='text-green-600 ' />} 
           </Label>
           <br />
           <Label className="ml-auto" htmlFor="image">عکس محصول جانبی 2
           <Input name="image"  type="file"  onChange={handleUpload}/>
           {permanentLink[3]&&<CheckIcon className='text-green-600 ' />} 
           </Label>
        
           
           </div>
           <Button  type="submit" className="w-full">ثبت محصول   {issubmiting&&<CgSpinner className='animate-spin' />}</Button>
        
 
     </form>
     <div className="mt-4 mb-28 md:mb-4 mx-auto text-right">
           
     </div>
     </div>
 )
} 

