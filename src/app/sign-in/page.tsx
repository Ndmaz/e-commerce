"use client"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { CgSpinner } from "react-icons/cg"
import { FcGoogle } from "react-icons/fc"
import { useToast } from "@/store/use-toast"

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/panel';
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl,
      });

      if (result?.error) {
        setError('ایمیل یا رمز عبور اشتباه است');
      } else {
        toast({
          title: "ورود موفقیت‌آمیز",
          description: "در حال انتقال به پنل کاربری...",
        });
        setTimeout(() => {
          router.push(callbackUrl);
          router.refresh();
        }, 2000);
      }
    } catch (error) {
      setError('خطا در ورود به سیستم');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setGoogleLoading(true);
      toast({
        title: "در حال اتصال به گوگل",
        description: "لطفاً منتظر بمانید...",
      });
      await signIn("google", { callbackUrl });
    } catch (error) {
      setError('خطا در ورود با گوگل');
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            ورود به حساب کاربری
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            برای دسترسی به پنل مدیریت وارد شوید
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <Button
              type="button"
              className="w-full flex items-center justify-center gap-2"
              variant="outline"
              onClick={handleGoogleSignIn}
              disabled={googleLoading}
            >
              {googleLoading ? (
                <CgSpinner className="animate-spin" />
              ) : (
                <FcGoogle className="text-xl" />
              )}
              ورود با گوگل
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  یا ورود با ایمیل
                </span>
              </div>
            </div>

            <div>
              <Label htmlFor="email">ایمیل</Label>
              <Input
                id="email"
                type="email"
                required
                className="mt-1"
                placeholder="example@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="password">رمز عبور</Label>
              <Input
                id="password"
                type="password"
                required
                className="mt-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <div className="text-sm text-red-600 text-right">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <CgSpinner className="animate-spin ml-2" />
                  در حال ورود...
                </>
              ) : (
                "ورود"
              )}
            </Button>
          </div>
        </form>

        <div className="text-center text-sm">
          <span className="text-gray-500">حساب کاربری ندارید؟</span>
          <Link href="/sign-in/sign-up" className="font-medium text-primary hover:text-primary/90 mr-2">
            ثبت نام کنید
          </Link>
        </div>
      </Card>
    </div>
  );
}