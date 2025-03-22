import React, { useContext, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TabelaDados from '../commons/TabelaDados';
import ModalConfirmacao from '../commons/ModalConfirmacao';
import EmpresaForm from './EmpresaForm';
import { EmpresaContext } from '../../context/EmpresaContext';

const EmpresaLista = () => {
  const { 
    empresas, 
    loading, 
    error, 
    filtros, 
    setFiltros, 
    deleteEmpresa, 
    createEmpresa, 
    updateEmpresa 
  } = useContext(EmpresaContext);
  
  const [abrirForm, setAbrirForm] = useState(false);
  const [abrirModalConfirmacao, setAbrirModalConfirmacao] = useState(false);
  const [empresaAtual, setEmpresaAtual] = useState(null);
  const [search, setSearch] = useState('');
  const [salvando, setSalvando] = useState(false);

  const colunas = [
    { id: 'nome', label: 'Nome', minWidth: 200 },
    { id: 'cnpj', label: 'CNPJ', minWidth: 150, 
      format: (valor) => {
        if (!valor) return '';
        const cnpj = valor.replace(/\D/g, '');
        if (cnpj.length !== 14) return valor;
        return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5, 8)}/${cnpj.slice(8, 12)}-${cnpj.slice(12)}`;
      }
    },
    { id: 'endereco', label: 'Endereço', minWidth: 200    },
];

const handleSearch = (valor) => {
  setSearch(valor);
  setFiltros({
    ...filtros,
    search: valor
  });
};

const handleAdd = () => {
  setEmpresaAtual(null);
  setAbrirForm(true);
};

const handleEdit = (empresa) => {
  setEmpresaAtual(empresa);
  setAbrirForm(true);
};

const handleDelete = (empresa) => {
  setEmpresaAtual(empresa);
  setAbrirModalConfirmacao(true);
};

const confirmarDelete = async () => {
  try {
    setSalvando(true);
    await deleteEmpresa(empresaAtual.id);
    setAbrirModalConfirmacao(false);
  } catch (error) {
    console.error('Erro ao excluir empresa:', error);
  } finally {
    setSalvando(false);
  }
};

const handleSave = async (data) => {
  try {
    setSalvando(true);
    if (empresaAtual) {
      await updateEmpresa(empresaAtual.id, data);
    } else {
      await createEmpresa(data);
    }
    setAbrirForm(false);
  } catch (error) {
    console.error('Erro ao salvar empresa:', error);
  } finally {
    setSalvando(false);
  }
};

return (
  <Box sx={{ width: '100%' }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
      <Typography variant="h5" component="h2">
        Gerenciamento de Empresas
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleAdd}
      >
        Nova Empresa
      </Button>
    </Box>

    <TabelaDados
      titulo="Empresas"
      colunas={colunas}
      dados={empresas}
      loading={loading}
      error={error}
      onEdit={handleEdit}
      onDelete={handleDelete}
      searchPlaceholder="Buscar por nome ou CNPJ..."
      onSearch={handleSearch}
      search={search}
    />

    <EmpresaForm
      open={abrirForm}
      onClose={() => setAbrirForm(false)}
      onSave={handleSave}
      empresa={empresaAtual}
      loading={salvando}
    />

    <ModalConfirmacao
      open={abrirModalConfirmacao}
      titulo="Confirmar exclusão"
      mensagem={`Tem certeza que deseja excluir a empresa ${empresaAtual?.nome}?`}
      onConfirm={confirmarDelete}
      onCancel={() => setAbrirModalConfirmacao(false)}
    />
  </Box>
);
};

export default EmpresaLista;