import React from 'react';
import { Divider, Dialog, DialogTitle, DialogContent, Typography, DialogActions, Button } from '@mui/material';
import Image from "next/image"
import { categoryImageURL } from "@/common/utils/utils";
import {CategoryPayload } from "@/models/category.model"

interface CategoryDialogProps {
  category: CategoryPayload | null;
  open: boolean;
  onClose: () => void;
}

export const CategoryDialog: React.FC<CategoryDialogProps> = ({ category, open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle> ประเภทสินค้า : {category?.name}</DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
         รายละเอียด : {category?.desc}
        </Typography>
		<Typography variant="body1" gutterBottom style={{marginTop: "16px"}}>
         รูปภาพประกอบ
        </Typography>
		<Divider />

        {category?.image && (
          <Image 
		  src={categoryImageURL(category?.image.toString())} 
		  alt={category?.name} 
		  height={100}
		  width={100}
		  style={{ maxWidth: '100%', maxHeight: '400px' }} />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          ปิด
        </Button>
      </DialogActions>
    </Dialog>
  );
};
