import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import { ProductPayload } from '@/models/product.model';

interface DeleteDialogProps {
  open: boolean;
  product: ProductPayload | null;
  onConfirm: (product: ProductPayload | null) => void;
  onCancel: () => void;
}

export const DeleteDialog: React.FC<DeleteDialogProps> = ({ open, product, onConfirm, onCancel }) => {
  const handleDeleteConfirm = () => {
    onConfirm(product);
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
       ลบข้อมูล : {product?.name}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          คุณต้องการลบข้อมูลใช่หรือไม่ ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>
          ยกเลิก
        </Button>
        <Button onClick={handleDeleteConfirm} color="primary">
          ลบ
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
