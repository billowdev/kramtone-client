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
  
 export const ConfirmationDialog = ({
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
  


//  import { useState } from "react";
// import ConfirmationDialog from "./ConfirmationDialog";

// const EditProduct = () => {
//   const [showConfirmation, setShowConfirmation] = useState(false);

//   const handleEditProduct = () => {
//     // show confirmation dialog before editing product
//     setShowConfirmation(true);
//   };

//   const handleConfirmEditProduct = () => {
//     // edit product
//     setShowConfirmation(false);
//   };

//   const handleCancelEditProduct = () => {
//     setShowConfirmation(false);
//   };

//   return (
//     <>
//       {/* show confirmation dialog if user clicks Edit button */}
//       <ConfirmationDialog
//         title="Confirm Edit Product"
//         message="Are you sure you want to edit this product?"
//         open={showConfirmation}
//         onClose={handleCancelEditProduct}
//         onConfirm={handleConfirmEditProduct}
//       />

//       {/* display Edit button */}
//       <Button variant="contained" onClick={handleEditProduct}>
//         Edit Product
//       </Button>
//     </>
//   );
// };
