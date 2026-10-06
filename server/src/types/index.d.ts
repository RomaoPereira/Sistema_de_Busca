export interface SearchRequest {
    cep: string;
    niche: string;
    radius: number;
}
export interface PlaceResult {
    name: string;
    address: string;
    phone?: string;
    website?: string;
    lat: number;
    lon: number;
}
//# sourceMappingURL=index.d.ts.map