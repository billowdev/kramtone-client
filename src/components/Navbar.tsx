import {
  fetchSession,
  signOut,
  authSelector,
} from "@/store/slices/auth.slice";
import { useAppDispatch } from "../store/store";
import Link from "next/link";
import Script from "next/script";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
import { makeStyles } from "@material-ui/core/styles";
import Image from "next/image"
import { Drawer, Grid, List, ListItem, ListItemText } from "@mui/material";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
type Props = {};



export default function Navbar({ }: Props) {
  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down("sm"));

  const dispatch = useAppDispatch();
  const authData = useSelector(authSelector);


  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast: any) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const handleSignOut = async () => {
    const response = await dispatch(signOut());
    if (response.meta.requestStatus === "fulfilled") {
      Toast.fire({
        icon: "success",
        title: "Signed out successfully",
      });
    }
  };

  //   // Define state for the drawer
  // const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  // // Handle toggle of the drawer
  // const toggleDrawer = () => {
  //   setIsDrawerOpen(!isDrawerOpen);
  // };

  //   const navLinkStyle = {
  //     color: "#FFF",
  //     // marginTop: isSmallDevice ? "16px" : "0px",
  //   };

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };


  const navLinkStyle = {
    textDecoration: 'none',
    color: 'inherit',
  };


  return (
    //     <AppBar style={{
    //       top: "auto",
    //       color: "#FFF",
    //       background: '#103D81',
    //       textAlign: "center'
    //     }}>
    //       <Container maxWidth="xl">
    //         <Toolbar disableGutters>
    //           <Typography
    //             variant="h6"
    //             noWrap
    //             component="a"
    //             href="/"
    //             sx={{
    //               mr: 2,
    //               display: { md: 'flex' },
    //               fontFamily: 'Kanit',
    //               fontWeight: 700,
    //               letterSpacing: '.3rem',
    //               color: 'inherit',
    //               textDecoration: 'none',
    //             }}
    //           >
    //             <Image
    //               src={`/static/img/logo.png`}
    //               alt={`logo image`}
    //               width={50}
    //               height={50}
    //               loading="lazy"
    //             />
    //           </Typography>

    //           {/* Add a menu button for small devices */}
    //           <IconButton
    //             edge="start"
    //             color="inherit"
    //             aria-label="menu"
    //             sx={{ display: { md: 'none' } }}
    //             onClick={toggleDrawer}
    //           >
    //             <MenuIcon />
    //           </IconButton>

    //           {/* Add a drawer for small devices */}
    //           <Drawer
    //             anchor="left"
    //             open={isDrawerOpen}
    //             onClose={toggleDrawer}
    //             sx={{ display: { md: 'none' } }}
    //           >
    //             <Box
    //               sx={{
    //                 width: 200,
    //                 height: "100%",
    //                 background: "#103D81",
    //                 color: "#FFF",
    //                 padding: 2,
    //               }}
    //             >
    //               <Typography variant="h6" align="center" sx={{ mb: 2 }}>
    //                 Navigation
    //               </Typography>
    //               <List>
    //                 <Link href="/" style={navLinkStyle}>
    //                   <ListItem button>
    //                     <ListItemText primary="หน้าหลัก" />
    //                   </ListItem>
    //                 </Link>
    //                 <Link href="/product" style={navLinkStyle}>
    //                   <ListItem button>
    //                     <ListItemText primary="หน้าสินค้า" />
    //                   </ListItem>
    //                 </Link>
    //                 <Link href="/group-data" style={navLinkStyle}>
    //                   <ListItem button>
    //                     <ListItemText
    //                       primary="หน้าข้อมูลกลุ่มผู้ผลิตหรือร้านค้า"
    //                     />
    //                   </ListItem>
    //                 </Link>
    //                 <Link href="/color-scheme" style={navLinkStyle}>
    //                   <ListItem button>
    //                     <ListItemText primary="ข้อมูลโทนสีครามธรรมชาติ" />
    //                   </ListItem>
    //                 </Link>
    //               </List>
    //             </Box>
    //           </Drawer>

    //           {/* Add the grid for large devices */}
    //           <Grid
    //             item
    //             xs={12}
    //             sm={8}
    //             md={6}
    //             style={{
    //               marginLeft: 16,
    //               display: "flex",
    //               flexDirection: isSmallDevice ? "column" : "row",
    //             }}
    //           >
    //             <Grid
    //               container
    //               spacing={2}
    //               direction={isSmallDevice ? "column" : "row"}
    //               alignItems="center"
    //             >            <Grid item>
    //             <Link href="/" style={navLinkStyle}>
    //               <Typography align="center">หน้าหลัก</Typography>
    //             </Link>
    //           </Grid>
    //           <Grid item>
    //             <Link href="/product" style={navLinkStyle}>
    //               <Typography align="center">หน้าสินค้า</Typography>
    //             </Link>
    //           </Grid>
    //           <Grid item>
    //             <Link href="/group-data" style={navLinkStyle}>
    //               <Typography align="center">
    //                 หน้าข้อมูลกลุ่มผู้ผลิตหรือร้านค้า
    //               </Typography>
    //             </Link>
    //           </Grid>
    //           <Grid item>
    //             <Link href="/color-scheme" style={navLinkStyle}>
    //               <Typography align="center">
    //                 ข้อมูลโทนสีครามธรรมชาติ
    //               </Typography>
    //             </Link>
    //           </Grid>
    //         </Grid>
    //       </Grid>
    //     </Toolbar>
    //   </Container>
    // </AppBar>

    <AppBar
      className="customAppBar"
      style={{
        top: 'auto',
        color: '#FFF',
        background: '#103D81',
        textAlign: 'center',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { md: 'flex' },
              fontFamily: 'Kanit',
              fontWeight: 600,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {/* Logo */}
            {!isSmallDevice && (<Image
              src={`/static/img/logo.png`}
              alt={`logo image`}
              width={50}
              height={50}
              loading="lazy"
            />)}
          </Typography>

          {/* Add a menu button for small devices */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ display: { md: 'none' } }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>

          {/* Add a drawer for small devices */}
          <Drawer
            anchor="left"
            open={isDrawerOpen}
            onClose={toggleDrawer}
            sx={{ display: { md: 'none' } }}
          >
            {/* Drawer content */}

            <List>
              <Link href="/" style={navLinkStyle}>
                <ListItem button>
                  <ListItemText primary="หน้าหลัก" />
                </ListItem>
              </Link>
              <Link href="/product" style={navLinkStyle}>
                <ListItem button>
                  <ListItemText primary="หน้าสินค้า" />
                </ListItem>
              </Link>
              <Link href="/group" style={navLinkStyle}>
                <ListItem button>
                  <ListItemText
                    primary="หน้าข้อมูลกลุ่มผู้ผลิตหรือร้านค้า"
                  />
                </ListItem>
              </Link>
              <Link href="/color-scheme" style={navLinkStyle}>
                <ListItem button>
                  <ListItemText primary="ข้อมูลโทนสีครามธรรมชาติ" />
                </ListItem>
              </Link>
            </List>
          </Drawer>

          {/* Add the grid for large devices */}
          {!isSmallDevice && (
            <Grid
              item
              xs={12}
              sm={8}
              md={6}
              style={{
                marginLeft: 16,
                display: 'flex',
                flexDirection: isSmallDevice ? 'column' : 'row',
              }}
            >
              <Grid
                container
                spacing={2}
                direction={isSmallDevice ? 'column' : 'row'}
                alignItems="center"
              >
                {/* Grid items */}

                <Grid
                  container
                  spacing={2}
                  direction={isSmallDevice ? "column" : "row"}
                  alignItems="center"
                >            <Grid item>
                    <Link href="/" style={navLinkStyle}>
                      <Typography align="center">หน้าหลัก</Typography>
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/product" style={navLinkStyle}>
                      <Typography align="center">หน้าสินค้า</Typography>
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/group-data" style={navLinkStyle}>
                      <Typography align="center">
                        หน้าข้อมูลกลุ่มผู้ผลิตหรือร้านค้า
                      </Typography>
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/color-scheme" style={navLinkStyle}>
                      <Typography align="center">
                        ข้อมูลโทนสีครามธรรมชาติ
                      </Typography>
                    </Link>
                  </Grid>
                </Grid>

              </Grid>
            </Grid>
          )}
        </Toolbar>
        <style jsx global>
          {`
          .customAppBar {
  background-color: #103D81 !important;
  background-image: none !important;
}

          `}
        </style>
      </Container>
    </AppBar>
  );
}
