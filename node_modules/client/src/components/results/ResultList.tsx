import { Box, Typography } from '@mui/material';
import ResultCard from './ResultCard';
import AdBanner from '../common/AdBanner';

export default function ResultList({ leads }: { leads: any[] }) {
  if (!leads || leads.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', p: 4, bgcolor: 'white', borderRadius: 2, mt: 4 }}>
        <Typography color="text.secondary">Nenhuma empresa encontrada na região. Tente aumentar o raio.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h6" sx={{ mb: 3, color: 'text.primary', fontWeight: 'bold' }}>
        🎯 {leads.length} Leads Encontrados
      </Typography>
      
      {leads.map((lead, index) => (
        <Box key={index}>
          {/* Insere um anúncio a cada 5 resultados */}
          {index > 0 && index % 5 === 0 && <AdBanner isNative />}
          <ResultCard lead={lead} />
        </Box>
      ))}
    </Box>
  );
}