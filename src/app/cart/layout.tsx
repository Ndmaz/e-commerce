'use client';

import { usePathname } from 'next/navigation';

const steps = [
    { id: 1, title: 'سبد خرید', path: '/cart' },
    { id: 2, title: 'اطلاعات ارسال', path: '/cart/step2' },
    { id: 3, title: 'تایید و پرداخت', path: '/cart/step3' },
] as const;

export default function CartLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                {/* Progress Steps */}
                <div className="mb-8">
                    <div className="flex justify-center items-center">
                        {steps.map((step, index) => {
                            const isActive = pathname === step.path;
                            const isPast = steps.findIndex(s => s.path === pathname) > index;

                            return (
                                <div key={step.id} className="flex items-center">
                                  

                                    {/* Step Title */}
                                    <div className="mr-4">
                                        <p className={`text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                                            {step.title}
                                        </p>
                                    </div>
                                    {/* Step Circle */}
                                    <div
                                        className={`flex items-center justify-center w-10 h-10 rounded-full border-2 
                              ${isActive
                                                ? 'border-blue-600 bg-blue-600 text-white'
                                                : isPast
                                                    ? 'border-green-500 bg-green-500 text-white'
                                                    : 'border-gray-300 bg-white text-gray-500'}`}
                                    >
                                        <span className="text-sm font-medium">{step.id}</span>
                                    </div>
                                    {/* Connector Line */}
                                    {index < steps.length - 1 && (
                                        <div className="w-24 mx-4 h-0.5 bg-gray-200">
                                            <div
                                                className={`h-full transition-all duration-300 ease-in-out
                                  ${isPast ? 'bg-green-500' : 'bg-gray-200'}`}
                                                style={{ width: isActive ? '50%' : isPast ? '100%' : '0%' }}
                                            />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Page Content */}
                <div className="bg-white rounded-lg shadow-sm">
                    {children}
                </div>
            </div>
        </div>
    );
}