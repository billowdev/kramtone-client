import React from 'react'
import Layout from '@/components/Layouts/Layout';

import ColorLensIcon from '@mui/icons-material/ColorLens';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import withAuth from "@/components/withAuth";
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useAppDispatch } from "@/store/store";
import { useSelector } from 'react-redux';
import { colorSchemeSelector, getAllGroupColorScheme, deleteGroupColorScheme } from "@/store/slices/color-scheme.slice"
import * as authService from "@/services/auth.service"
import {GroupColorSchemePayload, ColorSchemePayload} from "@/models/color-scheme.model"
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
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

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
import Link from "next/link"
import ConfirmationDialog from "@/components/ConfirmationDialog";
import toast from "react-hot-toast";


type Props = {
  gid?:string
}


const CustomToolbar: React.FunctionComponent<{
  setFilterButtonEl: React.Dispatch<
    React.SetStateAction<HTMLButtonElement | null>
  >;
}> = ({ setFilterButtonEl }) => (
  <GridToolbarContainer>
      <GridToolbarColumnsButton />
    <GridToolbarDensitySelector />
    <GridToolbarFilterButton ref={setFilterButtonEl} />
    <Link href="/panel/user/manage-colorscheme/add" passHref>
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


function UserPanelManageGroupColorScheme({gid}: Props) {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('xs'));
  const colorSchemeData = useSelector(colorSchemeSelector);

  const [selectedGroupColorScheme, setSelectedGroupColorScheme] = React.useState<GroupColorSchemePayload | null>(null);
  
  const [filterButtonEl, setFilterButtonEl] =
    React.useState<HTMLButtonElement | null>(null);


  React.useEffect(() => {
    dispatch(getAllGroupColorScheme(gid!));
  }, [dispatch, gid]);


  const columns: GridColDef[] = [
    {
      field: "colorScheme",
      editable: false,
      headerName: "สี",
      width: 100,
      renderCell: (params: GridCellParams<ColorSchemePayload>) => {
        // const hex = params?.value?.hex as string;
        const hex = (params?.value as { hex: string })?.hex;
        return (
          <div style={{
            backgroundColor: hex,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            color:"white",
            alignItems: 'center',
          }}>
            {hex}
          </div>
        );
      },
  
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
              setSelectedGroupColorScheme(row);
              handleDelete()
            }}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        

        </Stack>
      ),
    },
  ];

  const [showConfirmation, setShowConfirmation] = React.useState(false);

  const handleDelete =  () => {
    setShowConfirmation(true);
  }
 
  const handleConfirmDelete = async () => {
    if (selectedGroupColorScheme) {
      const groupColorSchemeId = selectedGroupColorScheme.id
      console.log(groupColorSchemeId)
         const response = await dispatch(deleteGroupColorScheme(groupColorSchemeId))
        if (response.meta.requestStatus === "fulfilled") {
          toast.success("ลบข้อมูลสำเร็จ")
          setTimeout(() => {
            window.location.reload(); // Reload the page after 2 seconds
          }, 200);
          // router.push("/panel/user/manage-product");
        }else{
         toast.error("ลบข้อมูลไม่สำเร็จ โปรดลองอีกครั้ง")
        }
      setShowConfirmation(false);
      }
   
  };
  
  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

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

                 
                <React.Fragment> 
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
                </React.Fragment>
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
                  {/* <Group Data Table /> */}
                  <DataGrid
               sx={{ backgroundColor: "white", width: "100%", height: "100%", minHeight: "200px" }}
               rows={colorSchemeData?.groupColorSchemes ?? []}
               columns={columns}
               // pageSize={25}
               // rowsPerPageOptions={[25]}
               localeText={
                { noRowsLabel: "ไม่พบข้อมูล",}
                 }
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
          
          </Container>

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

export default withAuth(UserPanelManageGroupColorScheme)

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const accessToken = context.req.cookies['access_token']
    const { gid } = await authService.getSessionServerSide(accessToken!)

    return {
      props: {
        gid,
      },
    };
  } catch (error) {
    return {
      props: {

      },
    };
  }

};