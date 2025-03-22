import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

const ModalConfirmacao = ({ open, titulo, mensagem, onConfirm, onCancel }) => {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="confirm-dialog-titulo"
      aria-describedby="confirm-dialog-description"
    >
      <DialogTitle id="confirm-dialog-titulo">{titulo}</DialogTitle>
      <DialogContent>
        <DialogContentText id="confirm-dialog-description">
          {mensagem}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          Cancelar
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained" autoFocus>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalConfirmacao;