import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <Box component="main" sx={{ flexGrow: 1, p: { xs: 1, sm: 3 } }}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </Router>
  );
}
export default App;