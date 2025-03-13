export interface ProductDetail {
    detailname: string;
    detailvalue: string;
}

export interface ProductImages {
    pic1: string;
    pic2: string;
    pic3: string;
    pic4: string;
}

export interface Product {
    id: string;
    productname: string;
    productcode: string;
    category: string;
    brand: string;
    price: number;
    priceoff: number | null;
    quanity: number;
    synopsis: string;
    description: string;
    details: string;
    images: string;
} 