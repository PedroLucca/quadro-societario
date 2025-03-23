import React, { useContext, useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TabelaDados from '../commons/TabelaDados';
import ModalConfirmacao from '../commons/ModalConfirmacao';
import SocioForm from './SocioForm';
import { SocioContext } from '../../context/SocioContext';
import { EmpresaContext } from '../../context/EmpresaContext';

const SocioLista = () => {
  const { 
    socios, 
    loading, 
    error, 
    filtros, 
    setFiltros, 
    deleteSocio, 
    createSocio, 
    updateSocio,
    fetchSocios 
  } = useContext(SocioContext);
  
  const { empresas, fetchEmpresas } = useContext(EmpresaContext);
  
  const [abrirForm, setAbrirForm] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [socioAtual, setSocioAtual] = useState(null);
  const [search, setSearch] = useState('');
  const [saving, setSaving] = useState(false);

  const colunas = [
    { id: 'nome', label: 'Nome', minWidth: 200 },
    { id: 'cpf', label: 'CPF', minWidth: 150, 
      format: (valor) => {
        if (!valor) return '';
        const cpf = String(valor).replace(/\D/g, '');
        if (cpf.length !== 11) return valor;
        return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9)}`;
      }
    },
    { id: 'empresa.nome', label: 'Empresa', minWidth: 200 },
  ];

  
  useEffect(() => {//Fazer requisicao para buscar os socios
    fetchEmpresas();
    fetchSocios();
  }, []);

  const handleSearch = (value) => {
    setSearch(value);
    setFiltros({
      ...filtros,
      search: value
    });
  };

  const handleAdd = () => {
    setSocioAtual(null);
    setAbrirForm(true);
  };

  const handleEdit = (socio) => {
    setSocioAtual(socio);
    setAbrirForm(true);
  };

  const handleDelete = (socio) => {
    setSocioAtual(socio);
    setOpenConfirm(true);
  };

  const confirmarDelete = async () => {
    try {
      setSaving(true);
      await deleteSocio(socioAtual.id);
      setOpenConfirm(false);
    } catch (error) {
      console.error('Erro ao excluir sócio:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async (data) => {
    try {
      setSaving(true);
      if (socioAtual) {
        await updateSocio(socioAtual.id, data);
      } else {
        await createSocio(data);
      }
      setAbrirForm(false);
    } catch (error) {
      console.error('Erro ao salvar sócio:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5" component="h2">
          Gerenciamento de Sócios
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAdd}
          disabled={empresas.length === 0}
        >
          Novo Sócio
        </Button>
      </Box>

      {empresas.length === 0 && (
        <Typography variant="body1" color="error" sx={{ mb: 2 }}>
          Cadastre pelo menos uma empresa antes de adicionar sócios.
        </Typography>
      )}

      <TabelaDados
        titulo="Sócios"
        colunas={colunas}
        dados={socios}
        loading={loading}
        error={error}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchPlaceholder="Buscar por nome ou CPF..."
        onSearch={handleSearch}
        search={search}
      />

      <SocioForm
        open={abrirForm}
        onClose={() => setAbrirForm(false)}
        onSave={handleSave}
        socio={socioAtual}
        loading={saving}
      />

      <ModalConfirmacao
        open={openConfirm}
        titulo="Confirmar exclusão"
        mensagem={`Tem certeza que deseja excluir o sócio ${socioAtual?.nome}?`}
        onConfirm={confirmarDelete}
        onCancel={() => setOpenConfirm(false)}
      />
    </Box>
  );
};

export default SocioLista;