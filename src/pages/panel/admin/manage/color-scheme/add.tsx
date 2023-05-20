import Layout from "@/components/Layouts/Layout";
import withAuth from "@/components/withAuth";
import { ColorSchemePayload } from "@/models/color-scheme.model";
// import { updateCategory } from "@/services/category.service";
import { categoryImageURL } from "@/common/utils/utils";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
  Box,
  FormLabel,
  Container,
  Paper
} from "@mui/material";
import { Field, Form, Formik, FormikProps } from "formik";
import { TextField } from "formik-material-ui";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Link from "next/link";
import React, {useState} from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import httpClient from "@/common/utils/httpClient.util";
import { Switch, FormControlLabel, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { useAppDispatch } from "@/store/store";
import toast from "react-hot-toast";
import {createColorScheme} from "@/store/slices/color-scheme.slice"
import ConfirmationDialog from "@/components/ConfirmationDialog"
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import ColorLensIcon from '@mui/icons-material/ColorLens';

type Props = {

};

const AdminPanelAddColorScheme = ({ }: Props) => {
  const theme = useTheme();
  const router = useRouter();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('xs'));
  const dispatch = useAppDispatch();
  const initialValues : ColorSchemePayload = {
    id:"",
    nameTH: "",
    nameEN: "",
    hex:"",
  }
  const [addValue, setAddValue] = React.useState<ColorSchemePayload>(initialValues);
  
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleAdd =  () => {
    setShowConfirmation(true);
  }
 
  const handleConfirmAdd = async () => {
    if (addValue) {
      // console.log(selectedUser)
      
    const response = await dispatch(createColorScheme(addValue))
      if (response.meta.requestStatus === "fulfilled") {
        toast.success("เพิ่มข้อมูลสำเร็จ")
        router.push("/panel/admin/manage/color-scheme");        // router.push("/panel/user/manage-product");
      }else{
       toast.error("เพิ่มข้อมูลไม่สำเร็จ โปรดลองอีกครั้ง")
      }
    }

    setShowConfirmation(false);
  };
  
  const handleCancelAdd= () => {
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
                disabled={!isValid}
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                sx={{ marginRight: 1 }}
              >
                เพิ่ม
              </Button>
              <Button
                variant="outlined"
                fullWidth
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
                
                   เพิ่มข้อมูลโทนสีครามธรรมชาติ
                  </Typography>
                ) : (
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "bold",
                      alignSelf: "center",
                    }}
                  >
          
                   เพิ่มข้อมูลโทนสีครามธรรมชาติ
                  </Typography>
                )}
              </React.Fragment>
            </Paper>
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
          <Formik
        validate={(values) => {
          let errors: any = {};
          if (!values.id) errors.id = "กรุณากรอกรหัสประจำสี";
          if (!values.nameTH) errors.nameTH = "กรุณากรอกชื่อสีภาษาไทย";
          if (!values.nameEN) errors.nameEN = "กรุณากรอกชื่อสีภาษาอังกฤษ";
          if (!values.hex) errors.hex = "กรุณากรอก hex code";
          return errors;
        }}
        initialValues={initialValues}
        onSubmit={async (values, { setSubmitting }) => {
          setAddValue(values)
          handleAdd()
          setSubmitting(false);
        }}
      >
        {(props) => showForm(props)}
      </Formik>

          </Grid>
        </Grid>
      </Container>


   
      <ConfirmationDialog
        title="ยืนยันการเพิ่มข้อมูล"
        message="คุณต้องการเพิ่มข้อมูลใช่หรือไม่ ?"
        open={showConfirmation}
        onClose={handleCancelAdd}
        onConfirm={handleConfirmAdd}
      />
     
    </Layout>
  );
};

export default withAuth(AdminPanelAddColorScheme);
