import React from "react";
import Layout from "@/components/Layouts/Layout";
import { Grid, Paper, Typography, Container, Box, Divider } from "@mui/material";
import { ListItem,  } from "@mui/material";

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
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';


import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";

type Props = {};

function AdminPanel({}: Props) {
  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper
              sx={{ p: 2, display: "flex", flexDirection: "row", gap: "16px" }}
            >
              {isSmallDevice ? (
                <AdminPanelSettingsIcon sx={{ fontSize: "1.5rem", marginLeft: "8px" }} />
              ) : (
                <AdminPanelSettingsIcon
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
                    หน้าระบบหลังบ้าน (ADMIN)
                  </Typography>
                ) : (
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "bold",
                      alignSelf: "center",
                    }}
                  >
                    {" "}
                    ยินดีต้อนรับเข้าสู่หน้าระบบหลังบ้าน{" "}
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
              <Typography variant="h5" gutterBottom>
                เลือกเมนูที่ต้องการ
              </Typography>

              <Grid container spacing={2} columns={16}>
                <Grid item xs={8}>
                  <CustomMenuListItem
                    href="/panel/user/manage-group"
                    icon={GroupsIcon}
                    text="จัดการข้อมูลกลุ่ม"
                  />
                 
                </Grid>
                <Grid item xs={8}>
                 
                 
                </Grid>
              </Grid>

              <Divider sx={{ my: 1 }} />

              <Grid container spacing={2} columns={16}>
                <Grid item xs={8}>
             
        <CustomMenuListItem   
          href="/manage-profile"
            icon={SettingsIcon}
            text="ตั้งค่าบัญชีผู้ใช้"
            open={open}
          />

                </Grid>
                <Grid item xs={8}>
                <CustomMenuListItem   
          href="/aboutus"
            icon={InfoIcon}
            text="เกี่ยวกับผู้พัฒนาระบบ"
            open={open}
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
    </Layout>
  );
}

export default AdminPanel;
