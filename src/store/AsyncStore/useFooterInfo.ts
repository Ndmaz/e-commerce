import { useQuery } from "@tanstack/react-query";

interface FooterInfo {
    description: string;
    logoImage: string;
    contactInfo: {
        phone: string;
        email: string;
        address: string;
    };
    socialMedia: {
        instagram?: string;
        telegram?: string;
        twitter?: string;
    };
    footerLinks: {
        quickLinks: Array<{ label: string; href: string }>;
        categories: Array<{ label: string; href: string }>;
        support: Array<{ label: string; href: string }>;
    };
}

async function fetchFooterInfo(): Promise<FooterInfo> {
    const response = await fetch("/api/getfooterinfo");
    if (!response.ok) {
        throw new Error("Failed to fetch footer information");
    }
    return response.json();
}

export const useFooterInfo = () => {
    return useQuery({
        queryKey: ["footerInfo"],
        queryFn: fetchFooterInfo
    });
}; 