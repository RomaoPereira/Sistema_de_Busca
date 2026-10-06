import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1A56DB',
      dark: '#1E3A5F',
    },
    secondary: {
      main: '#F59E0B',
    },
    success: {
      main: '#10B981',
    },
    background: {
      default: '#F8FAFC',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1E3A5F',
      secondary: '#64748B',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default theme;
