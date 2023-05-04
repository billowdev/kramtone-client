import React, {Dispatch, FunctionComponent, SetStateAction, useState, useEffect, Fragment} from 'react'
import Layout from '@/components/Layouts/Layout';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import {colorSchemeSelector, getAllColorScheme, deleteColorScheme} from "@/store/slices/color-scheme.slice"
import {useAppDispatch} from "@/store/store"
import {ColorSchemePayload} from "@/models/color-scheme.model"
import {useSelector} from "react-redux"
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridValueGetterParams,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
  GridCellParams,
} from "@mui/x-data-grid";
import Link from "next/link"
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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import router from "next/router";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import VisibilityIcon from '@mui/icons-material/Visibility';
import toast from "react-hot-toast";





const CustomToolbar: FunctionComponent<{
  setFilterButtonEl: Dispatch<
    SetStateAction<HTMLButtonElement | null>
  >;
}> = ({ setFilterButtonEl }) => (
  <GridToolbarContainer>
    <GridToolbarColumnsButton />
    <GridToolbarDensitySelector />
    <GridToolbarFilterButton ref={setFilterButtonEl} />
    <Link href="/panel/admin/manage/color-scheme/add" passHref>
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


type Props = {}
function AdminPanelManageColorScheme({}: Props) {
  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('xs'));
  const dispatch = useAppDispatch();
  const colorSchemeData = useSelector(colorSchemeSelector);
  const [filterButtonEl, setFilterButtonEl] =
    useState<HTMLButtonElement | null>(null);
    const [selectedColorScheme, setSelectedColorScheme] = useState<ColorSchemePayload | null>(null);


    const [viewColorSchemeOpen, setViewColorSchemeOpen] = useState(false);

    const handleViewColorSchemeOpen = (row:any) => {
      setSelectedColorScheme(row)
      setViewColorSchemeOpen(true);
    };
  
    const handleViewColorSchemeClose = () => {
      setViewColorSchemeOpen(false);
    };

    
  useEffect(() => {
    dispatch(getAllColorScheme());
  }, [dispatch]);


  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDelete =  () => {
    setShowConfirmation(true);
  }
 
  const handleConfirmDelete = async () => {
    if (selectedColorScheme) {
      // console.log(selectedUser)
      
    const response = await dispatch(deleteColorScheme({ id:selectedColorScheme.id}))
      if (response.meta.requestStatus === "fulfilled") {
        toast.success("ลบข้อมูลสำเร็จ")
        setTimeout(() => {
          window.location.reload(); // Reload the page after 2 seconds
        }, 200);
        // router.push("/panel/user/manage-product");
      }else{
       toast.error("ลบข้อมูลไม่สำเร็จ โปรดลองอีกครั้ง")
      }
    }

    setShowConfirmation(false);
  };
  
  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  
  const columns: GridColDef[] = [
    {
      field: "id",
      editable: true,
      headerName: "ID",
      width: 180,
    },
    {
      field: "hex",
      editable: false,
      headerName: "โทนสี",
      width: 100,
      renderCell: (params: GridCellParams) => {
        const hex = params.value as string;
        return (
          <div style={{
            backgroundColor: hex,
            width: '100%',
            height: '100%',
            display: 'flex',
            color:"white",
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            {hex}
          </div>
        );
      },
  
    },
  
    {
      field: "nameTH",
      editable: false,
      headerName: "ชื่อภาษาไทย",
      width: 180,
    },
    {
      field: "nameEN",
      editable: false,
      headerName: "ชื่อภาษาอังกฤษ",
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
              setSelectedColorScheme(row);
              handleDelete()
            }}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            aria-label="edit"
            size="large"
            onClick={() => 
            router.push("/panel/admin/manage/color-scheme/edit?id=" + row.id)
            }
            // onClick={() => {
            //   setSelectedCategory(row);
            //   // setOpenEditDialog(true);
            // }}
          >
            <EditIcon fontSize="inherit" />
          </IconButton>
        
          {/* <IconButton
            aria-label="edit"
            size="large"
            onClick={()=>{
              handleViewColorSchemeOpen(row)
            }}
          >
            <VisibilityIcon fontSize="inherit" />
          </IconButton> */}

          
        </Stack>
      ),
    },
  ];


  return (
	<Layout>
     	<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'row', gap: '16px'}}>
                {isSmallDevice ? (
                    <ColorLensIcon sx={{fontSize:'1.5rem', marginLeft:'8px'}} />
                  ) : (
                    <ColorLensIcon sx={{fontSize:'2.5rem', marginLeft:'16px'}} />
                  )}

                <Fragment> 
                  {isSmallDevice ? (
                    <Typography
                   sx={{
                      fontWeight: 'bold',  alignSelf:'center',
                  }}
                    > หน้าจัดการข้อมูลโทนสี<br />ครามธรรมชาติ</Typography>
                  ) : (
                    <Typography
                    variant='h5' sx={{
                      fontWeight: 'bold',  alignSelf:'center',
                  }}
                    > จัดการโทนสีที่มีในร้าน</Typography>
                  )}
                </Fragment>
                </Paper>
              </Grid> 

              <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: 240,
                  }}
                >
                  {/* <Data Table /> */}
                  {/* colorSchemeData */}
                  <DataGrid
                  sx={{ backgroundColor: "white",  width: "100%", height: "100%", minHeight: "200px" }}
                  rows={colorSchemeData.colorSchemeArray ?? []}
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
                </Paper>
              </Grid>
            </Grid>
            <ConfirmationDialog
                title="ลบข้อมูล"
                message="ยืนยันการลบข้อมูล"
                open={showConfirmation}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
              />
          </Container>
  </Layout>
  )
}

export default AdminPanelManageColorScheme