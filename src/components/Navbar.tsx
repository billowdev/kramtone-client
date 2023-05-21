import React from 'react';
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Grid,
} from '@material-ui/core';
import { useTheme, useMediaQuery } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useAppDispatch } from "../store/store";
import { signOut } from '@/store/slices/auth.slice';
import { authSelector } from '@/store/slices/auth.slice';
import Swal from 'sweetalert2';
import MenuIcon from '@material-ui/icons/Menu';
import Link from 'next/link';
import Image from "next/image"
const navLinkStyle = {
  textDecoration: 'none',
  color: 'inherit',
};

export default function Navbar() {
  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('xs'));
  const isLargeDevice = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useAppDispatch();
  const authData = useSelector(authSelector);

  const handleSignOut = async () => {
    const response = await dispatch(signOut());
    if (response.meta.requestStatus === 'fulfilled') {
      Swal.fire({
        icon: 'success',
        title: 'Signed out successfully',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
      });
    }
  };

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  // authData
  const navItems = [
    { href: '/', text: 'หน้าหลัก' },
    { href: '/product', text: 'ข้อมูลสินค้า' },
    { href: '/group', text: 'ข้อมูลกลุ่มผู้ผลิตหรือร้านค้า' },
    { href: '/color-scheme', text: 'ข้อมูลโทนสีครามธรรมชาติ' },
    { href: '/auth/signin', text: authData.role ? 'จัดการกลุ่มผู้ผลิตหรือร้านค้า' : "เข้าสู่ระบบสำหรับกลุ่มผู้ผลิตหรือร้านค้า" },
   
  ];

  const NavList = ({ style }: any) => (
    <List>
      {navItems.map((item, index) => (
        <Link key={index} href={item.href} passHref style={style || navLinkStyle}>
          
            <ListItem button>
              <ListItemText primary={item.text} />
            </ListItem>
          
        </Link>
      ))}
    </List>
  );

  return (
    <AppBar
      className="customAppBar"
      style={{ top: 'auto', color: '#FFF', background: '#103D81' }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            style={{
              margin: 2,
              fontFamily: 'Kanit',
              fontWeight: 600,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
          {!isSmallDevice && (<Image
              src={`/static/img/logo.png`}
              alt={`logo image`}
              width={50}
              height={50}
              loading="lazy"
            />)}
          </Typography>

{isLargeDevice && (
  <IconButton
  edge="start"
  color="inherit"
  aria-label="menu"
  onClick={toggleDrawer}
>
  <MenuIcon />
  </IconButton>
)}
        
  
            <Drawer
              anchor="left"
              open={isDrawerOpen}
              onClose={toggleDrawer}
           
            >
              <NavList />
            </Drawer>
  
            {/* Add the grid for large devices */}
            {!isSmallDevice && (
              <Grid
                container
                spacing={2}
                direction="row"
                alignItems="center"
                justifyContent="center"
              >
                {navItems.map((item, index) => (
                  <Grid item key={index}>
                    <Link href={item.href} passHref style={navLinkStyle}>
                     
                        <Typography align="center">{item.text}</Typography>
                      
                    </Link>
                  </Grid>
                ))}

                {authData.role ? <> 
                <Grid item>
                    <Link href={'/auth/signin'} passHref style={navLinkStyle}>
                        <Typography align="center">จัดการกลุ่มผู้ผลิตหรือร้านค้า</Typography>
                    </Link>
                  </Grid>
                </> : <>
                <Grid item>
                    <Link href={'/auth/signin'} passHref style={navLinkStyle}>
                        <Typography align="center">เข้าสู่ระบบสำหรับกลุ่มผู้ผลิตหรือร้านค้า</Typography>
                    </Link>
                  </Grid>
                </>}
                  
                  

              </Grid>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    );
  }
  