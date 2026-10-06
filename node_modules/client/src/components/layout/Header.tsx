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