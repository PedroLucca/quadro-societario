import React, { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  LinearProgress,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  Button,
  DialogActions
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

const acessaValorObjeto = (obj, path) => {
  if (!path || !obj) return undefined;
  
  if (path.includes('.')) {
    return path.split('.').reduce((prev, curr) => {
      return prev && prev[curr] !== undefined ? prev[curr] : undefined;
    }, obj);
  }
  
  return obj[path];
};

const TabelaDados = ({
  colunas,
  dados,
  loading,
  error,
  onEdit,
  onDelete,
  titulo
}) => {
  const [pagina, setPagina] = useState(0);
  const [linhasPorPagina, setLinhasPorPagina] = useState(10);
  const [modalAberto, setModalAberto] = useState(false);
  const [modalConteudo, setModalConteudo] = useState({
    titulo: '',
    itens: []
  });

  const handleChangePagina = (event, newPage) => {
    setPagina(newPage);
  };

  const handleLinhasPorPagina = (event) => {
    setLinhasPorPagina(parseInt(event.target.value, 10));
    setPagina(0);
  };

  const visibleRows = dados.slice(pagina * linhasPorPagina, pagina * linhasPorPagina + linhasPorPagina);

  const abrirModal = (titulo, itens) => {
    setModalConteudo({
      titulo,
      itens
    });
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
  };

  const renderizarCelulaArray = (value, column, row) => {
    if (!value || !Array.isArray(value) || value.length === 0) {
      return "Nenhum";
    }

    return (
      <Button
        variant="outlined"
        size="small"
        onClick={() => {
          let itensModal = [];
          
          if (column.arrayConfig && column.arrayConfig.displayPath) {
            itensModal = value.map(item => {
              const displayValue = acessaValorObjeto(item, column.arrayConfig.displayPath);
              return {
                id: item.id || Math.random().toString(),
                texto: displayValue || JSON.stringify(item)
              };
            });
          } else {
            itensModal = value.map(item => ({
              id: item.id || Math.random().toString(),
              texto: item.nome || JSON.stringify(item)
            }));
          }
          
          abrirModal(`${column.label} - ${row.nome || ''}`, itensModal);
        }}
      >
        {value.length}
      </Button>
    );
  };

  return (
    <Paper elevation={3} sx={{ width: '100%', overflow: 'hidden' }}>
      {loading && <LinearProgress />}

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label={`${titulo} tabela`}>
          <TableHead>
            <TableRow>
              {colunas.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || 'left'}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {error ? (
              <TableRow>
                <TableCell colSpan={colunas.length + 1} align="center">
                  Erro ao carregar dados: {error}
                </TableCell>
              </TableRow>
            ) : loading ? (
              <TableRow>
                <TableCell colSpan={colunas.length + 1} align="center">
                  Buscando {titulo.toLowerCase()}...
                </TableCell>
              </TableRow>
            ) : visibleRows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={colunas.length + 1} align="center">
                  Nenhum dado encontrado
                </TableCell>
              </TableRow>
            ) : (
              visibleRows.map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {colunas.map((column) => {
                    const value = acessaValorObjeto(row, column.id);
                    return (
                      <TableCell key={column.id} align={column.align || 'left'}>
                        {column.isArray ? (
                          renderizarCelulaArray(value, column, row)
                        ) : column.format ? (
                          column.format(value, row)
                        ) : (
                          value
                        )}
                      </TableCell>
                    );
                  })}
                  <TableCell align="center">
                    <Tooltip title="Editar">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => onEdit(row)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Excluir">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => onDelete(row)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={dados.length}
        rowsPerPage={linhasPorPagina}
        page={pagina}
        onPageChange={handleChangePagina}
        onRowsPerPageChange={handleLinhasPorPagina}
        labelRowsPerPage="Linhas por página:"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} de ${count}`
        }
      />

      <Dialog open={modalAberto} onClose={fecharModal} maxWidth="sm" fullWidth>
        <DialogTitle>{modalConteudo.titulo}</DialogTitle>
        <DialogContent>
          <List>
            {modalConteudo.itens.length === 0 ? (
              <ListItem>
                <ListItemText primary="Nenhum item para mostrar" />
              </ListItem>
            ) : (
              modalConteudo.itens.map((item) => (
                <ListItem key={item.id} divider>
                  <ListItemText primary={item.texto} />
                </ListItem>
              ))
            )}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={fecharModal}>
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default TabelaDados;