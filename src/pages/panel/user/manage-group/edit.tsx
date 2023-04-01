import React from "react";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetStaticProps,
  NextPage,
} from "next";
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
import { RootState, useAppDispatch } from "@/store/store";
import {
  getOneGroupDataAction,
  groupDataSelector,
} from "@/store/slices/group-data.slice";
import { useSelector } from "react-redux";
import { ErrorMessage, Field, Form, Formik, FormikProps } from "formik";
import { authSelector } from "@/store/slices/auth.slice";
import withAuth from "@/components/withAuth";
import Link from "next/link";
import { GroupDataPayload, GroupDataResponse } from "@/models/group-data.model";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import Image from "next/image";
import dynamic from "next/dynamic";
import * as groupDataService from "@/services/group-data.service";
import { object as yupObject, string as yupString } from "yup";
import { groupDataImageURL } from "@/utils/common.util";

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

import { LatLngExpression, LatLngBoundsExpression } from "leaflet";

interface Props {
  groupData: GroupDataPayload;
  accessToken: string;
}

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

const validationSchema = yupObject().shape({
  groupName: yupString().required("กรุณากรอกชื่อกลุ่มผู้ผลิต"),
  email: yupString().email("Invalid email").required("กรุณากรอกอีเมล"),
  groupType: yupString().required("กรุณาเลือกประเภทกลุ่ม"),
});

function UserPanelEditGroup({ groupData, accessToken }: Props) {
  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down("xs"));
  const dispatch: any = useAppDispatch();

  const center: LatLngExpression = [17.1634, 104.1476]; // Centered on Sakon Nakhon Province
  const position: LatLngExpression = [
    parseFloat(groupData.lat),
    parseFloat(groupData.lng),
  ]; // Centered on Sakon Nakhon Province
  const zoom: number = 12;

  const initialValues: GroupDataPayload = {
    groupName: groupData.groupName,
    groupType: groupData.groupType,
    agency: groupData.agency,
    logo: groupData.logo,
    banner: groupData.banner,
    phone: groupData.phone,
    email: groupData.email,
    hno: groupData.hno,
    village: groupData.village,
    lane: groupData.lane,
    road: groupData.road,
    subdistrict: groupData.subdistrict,
    district: groupData.district,
    province: groupData.province,
    zipCode: groupData.zipCode,
    lat: groupData.lat,
    lng: groupData.lng,
  };
  const [updateValue, setUpdateValue] =
    React.useState<GroupDataPayload>(initialValues);

  const [groupTypeState, setGroupTypeState] = React.useState<string>(
    initialValues.groupType
  );

  
  const showLogoPreviewImage = (values: any) => {
    if (values.logo_obj) {
      return (
        <Image
          objectFit="contain"
          alt="group logo image"
          src={values.logo_obj}
          width={100}
          height={100}
        />
      );
    } else if (values.logo) {
      return (
        <Image
          objectFit="contain"
          alt="group logo image"
          src={groupDataImageURL(values.logo)}
          width={100}
          height={100}
        />
      );
    }
  };

  const showBannerPreviewImage = (values: any) => {
    if (values.banner_obj) {
      return (
        <Image
          objectFit="contain"
          alt="group banner image"
          src={values.banner_obj}
          width={100}
          height={100}
        />
      );
    } else if (values.banner) {
      return (
        <Image
          objectFit="contain"
          alt="group banner image"
          src={groupDataImageURL(values.banner)}
          width={100}
          height={100}
        />
      );
    }
  };


  const setUpdateGroupPartOneValue = () => {};
  const showForm = ({
    dirty,
    isValid,
    setFieldValue,
  }: FormikProps<GroupDataPayload>) => {
    return (
      <Form>
		<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '16px'}}>
		  <Divider sx={{ width: '50%', margin: '16px' }} />
				<Typography variant="h5" >
				ข้อมูลกลุ่ม
				</Typography>
			<Divider sx={{ width: '50%', margin: '16px' }} />
			</Box>
			
			<Grid container spacing={2}>
  <Grid item xs={12} sm={6}>

  <FormLabel htmlFor="email" sx={{ fontWeight: "bold" }}>
	ภาพโลโก้ 
</FormLabel>

<FormLabel htmlFor="email" sx={{ fontWeight: "bold" }}>
	ภาพแบนเนอร์
</FormLabel>


  </Grid>
  <Grid item xs={12} sm={6}>
    
	
  <Box sx={{ marginTop: "16px" }}>
            <FormLabel htmlFor="email" sx={{ fontWeight: "bold" }}>
              ชื่อกลุ่มผู้ผลิตหรือร้านค้า<span style={{ color: "red" }}>*</span>
            </FormLabel>
            <Field
              name="groupName"
              fullWidth
              type="text"
              label="ชื่อกลุ่มผู้ผลิตหรือร้านค้า"
              as={TextField}
              sx={{ marginTop: "16px" }}
            />
            <ErrorMessage name="groupName" />
          </Box>

          <Box sx={{ marginTop: "16px" }}>
            <FormLabel htmlFor="groupType" sx={{ fontWeight: "bold" }}>
              ประเภทกลุ่ม <span style={{ color: "red" }}>*</span>
            </FormLabel>

            <RadioGroup
              row
              value={groupTypeState}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setGroupTypeState(event.target.value);
                setFieldValue("groupType", event.target.value);
              }}
              aria-labelledby="group-type-row-radio-buttons-group-label"
              name="groupType"
            >
              <FormControlLabel
                value="shop"
                control={<Radio />}
                label={"ร้านค้า"}
              />
              <FormControlLabel
                value="producer"
                control={<Radio />}
                label={"กลุ่มผู้ผลิต"}
              />
            </RadioGroup>

            <ErrorMessage name="groupType" />
          </Box>

          <Box sx={{ marginTop: "16px" }}>
            <FormLabel htmlFor="agency" sx={{ fontWeight: "bold" }}>
              ชื่อประธาน / เจ้าของร้าน <span style={{ color: "red" }}>*</span>
            </FormLabel>
            <Field
              name="agency"
              type="text"
              fullWidth
              label="ชื่อประธาน / เจ้าของร้าน"
              as={TextField}
              sx={{ marginTop: "16px" }}
            />
            <ErrorMessage name="agency" />
          </Box>
	
  <Box sx={{ marginTop: "16px" }}>
            <FormLabel htmlFor="phone" sx={{ fontWeight: "bold" }}>
              เบอร์โทร <span style={{ color: "red" }}>*</span>
            </FormLabel>
            <Field
              name="phone"
              type="text"
              fullWidth
              label="เบอร์โทร"
              as={TextField}
              sx={{ marginTop: "16px" }}
            />
            <ErrorMessage name="phone" />
          </Box>

          <Box sx={{ marginTop: "16px" }}>
            <FormLabel htmlFor="email" sx={{ fontWeight: "bold" }}>
              อีเมล <span style={{ color: "red" }}>*</span>
            </FormLabel>
            <Field
              name="email"
              type="email"
              fullWidth
              label="อีเมล"
              as={TextField}
              sx={{ marginTop: "16px" }}
            />
            <ErrorMessage name="email" />
          </Box>

		  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '16px' }}>
		  <Divider sx={{ width: '50%', margin: '16px' }} />
				<Typography variant="h5">
				ข้อมูลที่อยู่
				</Typography>
			<Divider sx={{ width: '50%', margin: '16px' }} />
			</Box>

		  <Box sx={{ marginTop: "16px" }}>
            <FormLabel htmlFor="email" sx={{ fontWeight: "bold" }}>
              อีเมล <span style={{ color: "red" }}>*</span>
            </FormLabel>
            <Field
              name="email"
              type="email"
              fullWidth
              label="อีเมล"
              as={TextField}
              sx={{ marginTop: "16px" }}
            />
            <ErrorMessage name="email" />
          </Box>
       

  </Grid>
</Grid>


       

        <Button
          type="submit"
          variant="contained"
          disabled={!dirty || !isValid}
          sx={{ marginTop: "16px" }}
        >
          บันทึกข้อมูล
        </Button>
      </Form>
    );
  };

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12}>
		  <Paper
              sx={{ p: 1, display: "flex", flexDirection: "row", gap: "16px" }}
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

        <Grid container spacing={2} style={{ marginTop: "16px" }} >
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
         
				<Grid item xs={12} md={12} lg={12}>
					{/* <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center',  padding: 4  }}>
				
					</Box> */}

					<Box sx={{ padding: 4  }}>
						<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={async (values, { setSubmitting }) => {
						setUpdateGroupPartOneValue(values);
						// setOpenDialog(true);
						console.log(values);
						setSubmitting(false);
						}}
					>
						{(props) => showForm(props)}
					</Formik>
					</Box>
				

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
       
      </Container>
    </Layout>
  );
}

export default withAuth(UserPanelEditGroup);

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { gid }: any = context.query;
  if (gid) {
    const groupData = await groupDataService.getOneGroupData(gid);
    const accessToken = context.req.cookies["access_token"];

    return {
      props: {
        groupData,
        accessToken,
      },
    };
  } else {
    return { props: {} };
  }
};
