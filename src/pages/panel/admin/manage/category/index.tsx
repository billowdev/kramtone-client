import React, { Dispatch, FunctionComponent, SetStateAction, useState } from 'react'
import Layout from '@/components/Layouts/Layout';
import { useAppDispatch } from "@/store/store";
import { getAllCategory, categorySelector, deleteCategoryAction } from "@/store/slices/category.slice";
import router from "next/router";
import { TransitionProps } from "@mui/material/transitions";
import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import withAuth from "@/components/withAuth";
import { useTheme } from "@material-ui/core/styles";
import * as categoryService from "@/services/category.service"
import * as authService from "@/services/auth.service"
import { CategoryPayload } from "@/models/category.model"
import { useSelector } from "react-redux";
import { CategoryDialog } from "@/components/Panel/CategoryDialog"
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
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";

import {
  Paper,
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
  Toolbar,
  FormControl,
  InputLabel,
  Select
} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckroomIcon from "@mui/icons-material/Checkroom";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// import EditDialog from "./components"
import { makeStyles } from "@material-ui/core";
import toast from "react-hot-toast";


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

import { Modal } from '@mui/material';

const useStyles = makeStyles({
  customToolbar: {
    position: 'relative',
  },
  addButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  formControl: {
    minWidth: 120,
    marginRight: 2,
  },
  tableContainer: {
    paddingTop: '20px',
    paddingLeft: '20px',
    marginTop: "20px",
    marginLeft: "20px",
    width: "80%",
    height: "100%"
  },
});

const CustomToolbar: FunctionComponent<{
  setFilterButtonEl: Dispatch<
    SetStateAction<HTMLButtonElement | null>
  >;
}> = ({ setFilterButtonEl }) => (
  <GridToolbarContainer>
    <GridToolbarColumnsButton />
    <GridToolbarDensitySelector />
    <GridToolbarFilterButton ref={setFilterButtonEl} />
    <Link href="/panel/admin/manage/category/add" passHref>
      <Button
        variant="contained"
        color="primary"
        aria-label="add"
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
        }}
      >
        <AddIcon />
      </Button>
    </Link>
  </GridToolbarContainer>
);


type Props = {
  // gid?: string,
  // accessToken?: string,
  // productArray?: CategoryPayload[]
}

function AdminPanelManageCategory({
  // accessToken
}: Props) {
  const theme = useTheme();
  const classes = useStyles();

  const dispatch = useAppDispatch();
  const categoryData = useSelector(categorySelector);
  const [openAddDialog, setOpenAddDialog] = React.useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState<boolean>(false);
  const [openEditDialog, setOpenEditDialog] = React.useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedCategory, setSelectedCategory] = React.useState<CategoryPayload | null>(null);

  const [searchTerm, setSearchTerm] = React.useState('');
  const [filter, setFilter] = React.useState('');

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: React.ChangeEvent<HTMLInputElement>, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const [viewCategoryOpen, setViewCategoryOpen] = useState(false);

  const handleViewCategoryOpen = (row: any) => {
    setSelectedCategory(row)
    setViewCategoryOpen(true);
  };

  const handleViewCategoryClose = () => {
    setViewCategoryOpen(false);
  };


  React.useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  const [filterButtonEl, setFilterButtonEl] =
    React.useState<HTMLButtonElement | null>(null);


  const handleDeleteConfirm = () => {
    if (selectedCategory) {
      //     const sid = selectedCategory.id
      //     // dispatch(deleteCategoryAction({id:sid, gid}!))
      console.log(selectedCategory)
    }
    setOpenDeleteDialog(false);
  }

  const handleDeleteCancel = () => {
    setOpenDeleteDialog(false);
  };

  const handleEditConfirm = () => {
    if (selectedCategory) {
      console.log(selectedCategory)
    }
    setOpenEditDialog(false);
  }

  const handleEditCancel = () => {
    setOpenEditDialog(false);
  };
  const handleAddClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpenAddDialog(true);
  }
  const handleAddConfirm = (product: CategoryPayload) => {
    console.log(product)
  }

  const handleAddCancel = () => {
    setOpenAddDialog(false);
  };

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDelete = () => {
    setShowConfirmation(true);
  }

  const handleConfirmDelete = async () => {
    if (selectedCategory) {
      // console.log(selectedUser)
      const response = await dispatch(deleteCategoryAction({ id: selectedCategory.id }))
      if (response.meta.requestStatus === "fulfilled") {
        toast.success("ลบข้อมูลสำเร็จ")
        setTimeout(() => {
          window.location.reload(); // Reload the page after 2 seconds
        }, 200);
        // router.push("/panel/user/manage-product");
      } else {
        toast.error("ลบข้อมูลไม่สำเร็จ ประเภทสินค้าถูกใช้งานอยู่ไม่สามารถลบข้อมูลได้ โปรดลองอีกครั้ง")
      }
    }

    setShowConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };


  const handleDeleteClick = (e: React.ChangeEvent<HTMLInputElement>, row: CategoryPayload | null) => {
    setOpenDeleteDialog(true)
  }


  const showEditDialog = () => {
    if (selectedCategory === null) {
      return;
    }

    return (
      <Dialog
        open={openEditDialog}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">

          Confirm to delete the product? : {selectedCategory.name}
        </DialogTitle>
        <DialogContent>

        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)} color="info">
            Cancel
          </Button>
          <Button onClick={handleEditConfirm} color="primary">
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    );
  };


  const columns: GridColDef[] = [
    {
      field: "name",
      editable: true,
      headerName: "ชื่อ",
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
              handleDelete()
            }}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            aria-label="edit"
            size="large"
            onClick={() =>
              router.push("/panel/admin/manage/category/edit?id=" + row.id)
            }
          // onClick={() => {
          //   setSelectedCategory(row);
          //   // setOpenEditDialog(true);
          // }}
          >
            <EditIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            aria-label="edit"
            size="large"
            onClick={() => {
              handleViewCategoryOpen(row)
            }}
          >
            <VisibilityIcon fontSize="inherit" />
          </IconButton>


        </Stack>
      ),
    },
  ];
  const isSmallDevice = useMediaQuery(theme.breakpoints.down("xs"));

  // console.log("=======categoryData=======")
  // console.log(categoryData)

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'row', gap: '16px' }}>
              {isSmallDevice ? (
                <CheckroomIcon sx={{ fontSize: '1.5rem', marginLeft: '8px' }} />
              ) : (
                <CheckroomIcon sx={{ fontSize: '2.5rem', marginLeft: '16px' }} />
              )}


              <React.Fragment>
                {isSmallDevice ? (
                  <Typography
                    sx={{
                      fontWeight: 'bold', alignSelf: 'center',
                    }}
                  > หน้าจัดการข้อมูลประเภทสินค้า</Typography>
                ) : (
                  <Typography
                    variant='h5' sx={{
                      fontWeight: 'bold', alignSelf: 'center',
                    }}
                  > จัดการข้อมูลประเภทสินค้า</Typography>
                )}
              </React.Fragment>
            </Paper>
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <DataGrid
              sx={{ backgroundColor: "white", width: "100%", height: "100%", minHeight: "200px" }}
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
          </Grid>
        </Grid>

      </Container>

      <CategoryDialog category={selectedCategory} open={viewCategoryOpen} onClose={handleViewCategoryClose} />
      {showEditDialog()}
      <ConfirmationDialog
        title="ลบข้อมูล"
        message="ยืนยันการลบข้อมูล"
        open={showConfirmation}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </Layout>

  )
}

export default withAuth(AdminPanelManageCategory)

// export const getServerSideProps: GetServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   try {
//     const accessToken = context.req.cookies['access_token']
//     const { gid } = await authService.getSessionServerSide(accessToken!)

//     // const productArray = await categoryService.getAllProductByGroup(gid)
//     return {
//       props: {
//         gid,
//         accessToken,
//         // productArray
//       },
//     };
//   } catch (error) {
//     return {
//       props: {

//       },
//     };
//   }
// };


