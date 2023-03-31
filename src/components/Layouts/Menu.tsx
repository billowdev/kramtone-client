import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { blue } from "@mui/material/colors";
import { Box, ListItem, Stack } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { Layers, BarChart, Person } from "@mui/icons-material";
import { useRouter } from "next/router";
import GroupsIcon from "@mui/icons-material/Groups";
const drawerWidth = 240;
import { authSelector } from "@/store/slices/auth.slice";
import { useSelector } from "react-redux";
import LoginIcon from '@mui/icons-material/Login';
import {CustomTheme} from "@/pages/_app"
import MenuListItem from "./MenuListItem";
import { useAppDispatch } from "@/store/store";
import LogoutIcon from '@mui/icons-material/Logout';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';


const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(7)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

type MenuProp = {
  open: boolean;
  onDrawerClose: () => void;
};

export default function Menu({ open, onDrawerClose }: MenuProp) {
  const theme = useTheme();
  const router = useRouter();
  const userData = useSelector(authSelector);
  
  const handleLogout = ()=>{
    console.log("logout")
    dispatch(signOut);
  }

  
  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <Stack
          direction="row"
          alignItems="center"
          sx={{ backgroundColor: blue }}
        >
          {/* <Image
            src="/static/img/billowdev_logo.png"
            width={200}
            height={40}
            objectFit="contain"
            alt="logo"
          /> */}
          
           <IconButton 
          //  onClick={onDrawerClose}
           size="small"
           >
           ร้านศักดิ์ดา ครามสกล
          </IconButton>

          <IconButton onClick={onDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </Stack>
      </DrawerHeader>

      <Divider />
      <List>
        {userData && userData?.sub && (
          <>
            {/* manage profile */}
          <MenuListItem   
          href="/panel/user/manage-group"
            icon={GroupsIcon}
            text="จัดการข้อมูลกลุ่ม"
            open={open}
          />

        <MenuListItem   
          href="/panel/user/manage-product"
            icon={ShoppingBagIcon}
            text="จัดการสินค้า"
            open={open}

          />
           <MenuListItem   
          href="/panel/user/manage-category"
            icon={CheckroomIcon}
            text="จัดการประเภทสินค้า"
          />
   <MenuListItem   
          href="/panel/user/manage-colorscheme"
            icon={GroupsIcon}
            text="จัดการโทนสีที่มีในร้าน"
            open={open}
          />
            
          </>
        )}
        <Box style={{ margin: "50px 0"}} > 
        <Divider />
        </Box>
        <MenuListItem   
          href="/manage-profile"
            icon={Person}
            text="ตั้งค่าบัญชีผู้ใช้"
            open={open}
          />

        <MenuListItem   
          href="/aboutus"
            icon={Person}
            text="เกี่ยวกับผู้พัฒนาระบบ"
            open={open}
          />
    

		<Box boxShadow={2} style={{ borderRadius: "50px", margin: "20px 10px"}}>
		  <ListItem
			button
			classes={{ selected: "Mui-selected" }}
			style={{
			  backgroundColor:  "#FFF",
			  borderRadius: "50px",
        paddingTop: "16px",
			  paddingBottom: "16px"
			}}
		  >
			<ListItemIcon>
			 <LogoutIcon style={{ color:  "#000",  margin: `${open ? '0 0 0 0px' : '0 0 0 -8px'}` }}  />
			</ListItemIcon>
			<ListItemText primary={"ออกจากระบบ"}
			  style={{ color:  "#000",  margin: '0 0 0 -16px'}}
			/>
		  </ListItem>
		</Box>
{/* 

      <Link href="/auth/signout" passHref>
        <Box boxShadow={2} style={{ borderRadius: "50px" }}>
          <ListItem
            button
            className={router.pathname === "/auth/signout" ? "Mui-selected" : ""}
            
          >
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText primary="ออกจากระบบ" />
          </ListItem>
        </Box>
      </Link> */}

        {/* {userData && !userData.accessToken && (
          <>
 <Link href="/auth/signin" passHref>
  <Box boxShadow={2} style={{ borderRadius: "50px" }}>
    <ListItem
      button
      className={router.pathname === "/auth/signin" ? "Mui-selected" : ""}
      
    >
      <ListItemIcon>
        <LoginIcon />
      </ListItemIcon>
      <ListItemText primary="เข้าระบบ" />
    </ListItem>
  </Box>
</Link>
          </>
        )} */}
      </List>
    </Drawer>
  );
}