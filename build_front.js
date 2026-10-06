const fs = require('fs');
const path = require('path');

const baseDir = 'c:/Users/freef/OneDrive/Documentos/Projetos/Sistema_de_Busca/client';

const files = {
  'src/index.css': `
body {
  margin: 0;
  background-color: #F8FAFC;
}
`,
  'src/main.tsx': `
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import theme from './theme';
import './index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </React.StrictMode>,
);
`,
  'src/App.tsx': `
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <Box component="main" sx={{ flexGrow: 1, p: { xs: 1, sm: 3 } }}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </Router>
  );
}
export default App;
`,
  'src/components/layout/Header.tsx': `
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import MapIcon from '@mui/icons-material/Map';

export default function Header() {
  return (
    <AppBar position="static" color="transparent" elevation={1} sx={{ bgcolor: 'white' }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', color: 'primary.main', mr: 1 }}>
          <MapIcon fontSize="large" />
        </Box>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          <Box component="span" sx={{ color: 'primary.dark' }}>Lead</Box>
          <Box component="span" sx={{ color: 'text.secondary', fontWeight: 300 }}>Map</Box>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
`,
  'src/components/layout/Footer.tsx': `
import { Box, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box component="footer" sx={{ py: 3, textAlign: 'center', bgcolor: '#f1f5f9', mt: 'auto', borderTop: '1px solid #e2e8f0' }}>
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} LeadMap. Todos os direitos reservados.
      </Typography>
    </Box>
  );
}
`,
  'src/services/api.ts': `
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});
`,
  'src/components/search/SearchForm.tsx': `
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
`,
  'src/pages/Home.tsx': `
import { Box, Typography, Container, Alert } from '@mui/material';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import SearchForm from '../components/search/SearchForm';
import { api } from '../services/api';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (params: { cep: string; niche: string; radius: number }) => {
    setLoading(true);
    setError(null);
    setResults(null);
    try {
      const { data } = await api.post('/search', params);
      setResults(data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao buscar empresas. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Helmet>
        <title>LeadMap - Busca de Leads Locais</title>
      </Helmet>
      
      <Box sx={{ textAlign: 'center', mt: 8, mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 800, color: 'primary.dark' }}>
          Encontre novos clientes <br />na sua região
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto', mt: 2 }}>
          Gere leads qualificados buscando por empresas, segmento e raio de proximidade em tempo real.
        </Typography>
      </Box>

      <SearchForm onSearch={handleSearch} isLoading={loading} />

      {error && (
        <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}

      {results && (
        <Box sx={{ maxWidth: 800, mx: 'auto', mt: 6, p: 3, bgcolor: '#1e293b', borderRadius: 3, color: '#10B981', overflowX: 'auto', textAlign: 'left' }}>
          <Typography variant="subtitle1" sx={{ color: '#fff', mb: 2, fontWeight: 'bold' }}>
            ✅ {results.total} Leads Encontrados (Modo Debug - Fase 4)
          </Typography>
          <pre style={{ margin: 0, fontSize: '0.85rem' }}>{JSON.stringify(results.leads, null, 2)}</pre>
        </Box>
      )}
    </Container>
  );
}
`
};

Object.entries(files).forEach(([filepath, content]) => {
  const fullPath = path.join(baseDir, filepath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim(), 'utf8');
});

try { fs.unlinkSync(path.join(baseDir, 'src/App.css')); } catch (e) {}

console.log('Fases 3 e 4 aplicadas ao frontend!');
