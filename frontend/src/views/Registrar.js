import React, { useState, useContext, useEffect } from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Paper, 
  Container, 
  Grid,
  Link,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Registrar = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register, authenticated } = useContext(AuthContext);

  // Redirecionar se já estiver autenticado
  useEffect(() => {
    if (authenticated) {
      navigate('/');
    }
  }, [authenticated, navigate]);

  const handleRegistro = async (e) => {
    e.preventDefault();
    setError('');

    // Validações básicas
    if (senha !== confirmSenha) {
      setError('As senhas não coincidem');
      return;
    }

    if (senha.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      const result = await register({ nome, email, senha });
      
      if (result.success) {
        // Se o registro for bem-sucedido, redirecione para o login
        navigate('/login', { state: { message: 'Cadastro realizado com sucesso! Faça login para continuar.' } });
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Falha ao realizar o registro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper 
          elevation={3} 
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%'
          }}
        >
          <Typography 
                      component="h1" 
                      variant="h4" 
                      color="primary" 
                      sx={{ fontWeight: 'bold' }}
                    >
                      VOX
                    </Typography>
          
                    <Typography 
                      component="h1" 
                      variant="h6" 
                      color="text.secondary" 
                      sx={{ fontWeight: 'bold', mb: 2 }}
                    >
                      Quadro Societário
                    </Typography>
          <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
            Criar uma nova conta
          </Typography>
          
          {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
          
          <Box component="form" onSubmit={handleRegistro} sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              size="small"
              id="nome"
              label="Nome Completo"
              name="nome"
              autoComplete="name"
              autoFocus
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              size="small"
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              size="small"
              name="senha"
              label="Senha"
              type="password"
              id="senha"
              autoComplete="new-password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              size="small"
              name="confirmSenha"
              label="Confirmar Senha"
              type="password"
              id="confirmSenha"
              value={confirmSenha}
              onChange={(e) => setConfirmSenha(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? 'Registrando...' : 'Registrar'}
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Já tem uma conta? Faça login"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Registrar;