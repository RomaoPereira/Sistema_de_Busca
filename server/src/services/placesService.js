"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findNearbyBusinesses = void 0;
const axios_1 = __importDefault(require("axios"));
const types_1 = require("../types");
const findNearbyBusinesses = async (lat, lon, radiusKm, niche) => {
    // Converter raio de km para metros
    const radiusMeters = radiusKm * 1000;
    // Mapeamento simples de nichos para tags do OSM
    const nicheMapping = {
        'Restaurantes': '["amenity"="restaurant"]',
        'Academias': '["leisure"="fitness_centre"]',
        'Padarias': '["shop"="bakery"]',
        'Farmácias': '["amenity"="pharmacy"]',
        'Clínicas Médicas': '["amenity"="clinic"]',
        'Supermercados': '["shop"="supermarket"]',
        'Imobiliárias': '["office"="estate_agent"]',
        'default': `["shop"]` // Busca genérica
    };
    const osmTag = nicheMapping[niche] || nicheMapping['default'];
    // Query Overpass QL
    const query = `
        [out:json][timeout:25];
        (
          node${osmTag}(around:${radiusMeters},${lat},${lon});
          way${osmTag}(around:${radiusMeters},${lat},${lon});
        );
        out center;
    `;
    try {
        const { data } = await axios_1.default.post('https://overpass-api.de/api/interpreter', `data=${encodeURIComponent(query)}`);
        const results = data.elements.map((el) => {
            const tags = el.tags || {};
            // Determinar lat/lon (se for way, usa o center)
            const elLat = el.lat || (el.center && el.center.lat);
            const elLon = el.lon || (el.center && el.center.lon);
            // Montar endereço a partir das tags
            const street = tags['addr:street'] || '';
            const housenumber = tags['addr:housenumber'] || '';
            const city = tags['addr:city'] || '';
            const fullAddress = [street, housenumber, city].filter(Boolean).join(', ') || 'Endereço não disponível';
            return {
                name: tags.name || 'Empresa sem nome',
                address: fullAddress,
                phone: tags.phone || tags['contact:phone'] || tags['contact:whatsapp'],
                website: tags.website || tags['contact:website'],
                lat: elLat,
                lon: elLon
            };
        }).filter((place) => place.name !== 'Empresa sem nome'); // Filtra resultados ruins
        return results;
    }
    catch (error) {
        console.error('Erro na Overpass API:', error);
        throw new Error('Falha ao buscar empresas próximas');
    }
};
exports.findNearbyBusinesses = findNearbyBusinesses;
//# sourceMappingURL=placesService.js.map