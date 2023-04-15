import Layout from "@/components/Layouts/Layout";
import withAuth from "@/components/withAuth";
import { CategoryPayload } from "@/models/category.model";
// import { updateCategory } from "@/services/category.service";
import { updateCategoryAction } from "@/store/slices/category.slice";
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



type Props = {
  category?: CategoryPayload;
  accessToken?: string;
};

const UserPanelEditCategory = ({ category, accessToken}: Props) => {
  const router = useRouter();
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const [updateValue, setUpdateValue] = React.useState<CategoryPayload>(category);
  const dispatch = useAppDispatch();

  const showForm = ({
    values,
    setFieldValue,
    isValid,
  }: FormikProps<CategoryPayload>) => {
    return (
      <Form>
        <Card>
          <CardContent sx={{ padding: 4 }}>
            <Typography gutterBottom variant="h3">
             แก้ไขข้อมูลประเภทสินค้า
            </Typography>

            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="name"
              type="text"
              label="ชื่อประเภทสินค้า"
            />
            <br />
            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="desc"
              type="string"
              label="รายละเอียดประเภทสินค้า"
            />

            <div style={{ margin: 16 }}>{showPreviewImage(values)}</div>

            <div>
              <Image
                objectFit="cover"
                alt="category image"
                src="/static/img/default.png"
                width={25}
                height={20}
              />
              <span style={{ color: "#00B0CD", marginLeft: 10 }}>
               เพิ่มรูปภาพ
              </span>

              <input
                type="file"
                onChange={(e: React.ChangeEvent<any>) => {
                  e.preventDefault();
                  setFieldValue("file", e.target.files[0]); // for upload
                  setFieldValue(
                    "image_obj",
                    URL.createObjectURL(e.target.files[0])
                  ); // for preview image
                }}
                name="image"
                click-type="type1"
                multiple
                accept="image/*"
                id="files"
                style={{ padding: "20px 0 0 20px" }}
              />
            </div>
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
            <Link href="/panel/user/manage-category" passHref>
              <Button variant="outlined" fullWidth>
                ยกเลิก
              </Button>
            </Link>
          </CardActions>
        </Card>
      </Form>
    );
  };

  const handleEditConfirm = async () => {
    if (category) {
           
      let data = new FormData();
      // data.append("id", String(updateValue.id));
      data.append("name", String(updateValue.name));
      data.append("desc", String(updateValue.desc));
      if (updateValue.image) {
        data.append("image", updateValue.image);
      }

      const updateStatus = await dispatch(updateCategoryAction({id:updateValue.id, body:data, accessToken}))

      if (updateStatus.meta.requestStatus === "fulfilled") {
        toast.success("แก้ไขข้อมูลประเภทสินค้าสำเร็จ")
        router.push("/panel/manage-category");
      }else{
        toast.error("แก้ไขข้อมูลประเภทสินค้าไม่สำเร็จ โปรดลองอีกครั้ง")
      }
      setOpenDialog(false);
    }
  };

  const showDialog = () => {
    if (category === null) {
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
          <br />
          คุณต้องการแก้ไขข้อมูลใช่หรือไม่? : {category.name}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          การแก้ไขข้อมูลโหนดอาจจะกระทบกับระบบนำทาง
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="info">
            ยกเลิก
          </Button>
          <Button onClick={handleEditConfirm} color="primary">
            แก้ไข
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const showPreviewImage = (values: any) => {
    if (values.image_obj) {
      return (
        <Image
          // objectFit="contain"
          alt="รูปภาพประเภทสินค้า"
          src={values.image_obj}
          width={100}
          height={100}
        />
      );
    } else if (values.image) {
      return (
        <Image
          // objectFit="contain"
          alt="รูปภาพประเภทสินค้า"
          src={categoryImageURL(values.image)}
          width={100}
          height={100}
        />
      );
    }
  };

  return (
    <Layout>
      <Formik
        validate={(values) => {
          let errors: any = {};
          if (!values.name) errors.name = "กรุณากรอกชื่อประเภทสินค้า";
          return errors;
        }}
        initialValues={category!}
        onSubmit={async (values, { setSubmitting }) => {
          setUpdateValue(values)
          setOpenDialog(true);
          setSubmitting(false);
        }}
      >
        {(props) => showForm(props)}
      </Formik>
      {showDialog()}
    </Layout>
  );
};

export default withAuth(UserPanelEditCategory);

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id }: any = context.query;
  
  if (id) {
    const accessToken = context.req.cookies['access_token']
    const { data: response } = await httpClient.get(`/categories/${id}`, {
	headers: {
			Authorization: `Bearer ${accessToken}`
		},
		baseURL: process.env.NEXT_PUBLIC_BASE_URL_API
    });

    
    const category = response.payload
    return {
      props: {
        category,
        accessToken
      },
    };
  } else {
    return { props: {} };
  }
};
