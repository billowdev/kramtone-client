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
  InputAdornment,
  IconButton,
} from "@material-ui/core";
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
import { signIn } from "@/store/slices/auth.slice";
import { useAppDispatch } from "@/store/store";
import { useRouter } from "next/router";
import withAuth from "@/components/withAuth";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { useTheme } from "@material-ui/core/styles";
import { CustomTheme } from "@/pages/_app";
import { getOneGroupDataAction } from "@/store/slices/group-data.slice";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Card, CardContent, CardActions } from "@mui/material";

type Props = {};
interface FormValues {
  username: string;
  password: string;
  remember: boolean;
}

function SignInPage({}: Props) {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down("xs"));

  const paperStyle = {
    padding: isSmallDevice ? 0 : 16,
    height: "100vh",
    width: "auto",
    margin: "0 auto",
  };
  const avatarStyle = { backgroundColor: "#103D81", alginContent: "center" };
  // const btnstyle = { margin: '8px 0', }
  const btnstyle = {
    margin: "8px 0",
    backgroundColor: CustomTheme.palette.primary.main,
    color: "#fff",
    fontWeight: "bold",
    // boxShadow: `0px 1px 5px ${Theme.palette.primary.dark}`,
    boxShadow: `0px 5px 10px rgba(0, 0, 0, 0.3)`,
  };

  const secondBtnstyle = {
    margin: "8px 0",
    backgroundColor: CustomTheme.palette.common.white,
    color: CustomTheme.palette.secondary.dark,
    fontWeight: "bold",
    // boxShadow: `0px 1px 5px ${Theme.palette.primary.dark}`,
    boxShadow: `0px 5px 10px rgba(0, 0, 0, 0.3)`,
  };

  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleMouseDownPassword = () => setPasswordVisible(!passwordVisible);

  const initialValues: FormValues = {
    username: "",
    password: "",
    remember: false,
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("กรุณากรอกชื่อผู้ใช้"),
    password: Yup.string().required("กรุณากรอกรหัสผ่าน"),
  });
  const onSubmit = async (
    values: FormValues,
    props: FormikHelpers<FormValues>
  ) => {
    const { username, password } = values;
    const response = await dispatch(signIn({ username, password }));

    if (response.meta.requestStatus === "rejected") {
      toast.error("เข้าสู่ระบบไม่สำเร็จ");
    } else {
      // router.push("/panel");
      if (response.payload.user.role === "member") {
        dispatch(getOneGroupDataAction(response.payload.user.groupId));
        router.push("/panel/user/manage-group", undefined, { shallow: false });
      } else {
        router.push("/panel", undefined, { shallow: false });
      }
    }
    setTimeout(() => {
      props.resetForm();
      props.setSubmitting(false);
    }, 2000);
  };

  const handlePasswordVisible = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <MainLayout>
      <Grid container>
        <Paper style={paperStyle}>
          <Grid container spacing={2}>
          <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Image
              src={`/static/img/logo-white.png`}
              alt={`logo image`}
              width={isSmallDevice ? 250 : 350}
              height={isSmallDevice ? 250 : 350}
              loading="lazy"
            />
          </div>
        </Grid>

            <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
              <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
              >
                {(props: FormikProps<FormValues>) => (
                  <Form>
                    <Card sx={{ background: 'none', boxShadow: 'none' }}>
                      <CardContent sx={{ padding: 4 }}>
                        <Typography
                          variant="h5"
                          style={{
                            fontWeight: "bold",
                            textAlign: "center",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: 30,
                          }}
                        >
                          ลงชื่อเข้าใช้
                        </Typography>
                        <Field
                          as={TextField}
                          label="ชื่อผู้ใช้"
                          name="username"
                          placeholder="กรอก ชื่อผู้ใช้"
                          fullWidth
                          required
                          helperText={<ErrorMessage name="username" />}
                        />
                        <Field
                          as={TextField}
                          label="รหัสผ่าน"
                          name="password"
                          placeholder="กรอก รหัสผ่าน"
                          type={passwordVisible ? "text" : "password"}
                          fullWidth
                          required
                          helperText={<ErrorMessage name="password" />}
                          InputProps={{
                            // <-- This is where the toggle button is added.
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

                        <Field
                          as={FormControlLabel}
                          name="remember"
                          control={<Checkbox color="primary" />}
                          label="จดจำรหัสผ่าน"
                        />

                        <Typography>
                          <Link href="#">ลืมรหัสผ่าน ?</Link>
                        </Typography>
                      </CardContent>

                      <CardActions>
                        <Button
                          type="button"
                          color="secondary"
                          variant="contained"
                          style={secondBtnstyle}
                          fullWidth
                        >
                          {"สมัครสมาชิก"}
                        </Button>

                        <Button
                          type="submit"
                          color="primary"
                          variant="contained"
                          disabled={props.isSubmitting}
                          style={btnstyle}
                          fullWidth
                        >
                          {props.isSubmitting
                            ? "กำลังเข้าสู่ระบบ..."
                            : "เข้าสู่ระบบ"}
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
    </MainLayout>
  );
}

export default withAuth(SignInPage);
