import React, { useEffect } from "react";
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Typography, Toolbar } from "@material-ui/core";
import { authSelector } from "@/store/slices/auth.slice";
import { useSelector } from "react-redux";
import { fetchSession } from "@/store/slices/auth.slice";
import Link from 'next/link'

type Props = {};


export default function Footer({ }: Props) {
  const userSession = useSelector(authSelector);
  const copyrightStyle = {
    display: "flex",
    justifyContent: "center",
  }
  const copyrightLinkStyle = {
    color: "#000",
    margin: 4
    // spacing: 8,
  }
  const footerStyle = {
    display: "flex",
    background: '#103D81',
    justifyContent: "center",
  }

  const footerLinkStyle = {
    color: "#FFF",
  }

  const [value, setValue] = React.useState(0);
  return (

    <Box>
      <Toolbar style={footerStyle}>

        <Box sx={{
          display: 'grid',
          gap: 1,
          gridTemplateColumns: 'repeat(2, 1fr)',
        }}>
          <Link href="/" style={footerLinkStyle}>
            <Typography align="center">www.kramtone.com</Typography>
          </Link>
        </Box>
        <Box>

        {
          userSession && userSession.role ? 
          <Link href="/panel" style={footerLinkStyle}>
          <Typography align="center">หน้าจัดการกลุ่มผู้ผลิตหรือร้านค้า</Typography>
        </Link> :   
         <Link href="/auth/signin" style={footerLinkStyle}>
         <Typography align="center">ลงชื่อเข้าใช้</Typography>
       </Link>
         
        }
        </Box>

      </Toolbar>
      {/* <Toolbar className={classes.copyright}>
       
      </Toolbar> */}
      <Link 
    href="https://github.com/billowdev" style={copyrightLinkStyle}>
        <Typography align="center">© 2023 BillowDev All rights reserved</Typography>
      </Link>
    </Box>


  );
}

