import { useQuery } from "@tanstack/react-query";

type GeneralData = {
    id: number;
    name: string;
    description: string;
    mainpageimage: string;
    logoimage: string;
    contactinfo: string;
    productcartonloadimage: string;
}

export function useGeneralData() {
    return useQuery<GeneralData>({
        queryKey: ['general'],
        queryFn: async () => {
            const response = await fetch('/api/getgeneral');
            if (!response.ok) {
                throw new Error('Failed to fetch general data');
            }
            return response.json();
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
        cacheTime: 1000 * 60 * 30, // 30 minutes
    });
} 