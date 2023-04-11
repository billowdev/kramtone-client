import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import { CategoryPayload } from '@/models/category.model';

interface EditDialogProps {
  open: boolean;
  category: CategoryPayload | null;
  onConfirm: (category: CategoryPayload | null) => void;
  onCancel: () => void;
}

export const EditDialog: React.FC<EditDialogProps> = ({ open, category, onConfirm, onCancel }) => {
  const handleEditConfirm = () => {
    onConfirm(category);
  };

  return (
    <Dialog
      open={open}
      keepMounted
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        <br />
        แก้ไขข้อมูล : {category?.name}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          คุณต้องการแก้ไขข้อมูลใช่หรือไม่
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>
          ยกเลิก
        </Button>
        <Button onClick={handleEditConfirm} color="primary">
          แก้ไข
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
