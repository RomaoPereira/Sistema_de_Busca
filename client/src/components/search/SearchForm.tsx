import { useState } from 'react';
import { Box, TextField, Autocomplete, Slider, Typography, Button, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const NICHOS = [
  'Restaurantes', 'Academias', 'Padarias', 'Farmácias', 
  'Clínicas Médicas', 'Supermercados', 'Imobiliárias', 'Lojas de Roupas', 'Oficinas Mecânicas'
];

interface SearchFormProps {
  onSearch: (params: { cep: string; niche: string; radius: number }) => void;
  isLoading: boolean;
}

export default function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const [cep, setCep] = useState('');
  const [niche, setNiche] = useState<string | null>(null);
  const [radius, setRadius] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cep && niche) {
      onSearch({ cep, niche, radius });
    }
  };

  return (
    <Paper elevation={3} sx={{ p: { xs: 3, md: 5 }, borderRadius: 4, maxWidth: 800, mx: 'auto', mt: 4 }}>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
          
          <TextField 
            label="CEP do Alvo" 
            variant="outlined" 
            fullWidth 
            placeholder="Ex: 01001-000"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            required
            helperText="Onde começamos a busca?"
          />

          <Autocomplete
            options={NICHOS}
            value={niche}
            onChange={(_, newValue) => setNiche(newValue)}
            renderInput={(params) => <TextField {...params} label="Nicho da Empresa" required helperText="Qual segmento?" />}
          />

        </Box>

        <Box sx={{ mt: 5, px: 2 }}>
          <Typography gutterBottom sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
            Raio de busca: {radius} km
          </Typography>
          <Slider
            value={radius}
            onChange={(_, newValue) => setRadius(newValue as number)}
            step={1}
            marks
            min={1}
            max={20}
            valueLabelDisplay="on"
            color="secondary"
          />
        </Box>

        <Box sx={{ mt: 5, textAlign: 'center' }}>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            size="large" 
            disabled={isLoading}
            startIcon={<SearchIcon />}
            sx={{ px: 6, py: 1.5, fontSize: '1.1rem', borderRadius: 3, textTransform: 'none', fontWeight: 'bold' }}
          >
            {isLoading ? 'Rastreando Leads...' : 'Encontrar Leads'}
          </Button>
        </Box>
      </form>
    </Paper>
  );
}