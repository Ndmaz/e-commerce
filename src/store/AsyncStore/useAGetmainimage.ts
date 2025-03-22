import { useQuery } from "@tanstack/react-query";

interface MainImage {
    id: string;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
}

async function fetchMainImage(): Promise<MainImage> {
    try {
        const response = await fetch("/api/getmainpageimage");
        if (!response.ok) {
            throw new Error("Failed to fetch main image");
        }
        return response.json();
    } catch (error) {
        throw new Error("Failed to fetch main image");
    }
}

export const useAGetmainimage = () => {
    return useQuery({
        queryKey: ["mainImage"],
        queryFn: fetchMainImage
    });
};