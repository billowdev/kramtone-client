import React from 'react'
import Layout from '@/components/Layouts/Layout';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as authService from '@/services/auth.service';
import { UserPayload } from '@/models/auth.model';
import TextField from '@material-ui/core/TextField';

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
        console.log(response.payload)
        setUserPayload(response.payload);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  // async function handleSubmit(
  //   // event: React.FormEvent<HTMLFormElement>
  //   updateValue : UserPayload
  //   ) {
  //   // event.preventDefault();
  //   // values: UserPayload
  //   console.log(updateValue)
  //   try {
  //     const { isConfirmed } = await Swal.fire({
  //       title: 'ยืนยันการแก้ไขข้อมูล',
  //       text: 'คุณแน่ใจที่จะแก้ไขข้อมูลบัญชี?',
  //       icon: 'question',
  //       showCancelButton: true,
  //       cancelButtonText: 'ยกเลิก',
  //       confirmButtonText: 'ยืนยัน',
  //     });
  //     if (isConfirmed) {
  //       console.log(updateValue)
  //       const {id, name, surname, phone, email} = updateValue
  //       // const response = await authService.updateUserById(id, { name, surname, phone, email });
        
  //       const { data: response } = await httpClient.patch(`/users/update/${id}`, {name, surname, phone, email}, {
  //         baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
  //       });
  //       Swal.fire(
  //         'สำเร็จ',
  //         'แก้ไขข้อมูลบัญชีสำเร็จ',
  //         'success'
  //       );
  //       console.log(response);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     Swal.fire(
  //       'ผิดพลาด',
  //       'อัปเดตข้อมูลผู้ใช้ไม่สำเร็จ',
  //       'error'
  //     );
  //   }
  // }

 

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
              
              const { data: response } = await httpClient.patch(`/users/update/${id}`, {name, surname, phone, email}, {
                baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
              });
              Swal.fire(
                'สำเร็จ',
                'แก้ไขข้อมูลบัญชีสำเร็จ',
                'success'
              );
              // console.log(response);
            }
          } catch (error) {
            console.error(error);
            Swal.fire(
              'ผิดพลาด',
              'อัปเดตข้อมูลผู้ใช้ไม่สำเร็จ',
              'error'
            );
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
