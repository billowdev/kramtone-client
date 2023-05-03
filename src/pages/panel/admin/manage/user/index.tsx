import React, { useState } from 'react'
import Layout from '@/components/Layouts/Layout';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useAppDispatch } from "@/store/store";
import {EditUserDialog } from "@/components/Panel/EditUserDialog"

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
import { useSelector } from "react-redux";
import { TransitionProps } from "@mui/material/transitions";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import withAuth from "@/components/withAuth";
import toast from "react-hot-toast";

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
  Select,
  Switch,
  MenuItem
} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { UserPayload } from '@/models/user.model';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import router from "next/router";
import ConfirmationDialog from "@/components/ConfirmationDialog";

import { getAllUser, userSelector, deleteUser } from '@/store/slices/user.slice';
import Moment from 'react-moment';
import 'moment/locale/th'; // import Thai locale
import {  GridCellParams } from '@mui/x-data-grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import GroupsIcon from '@mui/icons-material/Groups';

type Props = {}

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
  dialogContent: {
    minHeight: '400px',
    minWidth: '600px',
  },
});

const CustomToolbar: React.FunctionComponent<{
  setFilterButtonEl: React.Dispatch<
    React.SetStateAction<HTMLButtonElement | null>
  >;
}> = ({ setFilterButtonEl }) => (
  <GridToolbarContainer>
      <GridToolbarColumnsButton />
    <GridToolbarDensitySelector />
    <GridToolbarFilterButton ref={setFilterButtonEl} />
    <Link href="/panel/admin/manage/user/add" passHref>
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



function AdminPanelManageUser({}: Props) {
  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('xs'));
  const dispatch = useAppDispatch();
  const userData = useSelector(userSelector);
  const classes = useStyles(); // Add this line to use the custom styles

 
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState<boolean>(false);

  const [selectedUser, setSelectedUser] = React.useState<UserPayload | null>(null);




  React.useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  const [filterButtonEl, setFilterButtonEl] =
    React.useState<HTMLButtonElement | null>(null);


    const [openViewDialog, setOpenViewDialog] = React.useState<boolean>(false);
    const handlViewClick = (row:any) => {
      setSelectedUser(row)
      setOpenViewDialog(true)
    }

    const handlViewCancel = () => {
    setOpenViewDialog(false);
  };

  const showViewDialog = () => {
    if (selectedUser=== null) {
      return;
    }

    return (
      <Dialog
        open={openViewDialog}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
        รายละเอียด
        </DialogTitle>
        <DialogContent>
        <div>
      <Typography>{`ชื่อผู้ใช้: ${selectedUser?.username}`}</Typography>
      <Typography>{`ชื่อ-นามสกุล: ${name} ${selectedUser?.surname}`}</Typography>
      {selectedUser?.email && <Typography>{`อีเมล: ${selectedUser?.email}`}</Typography>}
      {selectedUser?.phone && <Typography>{`เบอร์โทรศัพท์: ${selectedUser?.phone}`}</Typography>}
      <Typography>{`สถานะการใช้งาน: ${selectedUser?.activated ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}`}</Typography>
      {/* <Typography>{`สถานะการลบ: ${removed ? 'ลบแล้ว' : 'ยังไม่ลบ'}`}</Typography> */}
      {selectedUser?.group && (
        <Typography>
          {`กลุ่ม: ${selectedUser?.group?.groupName} (${selectedUser?.group?.groupType === "producer" ? "กลุ่มผู้ผลิต":"ร้านค้า"})`}
        </Typography>
      )}
        {selectedUser?.group && (
        <Typography>
          {`ประเภทกลุ่ม ${selectedUser?.group?.groupType === "producer" ? "กลุ่มผู้ผลิต":"ร้านค้า"}`}
        </Typography>
      )}
    </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlViewCancel} color="info">
            ปิด
          </Button>

        </DialogActions>
      </Dialog>
    );
  };

  const [showConfirmation, setShowConfirmation] = React.useState(false);

  const handleDelete =  () => {
    setShowConfirmation(true);
  }
 
  const handleConfirmDelete = async () => {
    if (selectedUser) {
      console.log(selectedUser)
      
    const response = await dispatch(deleteUser({ id:selectedUser.id}))
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

  function DateTimeCellRenderer(params: GridCellParams<any>) {
    const { value } = params;
  
    return (
      <Moment locale="th" format="lll">
        {value as any}
      </Moment>
    );
  }
  
  function StatusCellRenderer(params: GridCellParams<UserPayload>) {
    const { value, row } = params;
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const updatedRow = { ...row, activated: event.target.checked };
      // api.updateRows([updatedRow]);
    };
  
    return <Switch checked={value as boolean} onChange={handleChange} />;
  }
  
  const columns: GridColDef[] = [
    {
      field: "username",
      editable: true,
      headerName: "ชื่อผู้ใช้",
      width: 120,
    },
    {
      field: "name",
      editable: true,
      headerName: "ชื่อ",
      width: 100,
    },
    {
      field: "surname",
      editable: true,
      headerName: "นามสกุล",
      width: 100,
    },
    // {
    //   field: 'createdAt',
    //   headerName: 'สมัครสมาชิกเมื่อ',
    //   width: 160,
    //   renderCell: (params: GridCellParams<UserPayload>) => <DateTimeCellRenderer {...params} />,
    // },
    // {
    //   field: 'updatedAt',
    //   headerName: 'แก้ไขเมื่อ',
    //   width: 160,
    //   renderCell: (params: GridCellParams<UserPayload>) => <DateTimeCellRenderer {...params} />,
    // },
    // {
    //   field: "activated",
    //   editable: true,
    //   headerName: "สถานะ",
    //   width: 40,
    // },
    {
      field: 'activated',
      headerName: 'Status',
      width: 100,
      renderCell: (params: GridCellParams<UserPayload>) => <StatusCellRenderer {...params} />,
    },
    {
      headerName: "การดำเนินการ",
      field: ".",
      width: 240,
      renderCell: ({ row }: GridRenderCellParams<any>) => (
        <Stack direction="row">
          <IconButton
            aria-label="delete"
            size="large"
            onClick={() => {
              setSelectedUser(row);
              handleDelete()
              // setOpenDeleteDialog(true);
            }}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>

          <IconButton
            aria-label="edit"
            size="large"
            onClick={() => 
            router.push("/panel/admin/manage/user/edit?id=" + row.id)
            }
            // onClick={() => {
            //   console.log(row)
            //   setUser(row)
            //   setSelectedUser(row);
            //     handleEditClick(row)
            // }}
          >
            <EditIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            aria-label="view"
            size="large"
            onClick={()=>{
              handlViewClick(row)
            }}
          >
            <VisibilityIcon fontSize="inherit" />
          </IconButton>

          <IconButton
            aria-label="edit"
            size="large"
            onClick={() => 
              router.push("/panel/admin/manage/group/" + row?.group?.id)
              }
          >
            <GroupsIcon fontSize="inherit" />
          </IconButton>
          
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
                    <AccountBoxIcon sx={{fontSize:'1.5rem', marginLeft:'8px'}} />
                  ) : (
                    <AccountBoxIcon sx={{fontSize:'2.5rem', marginLeft:'16px'}} />
                  )}

                 
                <React.Fragment> 
                  {isSmallDevice ? (
                    <Typography
                   sx={{
                      fontWeight: 'bold',  alignSelf:'center',
                  }}
                    > หน้าจัดการข้อมูลบัญชีผู้ใช้</Typography>
                  ) : (
                    <Typography
                    variant='h5' sx={{
                      fontWeight: 'bold',  alignSelf:'center',
                  }}
                    > จัดการข้อมูลบัญชีผู้ใช้</Typography>
                  )}
                </React.Fragment>
                </Paper>
              </Grid> 

              <Grid item xs={12} md={12} lg={12}>
              <DataGrid
                  sx={{ backgroundColor: "white",  width: "100%", height: "100%", minHeight: "200px" }}
                  rows={userData.users ?? []}
                  columns={columns}
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
            {showViewDialog()}
         {/* show confirmation dialog if user clicks Edit button */}
      <ConfirmationDialog
        title="ลบข้อมูล"
        message="ยืนยันการลบข้อมูล"
        open={showConfirmation}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
                {/* {showDeleteDialog()} */}
          </Container>
  </Layout>
  )
}

export default withAuth(AdminPanelManageUser)