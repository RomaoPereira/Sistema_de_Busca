import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import searchRoutes from './routes/searchRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', searchRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', provider: 'OpenStreetMap' });
});

app.listen(port, () => {
  console.log(`🚀 Servidor LeadMap rodando na porta ${port}`);
});
