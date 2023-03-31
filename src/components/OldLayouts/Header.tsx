import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { AccountCircle } from "@mui/icons-material";
import { signOut, authSelector } from "@/store/slices/auth.slice";
import { Badge, Box, Menu, MenuItem, Button } from "@mui/material";
import { useSelector } from "react-redux";
import LogoutIcon from '@mui/icons-material/Logout';
import { useAppDispatch } from "@/store/store";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

type HeaderProp = {
  open: boolean;
  onDrawerOpen: () => void;
};

export default function Header({ open, onDrawerOpen }: HeaderProp) {
  const [showProfileMenu, setShowProfileMenu] = React.useState(false);
  const dispatch = useAppDispatch();
  const handleClose = () => {
    setShowProfileMenu(false);
  };

  const userSession = useSelector(authSelector)

  const handleLogout = ()=>{
    console.log("logout")
    dispatch(signOut);
  }

  const headerStyle = {
    background: '#103D81',
  }


  return (
    <AppBar position="fixed" open={open} >
      <Toolbar style={headerStyle}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={onDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          ระบบบริหารจัดการการเชื่อมโยงแผนภาพโทนสีครามธรรมชาติกับแหล่งผลิตผ้าย้อมคราม
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ marginRight: 2 }} />

        <IconButton
          size="small"
          aria-label="account of current user"
          aria-haspopup="true"
          onClick={() => dispatch(signOut())}
          
          color="inherit"
        >
          <LogoutIcon /> ออกจากระบบ
        </IconButton>

        {/* dispatch(signOut()) */}

        {/* <Menu
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={showProfileMenu}
            onClose={handleClose}
          >
            <MenuItem onClick={() => dispatch(signOut())}>ออกจากระบบ</MenuItem>
            <MenuItem onClick={handleClose}>สวัสดีคุณ {userData.username}</MenuItem>
          </Menu> */}

      </Toolbar>
    </AppBar>
  );
}