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
  Grid,
  Box,
  FormLabel,
  Container,
  Paper,
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
import ConfirmationDialog from "@/components/ConfirmationDialog";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

type Props = {
  category?: CategoryPayload;
  accessToken?: string;
};

const AdminPanelEditCategory = ({ category, accessToken }: Props) => {
  const router = useRouter();
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down("xs"));


  const [updateValue, setUpdateValue] = React.useState<CategoryPayload>(
    category!
  );
  const dispatch = useAppDispatch();
  // const [imageFile, setImageFile] = React.useState<any | Blob>("")
  // const [imageObj, setImageObj] = React.useState<URL | string>("")

  // const [showConfirmation, setShowConfirmation] = React.useState(false);

  // const handleEdit = () => {
  //   setShowConfirmation(true);
  // }

  // const handleConfirmEdit = async () => {
  //   if (updateValue && colorScheme?.id) {
  //     const colorSchemeId = colorScheme.id
  //     const response = await dispatch(updateColorScheme({ colorSchemeId, updateValue, accessToken }))

  //     if (response.meta.requestStatus === "fulfilled") {
  //       toast.success("แก้ไขข้อมูลสำเร็จ")
  //       router.push("/panel/admin/manage/color-scheme");        // router.push("/panel/user/manage-product");
  //     } else {
  //       console.log(response)
  //       toast.error("เพิ่มข้อมูลไม่สำเร็จ โปรดลองอีกครั้ง")
  //     }
  //   }

  //   setShowConfirmation(false);
  // };

  // const handleCancelEdit = () => {
  //   setShowConfirmation(false);
  // };

  const showForm = ({
    values,
    setFieldValue,
    isValid,
  }: FormikProps<CategoryPayload>) => {
    return (
      <Form>
        <Card>
          <CardContent sx={{ padding: 4 }}>
            {/* <Typography gutterBottom variant="h3">
              แก้ไขข้อมูลประเภทสินค้า
            </Typography> */}

            <Grid item md={6}>
              <Box style={{ marginTop: 16 }}>
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
              แก้ไข
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
    if (category) {
      // let data = new FormData();

      // if (imageFile!="") {
      //   data.append("image", imageFile);
      // }
      // data.append("id", String(updateValue.id));
      // data.append("name", String(updateValue.name));
      // data.append("desc", String(updateValue.desc));
      const body = { name: updateValue.name, desc: updateValue.desc }
      const updateStatus = await dispatch(
        updateCategoryAction({ id: updateValue.id, body, accessToken })
      );

      if (updateStatus.meta.requestStatus === "fulfilled") {
        toast.success("แก้ไขข้อมูลประเภทสินค้าสำเร็จ");
        router.push("/panel/admin/manage/category");
      } else {
        toast.error("แก้ไขข้อมูลประเภทสินค้าไม่สำเร็จ โปรดลองอีกครั้ง");
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
          แก้ไขข้อมูล? : {category?.name}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            คุณต้องการแก้ไขข้อมูลใช่หรือไม่ ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleEditConfirm}
            color="primary"
          >
            แก้ไข
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
  //   if (values?.image_obj) {
  //     return (
  //       <Image
  //         // objectFit="contain"
  //         alt="รูปภาพประเภทสินค้า"
  //         src={values?.image_obj}
  //         width={250}
  //         height={250}
  //       />
  //     );
  //   } else if (values?.image) {
  //     return (
  //       <Image
  //         // objectFit="contain"
  //         alt="รูปภาพประเภทสินค้า"
  //         src={categoryImageURL(values?.image)}
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
                    แก้ไขข้อมูลประเภทสินค้า
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
                    แก้ไขข้อมูลประเภทสินค้า
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
              initialValues={category!}
              onSubmit={async (values, { setSubmitting }) => {
                setUpdateValue(values);
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

export default withAuth(AdminPanelEditCategory);

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id }: any = context.query;

  if (id) {
    const accessToken = context.req.cookies["access_token"];
    const { data: response } = await httpClient.get(`/categories/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      baseURL: process.env.NEXT_PUBLIC_BASE_URL_API,
    });

    const category = response.payload;
    return {
      props: {
        category,
        accessToken,
      },
    };
  } else {
    return { props: {} };
  }
};
