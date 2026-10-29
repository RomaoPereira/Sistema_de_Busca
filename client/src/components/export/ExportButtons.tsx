import { Button, Box, Tooltip } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import TableViewIcon from '@mui/icons-material/TableView';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';

interface LeadItem {
  name: string;
  address: string;
  city?: string;
  phone?: string;
  website?: string;
  email?: string;
  instagram?: string;
  lat: number;
  lon: number;
}

export default function ExportButtons({ data }: { data: LeadItem[] }) {
  // Transforma os dados em colunas ricas de prospecção comercial
  const formatLeadsForExport = (leads: LeadItem[]) => {
    return leads.map((lead) => {
      const cleanDigits = (lead.phone || '').replace(/\D/g, '');
      const hasPhone = cleanDigits.length >= 8;
      const whatsAppNumber = cleanDigits.startsWith('55') ? cleanDigits : `55${cleanDigits}`;

      return {
        'Nome da Empresa': lead.name,
        'Endereço': lead.address,
        'Cidade': lead.city || '',
        'Telefone Cadastrado': lead.phone || 'Não informado',
        'Link WhatsApp': hasPhone
          ? `https://wa.me/${whatsAppNumber}`
          : `https://www.google.com/search?q=${encodeURIComponent(`"${lead.name}" ${lead.city || ''} whatsapp`)}`,
        'Website Oficial': lead.website || 'Não informado',
        'E-mail': lead.email || 'Não informado',
        'Ficha Google Maps (Telefone e Fotos)': `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${lead.name} ${lead.address}`)}`,
        'Busca no Instagram': lead.instagram
          ? (lead.instagram.startsWith('http') ? lead.instagram : `https://instagram.com/${lead.instagram}`)
          : `https://www.google.com/search?q=${encodeURIComponent(`site:instagram.com "${lead.name}" ${lead.city || ''}`)}`,
        'Busca de E-mail Comercial': `https://www.google.com/search?q=${encodeURIComponent(`"${lead.name}" ${lead.city || ''} email OR contato OR @gmail.com`)}`,
        'Latitude': lead.lat,
        'Longitude': lead.lon
      };
    });
  };

  const handleExportCSV = () => {
    const formattedData = formatLeadsForExport(data);
    // UTF-8 BOM (\uFEFF) para o Excel brasileiro abrir os acentos e pontuações corretamente
    const csv = Papa.unparse(formattedData);
    const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `leads_prospeccao_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  const handleExportExcel = () => {
    const formattedData = formatLeadsForExport(data);
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    
    // Ajusta largura automática das colunas no Excel
    const colWidths = [
      { wch: 30 }, // Nome
      { wch: 40 }, // Endereço
      { wch: 15 }, // Cidade
      { wch: 20 }, // Telefone
      { wch: 35 }, // WhatsApp
      { wch: 25 }, // Site
      { wch: 25 }, // Email
      { wch: 45 }, // Google Maps
      { wch: 45 }, // Instagram
      { wch: 45 }, // Busca Email
      { wch: 12 }, // Lat
      { wch: 12 }, // Lon
    ];
    worksheet['!cols'] = colWidths;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leads Qualificados");
    XLSX.writeFile(workbook, `leads_prospeccao_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  if (!data || data.length === 0) return null;

  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center', mt: 4, mb: 3 }}>
      <Tooltip title="Baixar planilha formatada para importação em CRMs">
        <Button 
          variant="outlined" 
          color="primary" 
          startIcon={<DownloadIcon />} 
          onClick={handleExportCSV}
          sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600, px: 3, py: 1 }}
        >
          Exportar Lista em CSV
        </Button>
      </Tooltip>
      <Tooltip title="Baixar planilha completa com links de WhatsApp, Google e Instagram prontos para prospecção">
        <Button 
          variant="contained" 
          color="success" 
          startIcon={<TableViewIcon />} 
          onClick={handleExportExcel}
          sx={{ color: 'white', borderRadius: 2, textTransform: 'none', fontWeight: 600, px: 3, py: 1 }}
        >
          Exportar Planilha Excel (.xlsx)
        </Button>
      </Tooltip>
    </Box>
  );
}
