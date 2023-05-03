import Layout from "@/components/Layouts/Layout";
import withAuth from "@/components/withAuth";
import { UserPayload } from "@/models/user.model";
// import { updateCategory } from "@/services/user.service";
import { updateUser } from "@/store/slices/user.slice";
import { Formik, Form, Field, FormikHelpers, FormikProps, useFormikContext   } from 'formik';
import { TextField, CheckboxWithLabel } from 'formik-material-ui';

import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  FormHelperText,
} from "@mui/material";

import PersonIcon from '@mui/icons-material/Person';
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import httpClient from "@/common/utils/httpClient.util";
import { Switch, 
	FormControlLabel,
	 Dialog, 
	 DialogTitle, 
	 DialogContent, 
	 DialogContentText, 
	 DialogActions,
	  Grid,
	  InputLabel,
	  MenuItem,
	  Select,
	  Radio, 
	  RadioGroup,
	   FormControl,
	   Container,
	   Paper,

	 } from '@material-ui/core';
import { useAppDispatch } from "@/store/store";
import toast from "react-hot-toast";
import * as Yup from 'yup';
import { ServerStyleSheets } from '@material-ui/core';
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

type Props = {
  user?: UserPayload;
  accessToken?: string;
};

// Define validation schema
const validationSchema = Yup.object().shape({
	username: Yup.string().required('Required'),
	email: Yup.string().email('Invalid email').required('Required'),
	role: Yup.string().required('Required'),
	name: Yup.string().required('Required'),
	surname: Yup.string().required('Required'),
	phone: Yup.string().required('Required'),
	activated: Yup.boolean(),
  });


//   const RoleSelection = ({ userRole, setUserRole }: any) => {
// 	return (
// 	  <Grid item>
// 		<InputLabel id="role-select-label">สถานะ</InputLabel>
// 		<div style={{ display: 'flex' }}>
// 		  <div style={{ marginRight: '1rem' }}>
// 			<input
// 			  type="radio"
// 			  name="role"
// 			  id="member"
// 			  checked={userRole === 'member'}
// 			  onChange={() => setUserRole('member')}
// 			/>
// 			<label htmlFor="member">สมาชิก</label>
// 		  </div>
// 		  <div>
// 			<input
// 			  type="radio"
// 			  name="role"
// 			  id="admin"
// 			  checked={userRole === 'admin'}
// 			  onChange={() => setUserRole('admin')}
// 			/>
// 			<label htmlFor="admin">ผู้ดูแลระบบ</label>
// 		  </div>
// 		</div>
// 	  </Grid>
// 	);
//   };
  

const AdminPanelEditUser = ({ user, accessToken}: Props) => {
  const router = useRouter();
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const [updateValue, setUpdateValue] = React.useState<UserPayload>(user!);
  const dispatch = useAppDispatch();
	const [userRole, setUserRole] = React.useState<String>(user?.role!);
	const sheets = new ServerStyleSheets();
	const theme = useTheme();
	const isSmallDevice = useMediaQuery(theme.breakpoints.down("xs"));
	const [activated, setActivated] = React.useState<boolean>(user?.activated!)

	const showForm = ({
		values,
		setFieldValue,
		isValid,
	  }: FormikProps<UserPayload>) => {
		return (
		  <Form>
			<Card>
			  <CardContent sx={{ padding: 4 }}>
				<Typography gutterBottom variant="h3">
				  แก้ไขข้อมูลสมาชิก
				</Typography>
	  
				<Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="username"
              type="text"
              label="ชื่อผู้ใช้"
            />
            <br />
			<Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="email"
              type="text"
              label="อีเมล"
            />
            <br />
			<br />
			<Grid item>
		<InputLabel id="role-select-label">สถานะ</InputLabel>
		<div style={{ display: 'flex' }}>
		  <div style={{ marginRight: '1rem' }}>
			<input
			  type="radio"
			  name="role"
			  id="member"
			  checked={userRole === 'member'}
			  onChange={() => setUserRole('member')}
			/>
			<label htmlFor="member">สมาชิก</label>
		  </div>
		  <div>
			<input
			  type="radio"
			  name="role"
			  id="admin"
			  checked={userRole === 'admin'}
			  onChange={() => setUserRole('admin')}
			/>
			<label htmlFor="admin">ผู้ดูแลระบบ</label>
		  </div>
		</div>
	  </Grid>
	  <br />

	  <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="name"
              type="text"
              label="ชื่อ"
            />
            <br />
			<Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="surname"
              type="text"
              label="นามสกุล"
            />
            <br />
			<Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="phone"
              type="text"
              label="เบอร์โทร"
            />
            <br />
			<Grid item>

			<Field
				component={CheckboxWithLabel}
				name="activated"
				id="activated-checkbox"
				checked={activated}
				onChange={()=>{
					setActivated(!activated)
				}}
				Label={{
				label: 'สถานะการยืนยันตัวตน (Activate)',
				}}
			/>
			</Grid>

			  </CardContent>
			  <CardActions sx={{ padding: 4 }}>
				<Button
				  disabled={!isValid}
				  fullWidth
				  variant="contained"
				  color="primary"
				  type="submit"
				  sx={{ marginRight: 2 }}
				>
				  แก้ไข
				</Button>
				<Link href="/panel/admin/manage/user" passHref>
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
    if (user) {
      const updateStatus = await dispatch(updateUser(updateValue))

      if (updateStatus.meta.requestStatus === "fulfilled") {
        toast.success("แก้ไขข้อมูลสำเร็จ")
        router.push("/panel/admin/manage/user");
      }else{
        toast.error("แก้ไขข้อมูลไม่สำเร็จ โปรดลองอีกครั้ง")
      }
      setOpenDialog(false);
    }
  };

  const showDialog = () => {
    if (user === null) {
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
          แก้ไขข้อมูล? : {user?.name}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          คุณต้องการแก้ไขข้อมูลใช่หรือไม่
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

  return (

	// <Layout>

	// <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
	// 	 <Grid container spacing={3}>
	// 		 <Grid item xs={12}>
	// 		 <Paper sx={{ p: 2, display: 'flex', flexDirection: 'row', gap: '16px'}}>
	// 		 {isSmallDevice ? (
	// 			 <PersonIcon sx={{fontSize:'1.5rem', marginLeft:'8px'}} />
	// 		   ) : (
	// 			 <PersonIcon sx={{fontSize:'2.5rem', marginLeft:'16px'}} />
	// 		   )}

	// 		 <React.Fragment> 
	// 		   {isSmallDevice ? (
	// 			 <Typography
	// 			sx={{
	// 			   fontWeight: 'bold',  alignSelf:'center',
	// 		   }}
	// 			 > แก้ไขข้อมูลสมาชิก</Typography>
	// 		   ) : (
	// 			 <Typography
	// 			 variant='h5' sx={{
	// 			   fontWeight: 'bold',  alignSelf:'center',
	// 		   }}
	// 			 > แก้ไขข้อมูลสมาชิก</Typography>
	// 		   )}
	// 		 </React.Fragment>
	// 		 </Paper>
	// 	   </Grid> 
	// 	   <Grid item xs={12} md={12} lg={12}>
	// 	   <Formik
    //     validate={(values) => {
    //       let errors: any = {};
    //       if (!values.name) errors.name = "กรุณากรอกชื่อผู้ใช้";
    //       return errors;
    //     }}
    //     initialValues={user!}
    //     onSubmit={async (values, { setSubmitting }) => {
    //       setUpdateValue(values)
    //       setOpenDialog(true);
    //       setSubmitting(false);
    //     }}
    //   >
    //     {(props) => showForm(props)}
    //   </Formik>
    //   {showDialog()}
	
	
	// 	   </Grid>
	   
	// 	 </Grid>
	   
	//    </Container>
	
		 
	// 	</Layout>

    <Layout>
      <Formik
        validate={(values) => {
          let errors: any = {};
          if (!values.name) errors.name = "กรุณากรอกชื่อผู้ใช้";
          return errors;
        }}
        initialValues={user!}
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

export default withAuth(AdminPanelEditUser);

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id }: any = context.query;
  
  if (id) {
    const accessToken = context.req.cookies['access_token']

    const { data: user } = await httpClient.get(`/users/get/${id}`, {
		headers: { Authorization: `Bearer ${accessToken}` },
    });
    return {
      props: {
        user
      },
    };
  } else {
    return { props: {} };
  }
};
