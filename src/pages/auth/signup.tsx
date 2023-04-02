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
import { makeStyles } from "@material-ui/core/styles";

type Props = {};
interface FormValues {
  username: string;
  password: string;
  remember: boolean;
}

function SignUpPage({}: Props) {
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

  const btnStyle = {
    backgroundColor: CustomTheme.palette.primary.main,
    color: "#fff",
    fontWeight: "bold",
    boxShadow: `0px 5px 10px rgba(0, 0, 0, 0.3)`,
  };

  const secondBtnstyle = {
	marginRight: "8px",
    backgroundColor: CustomTheme.palette.common.white,
    color: CustomTheme.palette.secondary.dark,
    fontWeight: "bold",
	width: "100%",
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
  const useStyles = makeStyles({
    errorMessage: {
      color: "red",
    },
  });

  const classes = useStyles();
  const errorStyle = {
    color: "red",
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(
        4,
        <span style={errorStyle}>ชื่อผู้ใช้ต้องมีอย่างน้อย 4 ตัวอักษร</span>
      )
      .max(
        64,
        <span style={errorStyle}>ชื่อผู้ใช้ต้องมีไม่เกิน 64 ตัวอักษร</span>
      )
      .required(<span style={errorStyle}>กรุณากรอกชื่อผู้ใช้</span>),
    name: Yup.string()
      .required(<span style={errorStyle}>กรุณากรอกชื่อ</span>)
      .max(
        100,
        <span style={errorStyle}>ชื่อต้องมีความยาวไม่เกิน 100 ตัวอักษร</span>
      )
      .trim(),
    surname: Yup.string()
      .required(<span style={errorStyle}>กรุณากรอกนามสกุล</span>)
      .max(
        100,
        <span style={errorStyle}>นามสกุลต้องมีความยาวไม่เกิน 100 ตัวอักษร</span>
      ),
    email: Yup.string()
      .required(<span style={errorStyle}>กรุณากรอกอีเมล</span>)
      .max(
        120,
        <span style={errorStyle}>อีเมลต้องมีความยาวไม่เกิน 120 ตัวอักษร</span>
      ),
    phone: Yup.string()
      .max(
        10,
        <span style={errorStyle}>เบอร์โทรต้องมีไม่เกิน 10 ตัวอักษร</span>
      )
      .required(<span style={errorStyle}>กรุณากรอกเบอร์โทร</span>),
    password: Yup.string()
      .required(<span style={errorStyle}>กรุณากรอกรหัสผ่าน</span>)
      .min(
        6,
        <span style={errorStyle}>
          รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร
        </span>
      ),
    passwordConfirmation: Yup.string()
      .required(<span style={errorStyle}>กรุณากรอกรหัสผ่าน</span>)
      .test(
        "passwords-match",
        <span style={errorStyle}>รหัสผ่านไม่ตรงกัน</span>,
        function (value) {
          return this.parent.password === value;
        }
      ),
  });

  const onSubmit = async (
    values: FormValues,
    props: FormikHelpers<FormValues>
  ) => {
    const { username, password } = values;
    const response = await dispatch(signIn({ username, password }));

    if (response.meta.requestStatus === "rejected") {
      toast.error("สมัครสมาชิกไม่สำเร็จ");
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
              <div style={{ display: "flex", justifyContent: "center" }}>
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
                    <Card sx={{ background: "none", boxShadow: "none" }}>
                      <CardContent sx={{ padding: 4 }}>
                        <Typography
                          variant="h5"
                          style={{
                            fontWeight: "bold",
                            textAlign: "center",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: 24,
                            marginBottom: 24,
                          }}
                        >
                          สมัครสมาชิก
                        </Typography>
                        {/* 				
						<Field
                          as={TextField}
                          label="ชื่อ"
                          name="name"
                          placeholder="กรุณากรอกชื่อ"
                          fullWidth
                          required
						helperText={<ErrorMessage name="name" />}
                        /> */}

                        <Field
                          as={TextField}
                          label="ชื่อ"
                          name="name"
                          placeholder="กรุณากรอกชื่อ"
                          fullWidth
                          required
                          helperText={<ErrorMessage name="name" />}
                        />

                        <Field
                          as={TextField}
                          label="นามสกุล"
                          name="surname"
                          placeholder="กรุณากรอกนามสกุล"
                          fullWidth
                          required
                          helperText={<ErrorMessage name="surname" />}
                        />

                        <Field
                          as={TextField}
                          label="เบอร์โทร"
                          name="phone"
                          placeholder="กรุณากรอกเบอร์โทร"
                          fullWidth
                          required
                          helperText={<ErrorMessage name="phone" />}
                        />

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
                          as={TextField}
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
                      </CardContent>

                      <CardActions style={{ display: "flex", justifyContent: "space-between" }}>
						
				<Link href="/auth/signin" style={{display:'contents'}} >
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
                          disabled={props.isSubmitting}
                          style={btnStyle}
                          fullWidth
                        >
                          {props.isSubmitting
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
    </MainLayout>
  );
}

export default withAuth(SignUpPage);
