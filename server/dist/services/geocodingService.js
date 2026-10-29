"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoordinatesFromCEP = void 0;
const axios_1 = __importDefault(require("axios"));
const getCoordinatesFromCEP = async (cep) => {
    try {
        const cleanCep = cep.replace(/\D/g, '');
        if (cleanCep.length !== 8) {
            throw new Error('CEP inválido. O CEP deve conter 8 dígitos.');
        }
        // 1. Busca endereço no ViaCEP
        const viaCepUrl = `https://viacep.com.br/ws/${cleanCep}/json/`;
        const { data: cepData } = await axios_1.default.get(viaCepUrl, { timeout: 7000 });
        if (cepData.erro) {
            throw new Error('CEP não encontrado. Verifique o número digitado.');
        }
        // 2. Busca coordenadas no Nominatim em cascata (Rua -> Bairro -> Cidade)
        const candidates = [
            [cepData.logradouro, cepData.localidade, cepData.uf, 'Brasil'].filter(Boolean).join(', '),
            [cepData.bairro, cepData.localidade, cepData.uf, 'Brasil'].filter(Boolean).join(', '),
            [cepData.localidade, cepData.uf, 'Brasil'].filter(Boolean).join(', ')
        ].filter(str => str.trim().length > 0);
        let geoData = [];
        for (const query of candidates) {
            try {
                const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`;
                const res = await axios_1.default.get(nominatimUrl, {
                    headers: { 'User-Agent': 'LeadMapApp/1.0 (contact@leadmap.app)' },
                    timeout: 5000
                });
                if (res.data && res.data.length > 0) {
                    geoData = res.data;
                    break;
                }
            }
            catch (err) {
                // Continua para o próximo candidato
            }
        }
        if (!geoData || geoData.length === 0) {
            throw new Error('Não foi possível localizar as coordenadas no mapa para esta região.');
        }
        return {
            lat: parseFloat(geoData[0].lat),
            lon: parseFloat(geoData[0].lon),
            addressInfo: cepData
        };
    }
    catch (error) {
        console.error('Erro no geocoding:', error.message);
        throw error;
    }
};
exports.getCoordinatesFromCEP = getCoordinatesFromCEP;
