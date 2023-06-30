import React from 'react';
import {
  Button,
  Modal,
  Box,
  Typography,
} from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ModalForm({
  setOpen, open,
}) {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Button sx={{ position: 'relative', left: '345px', color: '#433f5b' }} onClick={() => setOpen(false)}>
          Close
        </Button>
        <Typography id="modal-modal-title" variant="h6" component="h2" color="#eec10f">
          Activation
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <p>Your account is not activated!</p>
          <p>An email has been sent to you to confirm your email.</p>
        </Typography>
      </Box>
    </Modal>
  );
}
