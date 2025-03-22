import { useQuery } from "@tanstack/react-query";

interface Brand {
    id: number;
    name: string;
    imageUrl?: string;
}

interface BrandsResponse {
    brands: Brand[];
}

async function fetchBrands(): Promise<Brand[]> {
    try {
        const response = await fetch('/api/getbrand');
        if (!response.ok) {
            throw new Error('Failed to fetch brands');
        }
        const data: BrandsResponse = await response.json();
        return data.brands;
    } catch (error) {
        throw new Error('Failed to fetch brands');
    }
}

export const useAGetbrands = () => {
    return useQuery({
        queryKey: ['brands'],
        queryFn: fetchBrands,
    });
};