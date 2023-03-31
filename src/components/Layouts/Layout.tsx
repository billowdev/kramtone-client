import * as React from 'react';
import { styled, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import {ListItem, ListItemIcon} from '@mui/material';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import { useRouter } from "next/router";
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainListItems, secondaryListItems } from './listItems';
import Copyright from '@/components/Copyright';
import AppBarComponent from './AppBar';
import { CustomTheme } from '../../pages/_app';
import CustomMenuListItem from "@/components/Layouts/CustomMenuListItem";
import Link from "next/link";
import GroupsIcon from "@mui/icons-material/Groups";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { signOut, authSelector } from "@/store/slices/auth.slice";
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import { useAppDispatch } from "@/store/store";
import { useSelector } from "react-redux";
import LogoutIcon from '@mui/icons-material/Logout';
import ListItemText from "@mui/material/ListItemText";
import ColorLensIcon from '@mui/icons-material/ColorLens';


interface LayoutProps {
  children: React.ReactNode;
}

const drawerWidth: number = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

function Layout({ children }: LayoutProps) {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const router = useRouter();
  const userData = useSelector(authSelector);
  const dispatch = useAppDispatch()

  const handleLogout = ()=>{
    console.log("logout")
    dispatch(signOut);

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'ออกจากระบบ?',
      text: "คุณต้องการออกจากระบบใช่หรือไม่?",
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'ออกจากระบบ',
      cancelButtonText: 'ยกเลิก',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        toast.success('ออกจากระบบเรียบร้อย')
        // swalWithBootstrapButtons.fire(
        //   'ออกจากระบบ!',
        //   'ออกจากระบบเรียบร้อย',
        //   'success'
        // )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        // swalWithBootstrapButtons.fire(
        //   'Cancelled',
        //   'Your imaginary file is safe :)',
        //   'error'
        // )
      }
    })
  }


  return (
    <ThemeProvider theme={CustomTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
      <AppBarComponent open={open} onDrawerOpen={() => setOpen(!open)} />
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
               <IconButton 
          //  onClick={onDrawerClose}
           size="small"
           >
           ร้านศักดิ์ดา ครามสกล
          </IconButton>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
         
          </Toolbar>
          <Divider />
          <List component="nav">

          {userData && userData?.sub && (
          <>
            {/* manage profile */}
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
          href="/manage-profile"
            icon={SettingsIcon}
            text="ตั้งค่าบัญชีผู้ใช้"
            open={open}
          />

        <CustomMenuListItem   
          href="/aboutus"
            icon={InfoIcon}
            text="เกี่ยวกับผู้พัฒนาระบบ"
            open={open}
          />

<Box boxShadow={2} style={{ borderRadius: "50px", margin: "20px 10px"}} onClick={handleLogout}>
		  <ListItem
			button
			classes={{ selected: "Mui-selected" }}
			style={{
			  backgroundColor:  "#FFF",
			  borderRadius: "50px",
			}}
		  >
			<ListItemIcon>
			 <LogoutIcon style={{ color:  CustomTheme.palette.grey[900]}}  />
			</ListItemIcon>
			<ListItemText primary={"ออกจากระบบ"}
			  style={{ color:  CustomTheme.palette.grey[900]}}
			/>
		  </ListItem>
		</Box>
    
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          {children}
          <Copyright sx={{ pt: 4 }} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Layout