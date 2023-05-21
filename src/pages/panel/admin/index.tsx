import React from "react";
import withAuth from "@/components/withAuth";
import Layout from "@/components/Layouts/Layout";
import {
  Grid,
  Paper,
  Typography,
  Container,
  Box,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  ListItem,
  DialogContentText,
  Button,
  DialogActions,
} from "@mui/material";

import CustomMenuListItem from "@/components/Layouts/CustomMenuListItem";
import GroupsIcon from "@mui/icons-material/Groups";

import SettingsIcon from "@mui/icons-material/Settings";
import InfoIcon from "@mui/icons-material/Info";
import LogoutIcon from "@mui/icons-material/Logout";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import CheckroomIcon from "@mui/icons-material/Checkroom";
// import useMediaQuery from "@material-ui/core/useMediaQuery";
// import { useTheme } from "@material-ui/core/styles";
import WidgetsIcon from '@mui/icons-material/Widgets';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

import { useMediaQuery, useTheme } from "@mui/material";
import { useAppDispatch } from "@/store/store";
import { signOut, authSelector } from "@/store/slices/auth.slice";
type Props = {};

function AdminPanel({ }: Props) {
  const theme = useTheme();
  const dispatch: any = useAppDispatch();

  const isSmallDevice = useMediaQuery(theme.breakpoints.down("xs"));
  const handleLogout = async () => {
    dispatch(signOut());
    setOpenDialog(false);
  };
  
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
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
          <Button variant="contained" onClick={handleLogout} color="primary">
            ออกจากระบบ
          </Button>
          <Button variant="outlined" onClick={() => setOpenDialog(false)} color="info">
            ยกเลิก
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
                    เมนู
                  </Typography>
                ) : (
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "bold",
                      alignSelf: "center",
                    }}
                  >
                    เมนู
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
                height: "100vh",
              }}
            >

              <Grid container spacing={2} columns={16}>

                <Grid item xs={8}>
                  <CustomMenuListItem
                    href="/panel/admin/manage/user"
                    icon={AccountBoxIcon}
                    text="จัดการบัญชีผู้ใช้"
                  />
                  <CustomMenuListItem
                    href="/panel/admin/manage/group"
                    icon={GroupsIcon}
                    text="จัดการกลุ่ม/ร้านค้า"
                  />
                </Grid>
                <Grid item xs={8}>
                  <CustomMenuListItem
                    href="/panel/admin/manage/category"
                    icon={CheckroomIcon}
                    text="จัดการประเภทสินค้า"
                  />
                  <CustomMenuListItem
                    href="/panel/admin/manage/color-scheme"
                    useStartWithPath={true}
                    startWithPath="/panel/admin/manage/color-scheme"
                    icon={ColorLensIcon}
                    text="จัดการโทนสี"
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 1 }} />

              <Grid container spacing={2} columns={16}>
                <Grid item xs={8}>

                  <CustomMenuListItem
                    href="/manage-profile"
                    icon={SettingsIcon}
                    text="ตั้งค่าบัญชีผู้ใช้"
                  />

                </Grid>
                <Grid item xs={8}>
                  <CustomMenuListItem
                    href="/aboutus"
                    icon={InfoIcon}
                    text="เกี่ยวกับผู้พัฒนาระบบ"
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

                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      {showSignOutDialog()}
    </Layout>
  );
}

export default withAuth(AdminPanel);
