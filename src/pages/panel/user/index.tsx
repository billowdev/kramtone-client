import React from "react";
import Layout from "@/components/Layouts/Layout";
import { Grid, Paper, Typography, Container, Box, Divider } from "@mui/material";
import { Dialog, DialogTitle, DialogContent, ListItem, DialogContentText, Button, DialogActions} from "@mui/material";
import { useSelector } from "react-redux";
import CustomMenuListItem from "@/components/Layouts/CustomMenuListItem";
import GroupsIcon from "@mui/icons-material/Groups";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import SettingsIcon from "@mui/icons-material/Settings";
import InfoIcon from "@mui/icons-material/Info";
import LogoutIcon from "@mui/icons-material/Logout";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import WidgetsIcon from '@mui/icons-material/Widgets';
import HomeIcon from '@mui/icons-material/Home';
import {  signOut, authSelector } from "@/store/slices/auth.slice";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import { useAppDispatch } from "@/store/store";
import { groupDataSelector } from "@/store/slices/group-data.slice";

type Props = {};

function GroupShopPanel({}: Props) {
  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down("xs"));
  const dispatch:any = useAppDispatch();
  
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const userData = useSelector(authSelector);
  const groupData = useSelector(groupDataSelector);
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
    <Layout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper
              sx={{ p: 2, display: "flex", flexDirection: "row", gap: "16px" }}
            >
              {isSmallDevice ? (
                <WidgetsIcon sx={{ fontSize: "1.5rem", marginLeft: "8px" }} />
              ) : (
                <WidgetsIcon
                  sx={{ fontSize: "2.5rem", marginLeft: "16px" }}
                />
              )}

              <React.Fragment>
                {isSmallDevice ? (
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      alignSelf: "center",
                    }}
                  >
                    {" "}
                    ยินดีต้อนรับเข้าสู่
                    <br />
                    หน้าระบบหลังบ้าน
                  </Typography>
                ) : (
                  <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    alignSelf: "center",
                  }}
                >
                  ยินดีต้อนรับเข้าสู่หน้าระบบหลังบ้าน
                  {!userData.activated && (
                    <Box component="span" sx={{ marginLeft: 2, color: "red" }}>
                      หมายเหตุ : บัญชีของคุณยังไม่ถูกยืนยัน
                    </Box>
                  )}
                </Typography>
                )}
              </React.Fragment>
            </Paper>
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <Typography variant="h5" gutterBottom>
                เลือกเมนูที่ต้องการ
              </Typography>

              <Grid container spacing={2} columns={16}>

              <Grid item xs={12} sm={12} md={6}>
              <CustomMenuListItem
                    href="/panel/user/manage-group"
                    icon={GroupsIcon}
                    text="จัดการข้อมูลกลุ่ม"
                  />
                </Grid>
                
                {userData && userData.activated  && (
         <React.Fragment>
          <Grid item xs={12} sm={12} md={6}>
                  <CustomMenuListItem
                    href="/panel/user/manage-product"
                    icon={ShoppingBagIcon}
                    text="จัดการสินค้า"
                  />
                </Grid>
                {/* <Grid item xs={12} sm={12} md={6}>
                <CustomMenuListItem
                    href="/panel/user/manage-category"
                    icon={CheckroomIcon}
                    text="จัดการประเภทสินค้า"
                  />
                </Grid>
        
              
                <Grid item xs={12} sm={12} md={6}>
               
                <CustomMenuListItem   
          href="/panel/user/manage-colorscheme"
            icon={ColorLensIcon}
            text="จัดการโทนสีที่มีในร้าน"
          />
                </Grid> */}

         </React.Fragment>
      )}
             
      

             
              </Grid>

              <Divider sx={{ my: 1 }} />

              <Grid container spacing={2} columns={16}>

              <Grid item xs={12} sm={12} md={6}>
                  <CustomMenuListItem   
          href="/manage-profile"
            icon={SettingsIcon}
            text="ตั้งค่าบัญชีผู้ใช้"
          />
       
               </Grid>

               <Grid item xs={12} sm={12} md={6}>
                
    <CustomMenuListItem   
          href="/"
            icon={HomeIcon}
            text="กลับสู่หน้าหลักของเว็บไซต์"
          />
       
               </Grid>

               <Grid item xs={12} sm={12} md={6}>
               
           <CustomMenuListItem   
          href="/aboutus"
            icon={InfoIcon}
            text="เกี่ยวกับผู้พัฒนาระบบ"
          />
               </Grid>

               <Grid item xs={12} sm={12} md={6}>
               

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

       
     
            
                </Grid>
              </Grid>

             


            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}

export default GroupShopPanel;
