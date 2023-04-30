import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Typography,
  } from "@mui/material";
  import { MouseEvent } from "react";
  
  interface ConfirmationDialogProps {
	title: string;
	message: string;
	open: boolean;
	onClose: () => void;
	onConfirm: (event: MouseEvent<HTMLButtonElement>) => void;
  }
  
  const ConfirmationDialog = ({
	title,
	message,
	open,
	onClose,
	onConfirm,
  }: ConfirmationDialogProps) => {
	return (
	  <Dialog open={open} onClose={onClose}>
		<DialogTitle>{title}</DialogTitle>
		<DialogContent>
		  <Typography>{message}</Typography>
		</DialogContent>
		<DialogActions>
		  <Button variant="outlined" onClick={onClose}>
			ยกเลิก
		  </Button>
		  <Button variant="contained" onClick={onConfirm} autoFocus>
			ยืนยัน
		  </Button>
		</DialogActions>
	  </Dialog>
	);
  };
  
  export default ConfirmationDialog;
  