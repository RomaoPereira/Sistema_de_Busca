"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchLeads = void 0;
const geocodingService_1 = require("../services/geocodingService");
const placesService_1 = require("../services/placesService");
const searchLeads = async (req, res) => {
    try {
        const { cep, niche, radius } = req.body;
        if (!cep || !niche || !radius) {
            return res.status(400).json({ error: 'CEP, nicho e raio são obrigatórios.' });
        }
        // 1. Obter Coordenadas
        const { lat, lon, addressInfo } = await (0, geocodingService_1.getCoordinatesFromCEP)(cep);
        // 2. Buscar Empresas
        const leads = await (0, placesService_1.findNearbyBusinesses)(lat, lon, Number(radius), niche);
        res.json({
            success: true,
            center: { lat, lon, address: addressInfo },
            total: leads.length,
            leads
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message || 'Erro interno no servidor' });
    }
};
exports.searchLeads = searchLeads;
