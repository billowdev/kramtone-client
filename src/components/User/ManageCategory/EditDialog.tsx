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

  
};

export default EditDialog;
