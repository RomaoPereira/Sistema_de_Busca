export interface SearchRequest {
    cep: string;
    niche: string;
    radius: number; // em km
}

export interface PlaceResult {
    name: string;
    address: string;
    city?: string;
    phone?: string;
    website?: string;
    email?: string;
    instagram?: string;
    lat: number;
    lon: number;
}
