'use client'
import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useMutation } from "react-query";
import { CgSpinner } from "react-icons/cg";
import { CheckIcon } from "@radix-ui/react-icons";
import { S3 } from 'aws-sdk';
import { usePE } from "@/store/usePE";

export default  function ImageEdit() {
  const productinfo= usePE((state)=>state.productsinfo)
  const fieldname= usePE((state)=>state.fieldname)
  const [imagechecked,setimagechecked]=useState('')
  const id = productinfo.id
  const images=JSON.parse(productinfo.images)
 const [Editinput,setEditinput]=useState(images)
 
const[uploadsuccess,setuploadsuccess]=useState({
  1:false,
  2:false,
  3:false,
  4:false
})
 const [error, setError] = useState<String>();

 //env variable section
const ACCESSKEY : string|undefined = process.env.NEXT_PUBLIC_LIARA_ACCESS_KEY               
const SECRETKEY : string|undefined= process.env.NEXT_PUBLIC_LIARA_SECRET_KEY                 
const ENDPOINT : string|undefined =  process.env.NEXT_PUBLIC_LIARA_ENDPOINT
const BUCKET : string|undefined   = process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME



 async function handleuploadfile(e:React.ChangeEvent<HTMLInputElement>) {
  const file=e.target.files[0]
  try {

    if (!file) {
    setError('there is no file selected')
      return;
    }


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
  
    
    const response = await s3.upload(params).promise();

    
    // Get permanent link
    const permanentSignedUrl = await s3.getSignedUrl('getObject', {
      Bucket: BUCKET,
      Key: file.name,
      Expires: 131536000, // 4 year
    });
   
    switch(imagechecked){
      case 'عکس کوچک محصول': 
      setEditinput((prev)=>({...prev,pic1:permanentSignedUrl}))
      setuploadsuccess((perv)=>({...perv,1:true}))
      break
      case 'عکس اصلی محصول':
        setEditinput((prev)=>({...prev,pic2:permanentSignedUrl}))
        setuploadsuccess((perv)=>({...perv,2:true}))
        break
      case 'عکس محصول جانبی1':
        setEditinput((prev)=>({...prev,pic3:permanentSignedUrl}))
        setuploadsuccess((perv)=>({...perv,3:true}))
        break
      case 'عکس محصول جانبی 2':
        setEditinput((prev)=>({...prev,pic4:permanentSignedUrl}))
        setuploadsuccess((perv)=>({...perv,4:true}))
        break
    }

    console.log('File uploaded successfully');

  } catch (error) {
    setError('Error uploading file: ' + error.message);
  }
 }
async function  mutate(){

  try {
    const res=await fetch('http://localhost:3000/api/PEmodifying',{
      method:'POST'
      ,headers:{'Content-Type':'application/json'}
      ,body:JSON.stringify({Editinput,id,fieldname})
    })
    if(res.ok){
      return res.json()
    }
    
  } catch (error) {
    
  }
}
const mutation=useMutation(mutate)
  return (
    <div className=" flex flex-col">

      <label htmlFor="">عکس کوچک محصول 
      <input 
      type="radio" 
      name="dd" 
      id="" 
      value='عکس کوچک محصول' 
      checked={imagechecked==='عکس کوچک محصول'} 
      onChange={(e)=>setimagechecked(e.target.value)} />
      </label>{ uploadsuccess[1] ?<CheckIcon className='text-green-600 ' />:''}
      <label htmlFor="">عکس اصلی محصول
      <input 
      type="radio" 
      name="dd" 
      id="" 
      value='عکس اصلی محصول' 
      checked={imagechecked==='عکس اصلی محصول'} 
      onChange={(e)=>setimagechecked(e.target.value)} />
      </label>{ uploadsuccess[2] ?<CheckIcon className='text-green-600 ' />:''}
      <label htmlFor="">عکس محصول جانبی1 
      <input 
      type="radio" 
      name="dd" 
      id="" 
      value='عکس محصول جانبی1' 
      checked={imagechecked==='عکس محصول جانبی1'} 
      onChange={(e)=>setimagechecked(e.target.value)} />
      </label>{ uploadsuccess[3] ?<CheckIcon className='text-green-600 ' />:''}
      <label htmlFor="">عکس محصول جانبی 2 
     <input 
      type="radio" 
      name="dd" 
      id="" 
      value='عکس محصول جانبی 2' 
      checked={imagechecked==='عکس محصول جانبی 2'} 
      onChange={(e)=>setimagechecked(e.target.value)} />
      </label> { uploadsuccess[4] ?<CheckIcon className='text-green-600 ' />:''}
      
<div className="flex space-x-4 items-center ">

   <Label className="m-4  ">{imagechecked}</Label>
   <Input className="w-[40vw]" name={imagechecked} type="file"  onChange={handleuploadfile} />  

  <Button type="button" className=" my-auto" onClick={mutation.mutate}>
    ثبت تغیر
    {mutation.isLoading&&<CgSpinner strokeWidth='1' className='animate-spin text-5xl' />}
    {mutation.isSuccess&&<CheckIcon className='text-green-600 ' />}
    </Button>

{error}
    </div>
   <p className="overflow-auto">{JSON.stringify(Editinput)}</p> 
    </div>
  )
}
