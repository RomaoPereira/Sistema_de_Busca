"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findNearbyBusinesses = void 0;
const axios_1 = __importDefault(require("axios"));
const NICHE_QUERIES = {
    // Alimentação & Bebidas
    'Restaurantes': ['restaurante'],
    'Lanchonetes': ['lanchonete', 'hamburgueria'],
    'Pizzarias': ['pizzaria'],
    'Padarias': ['padaria', 'panificadora'],
    'Hamburguerias': ['hamburgueria', 'hambúrguer'],
    'Confeitarias': ['confeitaria', 'doceria', 'bolos'],
    'Bares e Pubs': ['bar', 'boteco', 'pub'],
    'Cafeterias': ['cafeteria', 'café'],
    'Food Trucks': ['food truck'],
    'Açaiterias': ['açaí', 'açaiteria'],
    'Sorveterias': ['sorveteria', 'gelateria'],
    'Distribuidoras de Bebidas': ['distribuidora de bebidas', 'depósito de bebidas'],
    // Saúde & Bem-estar
    'Clínicas Médicas': ['clínica médica', 'consultório médico', 'policlínica'],
    'Clínicas Odontológicas': ['dentista', 'consultório odontológico', 'clínica odontológica'],
    'Farmácias e Drogarias': ['farmácia', 'drogaria'],
    'Academias e Crossfit': ['academia', 'crossfit'],
    'Estúdios de Pilates e Yoga': ['pilates', 'yoga'],
    'Clínicas de Estética': ['estética', 'clínica de estética'],
    'Salões de Beleza': ['salão de beleza', 'cabeleireiro'],
    'Barbearias': ['barbearia', 'barbeiro'],
    'SPAs e Massoterapia': ['spa', 'massoterapia'],
    'Óticas': ['ótica', 'óptica'],
    'Pet Shops e Veterinárias': ['pet shop', 'veterinária', 'clínica veterinária'],
    'Laboratórios de Análises': ['laboratório', 'análises clínicas'],
    'Fisioterapia': ['fisioterapia', 'clínica de fisioterapia'],
    'Nutricionistas': ['nutricionista', 'nutrição'],
    'Psicologia': ['psicologia', 'consultório de psicologia'],
    // Comércio & Varejo
    'Supermercados e Mercados': ['supermercado', 'mercado', 'mercadinho'],
    'Lojas de Roupas e Moda': ['loja de roupas', 'boutique', 'confecções'],
    'Lojas de Calçados': ['loja de calçados', 'sapataria'],
    'Lojas de Eletrônicos e Celulares': ['loja de celulares', 'eletrônicos', 'assistência técnica celulares'],
    'Papelarias e Livrarias': ['papelaria', 'livraria'],
    'Floriculturas': ['floricultura'],
    'Joalherias e Relojoarias': ['joalheria', 'relojoaria'],
    'Lojas de Materiais de Construção': ['material de construção', 'madeireira'],
    'Lojas de Móveis e Decoração': ['loja de móveis', 'decoração'],
    'Lojas de Presentes e Utilidades': ['utilidades', 'loja de presentes', 'variedades'],
    'Autopeças': ['autopeças', 'auto peças'],
    // Serviços Profissionais
    'Escritórios de Advocacia': ['advocacia', 'advogado'],
    'Escritórios de Contabilidade': ['contabilidade', 'contador'],
    'Consultorias Empresariais': ['consultoria'],
    'Agências de Marketing e Publicidade': ['agência de marketing', 'publicidade'],
    'Agências de Design': ['design', 'agência de design'],
    'Escritórios de Arquitetura e Engenharia': ['arquitetura', 'engenharia civil'],
    'Imobiliárias e Corretores': ['imobiliária', 'corretor de imóveis'],
    'Corretoras de Seguros': ['seguros', 'corretora de seguros'],
    'Despachantes': ['despachante'],
    // Automotivo
    'Oficinas Mecânicas': ['oficina mecânica', 'mecânica automotiva'],
    'Lava-Jatos e Estética Automotiva': ['lava jato', 'estética automotiva'],
    'Auto Elétricas': ['auto elétrica'],
    'Concessionárias e Revendas de Veículos': ['concessionária', 'revenda de veículos', 'veículos'],
    'Borracharias': ['borracharia'],
    'Centros Automotivos': ['centro automotivo', 'auto center'],
    'Funilaria e Pintura': ['funilaria', 'lanternagem'],
    // Educação
    'Escolas e Colégios': ['escola', 'colégio'],
    'Cursos de Idiomas': ['curso de inglês', 'escola de idiomas'],
    'Cursos Técnicos e Profissionalizantes': ['cursos profissionalizantes', 'escola técnica'],
    'Autoescolas (CFC)': ['autoescola', 'cfc'],
    'Escolas de Música e Dança': ['escola de música', 'escola de dança'],
    'Creches': ['creche', 'escola infantil'],
    'Faculdades e Universidades': ['faculdade', 'universidade'],
    // Tecnologia & Informática
    'Assistência Técnica de Celulares': ['conserto de celular', 'assistência técnica celular'],
    'Assistência Técnica de Computadores': ['informática', 'conserto de computadores'],
    'Empresas de Software e TI': ['desenvolvimento de software', 'empresa de ti'],
    'Provedores de Internet': ['provedor de internet', 'telecom'],
    // Construção & Reformas
    'Empreiteiras e Construtoras': ['construtora', 'empreiteira'],
    'Marmorarias': ['marmoraria'],
    'Vidraçarias': ['vidraçaria'],
    'Serralharias': ['serralheria'],
    'Pintores e Gesso': ['gesso', 'pintura'],
    'Eletricistas': ['eletricista', 'material elétrico'],
    'Encanadores': ['encanador', 'hidráulica'],
    'Marcenarias e Móveis Planejados': ['marcenaria', 'móveis planejados'],
    // Eventos & Entretenimento
    'Buffets e Espaços de Festas': ['buffet', 'espaço de festas'],
    'Casas de Shows e Eventos': ['casa de eventos', 'casa de shows'],
    'Fotógrafos e Filmagem': ['estúdio fotográfico', 'fotógrafo'],
    'Decoradores de Festas': ['decoração de festas'],
    // Outros Serviços
    'Gráficas e Comunicação Visual': ['gráfica', 'comunicação visual'],
    'Lavanderias': ['lavanderia'],
    'Chaveiros': ['chaveiro'],
    'Hotéis e Pousadas': ['hotel', 'pousada'],
    'Transportadoras e Mudanças': ['transportadora', 'mudanças'],
    'Coworkings': ['coworking'],
    'Postos de Combustível': ['posto de combustível', 'posto de gasolina']
};
const findNearbyBusinesses = async (lat, lon, radiusKm, niche) => {
    try {
        const queries = NICHE_QUERIES[niche] || [niche.toLowerCase()];
        // 1 grau de latitude ≈ 111 km
        const deltaLat = radiusKm / 111;
        const deltaLon = radiusKm / (111 * Math.cos(lat * (Math.PI / 180)));
        const minLon = lon - deltaLon;
        const maxLon = lon + deltaLon;
        const minLat = lat - deltaLat;
        const maxLat = lat + deltaLat;
        const viewbox = `${minLon},${maxLat},${maxLon},${minLat}`;
        const rawItems = [];
        // Executa as buscas para os termos do nicho
        for (const term of queries) {
            try {
                const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(term)}&viewbox=${viewbox}&bounded=1&limit=50&addressdetails=1&extratags=1`;
                const { data } = await axios_1.default.get(url, {
                    timeout: 8000,
                    headers: {
                        'User-Agent': 'LeadMapApp/1.0 (contact@leadmap.app)'
                    }
                });
                if (Array.isArray(data)) {
                    rawItems.push(...data);
                }
            }
            catch (err) {
                console.warn(`Aviso: falha ao buscar termo '${term}':`, err.message);
            }
        }
        // Filtra ruas, limites territoriais e elementos não comerciais
        const commercialItems = rawItems.filter(item => {
            if (['highway', 'boundary', 'place', 'waterway', 'landuse'].includes(item.class))
                return false;
            if (item.name && /^(Rua|Avenida|Travessa|Alameda|Rodovia|BR-|PE-)\b/i.test(item.name))
                return false;
            return true;
        });
        // Remove duplicatas por place_id ou osm_id
        const uniqueItems = Array.from(new Map(commercialItems.map(item => [item.place_id || item.osm_id, item])).values());
        const results = uniqueItems.map(item => {
            const addr = item.address || {};
            const tags = item.extratags || {};
            const street = addr.road || addr.pedestrian || addr.avenue || '';
            const number = addr.house_number || '';
            const neighborhood = addr.suburb || addr.neighbourhood || addr.city_district || '';
            const city = addr.city || addr.town || addr.municipality || 'Petrolina';
            const fullAddress = [street, number, neighborhood, city]
                .filter(Boolean)
                .join(', ') || item.display_name;
            const phone = tags['contact:whatsapp'] || tags.phone || tags['contact:phone'] || '';
            const website = tags.website || tags['contact:website'] || '';
            const email = tags['contact:email'] || tags.email || '';
            const instagram = tags['contact:instagram'] || tags.instagram || '';
            // Nome limpo da empresa
            const rawName = item.name || (item.display_name ? item.display_name.split(',')[0] : 'Empresa Local');
            return {
                name: rawName,
                address: fullAddress,
                city,
                phone,
                website,
                email,
                instagram,
                lat: parseFloat(item.lat),
                lon: parseFloat(item.lon)
            };
        });
        return results;
    }
    catch (error) {
        console.error('Erro ao buscar empresas:', error.message);
        throw new Error('Falha ao buscar empresas próximas. Tente novamente em instantes.');
    }
};
exports.findNearbyBusinesses = findNearbyBusinesses;
