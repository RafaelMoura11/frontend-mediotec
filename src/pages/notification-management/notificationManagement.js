import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import Notification from './Notification';
import EditNotificationDialog from './notificationModal'; // Importando o diálogo de edição

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [openNotification, setOpenNotification] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentNotification, setCurrentNotification] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      const data = [
        { id: 1, message: 'Usuário adicionado com sucesso!', severity: 'success' },
        { id: 2, message: 'Erro ao excluir o usuário.', severity: 'error' },
      ];
      setNotifications(data);
    };

    fetchNotifications();
  }, []);

  const handleClose = () => {
    setOpenNotification({ ...openNotification, open: false });
  };

  const showNotification = (message, severity = 'success') => {
    setOpenNotification({ open: true, message, severity });
  };

  const handleEditNotification = (notification) => {
    setCurrentNotification(notification);
    setEditDialogOpen(true);
  };

  const handleSaveNotification = (updatedNotification) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((n) =>
        n.id === updatedNotification.id ? updatedNotification : n
      )
    );
    showNotification('Notificação atualizada com sucesso!');
  };

  return (
    <div>
      <h1>Página de Notificações</h1>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Mensagem</TableCell>
              <TableCell>Severidade</TableCell>
              <TableCell>Ações</TableCell> {/* Coluna para ações */}
            </TableRow>
          </TableHead>
          <TableBody>
            {notifications.map((notification) => (
              <TableRow key={notification.id}>
                <TableCell>{notification.id}</TableCell>
                <TableCell>{notification.message}</TableCell>
                <TableCell>{notification.severity}</TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => handleEditNotification(notification)}>Editar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Notification
        open={openNotification.open}
        handleClose={handleClose}
        message={openNotification.message}
        severity={openNotification.severity}
      />

      {/* Diálogo de edição */}
      {currentNotification && (
        <EditNotificationDialog
          open={editDialogOpen}
          handleClose={() => setEditDialogOpen(false)}
          notification={currentNotification}
          onSave={handleSaveNotification}
        />
      )}
    </div>
  );
};

export default NotificationPage;
