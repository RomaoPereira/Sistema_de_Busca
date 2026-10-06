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