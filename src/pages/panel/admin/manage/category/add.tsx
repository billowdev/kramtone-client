import Layout from "@/components/Layouts/Layout";
import withAuth from "@/components/withAuth";
import { CategoryPayload } from "@/models/category.model";
// import { updateCategory } from "@/services/category.service";
import { createCategoryAction } from "@/store/slices/category.slice";
import { categoryImageURL } from "@/common/utils/utils";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
  Container,
  Paper,
  Box,
  FormLabel,
} from "@mui/material";
import { Field, Form, Formik, FormikProps } from "formik";
import { TextField } from "formik-material-ui";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import httpClient from "@/common/utils/httpClient.util";
import {
  Switch,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import { useAppDispatch } from "@/store/store";
import toast from "react-hot-toast";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CheckroomIcon from "@mui/icons-material/Checkroom";

type Props = {
  // category?: CategoryPayload;
  accessToken?: string;
};

const AdminPanelAddCategory = ({ accessToken }: Props) => {
  const router = useRouter();
  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down("xs"));

  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  // const [imageFile, setImageFile] = React.useState<any | Blob>("")
  // const [imageObj, setImageObj] = React.useState<URL | string>("")
  const dispatch = useAppDispatch();
  const initialValues: CategoryPayload = {
    id: "",
    name: "",
    desc: "",
    // image: "default_image.png",
    // image_file: "",
    // image_obj : "",
  };
  const [addValue, setAddValue] =
    React.useState<CategoryPayload>(initialValues);
  const showForm = ({
    values,
    setFieldValue,
    isValid,
  }: FormikProps<CategoryPayload>) => {
    return (
      <Form>
        <Card>
          <CardContent sx={{ padding: 4 }}>
       
            <Grid item md={6}>
              <Box style={{ marginTop: 0 }}>
                <FormLabel htmlFor="name" style={{ fontWeight: "bold" }}>
                  ชื่อประเภทสินค้า
                  <span style={{ color: "red" }}>*</span>
                </FormLabel>
                <Field
                  style={{ marginTop: 8 }}
                  fullWidth
                  component={TextField}
                  name="name"
                  type="text"
                  label="กรุณากรอก ชื่อประเภทสินค้า"
                />
              </Box>
            </Grid>
            <Grid item md={6}>
              <Box style={{ marginTop: 16 }}>
                <FormLabel htmlFor="desc" style={{ fontWeight: "bold" }}>
                  รายละเอียดประเภทสินค้า
                </FormLabel>
                <Field
                  style={{ marginTop: 8 }}
                  fullWidth
                  component={TextField}
                  name="desc"
                  type="string"
                  label="กรุณากรอก รายละเอียดประเภทสินค้า"
                />
              </Box>
            </Grid>
            {/* <div style={{ margin: 16 }}>{showPreviewImage(values)}</div>

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
                  setFieldValue("image_file", e.target.files[0]); // for upload
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
            </div> */}
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
            <Link href="/panel/admin/manage/category" passHref>
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
    if (addValue) {
      let data = new FormData();

      // if (imageFile!="") {
      //   data.append("image", imageFile);
      // }
      // data.append("id", String(addValue.id));
      data.append("name", String(addValue.name));
      data.append("desc", String(addValue.desc));

      const createStatus = await dispatch(
        createCategoryAction({ body: data, accessToken })
      );

      if (createStatus.meta.requestStatus === "fulfilled") {
        toast.success("เพิ่มข้อมูลประเภทสินค้าสำเร็จ");
        router.push("/panel/admin/manage/category");
      } else {
        toast.error("เพิ่มข้อมูลประเภทสินค้าไม่สำเร็จ โปรดลองอีกครั้ง");
      }
      setOpenDialog(false);
    }
  };

  const showDialog = () => {
    if (addValue === null) {
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
          เพิ่มข้อมูล : {addValue?.name} ?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            คุณต้องการเพิ่มข้อมูลใช่หรือไม่
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleEditConfirm}
            color="primary"
          >
            เพิ่ม
          </Button>
          <Button
            variant="outlined"
            onClick={() => setOpenDialog(false)}
            color="info"
          >
            ยกเลิก
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  // const showPreviewImage = (values: any) => {
  //   if (values.image_obj) {
  //     return (
  //       <Image
  //         // objectFit="contain"
  //         alt="รูปภาพประเภทสินค้า"
  //         src={values.image_obj}
  //         width={250}
  //         height={250}
  //       />
  //     );
  //   } else if (values.image) {
  //     return (
  //       <Image
  //         // objectFit="contain"
  //         alt="รูปภาพประเภทสินค้า"
  //         src={categoryImageURL(values.image)}
  //         width={250}
  //         height={250}
  //       />
  //     );
  //   }
  // };

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper
              sx={{ p: 2, display: "flex", flexDirection: "row", gap: "16px" }}
            >
              {isSmallDevice ? (
                <CheckroomIcon sx={{ fontSize: "1.5rem", marginLeft: "8px" }} />
              ) : (
                <CheckroomIcon
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
                    {" "}
                    เพิ่มข้อมูลประเภทสินค้า
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
                    เพิ่มข้อมูลประเภทสินค้า
                  </Typography>
                )}
              </React.Fragment>
            </Paper>
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <Formik
              validate={(values) => {
                let errors: any = {};
                if (!values.name) errors.name = "กรุณากรอกชื่อประเภทสินค้า";
                return errors;
              }}
              initialValues={initialValues}
              onSubmit={async (values, { setSubmitting }) => {
                setAddValue(values);
                // setImageFile(values.image_file)
                setOpenDialog(true);
                setSubmitting(false);
              }}
            >
              {(props) => showForm(props)}
            </Formik>
          </Grid>
        </Grid>
      </Container>

      {showDialog()}
    </Layout>
  );
};

export default withAuth(AdminPanelAddCategory);

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const accessToken = context.req.cookies["access_token"];
  if (accessToken) {
    return {
      props: {
        accessToken,
      },
    };
  } else {
    return { props: {} };
  }
};
