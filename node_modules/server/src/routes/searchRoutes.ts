import { Router } from 'express';
import { searchLeads } from '../controllers/searchController';

const router = Router();

router.post('/search', searchLeads);

export default router;
