import axios from 'axios';
import { PlaceResult } from '../types';

export const findNearbyBusinesses = async (lat: number, lon: number, radiusKm: number, niche: string): Promise<PlaceResult[]> => {
    const radiusMeters = radiusKm * 1000;
    
    const nicheMapping: Record<string, string> = {
        'Restaurantes': '["amenity"="restaurant"]',
        'Academias': '["leisure"="fitness_centre"]',
        'Padarias': '["shop"="bakery"]',
        'Farmácias': '["amenity"="pharmacy"]',
        'Clínicas Médicas': '["amenity"="clinic"]',
        'Supermercados': '["shop"="supermarket"]',
        'Imobiliárias': '["office"="estate_agent"]',
        'Lojas de Roupas': '["shop"="clothes"]',
        'Oficinas Mecânicas': '["shop"="car_repair"]',
        'default': `["shop"]`
    };

    const osmTag = nicheMapping[niche] || nicheMapping['default'];

    // Aumentado o timeout do overpass para 60 segundos
    const query = `
        [out:json][timeout:60];
        (
          node${osmTag}(around:${radiusMeters},${lat},${lon});
          way${osmTag}(around:${radiusMeters},${lat},${lon});
        );
        out center;
    `;

    try {
        const { data } = await axios.post('https://overpass-api.de/api/interpreter', `data=${encodeURIComponent(query)}`, {
            timeout: 65000, // 65 segundos no axios
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'LeadMapApp/1.0 (freefire@example.com)'
            }
        });
        
        const results: PlaceResult[] = data.elements.map((el: any) => {
            const tags = el.tags || {};
            const elLat = el.lat || (el.center && el.center.lat);
            const elLon = el.lon || (el.center && el.center.lon);
            
            const street = tags['addr:street'] || '';
            const housenumber = tags['addr:housenumber'] || '';
            const city = tags['addr:city'] || '';
            const fullAddress = [street, housenumber, city].filter(Boolean).join(', ') || 'Endereço não disponível no mapa';

            return {
                name: tags.name || 'Empresa Local',
                address: fullAddress,
                phone: tags.phone || tags['contact:phone'] || tags['contact:whatsapp'] || '',
                website: tags.website || tags['contact:website'] || '',
                lat: elLat,
                lon: elLon
            };
        }).filter((place: PlaceResult) => place.name !== 'Empresa Local');

        return results;
    } catch (error: any) {
        console.error('Erro na Overpass API:', error.message);
        if (error.code === 'ECONNABORTED' || (error.response && error.response.status === 504)) {
            throw new Error('A área de busca é muito grande e o mapa demorou demais para responder. Tente diminuir o raio (km).');
        }
        throw new Error('Falha ao buscar empresas próximas. O serviço do mapa pode estar indisponível.');
    }
};
