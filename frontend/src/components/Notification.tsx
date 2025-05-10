import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { NotificationInt } from '../interfaces/NotificationInt';

const Notification: React.FC<NotificationInt> = ({
  open,
  message,
  severity = 'info',
  handleClose,
  autoHideDuration = 3000,
}) => {
  return (
    <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
