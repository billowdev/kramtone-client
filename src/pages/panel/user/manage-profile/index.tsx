import React from 'react'
import Layout from '@/components/Layouts/Layout';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as authService from '@/services/auth.service';
import { UserPayload } from '@/models/auth.model';
import TextField from '@material-ui/core/TextField';
import toast from "react-hot-toast";


import { Container, Grid, Paper } from '@mui/material';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Swal from 'sweetalert2';
import PersonIcon from '@mui/icons-material/Person';
import { Formik, Form, Field } from 'formik';
import { useAppDispatch } from "@/store/store";
import { updateUserProfileAction } from "@/store/slices/auth.slice";
import { Card, CardContent, CardActions, Typography, Button } from "@mui/material";
import Link from "next/link"
import httpClient from '@/common/utils/httpClient.util';
import { GetStaticProps } from 'next';

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
  // const [updateValue, setUpdateValue] = React.useState<UserPayload>();
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
       const {data:response} = await httpClient.get(`/users/me`, {
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

  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const validatePassword = () => {
    if (!passwordRegex.test(password)) {
      toast.error('รหัสผ่านต้องประกอบด้วยตัวอักษรและตัวเลข อย่างน้อย 8 ตัว');
      return false;
    }
  
    const isValid = password === passwordConfirmation;
    setIsPasswordValid(isValid);
  
    if (!isValid) {
      toast.error('The new password and confirmation do not match.');
    }
  
    return isValid;
  };
  


  if (loading) {
    return <div>Loading...</div>;
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
            <Typography gutterBottom variant="h3">
             ตั้งค่าบัญชีผู้ใช้
            </Typography>

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
              label="ชื่อ"
            />
            <br />
            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              defaultValue={userPayload.surname}
              name="surname"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFieldValue('surname', event.target.value)}

              type="text"
              label="นามสกุล"
            />

<br />
            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              defaultValue={userPayload.phone}
              name="phone"
              maxLength={10}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFieldValue('phone', event.target.value)}
              type="text"
              label="เบอร์โทร"
            />

<br />
            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              defaultValue={userPayload.email}
              name="email"
              type="email"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFieldValue('email', event.target.value)}
              maxLength={120}
              label="อีเมล"
            />

  <Field
        style={{ marginTop: 16 }}
        fullWidth
        component={TextField}
        name="oldPassword"
        type="password"
        label="รหัสผ่านเดิม"
        value={oldPassword}
        onChange={(event) => setOldPassword(event.target.value)}
        required
      />

  <Field
        style={{ marginTop: 16 }}
        fullWidth
        component={TextField}
        name="password"
        type="password"
        label="รหัสผ่าน"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />

      <Field
        style={{ marginTop: 16 }}
        fullWidth
        component={TextField}
        name="passwordConfirmation"
        type="password"
        label="ยืนยันรหัสผ่าน"
        value={passwordConfirmation}
        onChange={(event) => setPasswordConfirmation(event.target.value)}
        required
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

  // const handleEditConfirm = async () => {
  //   if (id) {
  //     const updateStatus = await dispatch(updateUserProfile({id:updateValue.id, body:updateValue, accessToken}))

  //     if (updateStatus.meta.requestStatus === "fulfilled") {
  //       toast.success("แก้ไขข้อมูลประเภทสินค้าสำเร็จ")
  //       router.push("/panel/user/manage-category");
  //     }else{
  //       toast.error("แก้ไขข้อมูลประเภทสินค้าไม่สำเร็จ โปรดลองอีกครั้ง")
  //     }
  //     setOpenDialog(false);
  //   }
  // };

  return (
    <Layout>
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
          role:userPayload.role,
          username: userPayload.username,
          groupId: userPayload.groupId,
          id: userPayload.id
        }}
        onSubmit={async (values, { setSubmitting }) => {
          // setUpdateValue(values);
          // handleSubmit(values)
          // setImageFile(values.image_file);
          // setOpenDialog(true);
          try {
            const { isConfirmed } = await Swal.fire({
              title: 'ยืนยันการแก้ไขข้อมูล',
              text: 'คุณแน่ใจที่จะแก้ไขข้อมูลบัญชี?',
              icon: 'question',
              showCancelButton: true,
              cancelButtonText: 'ยกเลิก',
              confirmButtonText: 'ยืนยัน',
            });
            if (isConfirmed) {
              const {id, name, surname, phone, email} = values
              // const response = await authService.updateUserById(id, { name, surname, phone, email });
              if (!validatePassword()) {
                Swal.fire('Error', 'The new password and confirmation do not match.', 'error');
                return;
              }
              if(oldPassword && password ){
                const { data: response } = await httpClient.patch(`/users/update/${id}`, {name, surname, phone, email, oldPassword, password}, {
                  baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
                });
                if(response.status === 400){
                  toast.error('ผิดพลาดขณะ แก้ไขข้อมูลโปรไฟล์')
                }else{
                  
                  toast.success('แก้ไขข้อมูลโปรไฟล์สำเร็จ')
                }

                // console.log(response);
                }
                else{
                const { data: response } = await httpClient.patch(`/users/update/${id}`, {name, surname, phone, email}, {
                  baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
                });
                if(response.status === 400){
                  toast.error('ผิดพลาดขณะ แก้ไขข้อมูลโปรไฟล์')
                }else{
                  
                  toast.success('แก้ไขข้อมูลโปรไฟล์สำเร็จ')
                }
                }
              }
             
          } catch (error) {
            console.error(error);
            // Swal.fire(
            //   'ผิดพลาด',
            //   'อัปเดตข้อมูลผู้ใช้ไม่สำเร็จ',
            //   'error'
            // );
          }

          setSubmitting(false);
        }}
      >
        {(props) => showForm(props)}
      </Formik>
    )}
  </Layout>
  )
}



export default UserPanelProfile

// export const getStaticProps: GetStaticProps = async () => {
//   try {
//     const { data } = await httpClient.get('/users/me', {
//       baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
//     });
//     const userData = data.payload;
//     return {
//       props: {
//         userData,
//       },
//     };
//   } catch (error) {
//     console.error('Error fetching user data:', error);
//     return {
//       props: {
//         userData: null,
//       },
//     };
//   }
// };

// export async function getServerSideProps(context: any) {
//   const accessToken = context.req.cookies["access_token"];
//   const { sub } = await authService.getSessionServerSide(accessToken!);
//   const userProfile = await authService.getProfile(accessToken);

//   return {
//     props: { id: sub!, accessToken,userProfile },
//   };
// }

// export const getServerSideProps: GetServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
  
//     const accessToken = context.req.cookies["access_token"];
//     const { sub } = await authService.getSessionServerSide(accessToken!);
//     const userProfile = await authService.getProfile(accessToken);
  
//     return {
//       props: {
//         id: sub, accessToken,userProfile
//       },
//     };
 
// };
