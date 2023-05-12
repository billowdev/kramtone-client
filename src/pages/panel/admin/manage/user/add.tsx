import Layout from "@/components/Layouts/Layout";
import withAuth from "@/components/withAuth";
import { UserPayload } from "@/models/user.model";
// import { updateCategory } from "@/services/user.service";
import { addUser } from "@/store/slices/user.slice";
import { Formik, Form, Field, FormikHelpers, FormikProps, useFormikContext,   ErrorMessage,  } from 'formik';
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
	   InputAdornment,
	   IconButton,
	 } from '@material-ui/core';
import { useAppDispatch } from "@/store/store";
import toast from "react-hot-toast";
import * as Yup from 'yup';
import { ServerStyleSheets } from '@material-ui/core';
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";


type Props = {
 
};
const AdminPanelEditUser = ({
	
}: Props) => {
  const router = useRouter();
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  interface UserType extends UserPayload {
	password: string;
	passwordConfirmation: string;
  }
  const initialValue : any = {
	id: "",
	username: "",
	email: "",
	role: "",
	name: "",
	surname: "",
	phone: "",
	activated: false,
	removed: false,
	groupId: "",
	password: '',
	passwordConfirmation: '',
}
  const [addValues, setAddValues] = React.useState<UserType>(initialValue);
  const dispatch = useAppDispatch();
	const [userRole, setUserRole] = React.useState<String>('member');
	const sheets = new ServerStyleSheets();
	const theme = useTheme();
	const isSmallDevice = useMediaQuery(theme.breakpoints.down("xs"));
	const [activated, setActivated] = React.useState<boolean>(false)
	const [passwordVisible, setPasswordVisible] = React.useState(false);
	const handlePasswordVisible = () => {
		setPasswordVisible(!passwordVisible);
	  };
	  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	  };

  const [showConfirmation, setShowConfirmation] = React.useState(false);

  const handleAdd = () => {
    setShowConfirmation(true);
  };

  const handleConfirmAdd = async () => {
    const addData = {...addValues, role: userRole, activated}
    const addStatus = await dispatch(addUser(addData))

    if (addStatus?.meta?.requestStatus === "fulfilled") {
      if(addStatus?.payload?.error?.code === 400){
        if(addStatus?.payload?.error?.message?.response?.message){
          const msg = addStatus?.payload?.error?.message?.response?.message;
          toast.error("เพิ่มข้อมูลไม่สำเร็จ " + msg)
        }else{
          toast.error("เพิ่มข้อมูลไม่สำเร็จ โปรดลองอีกครั้ง")
        }
      } else{

        toast.success("เพิ่มข้อมูลสำเร็จ")
        router.push("/panel/admin/manage/user");
      }
    }else{
      toast.error("เพิ่มข้อมูลไม่สำเร็จ โปรดลองอีกครั้ง")
    }
    setOpenDialog(false);
    setShowConfirmation(false);
  };

  const handleCancelAdd = () => {
    setShowConfirmation(false);
  };

	const showForm = ({
		values,
		setFieldValue,
		isValid,
	  }: FormikProps<UserType>) => {
		return (
		  <Form>
			<Card>
			  <CardContent sx={{ padding: 4 }}>
				<Typography gutterBottom variant="h3">
				  เพิ่มข้อมูลบัญชีผู้ใช้
				</Typography>
	  
				<Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="username"
              type="text"
              label="ชื่อผู้ใช้"
			  maxLength={64}
              required
            />
            <br />
			<Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="password"
              type="text"
              label="รหัสผ่าน"
			  maxLength={120}
              required
            />
            <br />
			{/* <Field
			as={TextField}
			label="รหัสผ่าน"
			name="password"
			placeholder="กรอก รหัสผ่าน"
			type={passwordVisible ? 'text' : 'password'}
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
					{passwordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
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
                        type={passwordVisible ? 'text' : 'password'}
                        fullWidth
                        required
                        helperText={<ErrorMessage name="passwordConfirmation" />}
                        InputProps={{
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
                          ),
                        }}
                      /> */}

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
              required
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
				  เพิ่ม
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
	  

  return (

    <Layout>
      <Formik
        validate={(values) => {
          let errors: any = {};
          if (!values.username) errors.username = "กรุณากรอกชื่อผู้ใช้";
          if (!values.name) errors.name = "กรุณากรอกชื่อ";
          if (!values.surname) errors.surname = "กรุณากรอกนามสกุล";
          return errors;
        }}
        initialValues={initialValue}
        onSubmit={async (values, { setSubmitting }) => {
          setAddValues(values)
          // setOpenDialog(true);
          handleAdd()
          setSubmitting(false);
        }}
      >
        {(props) => showForm(props)}
      </Formik>
      <ConfirmationDialog
        title="ยืนยันการเพิ่มบัญชีผู้ใช้"
        message="คุณต้องการเพิ่มบัญชีผู้ใช้ใช่หรือไม่ ?"
        open={showConfirmation}
        onClose={handleCancelAdd}
        onConfirm={handleConfirmAdd}
      />
    </Layout>
  );
};

export default withAuth(AdminPanelEditUser);
