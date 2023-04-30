import * as React from "react";
import { styled, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import { ListItem, ListItemIcon } from "@mui/material";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";

import { useRouter } from "next/router";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { mainListItems, secondaryListItems } from "./listItems";
import Copyright from "@/components/Copyright";
import AppBarComponent from "./AppBar";
import CustomMenuListItem from "@/components/Layouts/CustomMenuListItem";
import Link from "next/link";
import { signOut, authSelector } from "@/store/slices/auth.slice";
import { groupDataSelector } from "@/store/slices/group-data.slice";
import { makeStyles } from '@material-ui/core';

import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { useAppDispatch } from "@/store/store";
import { useSelector } from "react-redux";
import GroupsIcon from "@mui/icons-material/Groups";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import SettingsIcon from "@mui/icons-material/Settings";
import InfoIcon from "@mui/icons-material/Info";
import LogoutIcon from "@mui/icons-material/Logout";
import ListItemText from "@mui/material/ListItemText";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import WidgetsIcon from '@mui/icons-material/Widgets';
import HomeIcon from '@mui/icons-material/Home';
import { useTheme } from "@material-ui/core/styles";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Fab,
  Grid,
  Slide,
  Stack,
  TextField,
} from "@mui/material";

import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number },
) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

interface LayoutProps {
  children: React.ReactNode;
}

const drawerWidth: number = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
}));


function Layout({ children }: LayoutProps) {
  const classes = useStyles();
  const theme = useTheme();
  const [progress, setProgress] = React.useState(10);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const [loading, setLoading] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const handleStart = () => setLoading(true)
    const handleComplete = () => setLoading(false)

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [router])


  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const userData = useSelector(authSelector);
  const groupData = useSelector(groupDataSelector);
  const isLoading = groupData?.groupData?.groupName === undefined;
  
  const dispatch = useAppDispatch();

  const [openDialog, setOpenDialog] = React.useState<boolean>(false);

  const handleLogout = async () => {
    dispatch(signOut());
    setOpenDialog(false);
  };

  const showSignOutDialog = () => {
    return (
      <Dialog
        open={openDialog}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">ออกจากระบบ?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            คุณต้องการออกจากระบบใช่หรือไม่?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="info">
            ยกเลิก
          </Button>
          <Button onClick={handleLogout} color="primary">
            ออกจากระบบ
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    // <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBarComponent open={open} onDrawerOpen={() => setOpen(!open)} />
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
        <IconButton size="small">
           {userData.activated ? "หน้าจัดการข้อมูล (บัญชียืนยันตัวตนแล้ว)" : "รอการยืนยัน"} 
        </IconButton>

            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            
              {userData && userData.role === "member" && (
               <React.Fragment>
                <CustomMenuListItem
                href="/panel/user"
                icon={WidgetsIcon}
                text="เมนูหลัก"
                open={open}
                />

                <CustomMenuListItem   
                href="/panel/user/manage-group"
                  icon={GroupsIcon}
                  text="จัดการข้อมูลกลุ่ม"
                  open={open}
                />
      {userData && userData.activated  && (
         <React.Fragment>
          <CustomMenuListItem   
          href="/panel/user/manage-product"
            icon={ShoppingBagIcon}
            text="จัดการสินค้า"
            open={open}

          />
            <CustomMenuListItem   
            href="/panel/user/manage-category"
            icon={CheckroomIcon}
            text="จัดการประเภทสินค้า"
            open={open}
          />
            <CustomMenuListItem   
                href="/panel/user/manage-colorscheme"
                  icon={ColorLensIcon}
                  text="จัดการโทนสีที่มีในร้าน"
                  open={open}
                />
         </React.Fragment>
      )}
             
      
         
               </React.Fragment>

                )}

            <Divider sx={{ my: 1 }} />
            <CustomMenuListItem
                        href="/panel/user/manage-profile"
                        icon={SettingsIcon}
                        text="ตั้งค่าบัญชีผู้ใช้"
                        open={open}
                      />
{/* 
            {userData && userData.role === "admin" && (
                     
                          
                  

                )} */}


           

            <CustomMenuListItem
              href="/aboutus"
              icon={InfoIcon}
              text="เกี่ยวกับผู้พัฒนาระบบ"
              open={open}
            />

          <CustomMenuListItem   
          href="/"
            icon={HomeIcon}
            text="กลับสู่หน้าหลัก"
          />
      

            <Box
              boxShadow={2}
              style={{ borderRadius: "50px", margin: "20px 10px" }}
              onClick={() => {
                setOpenDialog(true);
              }}
            >
              <ListItem
                button
                classes={{ selected: "Mui-selected" }}
                style={{
                  backgroundColor: "#FFF",
                  borderRadius: "50px",
                }}
              >
                <ListItemIcon>
                  <LogoutIcon
                    style={{ color: theme.palette.grey[900] }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={"ออกจากระบบ"}
                  style={{ color: theme.palette.grey[900] }}
                />
              </ListItem>
            </Box>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[100],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          {loading && 
            <div className={classes.container}>
            <CircularProgressWithLabel value={progress} />
    </div>}
          {children}
          <Copyright sx={{ pt: 4 }} />
        </Box>
        {showSignOutDialog()}
      </Box>
    // </ThemeProvider>
  );
}

export default Layout;
