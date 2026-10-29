import { useState, useEffect } from 'react';
import { Box, TextField, Autocomplete, Button, Paper, CircularProgress, Chip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import axios from 'axios';

export const NICHOS_COMPLETOS = [
  // Alimentação & Bebidas
  'Restaurantes', 'Lanchonetes', 'Pizzarias', 'Padarias', 'Hamburguerias', 'Confeitarias', 
  'Bares e Pubs', 'Cafeterias', 'Food Trucks', 'Açaiterias', 'Sorveterias', 'Distribuidoras de Bebidas',
  
  // Saúde & Bem-estar
  'Clínicas Médicas', 'Clínicas Odontológicas', 'Farmácias e Drogarias', 'Academias e Crossfit', 
  'Estúdios de Pilates e Yoga', 'Clínicas de Estética', 'Salões de Beleza', 'Barbearias', 
  'SPAs e Massoterapia', 'Óticas', 'Pet Shops e Veterinárias', 'Laboratórios de Análises', 
  'Fisioterapia', 'Nutricionistas', 'Psicologia',

  // Comércio & Varejo
  'Supermercados e Mercados', 'Lojas de Roupas e Moda', 'Lojas de Calçados', 
  'Lojas de Eletrônicos e Celulares', 'Papelarias e Livrarias', 'Floriculturas', 
  'Joalherias e Relojoarias', 'Lojas de Materiais de Construção', 'Lojas de Móveis e Decoração', 
  'Lojas de Presentes e Utilidades', 'Autopeças',

  // Serviços Profissionais
  'Escritórios de Advocacia', 'Escritórios de Contabilidade', 'Consultorias Empresariais', 
  'Agências de Marketing e Publicidade', 'Agências de Design', 'Escritórios de Arquitetura e Engenharia', 
  'Imobiliárias e Corretores', 'Corretoras de Seguros', 'Despachantes',

  // Automotivo
  'Oficinas Mecânicas', 'Lava-Jatos e Estética Automotiva', 'Auto Elétricas', 
  'Concessionárias e Revendas de Veículos', 'Borracharias', 'Centros Automotivos', 'Funilaria e Pintura',

  // Educação
  'Escolas e Colégios', 'Cursos de Idiomas', 'Cursos Técnicos e Profissionalizantes', 
  'Autoescolas (CFC)', 'Escolas de Música e Dança', 'Creches', 'Faculdades e Universidades',

  // Tecnologia & Informática
  'Assistência Técnica de Celulares', 'Assistência Técnica de Computadores', 
  'Empresas de Software e TI', 'Provedores de Internet',

  // Construção & Reformas
  'Empreiteiras e Construtoras', 'Marmorarias', 'Vidraçarias', 'Serralharias', 
  'Pintores e Gesso', 'Eletricistas', 'Encanadores', 'Marcenarias e Móveis Planejados',

  // Eventos & Entretenimento
  'Buffets e Espaços de Festas', 'Casas de Shows e Eventos', 'Fotógrafos e Filmagem', 'Decoradores de Festas',

  // Outros Serviços
  'Gráficas e Comunicação Visual', 'Lavanderias', 'Chaveiros', 'Hotéis e Pousadas', 
  'Transportadoras e Mudanças', 'Coworkings', 'Postos de Combustível'
].sort();

interface SearchFormProps {
  onSearch: (params: { cep: string; niche: string; radius: number }) => void;
  isLoading: boolean;
}

export default function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const [cep, setCep] = useState('');
  const [niche, setNiche] = useState<string | null>(null);
  const [cityInfo, setCityInfo] = useState<string | null>(null);
  const [loadingCep, setLoadingCep] = useState(false);

  // Aplica máscara de CEP (XXXXX-XXX)
  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, '').slice(0, 8);
    if (raw.length > 5) {
      raw = `${raw.slice(0, 5)}-${raw.slice(5)}`;
    }
    setCep(raw);
  };

  // Consulta prévia do CEP para dar feedback imediato de Cidade/Bairro ao usuário
  useEffect(() => {
    const clean = cep.replace(/\D/g, '');
    if (clean.length === 8) {
      setLoadingCep(true);
      axios.get(`https://viacep.com.br/ws/${clean}/json/`)
        .then(res => {
          if (!res.data.erro) {
            const loc = [res.data.bairro, res.data.localidade, res.data.uf].filter(Boolean).join(', ');
            setCityInfo(loc);
          } else {
            setCityInfo('CEP não encontrado');
          }
        })
        .catch(() => setCityInfo(null))
        .finally(() => setLoadingCep(false));
    } else {
      setCityInfo(null);
    }
  }, [cep]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cep && niche) {
      // Raio padrão otimizado de 8km cobre a região comercial de qualquer CEP
      onSearch({ cep, niche, radius: 8 });
    }
  };

  return (
    <Paper 
      elevation={4} 
      sx={{ 
        p: { xs: 3, md: 5 }, 
        borderRadius: 4, 
        maxWidth: 820, 
        mx: 'auto', 
        mt: 4,
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: '0 8px 30px rgba(0,0,0,0.06)'
      }}
    >
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1.3fr' }, gap: 3 }}>
          
          <Box>
            <TextField 
              label="CEP do Alvo" 
              variant="outlined" 
              fullWidth 
              placeholder="00000-000"
              value={cep}
              onChange={handleCepChange}
              required
              helperText={
                loadingCep ? 'Buscando região...' : (cityInfo ? '' : 'Digite os 8 dígitos do CEP')
              }
              slotProps={{
                input: {
                  endAdornment: loadingCep ? <CircularProgress size={20} /> : null
                }
              }}
            />
            {cityInfo && !loadingCep && (
              <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
                <Chip 
                  icon={<LocationCityIcon fontSize="small" />} 
                  label={cityInfo} 
                  size="small" 
                  color={cityInfo.includes('não encontrado') ? 'error' : 'success'} 
                  variant="outlined"
                  sx={{ fontWeight: 600 }}
                />
              </Box>
            )}
          </Box>

          <Autocomplete
            options={NICHOS_COMPLETOS}
            value={niche}
            onChange={(_, newValue) => setNiche(newValue)}
            noOptionsText="Nenhum nicho encontrado"
            renderInput={(params) => (
              <TextField 
                {...params} 
                label="Nicho ou Segmento" 
                required 
                placeholder="Ex: Restaurantes, Academias, etc."
                helperText="Escolha entre 80+ segmentos cadastrados" 
              />
            )}
          />

        </Box>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            size="large" 
            disabled={isLoading || !cep || !niche}
            startIcon={isLoading ? <CircularProgress size={22} color="inherit" /> : <SearchIcon />}
            sx={{ 
              px: 6, 
              py: 1.6, 
              fontSize: '1.15rem', 
              borderRadius: 3, 
              textTransform: 'none', 
              fontWeight: 700,
              boxShadow: '0 4px 14px rgba(26, 86, 219, 0.35)'
            }}
          >
            {isLoading ? 'Rastreando Leads na Região...' : 'Encontrar Leads'}
          </Button>
        </Box>
      </form>
    </Paper>
  );
}
