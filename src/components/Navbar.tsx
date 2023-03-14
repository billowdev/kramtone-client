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

type Props = {};



export default function Navbar({ }: Props) {

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


  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar style={{
      top: "auto",
      color: "#FFF",
      background: '#103D81',
      textAlign: "center"
    }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: {  md: 'flex' },
              fontFamily: 'Kanit',
              fontWeight: 700,

              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
              <Image
                  src={`/static/img/logo.png`}
                  alt={`logo image`}
                  width={50}
                  height={50}
                  loading="lazy"
                />
          </Typography>

        </Toolbar>
      </Container>
    </AppBar>
  );
}
