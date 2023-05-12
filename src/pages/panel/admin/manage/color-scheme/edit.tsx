import Layout from "@/components/Layouts/Layout";
import withAuth from "@/components/withAuth";
import { CategoryPayload } from "@/models/category.model";
// import { updateCategory } from "@/services/category.service";
import { updateColorScheme } from "@/store/slices/color-scheme.slice";
import { categoryImageURL } from "@/common/utils/utils";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
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
import {ColorSchemePayload} from "@/models/color-scheme.model"
import ConfirmationDialog from "@/components/ConfirmationDialog"

type Props = {
  colorScheme?: ColorSchemePayload;
  accessToken?: string;
};

const AdminPanelEditColorScheme = ({ colorScheme, accessToken}: Props) => {
  const router = useRouter();
  const [updateValue, setUpdateValue] = React.useState<ColorSchemePayload>(colorScheme!);
  const dispatch = useAppDispatch();



  const [showConfirmation, setShowConfirmation] = React.useState(false);

  const handleEdit =() => {
    setShowConfirmation(true);
  }
 
  const handleConfirmEdit = async () => {
    if (updateValue) {

    const response = await dispatch(updateColorScheme({colorSchemeId:colorScheme.id,updateValue, accessToken}))

      if (response.meta.requestStatus === "fulfilled") {
        toast.success("แก้ไขข้อมูลสำเร็จ")
        router.push("/panel/admin/manage/color-scheme");        // router.push("/panel/user/manage-product");
      }else{
        console.log(response)
       toast.error("เพิ่มข้อมูลไม่สำเร็จ โปรดลองอีกครั้ง")
      }
    }

    setShowConfirmation(false);
  };
  
  const handleCancelEdit= () => {
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
            <Typography gutterBottom variant="h3">
             แก้ไขข้อมูลโทนสีครามธรรมชาติ
            </Typography>

            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="id"
              type="text"
              label="รหัสประจำสี"
            />
            <br />

            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="nameTH"
              type="text"
              label="ชื่อสีภาษาไทย"
            />
            <br />
            
            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="nameEN"
              type="text"
              label="ชื่อสีภาษาอังกฤษ"
            />
            <br />
            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="hex"
              type="text"
              label="HEX CODE"
            />
            <br />
           
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
