import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LanguageIcon from '@mui/icons-material/Language';
import PhoneIcon from '@mui/icons-material/Phone';

export default function ResultCard({ lead }: { lead: any }) {
  const hasPhone = !!lead.phone;
  // Regra simples: se tiver muitos números ou a string whatsapp
  const isWhatsApp = hasPhone && (lead.phone.includes('whatsapp') || lead.phone.length >= 10);

  return (
    <Card elevation={2} sx={{ mb: 2, borderRadius: 3, transition: '0.2s', '&:hover': { boxShadow: 4, transform: 'translateY(-2px)' } }}>
      <CardContent>
        <Typography variant="h6" color="primary.dark" sx={{ fontWeight: 'bold', mb: 1 }}>
          {lead.name}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2, color: 'text.secondary' }}>
          <LocationOnIcon fontSize="small" sx={{ mr: 0.5, mt: 0.3 }} />
          <Typography variant="body2">{lead.address}</Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {hasPhone ? (
            <Chip 
              icon={isWhatsApp ? <WhatsAppIcon /> : <PhoneIcon />} 
              label={lead.phone} 
              color={isWhatsApp ? "success" : "default"} 
              size="small" 
              variant={isWhatsApp ? "filled" : "outlined"}
            />
          ) : (
            <Chip label="Sem Telefone Público" size="small" variant="outlined" />
          )}
          
          {lead.website && (
            <Chip 
              icon={<LanguageIcon />} 
              label="Site Disponível" 
              color="primary" 
              size="small" 
              variant="outlined" 
              component="a" 
              href={lead.website.startsWith('http') ? lead.website : 'https://'+lead.website} 
              target="_blank" 
              clickable 
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );
}