import { Card, CardContent, Typography, Box, Button, Chip, Stack } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import GoogleIcon from '@mui/icons-material/Google';
import LanguageIcon from '@mui/icons-material/Language';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

interface ResultCardProps {
  lead: {
    name: string;
    address: string;
    city?: string;
    phone?: string;
    website?: string;
    email?: string;
    instagram?: string;
    lat: number;
    lon: number;
  };
}

export default function ResultCard({ lead }: { lead: ResultCardProps['lead'] }) {
  const cleanDigits = (lead.phone || '').replace(/\D/g, '');
  const hasPhone = cleanDigits.length >= 8;
  const isLikelyCell = cleanDigits.length === 11 || (cleanDigits.length === 9 && cleanDigits.startsWith('9'));

  // Links inteligentes de prospecção
  const whatsAppNumber = cleanDigits.startsWith('55') ? cleanDigits : `55${cleanDigits}`;
  const whatsAppLink = hasPhone
    ? `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(`Olá! Encontrei o contato da ${lead.name} e gostaria de falar com o responsável comercial.`)}`
    : `https://www.google.com/search?q=${encodeURIComponent(`"${lead.name}" ${lead.city || ''} whatsapp`)}`;

  const googleSearchLink = `https://www.google.com/search?q=${encodeURIComponent(`${lead.name} ${lead.city || ''} ${lead.address}`)}`;
  const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${lead.name} ${lead.address}`)}`;
  
  const instagramLink = lead.instagram
    ? (lead.instagram.startsWith('http') ? lead.instagram : `https://instagram.com/${lead.instagram}`)
    : `https://www.google.com/search?q=${encodeURIComponent(`site:instagram.com "${lead.name}" ${lead.city || ''}`)}`;

  const emailLink = lead.email 
    ? `mailto:${lead.email}` 
    : `https://www.google.com/search?q=${encodeURIComponent(`"${lead.name}" ${lead.city || ''} email OR contato OR @gmail.com`)}`;

  return (
    <Card 
      elevation={2} 
      sx={{ 
        mb: 2.5, 
        borderRadius: 3, 
        border: '1px solid',
        borderColor: 'divider',
        transition: 'all 0.25s ease-in-out', 
        '&:hover': { 
          boxShadow: 6, 
          transform: 'translateY(-2px)',
          borderColor: 'primary.light'
        } 
      }}
    >
      <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
        {/* Cabeçalho com Nome e Status */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 1, mb: 1 }}>
          <Typography variant="h6" color="primary.dark" sx={{ fontWeight: 700, fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
            {lead.name}
          </Typography>
          {lead.city && (
            <Chip label={lead.city} size="small" variant="outlined" color="primary" sx={{ fontSize: '0.75rem' }} />
          )}
        </Box>
        
        {/* Endereço clicável (Abre no Google Maps) */}
        <Box 
          component="a" 
          href={googleMapsLink} 
          target="_blank" 
          rel="noopener noreferrer"
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: 2, 
            color: 'text.secondary', 
            textDecoration: 'none',
            '&:hover': { color: 'primary.main', textDecoration: 'underline' } 
          }}
        >
          <LocationOnIcon fontSize="small" sx={{ mr: 0.5, color: 'error.light' }} />
          <Typography variant="body2">{lead.address}</Typography>
        </Box>

        {/* Informações disponíveis de forma visual */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2.5 }}>
          {hasPhone ? (
            <Chip 
              icon={isLikelyCell ? <WhatsAppIcon fontSize="small" /> : <PhoneIcon fontSize="small" />} 
              label={lead.phone} 
              color={isLikelyCell ? "success" : "default"} 
              size="small" 
              variant="filled"
              sx={{ fontWeight: 600 }}
            />
          ) : (
            <Chip label="Telefone não informado no mapa" size="small" variant="outlined" sx={{ color: 'text.disabled' }} />
          )}

          {lead.website && (
            <Chip 
              icon={<LanguageIcon fontSize="small" />} 
              label="Site Oficial" 
              color="info" 
              size="small" 
              component="a" 
              href={lead.website.startsWith('http') ? lead.website : `https://${lead.website}`} 
              target="_blank" 
              clickable 
            />
          )}

          {lead.email && (
            <Chip 
              icon={<EmailIcon fontSize="small" />} 
              label={lead.email} 
              color="secondary" 
              size="small" 
              component="a" 
              href={`mailto:${lead.email}`} 
              clickable 
            />
          )}
        </Box>

        {/* Barra de Ações Rápidas de Prospecção */}
        <Typography variant="caption" sx={{ display: 'block', mb: 1, color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          Ações de Prospecção:
        </Typography>

        <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
          {/* Botão WhatsApp */}
          <Button
            size="small"
            variant="contained"
            color="success"
            startIcon={<WhatsAppIcon />}
            component="a"
            href={whatsAppLink}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
          >
            {hasPhone ? 'Chamar no WhatsApp' : 'Achar WhatsApp'}
          </Button>

          {/* Botão Ver no Google (Dossiê com fotos, telefone e avaliações) */}
          <Button
            size="small"
            variant="outlined"
            color="inherit"
            startIcon={<GoogleIcon />}
            component="a"
            href={googleSearchLink}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ borderRadius: 2, textTransform: 'none', borderColor: '#ccc' }}
          >
            Ficha no Google
          </Button>

          {/* Botão Achar no Instagram */}
          <Button
            size="small"
            variant="outlined"
            startIcon={<InstagramIcon />}
            component="a"
            href={instagramLink}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ 
              borderRadius: 2, 
              textTransform: 'none', 
              color: '#E1306C', 
              borderColor: '#E1306C',
              '&:hover': { borderColor: '#C13584', bgcolor: 'rgba(225, 48, 108, 0.04)' }
            }}
          >
            Buscar Instagram
          </Button>

          {/* Botão Achar E-mail */}
          <Button
            size="small"
            variant="outlined"
            color="primary"
            startIcon={<EmailIcon />}
            component="a"
            href={emailLink}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ borderRadius: 2, textTransform: 'none' }}
          >
            {lead.email ? 'Enviar E-mail' : 'Localizar E-mail'}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
