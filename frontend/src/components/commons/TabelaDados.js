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
  Box,
  LinearProgress,
  Typography,
  TextField,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
} from '@mui/icons-material';

const TabelaDados = ({
  colunas,
  dados,
  loading,
  error,
  onEdit,
  onDelete,
  titulo,
  searchPlaceholder,
  onSearch,
  search,
}) => {
  const [pagina, setPagina] = useState(0);
  const [linhasPorPagina, setLinhasPorPagina] = useState(10);

  const handleChangePagina = (event, newPage) => {
    setPagina(newPage);
  };

  const handleLinhasPorPagina = (event) => {
    setLinhasPorPagina(parseInt(event.target.value, 10));
    setPagina(0);
  };

  const visibleRows = dados.slice(pagina * linhasPorPagina, pagina * linhasPorPagina + linhasPorPagina);

  return (
    <Paper elevation={3} sx={{ width: '100%', overflow: 'hidden' }}>
      <Box sx={{ p: 2 }}>
        {onSearch && (
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              placeholder={searchPlaceholder || "Buscar..."}
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              InputProps={{
                endAdornment: <SearchIcon color="action" />,
              }}
            />
        )}
      </Box>

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
                  Buscando empresas...
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
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align || 'left'}>
                        {column.format ? column.format(value, row) : value}
                      </TableCell>
                    );
                  })}
                  <TableCell align="center">
                    <Tooltip titulo="Editar">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => onEdit(row)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip titulo="Excluir">
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
    </Paper>
  );
};

export default TabelaDados;