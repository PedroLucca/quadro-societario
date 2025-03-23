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
  FormHelperText,
  Chip,
  OutlinedInput,
  Box
} from '@mui/material';
import { EmpresaContext } from '../../context/EmpresaContext';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const SocioForm = ({ open, onClose, onSave, socio, loading }) => {
  const { empresas, loading: loadingEmpresas } = useContext(EmpresaContext);
  
  const [form, setForm] = useState({
    nome: '',
    cpf: '',
    empresa_ids: []
  });
  const [erros, setErros] = useState({});

  useEffect(() => {
    if (socio) {
      setForm({
        nome: socio.nome || '',
        cpf: socio.cpf ? formatarCPF(String(socio.cpf)) : '',
        empresa_ids: socio.empresas ? socio.empresas.map(emp => emp.id) : []
      });
    } else {
      setForm({
        nome: '',
        cpf: '',
        empresa_ids: []
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
    
    if (!form.empresa_ids || form.empresa_ids.length === 0) {
      errosAux.empresa_ids = 'Selecione pelo menos uma empresa';
    }
    
    setErros(errosAux);
    return Object.keys(errosAux).length === 0;
  };

  const handleSubmit = () => {
    if (validarForm()) {
      const formData = {
        ...form,
        empresa_ids: form.empresa_ids.map(id => Number(id)),
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

  const handleRemoveEmpresa = (empresaId) => {
    console.log("Removendo empresa ID:", empresaId);
    const newSelectedEmpresas = form.empresa_ids.filter(id => id !== empresaId);
    setForm(prev => ({
      ...prev,
      empresa_ids: newSelectedEmpresas
    }));
    
    if (erros.empresa_ids && newSelectedEmpresas.length > 0) {
      setErros(prev => ({
        ...prev,
        empresa_ids: ''
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
            <FormControl 
              fullWidth 
              error={!!erros.empresa_ids} 
              disabled={loading || loadingEmpresas}
            >
              <InputLabel id="empresa-multiselect-label">Empresas</InputLabel>
              <Select
                labelId="empresa-multiselect-label"
                id="empresa-multiselect"
                name="empresa_ids"
                multiple
                value={form.empresa_ids}
                onChange={handleChange}
                input={<OutlinedInput label="Empresas" />}
                renderValue={(selected) => `${selected.length} empresa(s) selecionada(s)`}
                MenuProps={MenuProps}
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
              {erros.empresa_ids && <FormHelperText>{erros.empresa_ids}</FormHelperText>}
            </FormControl>
          </Grid2>
          <Grid2 item size={{ xs: 12}}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
              {form.empresa_ids.map((empresaId) => {
                const empresa = empresas.find(emp => emp.id === empresaId);
                return (
                  <Chip 
                    key={empresaId} 
                    label={empresa ? empresa.nome : empresaId} 
                    size="small"
                    onDelete={() => handleRemoveEmpresa(empresaId)}
                    disabled={loading}
                    sx={{ margin: '2px' }}
                  />
                );
              })}
            </Box>
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