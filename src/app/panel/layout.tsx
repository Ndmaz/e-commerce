import { getServerSession } from 'next-auth'
import authOptions from '@/lib/auth'
import Link from 'next/link'
import { 
  FaUserCog, 
  FaUserCircle, 
  FaShoppingCart, 
  FaSignOutAlt 
} from 'react-icons/fa'
import { FiSettings } from 'react-icons/fi'

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions)
    
    // Temporary override - replace with real role check
    const isAdmin = true

    if (isAdmin) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
                <div className="text-center space-y-8 p-8 max-w-md">
                    <FiSettings className="h-16 w-16 text-blue-600 mx-auto animate-pulse" />
                    <h1 className="text-3xl font-bold text-gray-800">پنل مدیریت</h1>
                    <Link
                        href="/adminpanel"
                        className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-medium transition-all transform hover:-translate-y-1 shadow-lg"
                    >
                        ورود به داشبورد مدیریت
                        <FaSignOutAlt className="h-5 w-5 transform rotate-180" />
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-row-reverse">
            {/* Sidebar */}
            <aside className="w-80 bg-white h-screen sticky top-0 shadow-xl p-6 space-y-12" dir="rtl">
                <header className="space-y-4 border-b pb-8">
                    <div className="flex items-center gap-4">
                        <FaUserCircle className="h-12 w-12 text-gray-400" />
                        <div>
                            <h2 className="font-bold text-gray-800">{session?.user.name || 'کاربر'}</h2>
                            <p className="text-sm text-gray-500">سطح دسترسی: کاربر عادی</p>
                        </div>
                    </div>
                </header>

                <nav className="space-y-2">
                    <Link 
                        href="/panel/profile" 
                        className="flex items-center gap-3 p-4 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                        <FaUserCircle className="h-6 w-6" />
                        مدیریت اطلاعات کاربری
                    </Link>
                    <Link
                        href="/panel/orders"
                        className="flex items-center gap-3 p-4 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                        <FaShoppingCart className="h-6 w-6" />
                        مدیریت سفارشات
                    </Link>
                    <Link
                        href="/panel/settings"
                        className="flex items-center gap-3 p-4 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                        <FaUserCog className="h-6 w-6" />
                        تنظیمات حساب
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-8">
                    {children}
                </div>
            </main>
        </div>
    )
}