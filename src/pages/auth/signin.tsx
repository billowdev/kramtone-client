import React, { useState } from 'react'
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, Box, InputAdornment, IconButton } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Formik, Form, Field, ErrorMessage, FormikProps, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import MainLayout from '@/components/Layouts/MainLayout';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { signIn } from "@/store/slices/auth.slice";
import { useAppDispatch } from "@/store/store";
import { useRouter } from "next/router";
import withAuth from './../../components/withAuth';

type Props = {}
interface FormValues {
  username: string;
  password: string;
  remember: boolean;
}


function SignInPage({ }: Props) {
  const dispatch = useAppDispatch();
  const paperStyle = { padding: 20, height: '73vh', width: 300, margin: "0 auto" }
  const avatarStyle = { backgroundColor: '#103D81', alginContent: 'center' }
  const btnstyle = { margin: '8px 0', }
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleMouseDownPassword = () => setPasswordVisible(!passwordVisible);

  const initialValues: FormValues = {
    username: '',
    password: '',
    remember: false
  }
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("กรุณากรอกชื่อผู้ใช้"),
    password: Yup.string().required("กรุณากรอกรหัสผ่าน")
  })
  const onSubmit = async (values: FormValues, props: FormikHelpers<FormValues>) => {
    const { username, password } = values;
    const response = await dispatch(signIn({ username, password }))
    if (response.meta.requestStatus === "rejected") {
      alert("Login was failed")
    } else {
      router.push("/panel");
    }
    setTimeout(() => {
      props.resetForm()
      props.setSubmitting(false)
    }, 2000)

  }

  const handlePasswordVisible = () => {
    setPasswordVisible(!passwordVisible);
  }

  return (
    <MainLayout>
      <Grid>
        <Paper style={paperStyle}>
          <Grid style={{ alignContent: 'center' }}>
            <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
            <h2>ลงชื่อเข้าใช้</h2>
            {/* <Typography variant="h5">ลงชื่อเข้าใช้งานระบบ</Typography> */}
          </Grid>
          <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {(props: FormikProps<FormValues>) => (
              <Form>
                <Field as={TextField} label='ชื่อผู้ใช้' name="username"
                  placeholder='กรอก ชื่อผู้ใช้' fullWidth required
                  helperText={<ErrorMessage name="username" />}
                />
                <Field as={TextField} label='รหัสผ่าน' name="password"
                  placeholder='กรอก รหัสผ่าน' type={passwordVisible ? "text" : "password"} fullWidth required
                  helperText={<ErrorMessage name="password" />}
                  InputProps={{ // <-- This is where the toggle button is added.
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handlePasswordVisible}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {passwordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />

                <Field as={FormControlLabel}
                  name='remember'
                  control={
                    <Checkbox
                      color='primary'
                    />
                  }
                  label="Remember me"
                />

                <Button type='submit' color='primary' variant="contained" disabled={props.isSubmitting}
                  style={btnstyle} fullWidth>{props.isSubmitting ? "Loading" : "ลงชื่อเข้าใช้"}</Button>

              </Form>
            )}
          </Formik>
          <Typography >
            <Link href="#" >
              ลืมรหัสผ่าน ?
            </Link>
          </Typography>

        </Paper>
      </Grid>
    </MainLayout>

  )
}

export default withAuth(SignInPage)