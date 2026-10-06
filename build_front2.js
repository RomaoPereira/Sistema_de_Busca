const fs = require('fs');
const path = require('path');

const baseDir = 'c:/Users/freef/OneDrive/Documentos/Projetos/Sistema_de_Busca/client';

const files = {
  'src/components/common/AdBanner.tsx': `
import { Box, Typography } from '@mui/material';

export default function AdBanner({ isNative = false }: { isNative?: boolean }) {
  return (
    <Box sx={{ 
      width: '100%', 
      my: 3, 
      p: 2, 
      bgcolor: '#e2e8f0', 
      border: '1px dashed #94a3b8', 
      borderRadius: 2,
      textAlign: 'center',
      color: '#64748B',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: isNative ? 100 : 90
    }}>
      <Typography variant="caption" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
        {isNative ? 'ANÚNCIO PATROCINADO' : 'ESPAÇO PARA ANÚNCIO (GOOGLE ADSENSE)'}
      </Typography>
    </Box>
  );
}
`,
  'src/components/export/ExportButtons.tsx': `
import { Button, Box, Tooltip } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import TableViewIcon from '@mui/icons-material/TableView';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';

export default function ExportButtons({ data }: { data: any[] }) {
  const handleExportCSV = () => {
    // UTF-8 BOM para o Excel ler o CSV com acentos corretamente
    const csv = Papa.unparse(data);
    const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'leads_radar.csv';
    link.click();
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");
    XLSX.writeFile(workbook, "leads_radar.xlsx");
  };

  if (!data || data.length === 0) return null;

  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center', mt: 4, mb: 2 }}>
      <Tooltip title="Formato ideal para importar em CRMs ou ler no Bloco de Notas">
        <Button 
          variant="outlined" 
          color="primary" 
          startIcon={<DownloadIcon />} 
          onClick={handleExportCSV}
          sx={{ borderRadius: 2 }}
        >
          Exportar para CSV
        </Button>
      </Tooltip>
      <Tooltip title="Formato ideal para abrir no Microsoft Excel">
        <Button 
          variant="contained" 
          color="success" 
          startIcon={<TableViewIcon />} 
          onClick={handleExportExcel}
          sx={{ color: 'white', borderRadius: 2 }}
        >
          Exportar para Excel
        </Button>
      </Tooltip>
    </Box>
  );
}
`,
  'src/components/results/ResultCard.tsx': `
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LanguageIcon from '@mui/icons-material/Language';
import PhoneIcon from '@mui/icons-material/Phone';

export default function ResultCard({ lead }: { lead: any }) {
  const hasPhone = !!lead.phone;
  // Regra simples: se tiver muitos números ou a string whatsapp
  const isWhatsApp = hasPhone && (lead.phone.includes('whatsapp') || lead.phone.length >= 10);

  return (
    <Card elevation={2} sx={{ mb: 2, borderRadius: 3, transition: '0.2s', '&:hover': { boxShadow: 4, transform: 'translateY(-2px)' } }}>
      <CardContent>
        <Typography variant="h6" color="primary.dark" sx={{ fontWeight: 'bold', mb: 1 }}>
          {lead.name}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2, color: 'text.secondary' }}>
          <LocationOnIcon fontSize="small" sx={{ mr: 0.5, mt: 0.3 }} />
          <Typography variant="body2">{lead.address}</Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {hasPhone ? (
            <Chip 
              icon={isWhatsApp ? <WhatsAppIcon /> : <PhoneIcon />} 
              label={lead.phone} 
              color={isWhatsApp ? "success" : "default"} 
              size="small" 
              variant={isWhatsApp ? "filled" : "outlined"}
            />
          ) : (
            <Chip label="Sem Telefone Público" size="small" variant="outlined" />
          )}
          
          {lead.website && (
            <Chip 
              icon={<LanguageIcon />} 
              label="Site Disponível" 
              color="primary" 
              size="small" 
              variant="outlined" 
              component="a" 
              href={lead.website.startsWith('http') ? lead.website : 'https://'+lead.website} 
              target="_blank" 
              clickable 
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
`,
  'src/components/results/ResultList.tsx': `
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
`,
  'src/pages/Home.tsx': `
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
`
};

Object.entries(files).forEach(([filepath, content]) => {
  const fullPath = path.join(baseDir, filepath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim(), 'utf8');
});

console.log('Fases 5 e 6 aplicadas ao frontend!');
