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
import { CustomTheme } from "../../pages/_app";
import CustomMenuListItem from "@/components/Layouts/CustomMenuListItem";
import Link from "next/link";
import { signOut, authSelector } from "@/store/slices/auth.slice";
import { groupDataSelector } from "@/store/slices/group-data.slice";

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
  Slide,
  Stack,
  TextField,
} from "@mui/material";


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

function Layout({ children }: LayoutProps) {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const router = useRouter();
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
    <ThemeProvider theme={CustomTheme}>
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
          {groupData?.groupData?.groupName || "หน้าระบบหลังบ้าน"}
        </IconButton>

            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            
              {userData && userData.role === "member" && (
               <>
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
      
         
               </>

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
                    style={{ color: CustomTheme.palette.grey[900] }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={"ออกจากระบบ"}
                  style={{ color: CustomTheme.palette.grey[900] }}
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
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          {children}
          <Copyright sx={{ pt: 4 }} />
        </Box>
        {showSignOutDialog()}
      </Box>
    </ThemeProvider>
  );
}

export default Layout;
