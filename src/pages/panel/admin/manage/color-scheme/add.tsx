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

type Props = {

};

const AdminPanelAddColorScheme = ({ }: Props) => {
  const router = useRouter();

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
            <Typography gutterBottom variant="h3">
             เพิ่มข้อมูลโทนสีครามธรรมชาติ
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
            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="hex"
              type="text"
              label="HEX CODE"
            />
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
