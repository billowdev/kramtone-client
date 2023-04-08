import React, { useRef, ReactNode } from "react";
import Layout from "@/components/Layouts/Layout";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import router from "next/router";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import {
  Container,
  Grid,
  Paper,
  Typography,
  FormControlLabel,
  Box,
  CardContent,
  Card,
  CardActions,
  Button,
} from "@mui/material";

import GroupsIcon from "@mui/icons-material/Groups";
import { RootState, useAppDispatch } from "@/store/store";
import { useSelector } from "react-redux";
import { ErrorMessage, Field, Form, Formik, FormikProps } from "formik";
import withAuth from "@/components/withAuth";
import Link from "next/link";
import { GroupDataPayload } from "@/models/group-data.model";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import Image from "next/image";
import dynamic from "next/dynamic";
import * as groupDataService from "@/services/group-data.service";
import { object as yupObject, string as yupString } from "yup";
import { groupDataImageURL } from "@/common/utils/utils";
import * as thaiAddressService from "@/services/thai-address.service";

// import { TextField } from "formik-material-ui";

import TextField from "@material-ui/core/TextField";

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

import {
  GeographyResponseType,
  GeographyType,
  ProvinceResponseType,
  ProvinceType,
  DistrictResponseType,
  DistrictType,
  SubdistrictResponseType,
  SubdistrictType,
} from "@/models/thai-address.model";
import {
  FormControl,
  InputLabel,
  Select,
  Input,
  FormHelperText,
} from "@material-ui/core";
import { LatLngExpression, LatLngBoundsExpression } from "leaflet";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@mui/material/MenuItem";

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

interface PageProps {
  groupData?: GroupDataPayload;
  accessToken?: string;
  provinces?: ProvinceType[] | undefined;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginTop: theme.spacing(2),
    "& > *": {
      width: "50%",
      margin: theme.spacing(2),
    },
  },
  divider: {
    width: "50%",
    margin: theme.spacing(3),
    marginTop: "16px",
  },
  formLabel: {
    fontWeight: "bold",
  },
  radioGroup: {
    marginTop: theme.spacing(2),
  },
  input: {
    padding: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      padding: 0,
    },
  },
  uploadWrapper: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(2),
    "& > *": {
      marginRight: theme.spacing(2),
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
  inputLabel: {
    color: "#00B0CD",
    fontWeight: "bold",
    cursor: "pointer",
  },
  previewImage: {
    marginTop: theme.spacing(2),
  },
  errorMessage: {
    color: "red",
  },
}));

const UserPanelEditGroup: React.FC<PageProps> = ({
  groupData,
  accessToken,
  provinces,
}) => {
  const theme = useTheme();
  const classes = useStyles();

  const isSmallDevice = useMediaQuery(theme.breakpoints.down("xs"));
  const isMediumDevice = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch: any = useAppDispatch();

  const center: LatLngExpression = [17.1634, 104.1476]; // Centered on Sakon Nakhon Province
  const position: LatLngExpression = [
    parseFloat(groupData?.lat ?? "17.1634"),
    parseFloat(groupData?.lng ?? "104.1476"),
  ]; // Centered on Sakon Nakhon Province
  const zoom: number = 12;

  // const [updateValue, setUpdateValue] = React.useState<GroupDataPayload>(groupData);

  const [groupTypeState, setGroupTypeState] = React.useState<string>(
    groupData?.groupType ?? "shop"
  );
  
  const [zipCodeState, setZipCodeState] = React.useState<string>(
    groupData?.zipCode ?? ""
  );
  const [provinceState, setProvinceState] = React.useState<string>(
    groupData?.province ?? ""
  );

  const [districtState, setDistrictState] = React.useState<string>(
    groupData?.district ?? ""
  );

  const [subdistrictState, setSubdistrictState] = React.useState<string>(
    groupData?.subdistrict ?? ""
  );

  const selectRef = React.useRef(null);
  const [districts, setDistrict] = React.useState<DistrictType[]>([]);
  const [subdistricts, setSubDistrict] = React.useState<SubdistrictType[]>([]);

  const [selectedProvince, setSelectedProvince] =
    React.useState<ProvinceType | null>(null);

  const handleProvinceChange = async (
    setFieldValue: any,
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const selectedId = event.target.value;
    const selected = provinces?.find(
      (p: ProvinceType | undefined) => p?.id === selectedId
    );
    const provinceName = selected?.nameTH!;
    const provinceId = selected?.id!;
    setProvinceState(provinceName);
    setSelectedProvince(selected!);
    setFieldValue("province", provinceName);
    const districtData = await thaiAddressService.getDistricts(
      provinceId.toString()
    );
    setDistrict(districtData);
  };

  const [selectedDistrict, setSelectedDistrict] =
    React.useState<DistrictType | null>(null);

  const handleDistrictChange = async (
    setFieldValue: any,
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const selectedId = event.target.value as number;
    const selected = districts?.find((p: DistrictType) => p?.id === selectedId);
    const districtName = selected?.nameTH!;
    const districtId = selected?.id!;
    setFieldValue("district", districtName!);
    setDistrictState(districtName!);
    setSelectedDistrict(selected!);

    const subdistrictData = await thaiAddressService.getSubdistricts(
      districtId.toString()
    );
    setSubDistrict(subdistrictData);
    // console.log(selected?.nameTH);
    // console.log(subdistrictData);
  };

  const [openDialog, setOpenDialog] = React.useState<boolean>(false);

  const [selectedSubdistrict, setSelectedSubdistrict] =
    React.useState<SubdistrictType | null>(null);

  const handleSubdistrictChange = async (
    setFieldValue: any,
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const selectedId = event.target.value as number;
    const selected = subdistricts?.find(
      (p: SubdistrictType) => p?.id === selectedId
    );
    const subdistrictName = selected?.nameTH!;
    const subdistrictZipCode = selected?.zipCode!;
    setFieldValue("subdistrict", subdistrictName!);
    setSubdistrictState(subdistrictName!);
    setSelectedSubdistrict(selected!);
    setZipCodeState(subdistrictZipCode.toString())
    console.log(zipCodeState)
    // console.log(selected?.nameTH);
    console.log(selected);
  };

  const showPreviewLogo = (values: any) => {
    if (values.logo_obj) {
      return (
        <Image
          alt="group logo image"
          src={values.logo_obj}
          width={250}
          height={250}
        />
      );
    } else if (values.logo) {
      return (
        <div className="w-full relative pt-[100%]">
          <Image
            alt="group logo image"
            src={groupDataImageURL(values.logo)}
            width={isSmallDevice ? 150 : 250}
            height={isSmallDevice ? 150 : 250}
            className="w-full h-full top-0 left-0 object-cover rounded-2xl"
          />
        </div>
      );
    }
  };

  const showPreviewBanner = (values: any) => {
    if (values.banner_obj) {
      return (
        <Image
          alt="group banner image"
          src={values.banner_obj}
          width={isSmallDevice ? 200 : 400}
          height={isSmallDevice ? 30 : 60}
        />
      );
    } else if (values.banner) {
      return (
        <Image
          alt="group banner image"
          src={groupDataImageURL(values.banner)}
          width={isSmallDevice ? 200 : 400}
          height={isSmallDevice ? 30 : 60}
        />
      );
    }
  };

  const setUpdateValue = (values: any) => {};

    const handleUpdateData = () =>{

    }
  const showDialog = () => {
    return (
      <Dialog
        open={openDialog}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          ยืนยันการแก้ไขข้อมูล
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            คุณต้องการแก้ไขข้อมูลใช่หรือไม่
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateData} color="primary">
            ยืนยัน
          </Button>
          <Button onClick={() => setOpenDialog(false)} color="info">
            ยกเลิก
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const showForm = ({
    values,
    isValid,
    setFieldValue,
  }: FormikProps<GroupDataPayload>) => {
    return (
      <Form>
        <Grid container spacing={2}>
          {/* First row with one column */}
          <Grid item xs={12}>
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                marginTop: 3,
              }}
            >
              <Divider style={{ width: "50%", margin: 8 }} />
              <Typography variant="h5">ข้อมูลกลุ่ม</Typography>
              <Divider style={{ width: "50%", margin: 8 }} />
            </Box>
            {/* isMediumDevice */}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <FormLabel htmlFor="logo" style={{ fontWeight: "bold" }}>
                  ภาพโลโก้ ขนาด 250 x 250 px
                </FormLabel>

                <Box style={{ padding: isSmallDevice ? 0 : 4 }}>
                  <div>{showPreviewLogo(values)}</div>
                  <div>
                    <Image
                      alt="product image"
                      src="/static/img/default.png"
                      width={25}
                      height={20}
                    />
                    <span style={{ color: "#00B0CD", marginLeft: 10 }}>
                      เปลี่ยนภาพโลโก้
                    </span>
                    <input
                      type="file"
                      onChange={(e: React.ChangeEvent<any>) => {
                        e.preventDefault();
                        setFieldValue("logo_file", e.target.files[0]); // for upload
                        setFieldValue(
                          "logo_obj",
                          URL.createObjectURL(e.target.files[0])
                        ); // for preview image
                      }}
                      name="logo"
                      click-type="type1"
                      multiple
                      accept="image/*"
                      id="logo"
                      style={{ padding: "20px 0 0 20px" }}
                    />
                  </div>
                </Box>

                <FormLabel htmlFor="banner" style={{ fontWeight: "bold" }}>
                  ภาพแบนเนอร์ ขนาด 1200 x 160 px
                </FormLabel>
                <Box style={{ padding: isSmallDevice ? 0 : 4 }}>
                  <div>{showPreviewBanner(values)}</div>
                  <div>
                    <Image
                      alt="product image"
                      src="/static/img/default.png"
                      width={25}
                      height={20}
                    />
                    <span style={{ color: "#00B0CD", marginLeft: 10 }}>
                      เปลี่ยนภาพแบนเนอร์
                    </span>
                    <input
                      type="file"
                      onChange={(e: React.ChangeEvent<any>) => {
                        e.preventDefault();
                        setFieldValue("banner_file", e.target.files[0]); // for upload
                        setFieldValue(
                          "banner_obj",
                          URL.createObjectURL(e.target.files[0])
                        ); // for preview image
                      }}
                      name="banner"
                      click-type="type1"
                      multiple
                      accept="image/*"
                      id="banner"
                      style={{ padding: "20px 0 0 20px" }}
                    />
                  </div>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box style={{ marginTop: 3 }}>
                  <FormLabel htmlFor="email" style={{ fontWeight: "bold" }}>
                    ชื่อกลุ่มผู้ผลิตหรือร้านค้า
                    <span style={{ color: "red" }}>*</span>
                  </FormLabel>
                  <Field
                    name="groupName"
                    inputProps={{ maxLength: 100 }}
                    fullWidth
                    type="text"
                    defaultValue={groupData?.groupName}
                    label="ชื่อกลุ่มผู้ผลิตหรือร้านค้า"
                    component={TextField}
                    style={{ marginTop: 3 }}
                  />
                  <ErrorMessage name="groupName" />
                </Box>

                <Box sx={{ marginTop: 3 }}>
                  <FormLabel htmlFor="groupType" style={{ fontWeight: "bold" }}>
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

                <Box sx={{ marginTop: 3 }}>
                  <FormLabel htmlFor="agency" style={{ fontWeight: "bold" }}>
                    ชื่อประธาน / เจ้าของร้าน{" "}
                    <span style={{ color: "red" }}>*</span>
                  </FormLabel>
                  <Field
                    name="agency"
                    type="text"
                    inputProps={{ maxLength: 160 }}
                    defaultValue={groupData?.agency}
                    fullWidth
                    label="ชื่อประธาน / เจ้าของร้าน"
                    component={TextField}
                    sx={{ marginTop: 3 }}
                  />
                  <ErrorMessage name="agency" />
                </Box>

                <Box sx={{ marginTop: 3 }}>
                  <FormLabel htmlFor="phone" style={{ fontWeight: "bold" }}>
                    เบอร์โทร <span style={{ color: "red" }}>*</span>
                  </FormLabel>
                  <Field
                    name="phone"
                    type="text"
                    inputProps={{ maxLength: 10 }}
                    defaultValue={groupData?.phone}
                    fullWidth
                    label="เบอร์โทร"
                    component={TextField}
                    sx={{ marginTop: 3 }}
                  />
                  <ErrorMessage name="phone" />
                </Box>

                <Box sx={{ marginTop: 3 }}>
                  <FormLabel htmlFor="email" style={{ fontWeight: "bold" }}>
                    อีเมล <span style={{ color: "red" }}>*</span>
                  </FormLabel>
                  <Field
                    name="email"
                    type="email"
                    inputProps={{ maxLength: 120 }}
                    defaultValue={groupData?.email}
                    fullWidth
                    label="อีเมล"
                    component={TextField}
                    sx={{ marginTop: 3 }}
                  />
                  <ErrorMessage name="email" />
                </Box>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                marginTop: 3,
              }}
            >
              <Divider style={{ width: "50%", margin: 8 }} />
              <Typography variant="h5">ข้อมูลที่อยู่</Typography>
              <Divider style={{ width: "50%", margin: 8 }} />
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Box sx={{ marginTop: 3 }}>
                  <FormControl fullWidth>
                    <FormLabel htmlFor="province" sx={{ fontWeight: "bold" }}>
                      จังหวัด <span style={{ color: "red" }}>*</span>
                    </FormLabel>
                    <Select
                      id="province"
                      className="selectProvince"
                      labelId="province-label"
                      displayEmpty
                      value={selectedProvince?.id || ""}
                      onChange={(e) => handleProvinceChange(setFieldValue, e)}
                      style={{ marginTop: "16px" }}
                    >
                      <MenuItem value="">
                        {provinceState || "-- โปรดเลือกจังหวัด --"}
                      </MenuItem>
                      {provinces &&
                        provinces.map((province: ProvinceType) => (
                          <MenuItem key={province.id} value={province.id}>
                            {province.nameTH}
                          </MenuItem>
                        ))}
                    </Select>
                    <ErrorMessage name="province" />
                  </FormControl>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box sx={{ marginTop: 3 }}>
                  <FormControl fullWidth>
                    <FormLabel
                      htmlFor="province"
                      style={{ fontWeight: "bold" }}
                    >
                      อำเภอ <span style={{ color: "red" }}>*</span>
                    </FormLabel>
                    <Select
                      id="district"
                      className="selectDistrict"
                      labelId="district-label"
                      displayEmpty
                      value={selectedDistrict?.id || ""}
                      onChange={(e) => handleDistrictChange(setFieldValue, e)}
                      style={{ marginTop: "16px" }}
                    >
                      <MenuItem value="">
                          {districtState || "-- โปรดเลือกอำเภอ --"}
                      </MenuItem>
                      {provinces &&
                        districts &&
                        districts.map((district: DistrictType) => (
                          <MenuItem key={district.id} value={district.id}>
                            {district.nameTH}
                          </MenuItem>
                        ))}
                    </Select>
                    <ErrorMessage name="district" />
                  </FormControl>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box sx={{ marginTop: 3 }}>
                  <FormControl fullWidth>
                    <FormLabel
                      htmlFor="subdistrict"
                      sx={{ fontWeight: "bold" }}
                    >
                      ตำบล <span style={{ color: "red" }}>*</span>
                    </FormLabel>
                    <Select
                      id="subdistrict"
                      className="selectSubdistrict"
                      labelId="subdistrict-label"
                      displayEmpty
                      value={selectedSubdistrict?.id || ""}
                      onChange={(e) =>
                        handleSubdistrictChange(setFieldValue, e)
                      }
                      style={{ marginTop: "16px" }}
                    >
                      <MenuItem value="">
      
                             {subdistrictState || "-- โปรดเลือกตำบล --"}
                      </MenuItem>
                      {provinces &&
                        districts &&
                        subdistricts &&
                        subdistricts.map((subdistrict: SubdistrictType) => (
                          <MenuItem key={subdistrict.id} value={subdistrict.id}>
                            {subdistrict.nameTH}
                          </MenuItem>
                        ))}
                    </Select>
                    <ErrorMessage name="subdistrict" />
                  </FormControl>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box sx={{ marginTop: 3 }}>
                  <FormLabel htmlFor="zipCode" style={{ fontWeight: "bold" }}>
                    รหัสไปรษณีย์ <span style={{ color: "red" }}>*</span>
                  </FormLabel>
                  <Field
                    name="zipCode"
                    type="text"
                    fullWidth
                    value={zipCodeState}
                    
                    onChange={(e : React.ChangeEvent<any>)=>{
                      setZipCodeState(e.target.value);
                    }}
                    label="รหัสไปรษณีย์"
                    inputProps={{ maxLength: 10 }}
                    component={TextField}
                    sx={{ marginTop: 3 }}
                  />
                  <ErrorMessage name="zipCode" />
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box sx={{ marginTop: 3 }}>
                  <FormLabel htmlFor="hno" style={{ fontWeight: "bold" }}>
                    บ้านเลขที่/หมู่ <span style={{ color: "red" }}>*</span>
                  </FormLabel>
                  <Field
                    name="hno"
                    type="text"
                    fullWidth
                    inputProps={{ maxLength: 5 }}
                    defaultValue={groupData?.hno}
                    label="บ้านเลขที่/หมู่"
                    component={TextField}
                    sx={{ marginTop: 3 }}
                  />
                  <ErrorMessage name="hno" />
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box sx={{ marginTop: 3 }}>
                  <FormLabel htmlFor="lane" style={{ fontWeight: "bold" }}>
                    ซอย
                  </FormLabel>
                  <Field
                    name="lane"
                    type="text"
                    fullWidth
                    defaultValue={groupData?.lane}
                    inputProps={{ maxLength: 50 }}
                    label="ซอย"
                    component={TextField}
                    sx={{ marginTop: 3 }}
                  />
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box sx={{ marginTop: 3 }}>
                  <FormLabel htmlFor="road" style={{ fontWeight: "bold" }}>
                    ถนน
                  </FormLabel>
                  <Field
                    name="road"
                    type="text"
                    defaultValue={groupData?.road}
                    inputProps={{ maxLength: 50 }}
                    fullWidth
                    label="ถนน"
                    component={TextField}
                    sx={{ marginTop: 3 }}
                  />
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box sx={{ marginTop: 3 }}>
                  <FormLabel htmlFor="village" sx={{ fontWeight: "bold" }}>
                    หมู่บ้าน <span style={{ color: "red" }}>*</span>
                  </FormLabel>
                  <Field
                    name="village"
                    defaultValue={groupData?.village}
                    type="text"
                    fullWidth
                    label="หมู่บ้าน"
                    component={TextField}
                    sx={{ marginTop: 3 }}
                  />
                  <ErrorMessage name="village" />
                </Box>
              </Grid>

            </Grid>
          </Grid>
        </Grid>

        <CardActions>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={!isValid}
            sx={{ marginRight: 1 }}
          >
            {isSmallDevice ? "บันทึก" : "บันทึกข้อมูล"}
          </Button>
          <Link href="/panel/user/manage-group" passHref>
            <Button variant="outlined" fullWidth>
              ยกเลิก
            </Button>
          </Link>
        </CardActions>
      </Form>
    );
  };

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ marginTop: 4, marginBottom: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12}>
            <Paper
              sx={{
                padding: 1,
                display: "flex",
                flexDirection: "row",
                gap: 16,
              }}
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
                    หน้าแก้ไขข้อมูลกลุ่ม <br /> / ร้านค้า{" "}
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
                    หน้าแก้ไขข้อมูลกลุ่ม / ร้านค้า
                  </Typography>
                )}
              </React.Fragment>
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ marginTop: 3 }}>
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 6,
                display: "flex",
                gap: "4rem",
                flexDirection: {
                  xs: "column",
                  md: "row",
                },
              }}
            >
              <Grid item xs={12} md={12} lg={12}>
                <Box sx={{ padding: 4 }}>
                  <Formik
                    initialValues={groupData!}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                      setUpdateValue(values);
                      setOpenDialog(true);
                      // console.log(values);
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
                gap: 16,
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
      {showDialog()}
    </Layout>
  );
};

export default withAuth(UserPanelEditGroup);

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { gid }: any = context.query;
  if (gid) {
    const groupData = await groupDataService.getOneGroupData(gid);
    const accessToken = context.req.cookies["access_token"];
    const provinces = await thaiAddressService.getProvinces();
    return {
      props: {
        groupData,
        accessToken,
        provinces,
      },
    };
  } else {
    return { props: {} };
  }
};
