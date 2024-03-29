import Layout from "@/components/Layouts/Layout";
import withAuth from "@/components/withAuth";
import { CategoryPayload } from "@/models/category.model";
// import { updateCategory } from "@/services/category.service";
import ColorLensIcon from '@mui/icons-material/ColorLens';
import { updateColorScheme } from "@/store/slices/color-scheme.slice";
import { categoryImageURL } from "@/common/utils/utils";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
  FormLabel,
  Box,
  Container,
  Paper
} from "@mui/material";
import { Field, Form, Formik, FormikProps } from "formik";
import { TextField } from "formik-material-ui";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import httpClient from "@/common/utils/httpClient.util";
import { Switch, FormControlLabel, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { useAppDispatch } from "@/store/store";
import toast from "react-hot-toast";
import { ColorSchemePayload } from "@/models/color-scheme.model"
import ConfirmationDialog from "@/components/ConfirmationDialog"
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

type Props = {
  colorScheme?: ColorSchemePayload;
  accessToken?: string;
};

const AdminPanelEditColorScheme = ({ colorScheme, accessToken }: Props) => {
  const router = useRouter();
  const theme = useTheme();
  const [updateValue, setUpdateValue] = React.useState<ColorSchemePayload>(colorScheme!);
  const dispatch = useAppDispatch();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('xs'));


  const [showConfirmation, setShowConfirmation] = React.useState(false);

  const handleEdit = () => {
    setShowConfirmation(true);
  }

  const handleConfirmEdit = async () => {
    if (updateValue && colorScheme?.id) {
      const colorSchemeId = colorScheme.id
      const response = await dispatch(updateColorScheme({ colorSchemeId, updateValue, accessToken }))

      if (response.meta.requestStatus === "fulfilled") {
        toast.success("แก้ไขข้อมูลสำเร็จ")
        router.push("/panel/admin/manage/color-scheme");        // router.push("/panel/user/manage-product");
      } else {
        console.log(response)
        toast.error("เพิ่มข้อมูลไม่สำเร็จ โปรดลองอีกครั้ง")
      }
    }

    setShowConfirmation(false);
  };

  const handleCancelEdit = () => {
    setShowConfirmation(false);
  };

  const showForm = ({
    values,
    setFieldValue,
    isValid,
  }: FormikProps<ColorSchemePayload>) => {
    return (
      <Form>
        <Card>
          <CardContent sx={{ padding: 4 }}>
       

            <Grid item md={6}>
              <Box style={{ marginTop: 16 }}>
                <FormLabel htmlFor="id" style={{ fontWeight: "bold" }}>
                รหัสประจำสี
                  <span style={{ color: "red" }}>*</span>
                </FormLabel>

            <Field
              style={{ marginTop: 8 }}
              fullWidth
              component={TextField}
              name="id"
              type="text"
              label="กรุณากรอก รหัสประจำสี"
            />
             </Box>
            </Grid>

            <Grid item md={6}>
              <Box style={{ marginTop: 16 }}>
                <FormLabel htmlFor="nameTH" style={{ fontWeight: "bold" }}>
                ชื่อสีภาษาไทย
                  <span style={{ color: "red" }}>*</span>
                </FormLabel>
            <Field
              style={{ marginTop: 8 }}
              fullWidth
              component={TextField}
              name="nameTH"
              type="text"
              label="กรุณากรอก ชื่อสีภาษาไทย"
            />
                  </Box>
            </Grid>


            <Grid item md={6}>
              <Box style={{ marginTop: 16 }}>
                <FormLabel htmlFor="nameEN" style={{ fontWeight: "bold" }}>
                ชื่อสีภาษาอังกฤษ
                  <span style={{ color: "red" }}>*</span>
                </FormLabel>
            <Field
              style={{ marginTop: 8 }}
              fullWidth
              component={TextField}
              name="nameEN"
              type="text"
              label="กรุณากรอก ชื่อสีภาษาอังกฤษ"
            />
                      </Box>
            </Grid>
            
            <Grid item md={6}>
              <Box style={{ marginTop: 16 }}>
                <FormLabel htmlFor="hex" style={{ fontWeight: "bold" }}>
                HEX CODE
                  <span style={{ color: "red" }}>*</span>
                </FormLabel>

            <Field
              style={{ marginTop: 8 }}
              fullWidth
              component={TextField}
              name="hex"
              type="text"
              label="กรุณากรอก HEX CODE"
            />
                         </Box>
            </Grid>
            

          </CardContent>
          <CardActions>
            <Button
              // disabled={!isValid}
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
              // fullWidth
              onClick={() => router.back()}
            >
              ยกเลิก
            </Button>
          </CardActions>
        </Card>
      </Form>
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
                <ColorLensIcon sx={{ fontSize: "1.5rem", marginLeft: "8px" }} />
              ) : (
                <ColorLensIcon
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
                
                    แก้ไขข้อมูลโทนสีครามธรรมชาติ
                  </Typography>
                ) : (
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "bold",
                      alignSelf: "center",
                    }}
                  >
          
                    แก้ไขข้อมูลโทนสีครามธรรมชาติ
                  </Typography>
                )}
              </React.Fragment>
            </Paper>
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
          <Formik
        validate={(values) => {
          let errors: any = {};
          if (!values.nameTH) errors.nameTH = "กรุณากรอกชื่อโทนสีครามธรรมชาติ";
          if (!values.nameEN) errors.nameEN = "กรุณากรอกชื่อโทนสีครามธรรมชาติ";
          if (!values.hex) errors.hex = "กรุณากรอกชื่อโทนสีครามธรรมชาติ";
          if (!values.id) errors.id = "กรุณากรอกชื่อโทนสีครามธรรมชาติ";

          return errors;
        }}
        initialValues={colorScheme!}
        onSubmit={async (values, { setSubmitting }) => {
          setUpdateValue(values)
          handleEdit()
          setSubmitting(false);
        }}
      >
        {(props) => showForm(props)}
      </Formik>

          </Grid>
        </Grid>
      </Container>

    
      <ConfirmationDialog
        title="ยืนยันการแก้ไขข้อมูล"
        message="คุณต้องการแก้ไขข้อมูลใช่หรือไม่ ?"
        open={showConfirmation}
        onClose={handleCancelEdit}
        onConfirm={handleConfirmEdit}
      />

    </Layout>
  );
};

export default withAuth(AdminPanelEditColorScheme);

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id }: any = context.query;

  if (id) {
    const accessToken = context.req.cookies['access_token']
    const { data: response } = await httpClient.get(`/colorschemes/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      baseURL: process.env.NEXT_PUBLIC_BASE_URL_API
    });


    const colorScheme = response.payload
    return {
      props: {
        colorScheme,
        accessToken
      },
    };
  } else {
    return { props: {} };
  }
};
