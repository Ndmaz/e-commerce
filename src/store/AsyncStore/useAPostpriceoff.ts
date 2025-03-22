import { useMutation } from "@tanstack/react-query";

interface PriceOffResponse {
    success: boolean;
    message: string;
}

interface PostPriceOffParams {
    Editinput2: number;
    id: string;
}

async function postPriceOff({ Editinput2, id }: PostPriceOffParams): Promise<PriceOffResponse> {
    try {
        const response = await fetch('/api/POSTpriceoff', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Editinput2, id })
        });

        if (!response.ok) {
            throw new Error('Failed to update price off');
        }

        return response.json();
    } catch (error) {
        throw new Error('Failed to update price off');
    }
}

export const useAPostpriceoff = (Editinput2: number, id: string) => {
    return useMutation({
        mutationFn: () => postPriceOff({ Editinput2, id }),
    });
};