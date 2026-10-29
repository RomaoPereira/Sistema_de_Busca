import { Box, Typography, Container, Stack, Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function Footer() {
  return (
    <Box component="footer" sx={{ py: 4, bgcolor: 'white', mt: 'auto', borderTop: '1px solid #e2e8f0' }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} <strong>LeadMap</strong> — Inteligência em Prospecção Local B2B.
          </Typography>

          <Stack direction="row" spacing={3}>
            <MuiLink component={RouterLink} to="/" variant="body2" color="text.secondary" underline="hover">
              Início
            </MuiLink>
            <MuiLink component={RouterLink} to="/sobre" variant="body2" color="text.secondary" underline="hover">
              Como Funciona
            </MuiLink>
            <MuiLink component={RouterLink} to="/sobre" variant="body2" color="text.secondary" underline="hover">
              Termos & Privacidade
            </MuiLink>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
