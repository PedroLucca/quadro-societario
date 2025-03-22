import { Box, Card, CardContent, Typography } from '@mui/material';

const CardTotalizador = ({ titulo, valor, icon, cor }) => (
    <Card elevation={1} sx={{ height: '100%'}}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box
            sx={{
              backgroundColor: `${cor}.light`,
              borderRadius: '50%',
              p: 1,
              mr: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icon}
          </Box>
          <Typography variant="h6" component="div" color="text.secondary">
            {titulo}
          </Typography>
        </Box>
        <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
          {valor}
        </Typography>
      </CardContent>
    </Card>
  );

  export default CardTotalizador;