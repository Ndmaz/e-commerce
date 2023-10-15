'use client'
import {signIn,signOut} from 'next-auth/react'
import { Button } from "./ui/button"


export const LoginButton=()=>{
    return <Button variant="outline" onClick={()=>{signIn()}}>ورود</Button>
}
export const LogOutButton=()=>{
    return <Button  variant='destructive' onClick={()=>{signOut()}}>خروج</Button>
}