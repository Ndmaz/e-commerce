 
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
export default function Singin(){

    return <div className="mt-[5rem] flex justify-center items-center">
      <div className="mt-[5rem]">
 <Card className="w-[25rem]">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl ml-auto">ورود</CardTitle>
        <CardDescription className="ml-auto">
         اطلاعات را وارد کنید تا وارد شوید
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="">
          
          <Button className="w-full" variant="outline">
           
            با گوگل وارد شوید
          </Button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              یا ادامه بدهید با
            </span>
          </div>
        </div>
        <div className="grid gap-2 ">
          <Label className="ml-auto" htmlFor="email">ایمیل</Label>
          <Input id="email" type="email" placeholder="m@example.com" />
        </div>
        <div className="grid gap-2">
          <Label className="ml-auto" htmlFor="password">رمز</Label>
          <Input id="password" type="password" />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">ورود</Button>
      </CardFooter>
    </Card>
    <div className="flex flex-row-reverse justify-center mt-4">
      <p className="text-ellipsis pt-1">ثبت نام نکرده اید؟ </p>
      <Button variant='link'><Link href='/sign-in/sign-up'>ثبت نام</Link></Button>
    </div>
    </div>
   
    </div>
}