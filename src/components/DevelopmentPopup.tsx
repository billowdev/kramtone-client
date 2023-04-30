import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

interface DevelopmentPopupProps {
  open: boolean;
  onClose: () => void;
}

const DevelopmentPopup: React.FC<DevelopmentPopupProps> = ({ open, onClose }) => {
	const handleDevAccept = async () => {
		try {
		  await fetch('/api/accept_dev', {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			},
		  });
		  onClose();
		} catch (error) {
		  console.error('An error occurred while setting the dev:', error);
		}
	  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Website Under Development</DialogTitle>
      <DialogContent>
        <DialogContentText>
			เว็บไซต์นี้ยังอยู่ระหว่างการพัฒนาและทดสอบ ข้อมูลบางอย่างอาจถูกจำลองขึ้น
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button  onClick={handleDevAccept} color="primary">
         ปิด
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DevelopmentPopup;
