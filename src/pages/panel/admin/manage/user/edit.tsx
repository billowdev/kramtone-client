import Layout from "@/components/Layouts/Layout";
import withAuth from "@/components/withAuth";
import { UserPayload } from "@/models/user.model";
// import { updateCategory } from "@/services/user.service";
import { updateUser } from "@/store/slices/user.slice";
import {
  Formik,
  Form,
  Field,
  FormikHelpers,
  FormikProps,
  useFormikContext,
} from "formik";
import { TextField, CheckboxWithLabel } from "formik-material-ui";

import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  FormHelperText,
  Box,
  FormLabel,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
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
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Radio,
  RadioGroup,
  FormControl,
  Container,
  Paper,
} from "@material-ui/core";
import { useAppDispatch } from "@/store/store";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { ServerStyleSheets } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ConfirmationDialog from "@/components/ConfirmationDialog";

type Props = {
  user?: UserPayload;
  accessToken?: string;
};
const AdminPanelEditUser = ({ user, accessToken }: Props) => {
  const router = useRouter();
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const [updateValue, setUpdateValue] = React.useState<UserPayload>(user!);
  const dispatch = useAppDispatch();
  const [userRole, setUserRole] = React.useState<String>(user?.role!);
  const sheets = new ServerStyleSheets();
  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down("xs"));
  const [activated, setActivated] = React.useState<boolean>(user?.activated!);

  const [showConfirmation, setShowConfirmation] = React.useState(false);

  const handleEdit = () => {
    setShowConfirmation(true);
  };

  const [password, setPassword] = React.useState("");
  const [passwordConfirmation, setPasswordConfirmation] = React.useState("");

  const handleConfirmEdit = async () => {
    // Validate password field
    if (password) {
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
      if (!passwordRegex.test(password)) {
        toast.error("รหัสผ่านต้องประกอบด้วยตัวอักษรและตัวเลข อย่างน้อย 8 ตัว");
        return;
      }
    }

    const updateData = { ...updateValue, role: userRole, activated, password };
    const updateStatus = await dispatch(updateUser(updateData));

    if (updateStatus?.meta?.requestStatus === "fulfilled") {
      if (updateStatus?.payload?.error?.code === 400) {
        if (updateStatus?.payload?.error?.message?.response?.message) {
          const msg = updateStatus?.payload?.error?.message?.response?.message;
          toast.error("แก้ไขข้อมูลไม่สำเร็จ " + msg);
        } else {
          toast.error("แก้ไขข้อมูลไม่สำเร็จ โปรดลองอีกครั้ง");
        }
      } else {
        toast.success("แก้ไขข้อมูลสำเร็จ");
        router.push("/panel/admin/manage/user");
      }
    } else {
      toast.error("แก้ไขข้อมูลไม่สำเร็จ โปรดลองอีกครั้ง");
    }
    setOpenDialog(false);
    setShowConfirmation(false);
  };

  const handleCancelEdit = () => {
    setShowConfirmation(false);
  };

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
              แก้ไขข้อมูลบัญชีผู้ใช้
            </Typography>
            <Grid container spacing={2} style={{ marginTop: 16 }}>
            <Grid item sm={6}>
            <Box style={{ marginTop: 3 }}>
              <FormLabel htmlFor="username" style={{ fontWeight: "bold" }}>
                ชื่อผู้ใช้
                <span style={{ color: "red" }}>*</span>
              </FormLabel>

              <Field
                style={{ marginTop: 16 }}
                fullWidth
                component={TextField}
                name="username"
                type="text"
                label="กรุณากรอก ชื่อผู้ใช้"
                required
              />
            </Box>
</Grid>
           <Grid item sm={6}>
           <Box style={{ marginTop: 3 }}>
              <FormLabel htmlFor="email" style={{ fontWeight: "bold" }}>
                อีเมล
                <span style={{ color: "red" }}>*</span>
              </FormLabel>
              <Field
                style={{ marginTop: 16 }}
                fullWidth
                component={TextField}
                name="email"
                type="text"
                label="กรุณากรอก อีเมล"
              />
            </Box>
            </Grid>
</Grid>
            <Grid item>
              <Box style={{ marginTop: 3 }}>
                <FormLabel htmlFor="role" style={{ fontWeight: "bold" }}>
                  สถานะ
                  <span style={{ color: "red" }}>*</span>
                </FormLabel>

                <div style={{ display: "flex" }}>
                  <div style={{ marginRight: "1rem" }}>
                    <input
                      type="radio"
                      name="role"
                      id="member"
                      checked={userRole === "member"}
                      onChange={() => setUserRole("member")}
                    />
                    <label htmlFor="member">สมาชิก</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="role"
                      id="admin"
                      checked={userRole === "admin"}
                      onChange={() => setUserRole("admin")}
                    />
                    <label htmlFor="admin">ผู้ดูแลระบบ</label>
                  </div>
                </div>
              </Box>
            </Grid>
     
     
            <Grid container spacing={2} style={{ marginTop: 16 }}>
            <Grid item sm={6}>
            <Box style={{ marginTop: 3 }}>
              <FormLabel htmlFor="name" style={{ fontWeight: "bold" }}>
                ชื่อ
                <span style={{ color: "red" }}>*</span>
              </FormLabel>

              <Field
                style={{ marginTop: 16 }}
                fullWidth
                component={TextField}
                name="name"
                type="text"
                label="กรุณากรอก ชื่อ"
              />
            </Box>
            </Grid>

            <Grid item sm={6}>
            <Box style={{ marginTop: 3 }}>
              <FormLabel htmlFor="surname" style={{ fontWeight: "bold" }}>
                นามสกุล
                <span style={{ color: "red" }}>*</span>
              </FormLabel>
              <Field
                style={{ marginTop: 16 }}
                fullWidth
                component={TextField}
                name="surname"
                type="text"
                label="กรุณากรอก นามสกุล"
              />
            </Box>
            </Grid>
</Grid>
          <Grid item sm={6}>
          <Box style={{ marginTop: 3 }}>
              <FormLabel htmlFor="phone" style={{ fontWeight: "bold" }}>
                เบอร์โทร
                <span style={{ color: "red" }}>*</span>
              </FormLabel>

              <Field
                style={{ marginTop: 16 }}
                fullWidth
                component={TextField}
                name="phone"
                type="text"
                label="กรุณากรอก เบอร์โทร"
                required
              />
            </Box>
            </Grid>
          
            <Grid container spacing={2} style={{ marginTop: 16 }}>
            <Grid item sm={6}>
       
              <Box style={{ marginTop: 3 }}>
                <FormLabel htmlFor="password" style={{ fontWeight: "bold" }}>
                  รหัสผ่าน
                  <span style={{ color: "red" }}>*</span>
                </FormLabel>
                <Field
                  style={{ marginTop: 16 }}
                  fullWidth
                  component={TextField}
                  name="password"
                  type="password"
                  label="กรุณากรอก รหัสผ่าน"
                  value={password}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(event.target.value)
                  }
                />
              </Box>
              </Grid>
              <Grid item sm={6}>
              <Box style={{ marginTop: 3 }}>
                <FormLabel
                  htmlFor="passwordConfirmation"
                  style={{ fontWeight: "bold" }}
                >
                  ยืนยันรหัสผ่าน
                  <span style={{ color: "red" }}>*</span>
                </FormLabel>

                <Field
                  style={{ marginTop: 16 }}
                  fullWidth
                  component={TextField}
                  name="passwordConfirmation"
                  type="password"
                  label="กรุณากรอก รหัสผ่านอีกครั้ง"
                  value={passwordConfirmation}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setPasswordConfirmation(event.target.value)
                  }
                />
              </Box>
              </Grid>
           
            </Grid>

            <Box style={{ marginTop: 3 }}>
                <FormLabel htmlFor="activated" style={{ fontWeight: "bold" }}>
                  สถานะการยืนยันตัวตน
                  <span style={{ color: "red" }}>*</span>
                </FormLabel>
                <br />
                <Field
                  component={CheckboxWithLabel}
                  name="activated"
                  id="activated-checkbox"
                  checked={activated}
                  onChange={() => {
                    setActivated(!activated);
                  }}
                  Label={{
                    label: "สถานะการยืนยันตัวตน (Activate)",
                  }}
                />
              </Box>
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
        initialValues={user!}
        onSubmit={async (values, { setSubmitting }) => {
          setUpdateValue(values);
          // setOpenDialog(true);
          handleEdit();
          setSubmitting(false);
        }}
      >
        {(props) => showForm(props)}
      </Formik>
      <ConfirmationDialog
        title="ยืนยันการแก้ไขบัญชีผู้ใช้"
        message="คุณต้องการแก้ไขบัญชีผู้ใช้ใช่หรือไม่ ?"
        open={showConfirmation}
        onClose={handleCancelEdit}
        onConfirm={handleConfirmEdit}
      />
    </Layout>
  );
};

export default withAuth(AdminPanelEditUser);

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id }: any = context.query;

  if (id) {
    const accessToken = context.req.cookies["access_token"];

    const { data: user } = await httpClient.get(`/users/get/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return {
      props: {
        user,
      },
    };
  } else {
    return { props: {} };
  }
};
