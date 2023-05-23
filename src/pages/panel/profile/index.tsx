import React from 'react'
import Layout from '@/components/Layouts/Layout';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

import * as authService from '@/services/auth.service';
import { UserPayload } from '@/models/auth.model';
import TextField from '@material-ui/core/TextField';
import toast from "react-hot-toast";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import SettingsIcon from '@mui/icons-material/Settings';


import { Container, Grid, Paper } from '@mui/material';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Swal from 'sweetalert2';
import PersonIcon from '@mui/icons-material/Person';
import { Formik, Form, Field } from 'formik';
import { useAppDispatch } from "@/store/store";
import { updateUserProfileAction } from "@/store/slices/auth.slice";
import { Card, CardContent, CardActions, Typography, Button, FormLabel, Box } from "@mui/material";
import Link from "next/link"
import httpClient from '@/common/utils/httpClient.util';
import { GetStaticProps } from 'next';

import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number },
) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  input: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
  loader: {
    margin: 'auto',
  },
}));

interface Props {
  // id: string;
  // accessToken: string;
}

function UserPanelProfile({
  // accessToken, id, userData
}: Props) {
  const theme = useTheme();
  const classes = useStyles();
  // const dispatch = useAppDispatch();
  const router = useRouter();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('xs'));
  const [updateValue, setUpdateValue] = React.useState<any>(null);
  const [userPayload, setUserPayload] = useState<UserPayload>({
    id: "",
    username: "",
    email: "",
    name: "",
    surname: "",
    phone: "",
    groupId: "",

  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: response } = await httpClient.get(`/users/me`, {
          baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API
        },
        );
        // console.log(response.payload)
        setUserPayload(response.payload);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);


  const [password, setPassword] = React.useState('');
  const [oldPassword, setOldPassword] = React.useState('');
  const [passwordConfirmation, setPasswordConfirmation] = React.useState('');
  const [isPasswordValid, setIsPasswordValid] = React.useState(true);

  // const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const validatePassword = () => {
    // if (!passwordRegex.test(password)) {
    //   toast.error('รหัสผ่านต้องประกอบด้วยตัวอักษรและตัวเลข อย่างน้อย 8 ตัว');
    //   return false;
    // }

    const isValid = password === passwordConfirmation;
    setIsPasswordValid(isValid);

    if (!isValid) {
      toast.error('The new password and confirmation do not match.');
    }

    return isValid;
  };


  const [showConfirmation, setShowConfirmation] = React.useState(false);

  const handleEdit = () => {
    setShowConfirmation(true);
  };

  const handleConfirmEdit = async () => {
    const { id, name, surname, phone, email } = updateValue
    // const response = await authService.updateUserById(id, { name, surname, phone, email });
    if (oldPassword && password) {
      if (!validatePassword()) {
        toast.error('ผิดพลาดรหัสผ่านไม่ตรงกัน')
        setShowConfirmation(false);
        return;
      }
      const { data: response } = await httpClient.patch(`/users/update/${id}`, { name, surname, phone, email, oldPassword, password }, {
        baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
      });
      if (response.status === 400) {
        toast.error('ผิดพลาดขณะ แก้ไขข้อมูลโปรไฟล์')
      } else {
        toast.success('แก้ไขข้อมูลโปรไฟล์สำเร็จ')
      }

    }
    else {
      const { data: response } = await httpClient.patch(`/users/update/${id}`, { name, surname, phone, email }, {
        baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
      });
      if (response.status === 400) {
        toast.error('ผิดพลาดขณะ แก้ไขข้อมูลโปรไฟล์')
      } else {
        toast.success('แก้ไขข้อมูลโปรไฟล์สำเร็จ')
      }
    }
    setShowConfirmation(false);
  };

  const handleCancelEdit = () => {
    setShowConfirmation(false);
  };

  const [progress, setProgress] = React.useState(10);

  if (loading) {
    return <Box style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    }}>
      <CircularProgressWithLabel value={progress} /> กำลังโหลด
    </Box>
  }

  const showForm = ({
    values,
    setFieldValue,
    isValid,
  }: any) => {
    return (
      <Form
      // onSubmit={handleSubmit}
      >
        <Card>
          <CardContent sx={{ padding: 4 }}>
            {/* <Typography gutterBottom variant="h3">
             ตั้งค่าบัญชีผู้ใช้
            </Typography> */}

            <Grid item md={6}>
              <Box style={{ marginTop: 16 }}>
                <FormLabel htmlFor="id" style={{ fontWeight: "bold" }}>
                  ชื่อ
                  <span style={{ color: "red" }}>*</span>
                </FormLabel>
                <Field
                  style={{ marginTop: 16 }}
                  fullWidth
                  component={TextField}
                  defaultValue={userPayload.name}
                  // onChange={(event) => {
                  //   setUserPayload((prevState) => ({
                  //     ...prevState,
                  //     name: event.target.value,
                  //   }));
                  // }}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFieldValue('name', event.target.value)}
                  name="name"
                  type="text"
                  label="กรุณากรอก ชื่อ"
                />
              </Box>
            </Grid>


            <Grid item md={6}>
              <Box style={{ marginTop: 16 }}>
                <FormLabel htmlFor="surname" style={{ fontWeight: "bold" }}>
                  นามสกุล
                  <span style={{ color: "red" }}>*</span>
                </FormLabel>
                <Field
                  style={{ marginTop: 8 }}
                  fullWidth
                  component={TextField}
                  defaultValue={userPayload.surname}
                  name="surname"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFieldValue('surname', event.target.value)}

                  type="text"
                  label="นามสกุล"
                />
              </Box>
            </Grid>

            <Grid item md={6}>
              <Box style={{ marginTop: 16 }}>
                <FormLabel htmlFor="phone" style={{ fontWeight: "bold" }}>
                  เบอร์โทร

                </FormLabel>
                <Field
                  style={{ marginTop: 8 }}
                  fullWidth
                  component={TextField}
                  defaultValue={userPayload.phone}
                  name="phone"
                  maxLength="10"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFieldValue('phone', event.target.value)}
                  type="text"
                  label="เบอร์โทร"
                />
              </Box>
            </Grid>

            <Grid item md={6}>
              <Box style={{ marginTop: 16 }}>
                <FormLabel htmlFor="phone" style={{ fontWeight: "bold" }}>
                  ชื่อผู้ใช้สำหรับเข้าสู่ระบบ (ไม่สามารถแก้ไขได้)

                </FormLabel>
                <Field
                  style={{ marginTop: 8 }}
                  fullWidth
                  component={TextField}
                  defaultValue={userPayload.username}
                  name="username"
                  disabled
                  // onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFieldValue('phone', event.target.value)}
                  type="text"
                  label="ชื่อผู้ใช้"
                />
              </Box>
            </Grid>

            <Grid item md={6}>
              <Box style={{ marginTop: 16 }}>
                <FormLabel htmlFor="email" style={{ fontWeight: "bold" }}>
                  อีเมล

                </FormLabel>
                <Field
                  style={{ marginTop: 8 }}
                  fullWidth
                  component={TextField}
                  defaultValue={userPayload.email}
                  name="email"
                  type="email"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFieldValue('email', event.target.value)}
                  maxLength="120"
                  label="กรุณากรอก อีเมล"
                />
              </Box>
            </Grid>


            <Typography style={{ marginTop: 24 }}>หมายเหตุ : หากต้องการเปลี่ยนรหัสผ่าน ให้กรอกข้อมูลด้านล่าง หากไม่ต้องการสามารถเว้นว่างได้</Typography>

            <Grid item md={6}>
              <Box style={{ marginTop: 16 }}>
                <FormLabel htmlFor="oldPassword" style={{ fontWeight: "bold" }}>
                  รหัสผ่านเดิม

                </FormLabel>
                <Field
                  style={{ marginTop: 8 }}
                  fullWidth
                  component={TextField}
                  name="oldPassword"
                  type="password"
                  label="รหัสผ่านเดิม"
                  value={oldPassword}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setOldPassword(event.target.value)}

                />
              </Box>
            </Grid>
            <Grid item md={6}>
              <Box style={{ marginTop: 16 }}>
                <FormLabel htmlFor="password" style={{ fontWeight: "bold" }}>
                  รหัสผ่านใหม่
                </FormLabel>

                <Field
                  style={{ marginTop: 8 }}
                  fullWidth
                  component={TextField}
                  name="password"
                  type="password"
                  label="รหัสผ่านใหม่"
                  value={password}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}

                />
              </Box>
            </Grid>


            <Grid item md={6}>
              <Box style={{ marginTop: 16 }}>
                <FormLabel htmlFor="passwordConfirmation" style={{ fontWeight: "bold" }}>
                  ยืนยันรหัสผ่านใหม่
                </FormLabel>
                <Field
                  style={{ marginTop: 8 }}
                  fullWidth
                  component={TextField}
                  name="passwordConfirmation"
                  type="password"
                  label="ยืนยันรหัสผ่านใหม่"
                  value={passwordConfirmation}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPasswordConfirmation(event.target.value)}

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


  return (
    <Layout>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper
              sx={{ p: 2, display: "flex", flexDirection: "row", gap: "16px" }}
            >
              {isSmallDevice ? (
                <SettingsIcon sx={{ fontSize: "1.5rem", marginLeft: "8px" }} />
              ) : (
                <SettingsIcon
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

                    ตั้งค่าบัญชีผู้ใช้
                  </Typography>
                ) : (
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "bold",
                      alignSelf: "center",
                    }}
                  >

                    ตั้งค่าบัญชีผู้ใช้
                  </Typography>
                )}
              </React.Fragment>
            </Paper>
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            {loading ? (
              <CircularProgress /> // Show loading indicator while waiting for API call
            ) : (
              <Formik
                validate={(values) => {
                  let errors: any = {};
                  if (!values.name) errors.name = "กรุณากรอกชื่อ";
                  return errors;
                }}
                initialValues={{
                  name: userPayload.name,
                  surname: userPayload.surname,
                  email: userPayload.email,
                  phone: userPayload.phone,
                  role: userPayload.role,
                  username: userPayload.username,
                  groupId: userPayload.groupId,
                  id: userPayload.id
                }}
                onSubmit={async (values, { setSubmitting }) => {
                  setUpdateValue(values);
                  handleEdit();
                  setSubmitting(false);
                }}
              >
                {(props) => showForm(props)}
              </Formik>
            )}
            <ConfirmationDialog
              title="ยืนยันการแก้ไขบัญชีผู้ใช้"
              message="คุณต้องการแก้ไขบัญชีผู้ใช้ใช่หรือไม่ ?"
              open={showConfirmation}
              onClose={handleCancelEdit}
              onConfirm={handleConfirmEdit}
            />

          </Grid>
        </Grid>
      </Container>



    </Layout>
  )
}



export default UserPanelProfile
