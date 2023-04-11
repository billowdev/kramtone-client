import React from 'react'
import Layout from '@/components/Layouts/Layout';
import { useAppDispatch } from "@/store/store";
import { getAllCategoryByGroupAction, categorySelector, deleteCategoryAction} from "@/store/slices/category.slice";
import router from "next/router";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { TransitionProps } from "@mui/material/transitions";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import withAuth from "@/components/withAuth";
import { useTheme } from "@material-ui/core/styles";
import * as categoryService from "@/services/category.service"
import * as authService from "@/services/auth.service"
import {CategoryPayload} from "@/models/category.model"
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
import {EditDialog, DeleteDialog} from "@/components/User/ManageCategory"
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
  // productArray?: CategoryPayload[]
}


function UserPanelManageCategory({ gid, accessToken }: Props) {
  const theme = useTheme();

  const dispatch = useAppDispatch();
  const categoryData = useSelector(categorySelector);
  const [openAddDialog, setOpenAddDialog] = React.useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState<boolean>(false);
  const [openEditDialog, setOpenEditDialog] = React.useState<boolean>(false);

  const [selectedCategory, setSelectedCategory] = React.useState<CategoryPayload | null>(null);

  React.useEffect(() => {
    dispatch(getAllCategoryByGroupAction(accessToken!));
  }, [dispatch]);

  const [filterButtonEl, setFilterButtonEl] =
  React.useState<HTMLButtonElement | null>(null);


  const handleDeleteConfirm = () =>{
    if(selectedCategory) {
        //     const sid = selectedCategory.id
  //     // dispatch(deleteCategoryAction({id:sid, gid}!))
      console.log(selectedCategory)
    }
    setOpenDeleteDialog(false);
  }

  const handleDeleteCancel = () => {
    setOpenDeleteDialog(false);
  };

  const handleEditConfirm = () =>{
    if(selectedCategory) {
      console.log(selectedCategory)
    }
    setOpenEditDialog(false);
  }

  const handleEditCancel = () => {
    setOpenEditDialog(false);
  };
  
  
  const handleAddConfirm = (product: CategoryPayload) =>{
    console.log(product)
  }

  const handleAddCancel = () => {
    setOpenAddDialog(false);
  };



  const columns: GridColDef[] = [
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
      headerName: "การดำเนินการ",
      field: ".",
      width: 180,
      renderCell: ({ row }: GridRenderCellParams<any>) => (
        <Stack direction="row">
          <IconButton
            aria-label="delete"
            size="large"
            onClick={() => {
              setSelectedCategory(row);
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
              setSelectedCategory(row);
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
        rows={categoryData?.categoryArray ?? []}
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
      <EditDialog open={openEditDialog} category={selectedCategory} onConfirm={handleEditConfirm} onCancel={handleEditCancel} />
      <DeleteDialog open={openDeleteDialog} category={selectedCategory} onConfirm={handleDeleteConfirm} onCancel={handleDeleteCancel} />
      </Container>
    </Layout>
  )
}

export default withAuth(UserPanelManageCategory)


export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const accessToken = context.req.cookies['access_token']
    const { gid } = await authService.getSessionServerSide(accessToken!)

    // const productArray = await categoryService.getAllProductByGroup(gid)
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


