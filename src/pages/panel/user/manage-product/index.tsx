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
import { useTheme } from "@material-ui/core/styles";

import * as productService from "@/services/product.service"
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
  Container,
  IconButton,
  Slide,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {EditDialog, DeleteDialog} from "@/components/User/ManageProduct"
// import EditDialog from "./components"

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
    <Link href="/panel/user/manage-product/add" passHref>
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
  accessToken?: string,
  // productArray?: ProductPayload[]
}


function UserPanelManageProduct({ gid, accessToken }: Props) {
  const theme = useTheme();

  const dispatch = useAppDispatch();
  const productData = useSelector(productSelector);
  const [openAddDialog, setOpenAddDialog] = React.useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState<boolean>(false);
  const [openEditDialog, setOpenEditDialog] = React.useState<boolean>(false);

  const [selectedProduct, setSelectedProduct] = React.useState<ProductPayload | null>(null);

  React.useEffect(() => {
    dispatch(getAllProductByGroupAction(gid!));
  }, [dispatch, gid]);

  const [filterButtonEl, setFilterButtonEl] =
  React.useState<HTMLButtonElement | null>(null);


  const handleDeleteConfirm = () =>{
    if(selectedProduct) {
        //     const sid = selectedProduct.id
  //     // dispatch(deleteProductAction({id:sid, gid}!))
      console.log(selectedProduct)
    }
    setOpenDeleteDialog(false);
  }

  const handleDeleteCancel = () => {
    setOpenDeleteDialog(false);
  };

  const handleEditConfirm = () =>{
    if(selectedProduct) {
      console.log(selectedProduct)
    }
    setOpenEditDialog(false);
  }

  const handleEditCancel = () => {
    setOpenEditDialog(false);
  };
  
  
  const handleAddConfirm = (product: ProductPayload) =>{
    console.log(product)
  }

  const handleAddCancel = () => {
    setOpenAddDialog(false);
  };



  const columns: GridColDef[] = [
    // { field: "id", headerName: "ID", width: 280 },

    {
      field: "name",
      editable: true,
      headerName: "ชื่อโหนด",
      width: 180,
    },
    {
      field: "desc",
       editable: true,
      headerName: "รายละเอียด",
      width: 180,
    },
   
    {
      field: "price",
      headerName: "ราคา",
      width: 180,
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
              setOpenDeleteDialog(true);
            }}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            aria-label="edit"
            size="large"
            // onClick={() => 
              // router.push("/panel/user/manage-product/edit?id=" + row.id)
            // }
            onClick={() => {
              setSelectedProduct(row);
              setOpenEditDialog(true);
            }}
          >
            <EditIcon fontSize="inherit" />
          </IconButton>
        
        </Stack>
      ),
    },
  ];
  const isSmallDevice = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Layout>
    <Container sx={{
        marginLeft: isSmallDevice ? 0 : 2, 
        marginTop: isSmallDevice ? 0 : 4, 
      }}>

         {/* Summary Icons */}
         <DataGrid
    
        sx={{ backgroundColor: "white", height: "100vh", width: "80vw" }}
        rows={productData?.productArray ?? []}
        columns={columns}
        // pageSize={25}
        // rowsPerPageOptions={[25]}
        components={{
          Toolbar: CustomToolbar,
        }}
        componentsProps={{
          panel: {
            anchorEl: filterButtonEl,
          },
          toolbar: {
            setFilterButtonEl,
          },
        }}
      />
      <EditDialog open={openEditDialog} product={selectedProduct} onConfirm={handleEditConfirm} onCancel={handleEditCancel} />
      <DeleteDialog open={openDeleteDialog} product={selectedProduct} onConfirm={handleDeleteConfirm} onCancel={handleDeleteCancel} />
      </Container>
    </Layout>
  )
}

export default withAuth(UserPanelManageProduct)


export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const accessToken = context.req.cookies['access_token']
    const { gid } = await authService.getSessionServerSide(accessToken!)

    // const productArray = await productService.getAllProductByGroup(gid)
    return {
      props: {
        gid,
        accessToken,
        // productArray
      },
    };
  } catch (error) {
    return {
      props: {

      },
    };
  }

};


