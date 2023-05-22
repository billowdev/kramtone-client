import React, { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
  Box,
  InputLabel,
  InputAdornment,
  IconButton,
  FormLabel,
} from "@mui/material";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FormikProps,
  FormikHelpers,
} from "formik";
import * as Yup from "yup";
import MainLayout from "@/components/MainLayout";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { signIn, signUp } from "@/store/slices/auth.slice";
import { useAppDispatch } from "@/store/store";
import { useRouter } from "next/router";
import withAuth from "@/components/withAuth";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { useTheme } from "@material-ui/core/styles";

import { getOneGroupDataAction } from "@/store/slices/group-data.slice";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Card, CardContent, CardActions } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import ReactDOMServer from "react-dom/server";

type Props = {};

interface FormValues {
  name: string;
  surname: string;
  phone: string;
  username: string;
  password: string;
  passwordConfirmation: string;
}

const initialValues: FormValues = {
  name: "",
  surname: "",
  phone: "",
  username: "",
  password: "",
  passwordConfirmation: "",
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("กรุณากรอกชื่อ"),
  surname: Yup.string().required("กรุณากรอกนามสกุล"),
  phone: Yup.string().required("กรุณากรอกเบอร์โทร"),
  username: Yup.string().required("กรุณากรอกชื่อผู้ใช้"),
  password: Yup.string().required("กรุณากรอกรหัสผ่าน"),
  passwordConfirmation: Yup.string()
    .required("กรุณากรอกรหัสผ่านอีกครั้ง")
    .oneOf([Yup.ref("password")], "รหัสผ่านไม่ตรงกัน"),
});

function SignUpPage({ }: Props) {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const isSmallDevice = useMediaQuery(theme.breakpoints.down("xs"));

  const handlePasswordVisible = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const onSubmit = async (
    values: FormValues,
    helpers: FormikHelpers<FormValues>
  ) => {
    // Handle form submission
    const response = await dispatch(signUp(values));

    if (response.meta.requestStatus === "rejected") {
      toast.error("สมัครสมาชิกไม่สำเร็จ");
    } else {
      toast.success("สมัครสมาชิกสำเร็จ");
      const { username, password } = values;
      const response = await dispatch(signIn({ username, password }));

      if (response.meta.requestStatus === "rejected") {
        toast.error("เข้าสู่ระบบไม่สำเร็จ");
      } else {
        // router.push("/panel");
        if (response.payload.user.role === "admin") {
          router.push("/panel/admin", undefined, { shallow: false });
        } else {
          dispatch(getOneGroupDataAction(response.payload.user.groupId));
          router.push("/panel/user/manage-group", undefined, {
            shallow: false,
          });
        }
      }
      setTimeout(() => {
        helpers.resetForm();
        helpers.setSubmitting(false);
      }, 2000);
    }
  };

  const avatarStyle = { backgroundColor: "#103D81", alginContent: "center" };
  const btnStyle = {
    margin: "8px 0",
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    fontWeight: "bold",
    // boxShadow: `0px 1px 5px ${Theme.palette.primary.dark}`,
    boxShadow: `0px 5px 10px rgba(0, 0, 0, 0.3)`,
  };

  const secondBtnstyle = {
    margin: "8px 0",
    backgroundColor: theme.palette.common.white,
    color: theme.palette.secondary.dark,
    fontWeight: "bold",
    marginRight: "8px",
    // boxShadow: `0px 1px 5px ${Theme.palette.primary.dark}`,
    boxShadow: `0px 5px 10px rgba(0, 0, 0, 0.3)`,
  };
  return (
    <MainLayout>
      <Box style={{ padding: 4 }}>
        <Grid container justifyContent="center">
          <Paper elevation={6} style={{
            padding: isSmallDevice ? 0 : 16,
            marginBottom: 64,
            marginTop: 32,
            // height: isSmallDevice ? "" : "100vh",
            minHeight: "768",
            width: "auto",
            overflow: 'inherit'
          }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Image
                    src="/static/img/logo-white.png"
                    alt="logo image"
                    width={250}
                    height={250}
                    loading="lazy"
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Formik
                  initialValues={initialValues}
                  onSubmit={onSubmit}
                  validationSchema={validationSchema}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <Card
                        style={{
                          background: "none",
                          boxShadow: "none",
                          marginRight: isSmallDevice ? 0 : 24,
                        }}
                      >
                        <CardContent sx={{ padding: 1 }}>
                          <Typography
                            variant="h5"
                            style={{
                              fontWeight: "bold",
                              textAlign: "center",
                              marginTop: 3,
                              marginBottom: 3,
                            }}
                          >
                            สมัครสมาชิก
                          </Typography>

                          <Box style={{ marginTop: 16 }}>
                            <FormLabel
                              htmlFor="name"
                              style={{ fontWeight: "bold" }}
                            >
                              ชื่อ
                              <span style={{ color: "red" }}>*</span>
                            </FormLabel>

                            <Field
                              style={{ marginTop: 8 }}
                              as={TextField}
                              label="กรุณากรอก ชื่อ"
                              name="name"
                              placeholder="กรุณากรอก ชื่อ"
                              fullWidth
                              required
                              maxLength="80"
                              helperText={<ErrorMessage name="name" />}
                            />
                          </Box>

                          <Box style={{ marginTop: 16 }}>
                            <FormLabel
                              htmlFor="name"
                              style={{ fontWeight: "bold" }}
                            >
                              นามสกุล
                              <span style={{ color: "red" }}>*</span>
                            </FormLabel>

                            <Field
                              style={{ marginTop: 8 }}
                              as={TextField}
                              label="กรุณากรอก นามสกุล"
                              name="surname"
                              placeholder="กรุณากรอกนามสกุล"
                              fullWidth
                              maxLength="80"
                              required
                              helperText={<ErrorMessage name="surname" />}
                            />
                          </Box>

                          <Box style={{ marginTop: 16 }}>
                            <FormLabel
                              htmlFor="name"
                              style={{ fontWeight: "bold" }}
                            >
                              เบอร์โทร
                              <span style={{ color: "red" }}>*</span>
                            </FormLabel>

                            <Field
                              style={{ marginTop: 8 }}
                              as={TextField}
                              label="กรุณากรอก เบอร์โทร"
                              name="phone"
                              maxLength="10"
                              placeholder="กรุณากรอกเบอร์โทร"
                              fullWidth
                              required
                              helperText={<ErrorMessage name="phone" />}
                            />
                          </Box>

                          <Box style={{ marginTop: 16 }}>
                            <FormLabel
                              htmlFor="email"
                              style={{ fontWeight: "bold" }}
                            >
                              อีเมล
                            </FormLabel>

                            <Field
                              style={{ marginTop: 8 }}
                              as={TextField}
                              label="กรุณากรอก อีเมล"
                              name="email"
                              maxLength="120"
                              placeholder="กรอก อีเมล"
                              fullWidth
                              helperText={<ErrorMessage name="email" />}
                            />
                          </Box>

                          <Box style={{ marginTop: 16 }}>
                            <FormLabel
                              htmlFor="name"
                              style={{ fontWeight: "bold" }}
                            >
                              ชื่อผู้ใช้
                              <span style={{ color: "red" }}>*</span>
                            </FormLabel>

                            <Field
                              style={{ marginTop: 8 }}
                              as={TextField}
                              maxLength={64}
                              label="กรุณากรอก ชื่อผู้ใช้"
                              name="username"
                              placeholder="กรอก ชื่อผู้ใช้"
                              fullWidth
                              required
                              helperText={<ErrorMessage name="username" />}
                            />
                          </Box>
                          <Box style={{ marginTop: 16 }}>
                            <FormLabel
                              htmlFor="name"
                              style={{ fontWeight: "bold" }}
                            >
                              รหัสผ่าน
                              <span style={{ color: "red" }}>*</span>
                            </FormLabel>

                            <Field
                              style={{ marginTop: 8 }}
                              as={TextField}
                              maxLength="64"
                              label="กรุณากรอก รหัสผ่าน"
                              name="password"
                              placeholder="กรอก รหัสผ่าน"
                              type={passwordVisible ? "text" : "password"}
                              fullWidth
                              required
                              helperText={<ErrorMessage name="password" />}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handlePasswordVisible}
                                      onMouseDown={handleMouseDownPassword}
                                    >
                                      {passwordVisible ? (
                                        <VisibilityOffIcon />
                                      ) : (
                                        <VisibilityIcon />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Box>

                          <Box style={{ marginTop: 16 }}>
                            <FormLabel
                              htmlFor="name"
                              style={{ fontWeight: "bold" }}
                            >
                              ยืนยันรหัสผ่าน
                              <span style={{ color: "red" }}>*</span>
                            </FormLabel>

                            <Field
                              style={{ marginTop: 8 }}
                              as={TextField}
                              maxLength={64}
                              label="ยืนยันรหัสผ่าน"
                              name="passwordConfirmation"
                              placeholder="กรอกรหัสผ่านอีกครั้ง"
                              type={passwordVisible ? "text" : "password"}
                              fullWidth
                              required
                              helperText={
                                <ErrorMessage name="passwordConfirmation" />
                              }
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handlePasswordVisible}
                                      onMouseDown={handleMouseDownPassword}
                                    >
                                      {passwordVisible ? (
                                        <VisibilityOffIcon />
                                      ) : (
                                        <VisibilityIcon />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Box>
                        </CardContent>
                        <CardActions
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Link
                            href="/auth/signin"
                            style={{ display: "contents" }}
                          >
                            <Button
                              type="button"
                              color="secondary"
                              variant="contained"
                              style={secondBtnstyle}
                              fullWidth
                            >
                              {"เข้าสู่ระบบ"}
                            </Button>
                          </Link>
                          <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                            disabled={isSubmitting}
                            style={btnStyle}
                            fullWidth
                          >
                            {isSubmitting
                              ? "กำลังสมัครสมาชิก..."
                              : "สมัครสมาชิก"}
                          </Button>
                        </CardActions>
                      </Card>
                    </Form>
                  )}
                </Formik>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Box>
    </MainLayout>
  );
}

export default withAuth(SignUpPage);
