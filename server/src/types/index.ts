export interface SearchRequest {
    cep: string;
    niche: string;
    radius: number; // em km
}

export interface PlaceResult {
    name: string;
    address: string;
    phone?: string;
    website?: string;
    lat: number;
    lon: number;
}
