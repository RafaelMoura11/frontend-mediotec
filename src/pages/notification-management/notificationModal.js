import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';

const EditNotificationDialog = ({ open, handleClose, notification, onSave }) => {
  const [message, setMessage] = useState(notification.message);
  const [severity, setSeverity] = useState(notification.severity);

  const handleSave = () => {
    onSave({ ...notification, message, severity });
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Editar Notificação</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Mensagem"
          type="text"
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Severidade"
          type="text"
          fullWidth
          value={severity}
          onChange={(e) => setSeverity(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleSave}>Salvar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditNotificationDialog;
