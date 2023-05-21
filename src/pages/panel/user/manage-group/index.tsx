import React from "react";
import Layout from "@/components/Layouts/Layout";
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
import LoadingProgress from '@/components/LoadingProgress';

import { LatLngExpression, LatLngBoundsExpression } from "leaflet";

type Props = {
  // groupDataSlice?.groupData?: GroupDataPayload;
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

function UserPanelManageGroup({   }: Props) {
  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down("xs"));
  const dispatch: any = useAppDispatch();
  const groupDataSlice = useSelector(groupDataSelector);
  const userData = useSelector(authSelector);

  React.useEffect(() => {
    dispatch(fetchSession());
  }, [dispatch]);

  React.useEffect(() => {
    //  async function fethData() {
    //   const data = await  dispatch(getAllGroupDataAction());
    //   console.log("====== async effect")
    //   console.log(data.payload)
    //  }
    //  if(userData){
    //    fethData()
    //  }
    console.log(userData)
    if (userData) {
      dispatch(getOneGroupDataAction(userData.gid));
    }
  }, [dispatch, userData]);

  const center: LatLngExpression = [17.1634, 104.1476]; // Centered on Sakon Nakhon Province
  const position: LatLngExpression = [
    parseFloat(groupDataSlice?.groupData?.lat!),
    parseFloat(groupDataSlice?.groupData?.lng!),
  ]; // Centered on Sakon Nakhon Province
  const zoom: number = 12;

  const initialValues: GroupDataPayload = {
    groupName: groupDataSlice?.groupData?.groupName,
    groupType: groupDataSlice?.groupData?.groupType,
    agency: groupDataSlice?.groupData?.agency,
    logo: groupDataSlice?.groupData?.logo,
    banner: groupDataSlice?.groupData?.banner,
    phone: groupDataSlice?.groupData?.phone,
    email: groupDataSlice?.groupData?.email,
    hno: groupDataSlice?.groupData?.hno,
    village: groupDataSlice?.groupData?.village,
    lane: groupDataSlice?.groupData?.lane,
    road: groupDataSlice?.groupData?.road,
    subdistrict: groupDataSlice?.groupData?.subdistrict,
    district: groupDataSlice?.groupData?.district,
    province: groupDataSlice?.groupData?.province,
    zipCode: groupDataSlice?.groupData?.zipCode,
    lat: groupDataSlice?.groupData?.lat,
    lng: groupDataSlice?.groupData?.lng,
  };

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

  const showForm = ({ isValid }: FormikProps<any>) => {
    return (
      <Form>
        <Card>
          <CardContent sx={{ padding: 4}}>
            <FormLabel htmlFor="groupName" sx={{ marginTop: "16px" }}>
              ชื่อกลุ่มผู้ผลิตหรือร้านค้า
            </FormLabel>
            <Field
              style={{ marginTop: 16 }}
              fullWidth
              value={groupDataSlice?.groupData?.groupName}
              component={TextField}
              name="groupName"
              type="text"
              label="ชื่อกลุ่มผู้ผลิตหรือร้านค้า"
            />
            <Box sx={{ marginTop: "16px" }}>
              <FormLabel htmlFor="groupName">
                ชื่อกลุ่มผู้ผลิตหรือร้านค้า
              </FormLabel>
              <Field
                style={{ marginTop: 16 }}
                fullWidth
                value={groupDataSlice?.groupData?.groupName}
                component={TextField}
                name="groupName"
                type="text"
                label="ชื่อกลุ่มผู้ผลิตหรือร้านค้า"
              />
            </Box>
          </CardContent>
          <CardActions>
            <Button
              disabled={!isValid}
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              sx={{ marginRight: 1 }}
            >
              แก้ไข
            </Button>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => setOpenDialog(false)}
            >
              ยกเลิก
            </Button>
          </CardActions>
        </Card>
      </Form>
    );
  };

  const [openDialog, setOpenDialog] = React.useState<boolean>(false);

  const showDialog = () => {
    if (groupDataSlice?.groupData === null) {
      return;
    }

    return (
      <Dialog
        open={openDialog}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          <Typography gutterBottom>
            แก้ไขข้อมูลกลุ่มผู้ผลิตหรือร้านค้า
          </Typography>
          <Divider />
        </DialogTitle>
        <DialogContent>
          <Formik
            validate={(values) => {
              let errors: any = {};
              return errors;
            }}
            initialValues={initialValues}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(false);
            }}
          >
            {(props) => showForm(props)}
          </Formik>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="info">
            ยกเลิก
          </Button>
          <Button onClick={()=>{
            console.log("edit")
          }} color="primary">
            แก้ไข
          </Button>
        </DialogActions> */}
      </Dialog>
    );
  };

  const handleOnEditClick = () => {
    router.push('/panel/user/manage-group/edit?gid=' + userData.gid)
    const editUrl = '/panel/user/manage-group/edit?gid=' + userData.gid;
    return (
      <Link href={editUrl}>
        <a>Edit Group</a>
      </Link>
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
                    หน้าจัดการข้อมูลกลุ่ม <br /> / ร้านค้า{" "}
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
                    หน้าจัดการข้อมูลกลุ่ม / ร้านค้า
                  </Typography>
                )}
              </React.Fragment>
            </Paper>
          </Grid>
        </Grid>


        <Grid container spacing={2} style={{ marginTop: "16px" }}>

       {
        !userData?.activated && <Grid item xs={12} md={12} lg={12}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100px',
          }}
        >
          <Typography variant="h5" color="error">
            ข้อมูลกลุ่มของคุณยังไม่ถูกยืนยัน กรุณากรอกข้อมูลให้ครบถ้วน รอแอดมินตรวจสอบ
          </Typography>
        </Paper>
      </Grid> 
       }

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
                src={groupDataImageURL(groupDataSlice?.groupData?.banner)}
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
                  src={groupDataImageURL(groupDataSlice?.groupData?.logo)}
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
                      {groupDataSlice?.groupData?.groupName}
                    </Typography>
                  </Box>
                  <Box sx={boxStyle}>
                    <Typography sx={typeographyHeaderStyle}>
                      ประเภทกลุ่ม
                    </Typography>
                    <Typography sx={typeographyValueStyle}>
                      {groupDataSlice?.groupData?.groupType === "shop"
                        ? "ร้านค้า"
                        : "กลุ่มผู้ผลิต"}
                    </Typography>
                  </Box>

                  <Box sx={boxStyle}>
                    <Typography sx={typeographyHeaderStyle}>
                      ชื่อประธาน / เจ้าของร้าน
                    </Typography>
                    <Typography sx={typeographyValueStyle}>
                      {groupDataSlice?.groupData?.agency}
                    </Typography>
                  </Box>

                  <Box sx={boxStyle}>
                    <Typography sx={typeographyHeaderStyle}>
                      เบอร์โทร
                    </Typography>
                    <Typography sx={typeographyValueStyle}>
                      {groupDataSlice?.groupData?.phone}
                    </Typography>
                  </Box>

                  <Box sx={boxStyle}>
                    <Typography sx={typeographyHeaderStyle}>อีเมล</Typography>
                    <Typography sx={typeographyValueStyle}>
                      {groupDataSlice?.groupData?.email}
                    </Typography>
                  </Box>
                </React.Fragment>
              </Grid>
            </Paper>
          </Grid>

                
<Grid item xs= {12} md={12} lg = {12}>
  <Paper sx={{
                p: 2,
                display: "flex",
                gap: "4rem",
                flexDirection: {
                  xs: "column",
                  md: "row",
                },
              }}>
                
 <Box>
  <Typography style={typeographyHeaderStyle}>โทนสีที่มีในร้าน</Typography>
  {groupDataSlice?.groupData?.products && (
    <>
      {[...new Set(groupDataSlice?.groupData?.products?.map((product: any) => product.colorScheme.id) ?? [])].map((colorSchemeId: string, index: number) => {
        const product = groupDataSlice?.groupData?.products?.find((product: any) => product.colorScheme.id === colorSchemeId);
        return (
          <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
            <div
              style={{
                backgroundColor: product?.colorScheme?.hex,
                width: '25px',
                height: '25px',
                marginRight: '4px',
              }}
            ></div>
            <Typography variant="subtitle1">
              รหัสสี {product?.colorScheme?.id}
            </Typography>
          </div>
        );
      })}
    </>
  )}
</Box>

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
                      {groupDataSlice?.groupData?.hno}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box sx={boxStyle}>
                    <Typography sx={typeographyHeaderStyle}>ถนน</Typography>
                    <Typography sx={typeographyValueStyle}>
                      {groupDataSlice?.groupData?.road}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box sx={boxStyle}>
                    <Typography sx={typeographyHeaderStyle}>ซอย</Typography>
                    <Typography sx={typeographyValueStyle}>
                      {groupDataSlice?.groupData?.lane}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box sx={boxStyle}>
                    <Typography sx={typeographyHeaderStyle}>
                      หมู่บ้าน
                    </Typography>
                    <Typography sx={typeographyValueStyle}>
                      {groupDataSlice?.groupData?.village}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box sx={boxStyle}>
                    <Typography sx={typeographyHeaderStyle}>ตำบล</Typography>
                    <Typography sx={typeographyValueStyle}>
                      {groupDataSlice?.groupData?.subdistrict}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={boxStyle}>
                    <Typography sx={typeographyHeaderStyle}>อำเภอ</Typography>
                    <Typography sx={typeographyValueStyle}>
                      {groupDataSlice?.groupData?.district}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={boxStyle}>
                    <Typography sx={typeographyHeaderStyle}>จังหวัด</Typography>
                    <Typography sx={typeographyValueStyle}>
                      {groupDataSlice?.groupData?.province}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box sx={boxStyle}>
                    <Typography sx={typeographyHeaderStyle}>
                      รหัสไปรษณีย์
                    </Typography>
                    <Typography sx={typeographyValueStyle}>
                      {groupDataSlice?.groupData?.zipCode}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box sx={boxStyle}>
                    <Typography sx={typeographyHeaderStyle}>
                      ละติจูด
                    </Typography>
                    <Typography sx={typeographyValueStyle}>
                      {groupDataSlice?.groupData?.lat}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box sx={boxStyle}>
                    <Typography sx={typeographyHeaderStyle}>
                      ลองจิจูด
                    </Typography>
                    <Typography sx={typeographyValueStyle}>
                      {groupDataSlice?.groupData?.lng}
                    </Typography>
                  </Box>
                </Grid>

              </Grid>



            </Paper>
          </Grid>

          <Container
            maxWidth="lg"
            sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}
          >
           
              <Button
                color="primary"
                variant="contained"
                style={{
                  margin: "8px 0",
                  backgroundColor: theme.palette.primary.main,
                  color: "#fff",
                  fontWeight: "bold",
                  boxShadow: `0px 5px 10px rgba(0, 0, 0, 0.3)`,
                }}
                onClick={() => {
                  handleOnEditClick();
                  // setOpenDialog(true);
                }}
              >
                แก้ไขข้อมูล
              </Button>
     
          </Container>

          {groupDataSlice?.groupData?.lat && groupDataSlice?.groupData?.lng ? (
  <Grid item xs={12} md={12} lg={12}>
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <MapContainer
         center={position}
        zoom={zoom}
        style={{ height: '500px', width: '100%' }}
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
) : (
  <Grid item xs={12} md={12} lg={12}>
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '200px',
      }}
    >
      <Typography variant="h5" color="error">
        กรุณาปักหมุดแผนที่
      </Typography>
    </Paper>
  </Grid>
)}
        </Grid>
      </Container>

      {showDialog()}
    </Layout>
  );
}

export default withAuth(UserPanelManageGroup);

// export const getServerSideProps: GetServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   try {
//     const accessToken = context.req.cookies["access_token"];
//     const { gid } = await authService.getSessionServerSide(accessToken!);
//     const groupDataProp = await groupDataSlice?.groupDataService.getOneGroupData(gid);

//     return {
//       props: {
//        groupDataProp,
//       },
//     };
//   } catch (error) {
//     return {
//       props: {},
//     };
//   }
// };
