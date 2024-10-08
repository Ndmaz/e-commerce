import Link from "next/link";

import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import { LogOutButton, LoginButton } from "./SignAuth";

import { RxAvatar } from "react-icons/rx";
export default async function Avatarsection() {
    const session = await getServerSession(authOptions);
  return (
    <div>
        <RxAvatar />
         {session?.user.role == "USER" ? (
          <div>
            {" "}
            role is user
            <LogOutButton />
          </div>
        ) : (
          <div className="hidden md:block  md:mt-2 md:space-x-2">
            <LoginButton />
          </div>
        )}
    </div>
  )
}
