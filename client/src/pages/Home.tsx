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
        <title>LeadMap — Gerador de Leads e Busca de Empresas Locais por CEP</title>
        <meta name="description" content="Encontre novos clientes e empresas na sua região por CEP e nicho comercial em tempo real. Exporte para Excel e CSV." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "LeadMap",
            "url": "https://leadmap.app",
            "description": "Plataforma de busca e geração de leads locais para prospecção comercial B2B por CEP.",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "All"
          })}
        </script>
      </Helmet>
      
      <Box sx={{ textAlign: 'center', mt: { xs: 5, md: 7 }, mb: 4 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom 
          sx={{ 
            fontWeight: 800, 
            color: 'primary.dark',
            fontSize: { xs: '2rem', sm: '2.8rem', md: '3.4rem' },
            lineHeight: 1.15,
            letterSpacing: '-0.02em'
          }}
        >
          Encontre novos clientes <br />na sua região
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            color: 'text.secondary', 
            maxWidth: 620, 
            mx: 'auto', 
            mt: 2,
            fontSize: { xs: '1rem', md: '1.15rem' },
            fontWeight: 400
          }}
        >
          Gere listas de leads qualificadas buscando por empresas, comércios e nichos em qualquer cidade do Brasil.
        </Typography>
      </Box>

      {/* Formulário limpo sem slider de km */}
      <SearchForm onSearch={handleSearch} isLoading={loading} />

      {/* Banner de Anúncio Discreto */}
      <Box sx={{ maxWidth: 820, mx: 'auto', mt: 1 }}>
        <AdBanner />
      </Box>

      {error && (
        <Box sx={{ maxWidth: 820, mx: 'auto', mt: 4 }}>
          <Alert severity="error" sx={{ borderRadius: 2 }}>{error}</Alert>
        </Box>
      )}

      {results && results.leads && (
        <>
          {/* Botões de exportação e Lista formatada */}
          <ExportButtons data={results.leads} />
          <ResultList leads={results.leads} />
          
          {/* Banner inferior */}
          <Box sx={{ maxWidth: 820, mx: 'auto', mt: 4 }}>
            <AdBanner />
          </Box>
        </>
      )}
    </Container>
  );
}
