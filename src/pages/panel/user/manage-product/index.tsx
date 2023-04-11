import React from 'react'
import Layout from '@/components/Layouts/Layout';
import { useAppDispatch } from "@/store/store";
import { getAllProductByGroupAction, productSelector, deleteProductAction} from "@/store/slices/product.slice";
import router from "next/router";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { TransitionProps } from "@mui/material/transitions";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import withAuth from "@/components/withAuth";
import * as authService from "@/services/auth.service"
import {ProductPayload} from "@/models/product.model"
import { useSelector } from "react-redux";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
} from "next";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  Grid,
  IconButton,
  Slide,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CustomToolbar: React.FunctionComponent<{
  setFilterButtonEl: React.Dispatch<
    React.SetStateAction<HTMLButtonElement | null>
  >;
}> = ({ setFilterButtonEl }) => (
  <GridToolbarContainer>
    <GridToolbarFilterButton ref={setFilterButtonEl} />
    <Link href="/panel/buildings/add" passHref>
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
        }}
      >
        <AddIcon />
      </Fab>
    </Link>
  </GridToolbarContainer>
);


type Props = {
  gid?: string,
  accessToken?: string
}


function UserPanelManageProduct({ gid, accessToken }: Props) {
  const dispatch = useAppDispatch();
  const productArray = useSelector(productSelector);
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = React.useState<ProductPayload | null>(null);

  React.useEffect(() => {
    dispatch(getAllProductByGroupAction(gid!));
  }, [dispatch]);

  
  const showDialog = () => {
    if (selectedProduct === null) {
      return;
    }

    return (
      <Dialog
        open={openDialog}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          <br />
          คุณต้องการลบข้อมูลใช่หรือไม่? : {selectedProduct.name}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            คุณจะไม่สามารถกู้คืนข้อมูลได้หากลบข้อมูลแล้ว
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="info">
            ยกเลิก
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary">
            ลบ
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const handleDeleteConfirm = () => {
    if (selectedProduct) {
      const sid = selectedProduct.id
      dispatch(deleteProductAction({id:sid, gid}!))
      setOpenDialog(false);
    }
  };

  const columns: GridColDef[] = [
    // { field: "id", headerName: "ID", width: 280 },

    {
      field: "bid",
      // editable: true,
      headerName: "รหัสโหนด",
      width: 120,
    },
    {
      field: "name",
       editable: true,
      headerName: "ชื่อโหนด",
      width: 120,
    },
    {
      field: "desc",
       editable: true,
      headerName: "รายละเอียด",
      width: 180,
    },
    {
      field: "is_node",
      headerName: "สถานะโหนด",
      width: 100,
    },
    {
      field: "lat",
      headerName: "ละติจูด",
      width: 100,
    },
    {
      field: "lng",
      headerName: "ลองจิจูด",
      width: 100,
    },
    {
      field: "image",
      headerName: "รูปภาพ",
      width: 100,
    },
    {
      headerName: "การดำเนินการ",
      field: ".",
      width: 180,
      renderCell: ({ row }: GridRenderCellParams<any>) => (
        <Stack direction="row">
          <IconButton
            aria-label="delete"
            size="large"
            onClick={() => {
              setSelectedProduct(row);
              setOpenDialog(true);
            }}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            aria-label="edit"
            size="large"
            onClick={() => router.push("/panel/buildings/edit?dataId=" + row.id)}
          >
            <EditIcon fontSize="inherit" />
          </IconButton>
        
        </Stack>
      ),
    },
  ];

  return (
    <Layout>UserPanelManageProduct</Layout>
  )
}

export default withAuth(UserPanelManageProduct)


export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const accessToken = context.req.cookies['access_token']
    const { gid } = await authService.getSessionServerSide(accessToken!)

    return {
      props: {
        gid,
        accessToken
      },
    };
  } catch (error) {
    return {
      props: {

      },
    };
  }

};


