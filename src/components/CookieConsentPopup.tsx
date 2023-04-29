import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography, Box} from '@mui/material';
import Link from "next/link";
const CookieConsentPopup = ({ open, onClose }) => {
  const handleAccept = async () => {
    try {
      await fetch('/api/accept_cookies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      onClose();
    } catch (error) {
      console.error('An error occurred while setting the cookie:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>เว็บไซต์นี้ใช้คุกกี้ </DialogTitle>
      <DialogContent>
        <DialogContentText>
        
			<Box>
			<Link href="/privacy-policy" onClick={() => {
    onClose();
  }}>
					<Typography  color="primary"> 
					คลิกเพื่ออ่าน นโยบายความเป็นส่วนตัว
					</Typography>
			</Link>

				<br />
				<Typography>
				เราใช้คุกกี้เพื่อเพิ่มประสิทธิภาพ และประสบการณ์ที่ดีในการใช้งานเว็บไซต์ คุณสามารถเลือกตั้งค่าความยินยอมการใช้คุกกี้ได้ โดยคลิก การตั้งค่าคุกกี้ 
			</Typography>

				</Box>
		

        		</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAccept} color="primary">
        ยอมรับ
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CookieConsentPopup;
