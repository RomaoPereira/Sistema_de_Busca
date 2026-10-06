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