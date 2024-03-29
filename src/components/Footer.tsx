import React from "react";
import Box from "@mui/material/Box";
import { Grid, Typography, Toolbar } from "@material-ui/core";
import { authSelector } from "@/store/slices/auth.slice";
import { useSelector } from "react-redux";
import Link from "next/link";
import Divider from "@mui/material/Divider";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

type Props = {};

export default function Footer({}: Props) {
  const theme = useTheme();
  const userSession = useSelector(authSelector);
  const isSmallDevice = useMediaQuery(theme.breakpoints.down("xs"));

  const copyrightStyle = {
    display: "flex",
    justifyContent: "center",
  };
  const copyrightLinkStyle = {
    color: "#000",
    margin: 4,
    // spacing: 8,
  };
  const footerStyle = {
    display: "flex",
    background: "#103D81",
    justifyContent: "center",
  };

  const footerLinkStyle = {
    color: "#FFF",
    // marginTop: isSmallDevice ? "16px" : "0px",
  };
  const [value, setValue] = React.useState(0);
  
  return (
    <React.Fragment>
      <Box>
        <Toolbar style={footerStyle}>
          <Box
            style={{
              display: "grid",
              gap: 1,
              gridTemplateColumns: "repeat(2, 1fr)",
            }}
          ></Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3} md={3}>
              <Link href="/" style={{ color: "#FFF" }}>
                <Typography align="center">www.kramtone.com</Typography>
              </Link>
            </Grid>

            <Grid
              item
              xs={12}
              sm={8}
              md={6}
              style={{
                display: "flex",
                flexDirection: isSmallDevice ? "column" : "row",
              }}
            >
              <Box
                style={{
                  display: "flex",
                  flexDirection: isSmallDevice ? "column" : "row",
                }}
              >
                <Box sx={{ marginRight: "16px" }}>
                  <Link href="/" style={footerLinkStyle}>
                    <Typography align="center">หน้าหลัก</Typography>
                  </Link>
                </Box>
                <Box sx={{ marginRight: "16px" }}>
                  <Link href="/product" style={footerLinkStyle}>
                    <Typography align="center">ข้อมูลสินค้า</Typography>
                  </Link>
                </Box>
                <Box sx={{ marginRight: "16px" }}>
                  <Link href="/group" style={footerLinkStyle}>
                    <Typography align="center">
                      ข้อมูลกลุ่มผู้ผลิตหรือร้านค้า
                    </Typography>
                  </Link>
                </Box>

                <Box sx={{ marginRight: "16px" }}>
                  <Link href="/color-scheme" style={footerLinkStyle}>
                    <Typography align="center">
                      ข้อมูลโทนสีครามธรรมชาติ
                    </Typography>
                  </Link>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={3}
              md={2}
              style={{
                // marginTop: isSmallDevice ? "16px" : "0px",
              }}
            >
              {userSession && userSession.role ? (
                <Link href="/panel" style={footerLinkStyle}>
                  <Typography align="center">
                    จัดการกลุ่มผู้ผลิตหรือร้านค้า
                  </Typography>
                </Link>
              ) : (
                <Link href="/auth/signin" style={footerLinkStyle}>
                    {isSmallDevice ?   <Typography align="center">
                    เข้าสู่ระบบ
                  </Typography> :  <Typography align="center">
                  เข้าสู่ระบบสำหรับกลุ่มผู้ผลิต
                  </Typography> }
                
                </Link>
              )}
            </Grid>
          </Grid>
          
        </Toolbar>
      </Box>

      <Divider />

      <Box>
        <Toolbar style={footerStyle}>
          <Box
            style={{
              display: "grid",
              gap: 1,
              gridTemplateColumns: "repeat(2, 1fr)",
            }}
          ></Box>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sm={4}
              md={4}
              style={{
                display: "flex",
                // flexDirection: isSmallDevice ? "column" : "row",
              }}
            >
              {!isSmallDevice ? (
                <Box
                  style={{
                    display: "flex",
                    flexDirection: isSmallDevice ? "column" : "row",
                    marginLeft:  isSmallDevice ? "0px" : "128px"
                  }}
                >
                  <Link
                    href="https://github.com/billowdev"
                    style={{
                      marginLeft: isSmallDevice ? "16px" : "0px",
                      // marginRight: isSmallDevice ? "16px" : "0px",
                      color: "#FFF",
                    }}
                  >
                    <Typography align={"center"}>
                      © 2023 BillowDev All rights reserved
                    </Typography>
                  </Link>
                </Box>
              ) : (
                <></>
              )}
            </Grid>

           {isSmallDevice ?  <> </>: <Grid
              item
              xs={12}
              sm={4}
              md={4}
              style={{
                marginTop: isSmallDevice ? "16px" : "0px",
                flexDirection: isSmallDevice ? "column" : "row",
              }}
            >

              </Grid>}

            <Grid
              item
              xs={12}
              sm={4}
              md={4}
              style={{
                marginTop: isSmallDevice ? "16px" : "0px",
                flexDirection: isSmallDevice ? "column" : "row",
              }}
            >
              <Box
                style={{
                  display: "flex",
                  flexDirection: isSmallDevice ? "column" : "row",
                }}
              >
                <Box sx={{ marginRight: "16px" }}>
                  <Link href="/privacy-policy" style={footerLinkStyle}>
                    <Typography align={isSmallDevice ? "center" : "right"}>
                      นโยบายความเป็นส่วนตัว
                    </Typography>
                  </Link>
                </Box>
                <Box sx={{ marginRight: "16px" }}>
                  <Link href="/terms-and-conditions" style={footerLinkStyle}>
                    <Typography align={isSmallDevice ? "center" : "right"}>
                      ข้อตกลงและเงื่อนไข
                    </Typography>
                  </Link>
                </Box>

                <Link href="/about" style={footerLinkStyle}>
                  <Typography align={isSmallDevice ? "center" : "right"}>
                    เกี่ยวกับเรา
                  </Typography>
                </Link>

                {isSmallDevice ? (
                  <Grid item xs={12} sm={4} md={4}>
                    <Link
                      href="https://github.com/billowdev"
                      style={{
                        // marginLeft: isSmallDevice ? "16px" : "0px",
                        // marginRight: isSmallDevice ? "16px" : "0px",
                        color: "#FFF",
                      }}
                    >
                      <Typography align={"center"}>
                        © 2023 BillowDev All rights reserved
                      </Typography>
                    </Link>
                  </Grid>
                ) : (
                  <></>
                )}
              </Box>
            </Grid>
          </Grid>
          ;
        </Toolbar>
      </Box>
    </React.Fragment>
  );
}