import React from "react";
import MainLayout from "@/components/MainLayout";
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  FormControlLabel,
  Box,
  CardContent,
  Card,
  CardActions,
  Button,
} from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import router from "next/router";
import { useAppDispatch } from "@/store/store";
import {
  getOneGroupDataAction,
  groupDataSelector,
} from "@/store/slices/group-data.slice";
import { useSelector } from "react-redux";
import { Field, Form, Formik, FormikProps } from "formik";
import { authSelector, fetchSession } from "@/store/slices/auth.slice";
import withAuth from "@/components/withAuth";
import Link from "next/link";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import Image from "next/image";
import dynamic from "next/dynamic";
import { groupDataImageURL } from "@/common/utils/utils";
import {
  GetStaticProps,
  InferGetStaticPropsType,
  GetStaticPropsContext,
} from "next";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  IconButton,
  Slide,
  Stack,
  Divider,
} from "@mui/material";
import * as groupDataService from "@/services/group-data.service";
import * as authService from "@/services/auth.service";
import { GroupDataPayload } from "@/models/group-data.model";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { useRouter } from 'next/router';
import { LatLngExpression, LatLngBoundsExpression } from "leaflet";

import {
	FacebookShareButton,
	TwitterShareButton,
	LinkedinShareButton,
	FacebookIcon,
	TwitterIcon,
	LinkedinIcon,
  } from 'react-share';


type Props = {
  groupData?: GroupDataPayload;
};

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  {
    ssr: false, // disable server-side rendering
  }
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  {
    ssr: false, // disable server-side rendering
  }
);

const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  {
    ssr: false, // disable server-side rendering
  }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false, // disable server-side rendering
});

function GroupDataPage({ groupData }: Props) {
  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down("xs"));
  const shareUrl = `https://www.kramtone.com/group/${groupData?.id}`;
  const shareTitle = 'Kramtone เชื่อมโยงสินค้าผ้าครามกับแผนภาพโทนสีครามธรรมชาติ';

  const router = useRouter();

const handleBackButtonClick = () => {
  router.back();
};

  const center: LatLngExpression = [17.1634, 104.1476]; // Centered on Sakon Nakhon Province
  const position: LatLngExpression = [
    parseFloat(groupData?.lat!),
    parseFloat(groupData?.lng!),
  ]; // Centered on Sakon Nakhon Province
  const zoom: number = 12;

  const typeographyHeaderStyle = {
    fontSize: isSmallDevice ? "16px" : "1.2rem",
    alignSelf: "flex-start",
    fontWeight: "bold",
    width: "100%",
    color: theme.palette.grey[800],
  };
  const typeographyValueStyle = {
    fontSize: isSmallDevice ? "16px" : "1.2rem",
    alignSelf: "flex-start",
    width: "100%",
    color: theme.palette.grey[800],
  };
  const boxStyle = {
    display: "flex",
    marginTop: "16px",
  };



  return (
    <MainLayout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
		<Grid item xs={12}>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleBackButtonClick}
     
      >
        ย้อนกลับ
      </Button>
    </Grid>
          <Grid item xs={12}>
            <Paper
              sx={{ p: 2, display: "flex", flexDirection: "row", gap: "16px" }}
            >
              {isSmallDevice ? (
                <GroupsIcon sx={{ fontSize: "1.5rem", marginLeft: "8px" }} />
              ) : (
                <GroupsIcon sx={{ fontSize: "2.5rem", marginLeft: "16px" }} />
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
                    หน้าข้อมูลกลุ่ม <br /> / ร้านค้า{" "}
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
                    หน้าข้อมูลกลุ่ม / ร้านค้า
                  </Typography>
                )}
              </React.Fragment>
            </Paper>
          </Grid>
		
        </Grid>

        <Grid container spacing={2} style={{ marginTop: "16px" }}>
          <Grid item xs={12} md={12} lg={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                gap: "4rem",
                flexDirection: {
                  xs: "column",
                  md: "row",
                },
                overflow: "hidden",
              }}
            >
              <Image
                alt="product image"
                src={groupData?.banner ? groupDataImageURL(groupData?.banner) : "/static/img/banner.png"}
                width={1120}
                height={160}
              />
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                gap: "4rem",
                flexDirection: {
                  xs: "column",
                  md: "row",
                },
              }}
            >
              <Grid item xs={12} md={4} lg={3}>
                <Image
                  style={{ objectFit: "cover" }}
                  alt="product image"
                  src={groupData?.logo ? groupDataImageURL(groupData?.logo) : "/static/img/logo.png"}
                  width={250}
                  height={250}
                />
              </Grid>

              <Grid item xs={12} md={8} lg={9}>
                <React.Fragment>
                  <Box sx={boxStyle}>
                    <Typography sx={typeographyHeaderStyle}>
                      ชื่อกลุ่ม / ร้านค้า
                    </Typography>
                    <Typography sx={typeographyValueStyle}>
                      {groupData?.groupName}
                    </Typography>
                  </Box>
                  <Box sx={boxStyle}>
                    <Typography sx={typeographyHeaderStyle}>
                      ประเภทกลุ่ม
                    </Typography>
                    <Typography sx={typeographyValueStyle}>
                      {groupData?.groupType === "shop"
                        ? "ร้านค้า"
                        : "กลุ่มผู้ผลิต"}
                    </Typography>
                  </Box>

                  <Box sx={boxStyle}>
                    <Typography sx={typeographyHeaderStyle}>
                      ชื่อประธาน / เจ้าของร้าน
                    </Typography>
                    <Typography sx={typeographyValueStyle}>
                      {groupData?.agency}
                    </Typography>
                  </Box>

                  <Box sx={boxStyle}>
                    <Typography sx={typeographyHeaderStyle}>
                      เบอร์โทร
                    </Typography>
                    <Typography sx={typeographyValueStyle}>
                      {groupData?.phone}
                    </Typography>
                  </Box>

                  <Box sx={boxStyle}>
                    <Typography sx={typeographyHeaderStyle}>อีเมล :</Typography>
                    <Typography sx={typeographyValueStyle}>
                      {groupData?.email}
                    </Typography>
                  </Box>
                </React.Fragment>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <Grid
                container
                spacing={2}
                sx={{
                  alignSelf: "flex-center",
                  paddingBottom: "16px",
                  paddingLeft: "16px",
                }}
              >
                <Grid item xs={12} md={6}>
                  <Box sx={boxStyle}>
                    <Typography sx={typeographyHeaderStyle}>
                      บ้านเลขที่/หมู่
                    </Typography>
                    <Typography sx={typeographyValueStyle}>
                      {groupData?.hno}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box sx={boxStyle}>
                    <Typography sx={typeographyHeaderStyle}>ถนน :</Typography>
                    <Typography sx={typeographyValueStyle}>
                      {groupData?.road}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box sx={boxStyle}>
                    <Typography sx={typeographyHeaderStyle}>ซอย :</Typography>
                    <Typography sx={typeographyValueStyle}>
                      {groupData?.lane}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box sx={boxStyle}>
                    <Typography sx={typeographyHeaderStyle}>
                      หมู่บ้าน
                    </Typography>
                    <Typography sx={typeographyValueStyle}>
                      {groupData?.village}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box sx={boxStyle}>
                    <Typography sx={typeographyHeaderStyle}>ตำบล</Typography>
                    <Typography sx={typeographyValueStyle}>
                      {groupData?.subdistrict}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={boxStyle}>
                    <Typography sx={typeographyHeaderStyle}>อำเภอ</Typography>
                    <Typography sx={typeographyValueStyle}>
                      {groupData?.district}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={boxStyle}>
                    <Typography sx={typeographyHeaderStyle}>จังหวัด</Typography>
                    <Typography sx={typeographyValueStyle}>
                      {groupData?.province}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box sx={boxStyle}>
                    <Typography sx={typeographyHeaderStyle}>
                      รหัสไปรษณีย์
                    </Typography>
                    <Typography sx={typeographyValueStyle}>
                      {groupData?.zipCode}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>


          <Grid item xs={12} md={12} lg={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <MapContainer
                center={center}
                zoom={zoom}
                style={{ height: "500px", width: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={position}>
                  <Popup autoClose={false}>
                    <span>หมุดของคุณ</span>
                  </Popup>
                </Marker>
              </MapContainer>
            </Paper>
          </Grid>
        </Grid>

		<Box display="flex" justifyContent="space-between" padding={2}>
          <Box display="flex" gap="8px">
            <FacebookShareButton url={shareUrl} quote={shareTitle}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton url={shareUrl} title={shareTitle}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <LinkedinShareButton url={shareUrl} title={shareTitle}>
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
          </Box>
          <Button variant="contained" color="primary" onClick={handleBackButtonClick}>
            กลับสู่ก่อนหน้า
          </Button>
        </Box>
      </Container>
    </MainLayout>
  );
}

export default GroupDataPage;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
	const params = context.params;
    const groupData = await groupDataService.getOneGroupData(params?.id?.toString());
    console.log("SSR")
    console.log(groupData)
    return {
      props: {
        groupData,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};
