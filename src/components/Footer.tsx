'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FiPhone, FiMail, FiMapPin, FiInstagram, FiTwitter } from 'react-icons/fi';
import { FaTelegram } from 'react-icons/fa';
import { useFooterInfo } from '@/store/AsyncStore/useFooterInfo';
import { useGeneralData } from '@/store/AsyncStore/useGeneralData';
import { CgSpinner } from "react-icons/cg";

const footerLinks = {
  quickLinks: [
    { label: 'صفحه اصلی', href: '/' },
    { label: 'محصولات', href: '/products' },
    { label: 'درباره ما', href: '/about' },
    { label: 'پنل کاربری', href: '/panel' },
  ],

  support: [
    { label: 'راهنمای خرید', href: '/guide' },
    { label: 'شرایط بازگشت', href: '/returns' },
    { label: 'حریم خصوصی', href: '/privacy' },
    { label: 'سوالات متداول', href: '/faq' },
  ],
} as const;

export default function Footer() {
  const { data: footerData, isLoading: isLoadingFooter, error: footerError } = useFooterInfo();
  const { data: generalData, isLoading: isLoadingGeneral } = useGeneralData();

  if (isLoadingFooter || isLoadingGeneral) {
    return (
      <div className="flex justify-center items-center h-40">
        <CgSpinner className="animate-spin text-4xl text-gray-400" />
      </div>
    );
  }

  if (footerError || !footerData || !generalData) {
    return null;
  }

  const { contactInfo, socialMedia } = footerData;

  return (
    <footer className="bg-gray-900 text-gray-300" dir="rtl">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 relative">
                {generalData.logoimage ? (
                  <Image
                    src={generalData.logoimage}
                    alt="Logo"
                    fill
                    className="object-contain"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                    <span className="text-xs text-gray-400">لوگو</span>
                  </div>
                )}
              </div>
              <h3 className="text-xl font-bold text-white">کوهنوردی</h3>
            </div>
            <p className="text-sm leading-relaxed">
              {generalData.description || 'ارائه دهنده بهترین تجهیزات کوهنوردی و طبیعت‌گردی با کیفیت برتر و قیمت مناسب'}
            </p>
            <div className="flex items-center gap-4 pt-2">
              {socialMedia.instagram && (
                <a href={socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                  <FiInstagram className="text-xl" />
                </a>
              )}
              {socialMedia.telegram && (
                <a href={socialMedia.telegram} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                  <FaTelegram className="text-xl" />
                </a>
              )}
              {socialMedia.twitter && (
                <a href={socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                  <FiTwitter className="text-xl" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">دسترسی سریع</h3>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="hover:text-blue-400 transition-colors text-sm"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">اطلاعات تماس</h3>
            <ul className="space-y-3">
              {contactInfo.phone && (
                <li className="flex items-center gap-2 text-sm">
                  <FiPhone className="text-blue-400" />
                  <span>{contactInfo.phone}</span>
                </li>
              )}
              {contactInfo.email && (
                <li className="flex items-center gap-2 text-sm">
                  <FiMail className="text-blue-400" />
                  <span>{contactInfo.email}</span>
                </li>
              )}
              {contactInfo.address && (
                <li className="flex items-center gap-2 text-sm">
                  <FiMapPin className="text-blue-400" />
                  <span>{contactInfo.address}</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
          <p>
            تمامی حقوق این وبسایت محفوظ است © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}