import React, { useState, useEffect, useContext } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Grid2,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from '@mui/material';
import { EmpresaContext } from '../../context/EmpresaContext';

const SocioForm = ({ open, onClose, onSave, socio, loading }) => {
  const { empresas, loading: loadingEmpresas } = useContext(EmpresaContext);
  
  const [form, setForm] = useState({
    nome: '',
    cpf: '',
    empresa_id: ''
  });
  const [erros, setErros] = useState({});

  useEffect(() => {
    if (socio) {
      setForm({
        nome: socio.nome || '',
        cpf: socio.cpf ? String(socio.cpf) : '',
        empresa_id: socio.empresa.id || ''
      });
    } else {
      setForm({
        nome: '',
        cpf: '',
        empresa_id: ''
      });
    }
    setErros({});
  }, [socio, open]);

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
    
    if (!form.cpf.trim()) {
      errosAux.cpf = 'CPF é obrigatório';
    } else if (!/^\d{11}$/.test(form.cpf.replace(/[^\d]/g, ''))) {
      errosAux.cpf = 'CPF inválido';
    }
    
    if (!form.empresa_id) {
      errosAux.empresa_id = 'Empresa é obrigatória';
    }
    
    setErros(errosAux);
    return Object.keys(errosAux).length === 0;
  };

  const handleSubmit = () => {
    if (validarForm()) {
      const formData = {
        ...form,
        empresa_id: Number(form.empresa_id),
        cpf: Number(form.cpf.replace(/\D/g, ''))
      };
      onSave(formData);
    }
  };

  const formatarCPF = (value) => {
    const cpf = value.replace(/\D/g, '');
    
    if (cpf.length <= 3) {
      return cpf;
    }
    if (cpf.length <= 6) {
      return `${cpf.slice(0, 3)}.${cpf.slice(3)}`;
    }
    if (cpf.length <= 9) {
      return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6)}`;
    }
    return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9, 11)}`;
  };

  const handleCPFChange = (e) => {
    const valorFormatado = formatarCPF(e.target.value);
    setForm(prev => ({
      ...prev,
      cpf: valorFormatado
    }));
    
    if (erros.cpf) {
      setErros(prev => ({
        ...prev,
        cpf: ''
      }));
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{socio ? 'Editar Sócio' : 'Novo Sócio'}</DialogTitle>
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
              label="CPF"
              name="cpf"
              value={form.cpf}
              onChange={handleCPFChange}
              error={!!erros.cpf}
              helperText={erros.cpf}
              disabled={loading}
              required
              inputProps={{ maxLength: 14 }}
            />
          </Grid2>
          <Grid2 item size={{ xs: 12}}>
            <FormControl fullWidth error={!!erros.empresa_id} disabled={loading || loadingEmpresas}>
              <InputLabel id="empresa-select-label">Empresa</InputLabel>
              <Select
                labelId="empresa-select-label"
                id="empresa-select"
                name="empresa_id"
                value={form.empresa_id}
                onChange={handleChange}
                label="Empresa"
                required
              >
                {loadingEmpresas ? (
                  <MenuItem value="" disabled>
                    Carregando empresas...
                  </MenuItem>
                ) : empresas.length === 0 ? (
                  <MenuItem value="" disabled>
                    Nenhuma empresa cadastrada
                  </MenuItem>
                ) : (
                  empresas.map((empresa) => (
                    <MenuItem key={empresa.id} value={empresa.id}>
                      {empresa.nome}
                    </MenuItem>
                  ))
                )}
              </Select>
              {erros.empresa_id && <FormHelperText>{erros.empresa_id}</FormHelperText>}
            </FormControl>
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

export default SocioForm;