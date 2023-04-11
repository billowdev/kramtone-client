import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import { ProductPayload } from '@/models/product.model';

interface EditDialogProps {
  open: boolean;
  product: ProductPayload | null;
  onConfirm: (product: ProductPayload | null) => void;
  onCancel: () => void;
}

export const EditDialog: React.FC<EditDialogProps> = ({ open, product, onConfirm, onCancel }) => {
  const handleEditConfirm = () => {
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
        แก้ไขข้อมูล : {product?.name}
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
