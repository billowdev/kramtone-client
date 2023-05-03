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

import { getAllUser, userSelector } from '@/store/slices/user.slice';
import Moment from 'react-moment';
import 'moment/locale/th'; // import Thai locale
import {  GridCellParams } from '@mui/x-data-grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { makeStyles } from '@material-ui/core/styles';

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
    <Link href="/panel/admin/manage/category/add" passHref>
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

  const [openAddDialog, setOpenAddDialog] = React.useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState<boolean>(false);

  const [selectedUser, setSelectedUser] = React.useState<UserPayload | null>(null);


  const [viewUserOpen, setViewUserOpen] = useState(false);

  const handleViewUserOpen = (row:any) => {
    setSelectedUser(row)
    setViewUserOpen(true);
  };

  const handleViewUserClose = () => {
    setViewUserOpen(false);
  };


  React.useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  const [filterButtonEl, setFilterButtonEl] =
    React.useState<HTMLButtonElement | null>(null);


  const handleDeleteConfirm = () => {
    if (selectedUser) {
      console.log(selectedUser)
    }
    setOpenDeleteDialog(false);
  }

  const handleDeleteCancel = () => {
    setOpenDeleteDialog(false);
  };


  const handleAddClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpenAddDialog(true);
  }
  const handleAddConfirm = (product: UserPayload) => {
    console.log(product)
  }

  const handleAddCancel = () => {
    setOpenAddDialog(false);
  };


  const handleDeleteClick = (e: React.ChangeEvent<HTMLInputElement>, row: UserPayload | null) => {
    setOpenDeleteDialog(true)
  }

  const [openEditDialog, setOpenEditDialog] = React.useState<boolean>(false);

  const [user, setUser] = useState({
    username: selectedUser?.username,
    email: selectedUser?.email,
    role: selectedUser?.role,
    name: selectedUser?.name,
    surname: selectedUser?.surname,
    phone: selectedUser?.phone,
    activated: selectedUser?.activated,
  });

  const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const { name, value } = event.target;
    if (typeof name === 'string') {
      setUser({ ...user, [name]: value });
    }
  };
  
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setUser({ ...user, [name]: checked });
  };

  const handleEditClick = (row:any) =>{
    // setSelectedUser(row);
    // console.log(selectedUser)
    setOpenEditDialog(true)
  }
  const handleEditConfirm = () => {
    if (user) {
      console.log(user)
    }
    setOpenEditDialog(false);
  }

  const handleEditClose = () => {
    setOpenEditDialog(false);
  };


  // const showEditDialog = () => {
  //   if (user === null) {
  //     return;
  //   }
  //   return (
  //     <Dialog
  //       open={openEditDialog}
  //       keepMounted
  //       aria-labelledby="alert-dialog-slide-title"
  //       aria-describedby="alert-dialog-slide-description"
  //     >
  //       <DialogTitle id="alert-dialog-slide-title">
  //       แก้ไขสมาชิก {user.name}
  //       </DialogTitle>
  //       <DialogContent  className={classes.dialogContent}>
  //         <Grid container direction="column" spacing={2} padding={2}>
  //           <Grid item>
  //             <InputLabel htmlFor="username">ชื่อผู้ใช้</InputLabel>
  //             <TextField name="username" id="username" value={user.username} onChange={handleChange} />
  //           </Grid>
  //           <Grid item>
  //             <InputLabel htmlFor="email">อีเมล</InputLabel>
  //             <TextField name="email" id="email" value={user.email} onChange={handleChange} />
  //           </Grid>

  //           <Grid item>
  //         <FormControl fullWidth>
  //           <InputLabel id="role-select-label">สถานะ</InputLabel>
  //           <Select
  //             labelId="role-select-label"
  //             name="role"
  //             value={user.role}
  //             onChange={handleChange}
  //             key={user.id} // Add this line to force a re-render when the user object changes
  //           >
  //             <MenuItem value="member">สมาชิก</MenuItem>
  //             <MenuItem value="admin">ผู้ดูแลระบบ</MenuItem>
  //           </Select>
  //         </FormControl>
  //       </Grid>



  
  //           <Grid item>
  //             <InputLabel htmlFor="name">Name</InputLabel>
  //             <TextField name="name" id="name" value={user.name} onChange={handleChange} />
  //           </Grid>
  //           <Grid item>
  //             <InputLabel htmlFor="surname">Surname</InputLabel>
  //             <TextField name="surname" id="surname" value={user.surname} onChange={handleChange} />
  //           </Grid>
  //           <Grid item>
  //             <InputLabel htmlFor="phone">Phone</InputLabel>
  //             <TextField name="phone" id="phone" value={user.phone} onChange={handleChange} />
  //           </Grid>

  //           <Grid item>
  //             <FormControlLabel
  //               control={
  //                 <Checkbox
  //                   name="activated"
  //                   key={user.id}
  //                   id="activated-checkbox"
  //                   checked={user.activated}
  //                   onChange={handleCheckboxChange}
  //                 />
  //               }
  //               label="สถานะการยืนยันตัวตน (Activate)"
  //             />
  //           </Grid>

  //         </Grid>
  //       </DialogContent>
  //       <DialogActions>
  //         <Button onClick={() => setOpenEditDialog(false)} color="info">
  //           ยกเลิก
  //         </Button>
  //         <Button onClick={handleEditConfirm} color="primary">
  //           แก้ไข
  //         </Button>
  //       </DialogActions>
  //     </Dialog>
  //   );
  // };
  

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
      width: 180,
      renderCell: ({ row }: GridRenderCellParams<any>) => (
        <Stack direction="row">
          <IconButton
            aria-label="delete"
            size="large"
            onClick={() => {
              setSelectedUser(row);
              setOpenDeleteDialog(true);
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
            aria-label="edit"
            size="large"
            onClick={()=>{
              handleViewUserOpen(row)
            }}
          >
            <VisibilityIcon fontSize="inherit" />
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
       
      
          </Container>
  </Layout>
  )
}

export default withAuth(AdminPanelManageUser)