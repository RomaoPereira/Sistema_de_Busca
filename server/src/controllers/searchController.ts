import { Request, Response } from 'express';
import { getCoordinatesFromCEP } from '../services/geocodingService';
import { findNearbyBusinesses } from '../services/placesService';

export const searchLeads = async (req: Request, res: Response) => {
    try {
        const { cep, niche, radius } = req.body;

        if (!cep || !niche || !radius) {
            return res.status(400).json({ error: 'CEP, nicho e raio são obrigatórios.' });
        }

        // 1. Obter Coordenadas
        const { lat, lon, addressInfo } = await getCoordinatesFromCEP(cep);

        // 2. Buscar Empresas
        const leads = await findNearbyBusinesses(lat, lon, Number(radius), niche);

        res.json({
            success: true,
            center: { lat, lon, address: addressInfo },
            total: leads.length,
            leads
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Erro interno no servidor' });
    }
};
