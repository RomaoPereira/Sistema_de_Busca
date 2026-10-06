import { Box, Typography, Container, Alert } from '@mui/material';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import SearchForm from '../components/search/SearchForm';
import ResultList from '../components/results/ResultList';
import ExportButtons from '../components/export/ExportButtons';
import AdBanner from '../components/common/AdBanner';
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

      {/* AdBanner abaixo do formulário de busca */}
      <Box sx={{ maxWidth: 800, mx: 'auto' }}>
        <AdBanner />
      </Box>

      {error && (
        <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}

      {results && results.leads && (
        <>
          {/* Botões de exportação e a lista formatada */}
          <ExportButtons data={results.leads} />
          <ResultList leads={results.leads} />
          
          {/* AdBanner abaixo de tudo, antes do rodapé */}
          <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
            <AdBanner />
          </Box>
        </>
      )}
    </Container>
  );
}