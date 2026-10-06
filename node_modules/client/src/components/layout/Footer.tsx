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