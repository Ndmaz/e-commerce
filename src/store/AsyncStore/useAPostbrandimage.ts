import { useMutation } from "@tanstack/react-query";

interface Brand {
    id: number;
    name: string;
    imageUrl?: string;
}

interface BrandResponse {
    brand: Brand;
}

interface PostBrandImageParams {
    brandvalue: string;
    brandimageurl: string;
}

async function postBrandImage({ brandvalue, brandimageurl }: PostBrandImageParams): Promise<Brand> {
    try {
        const response = await fetch('/api/POSTbrandimage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ brandvalue, brandimageurl })
        });

        if (!response.ok) {
            throw new Error('Failed to post brand image');
        }

        const data: BrandResponse = await response.json();
        return data.brand;
    } catch (error) {
        throw new Error('Failed to post brand image');
    }
}

export const useAPostbrandimage = (brandvalue: string, brandimageurl: string) => {
    return useMutation({
        mutationFn: () => postBrandImage({ brandvalue, brandimageurl }),
    });
};