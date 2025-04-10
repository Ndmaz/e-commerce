import { useQuery } from "@tanstack/react-query";



async function fetchFooterInfo() {
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