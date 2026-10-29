import { Container, Typography, Box, Paper, Accordion, AccordionSummary, AccordionDetails, Breadcrumbs, Link as MuiLink } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';

export default function About() {
  const faqs = [
    {
      q: 'O que é o LeadMap?',
      a: 'O LeadMap é uma ferramenta gratuita desenvolvida para profissionais comerciais, agências, freelancers e empreendedores que buscam gerar listas qualificadas de empresas e comércios locais em qualquer região do Brasil para prospecção ativa de clientes.'
    },
    {
      q: 'Como funciona a busca por CEP?',
      a: 'Ao digitar o CEP, nossa inteligência localiza a cidade e o bairro correspondente através de bases abertas como ViaCEP e OpenStreetMap. Em seguida, mapeamos todos os estabelecimentos comerciais correspondentes ao segmento escolhido.'
    },
    {
      q: 'Como exportar os leads para Excel ou CRM?',
      a: 'Após a pesquisa, você pode clicar nos botões "Exportar Planilha Excel (.xlsx)" ou "Exportar CSV". A planilha já é baixada com colunas estruturadas contendo o nome da empresa, endereço, links prontos para WhatsApp Web, Instagram e fichas no Google Maps.'
    },
    {
      q: 'O serviço é 100% gratuito?',
      a: 'Sim! O LeadMap é totalmente gratuito para buscas e exportações. Nosso modelo de sustentabilidade é mantido através de anúncios patrocinados não-intrusivos exibidos discretamente na plataforma.'
    },
    {
      q: 'Como são tratados os dados e a privacidade (LGPD)?',
      a: 'O LeadMap utiliza exclusivamente dados públicos disponíveis abertamente na internet e em bases cartográficas colaborativas (OpenStreetMap). Não coletamos nem armazenamos informações privadas de pessoas físicas.'
    }
  ];

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Helmet>
        <title>Sobre o LeadMap — Como Funciona e Perguntas Frequentes</title>
        <meta name="description" content="Saiba como usar o LeadMap para prospectar clientes locais B2B, entender as fontes de dados e tirar suas dúvidas frequentes." />
      </Helmet>

      <Breadcrumbs sx={{ mb: 3 }}>
        <MuiLink component={RouterLink} to="/" color="inherit" underline="hover">
          Início
        </MuiLink>
        <Typography color="text.primary">Sobre e FAQ</Typography>
      </Breadcrumbs>

      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 800, color: 'primary.dark' }}>
        Sobre o LeadMap
      </Typography>
      
      <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.1rem', mb: 4, lineHeight: 1.7 }}>
        O <strong>LeadMap</strong> nasceu da necessidade real de encontrar contatos e comércios locais de forma rápida, sem complicação e sem assinaturas caras. Nossa missão é democratizar a prospecção comercial B2B para pequenos empresários, representantes comerciais e prestadores de serviço.
      </Typography>

      <Paper elevation={2} sx={{ p: { xs: 3, md: 4 }, borderRadius: 3, mb: 5, bgcolor: '#f8fafc', border: '1px solid #e2e8f0' }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: 'primary.main' }}>
          Por que usar o LeadMap para suas vendas?
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CheckCircleIcon color="success" />
            <Typography variant="body2"><strong>Foco Regional:</strong> Encontre clientes exatamente onde sua operação pode atender.</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CheckCircleIcon color="success" />
            <Typography variant="body2"><strong>Mais de 80 Segmentos:</strong> De restaurantes a escritórios de advocacia e clínicas.</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CheckCircleIcon color="success" />
            <Typography variant="body2"><strong>Pronto para Vendas:</strong> Planilhas prontas com atalhos de WhatsApp e redes sociais.</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CheckCircleIcon color="success" />
            <Typography variant="body2"><strong>100% Grátis:</strong> Exporte quantas listas precisar sem pagar mensalidades.</Typography>
          </Box>
        </Box>
      </Paper>

      <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 700, mb: 3, color: 'text.primary' }}>
        Perguntas Frequentes (FAQ)
      </Typography>

      <Box sx={{ mb: 6 }}>
        {faqs.map((faq, i) => (
          <Accordion key={i} sx={{ mb: 1.5, borderRadius: '8px !important', '&:before': { display: 'none' }, border: '1px solid #e2e8f0' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 600 }}>{faq.q}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                {faq.a}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
}
