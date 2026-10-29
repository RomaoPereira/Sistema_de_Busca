import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { Link as RouterLink } from 'react-router-dom';

export default function Header() {
  return (
    <AppBar position="sticky" color="transparent" elevation={0} sx={{ bgcolor: 'white', borderBottom: '1px solid #e2e8f0' }}>
      <Toolbar sx={{ maxWidth: 1200, width: '100%', mx: 'auto', px: { xs: 2, md: 4 } }}>
        <Box 
          component={RouterLink} 
          to="/" 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            textDecoration: 'none', 
            mr: 'auto',
            gap: 1
          }}
        >
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: 2.5,
              bgcolor: 'primary.main',
              color: 'white',
              boxShadow: '0 4px 10px rgba(26, 86, 219, 0.3)'
            }}
          >
            <MapIcon fontSize="small" />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: '-0.02em', display: 'flex', alignItems: 'center' }}>
            <Box component="span" sx={{ color: 'primary.dark' }}>Lead</Box>
            <Box component="span" sx={{ color: 'primary.main', fontWeight: 400 }}>Map</Box>
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button 
            component={RouterLink} 
            to="/" 
            startIcon={<SearchIcon />}
            sx={{ textTransform: 'none', fontWeight: 600, color: 'text.secondary' }}
          >
            Buscar Leads
          </Button>
          <Button 
            component={RouterLink} 
            to="/sobre" 
            startIcon={<InfoOutlinedIcon />}
            sx={{ textTransform: 'none', fontWeight: 600, color: 'text.secondary' }}
          >
            Como Funciona
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
