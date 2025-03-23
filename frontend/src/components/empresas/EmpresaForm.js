import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Grid2,
  CircularProgress
} from '@mui/material';

const EmpresaForm = ({ open, onClose, onSave, empresa, loading }) => {
  const [form, setForm] = useState({
    nome: '',
    cnpj: '',
    endereco: ''
  });
  const [erros, setErros] = useState({});

  useEffect(() => {
    if (empresa) {
      setForm({
        nome: empresa.nome || '',
        cnpj: empresa.cnpj || '',
        endereco: empresa.endereco || ''
      });
    } else {
      setForm({
        nome: '',
        cnpj: '',
        endereco: ''
      });
    }
    setErros({});
  }, [empresa, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (erros[name]) {
      setErros(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validarForm = () => {
    const errosAux = {};
    
    if (!form.nome.trim()) {
      errosAux.nome = 'Nome é obrigatório';
    }
    
    if (!form.cnpj.trim()) {
      errosAux.cnpj = 'CNPJ é obrigatório';
    } else if (!/^\d{14}$/.test(form.cnpj.replace(/[^\d]/g, ''))) {
      errosAux.cnpj = 'CNPJ inválido';
    }
    
    if (!form.endereco.trim()) {
      errosAux.endereco = 'Endereço é obrigatório';
    }
    
    setErros(errosAux);
    return Object.keys(errosAux).length === 0;
  };

  const handleSubmit = () => {
    if (validarForm()) {
      const formData = {
        ...form,
        cnpj: form.cnpj.replace(/\D/g, '')
      };
      onSave(formData);
    }
  };

  const formatarCNPJ = (value) => {
    const cnpj = value.replace(/\D/g, '');
    
    if (cnpj.length <= 2) {
      return cnpj;
    }
    if (cnpj.length <= 5) {
      return `${cnpj.slice(0, 2)}.${cnpj.slice(2)}`;
    }
    if (cnpj.length <= 8) {
      return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5)}`;
    }
    if (cnpj.length <= 12) {
      return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5, 8)}/${cnpj.slice(8)}`;
    }
    return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5, 8)}/${cnpj.slice(8, 12)}-${cnpj.slice(12, 14)}`;
  };

  const handleCNPJChange = (e) => {
    const valorFormatado = formatarCNPJ(e.target.value);
    setForm(prev => ({
      ...prev,
      cnpj: valorFormatado
    }));
    
    if (erros.cnpj) {
      setErros(prev => ({
        ...prev,
        cnpj: ''
      }));
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{empresa ? 'Editar Empresa' : 'Nova Empresa'}</DialogTitle>
      <DialogContent>
        <Grid2 container spacing={2} sx={{ mt: 1 }}>
          <Grid2 item size={{ xs: 12}}>
            <TextField
              fullWidth
              label="Nome"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              error={!!erros.nome}
              helperText={erros.nome}
              disabled={loading}
              required
            />
          </Grid2>
          <Grid2 item size={{ xs: 12}}>
            <TextField
              fullWidth
              label="CNPJ"
              name="cnpj"
              value={form.cnpj}
              onChange={handleCNPJChange}
              error={!!erros.cnpj}
              helperText={erros.cnpj}
              disabled={loading}
              required
              inputProps={{ maxLength: 18 }}
            />
          </Grid2>
          <Grid2 item size={{ xs: 12}}>
            <TextField
              fullWidth
              label="Endereço"
              name="endereco"
              value={form.endereco}
              onChange={handleChange}
              error={!!erros.endereco}
              helperText={erros.endereco}
              disabled={loading}
              required
            />
          </Grid2>
        </Grid2>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancelar
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          color="primary"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          {loading ? 'Salvando...' : 'Salvar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmpresaForm;