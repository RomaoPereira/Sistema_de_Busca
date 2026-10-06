import axios from 'axios';

export const getCoordinatesFromCEP = async (cep: string) => {
    try {
        // 1. Busca endereço no ViaCEP
        const viaCepUrl = `https://viacep.com.br/ws/${cep.replace(/\D/g, '')}/json/`;
        const { data: cepData } = await axios.get(viaCepUrl);
        
        if (cepData.erro) {
            throw new Error('CEP não encontrado');
        }

        // 2. Busca coordenadas no Nominatim (OpenStreetMap)
        const address = `${cepData.logradouro}, ${cepData.localidade}, ${cepData.uf}, Brasil`;
        const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`;
        
        const { data: geoData } = await axios.get(nominatimUrl, {
            headers: { 'User-Agent': 'LeadMapApp/1.0' }
        });

        if (!geoData || geoData.length === 0) {
            throw new Error('Não foi possível encontrar as coordenadas para este CEP');
        }

        return {
            lat: parseFloat(geoData[0].lat),
            lon: parseFloat(geoData[0].lon),
            addressInfo: cepData
        };
    } catch (error) {
        console.error('Erro no geocoding:', error);
        throw error;
    }
};
