import React from 'react'
import Layout from '@/components/Layouts/Layout';
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  FormControlLabel,
  Box,
  CardContent,
  Card,
  CardActions,
  Button
} from '@mui/material';
import GroupsIcon from "@mui/icons-material/Groups";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import router from "next/router";
import { useAppDispatch } from "@/store/store";
import { getOneGroupDataAction, groupDataSelector } from "@/store/slices/group-data.slice";
import { useSelector } from "react-redux";
import { Field, Form, Formik, FormikProps } from "formik";
import { authSelector } from "@/store/slices/auth.slice";
import withAuth from '@/components/withAuth';
import Link from "next/link";
import { GroupDataPayload } from '@/models/group-data.model';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import Image from "next/image";




type Props = {}

function UserPanelManageGroup({ }: Props) {
  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('xs'));
  const dispatch = useAppDispatch();
  const { groupData } = useSelector(groupDataSelector)
  const userData = useSelector(authSelector);
  // console.log("goupdata page")
  // console.log(groupData)
  // console.log(userData.gid)
  React.useEffect(() => {
    //  async function fethData() {
    //   const data = await  dispatch(getAllGroupDataAction());
    //   console.log("====== async effect")
    //   console.log(data.payload)
    //  }
    //  if(userData){
    //    fethData()
    //  }
    if (userData) {
      dispatch(getOneGroupDataAction(userData.gid))
    }
  }, [dispatch])


  const initialValues: GroupDataPayload = {
    groupName: groupData.groupName,
    groupType: groupData.groupType,
    agency: groupData.agency,
    logo: groupData.logo,
    banner: groupData.banner,
    phone: groupData.phone,
    email: groupData.email,
    hno: groupData.hno,
    village: groupData.village,
    lane: groupData.lane,
    road: groupData.road,
    subdistrict: groupData.subdistrict,
    district: groupData.district,
    province: groupData.province,
    zipCode: groupData.zipCode,
    lat: groupData.lat,
    lng: groupData.lng
  }

const typeographyHeaderStyle = {
  fontSize: isSmallDevice ? '16px':'1.5rem',
  alignSelf: 'flex-start',
  width:'100%',
  color: theme.palette.grey[800]
}
const typeographyValueStyle = {
  fontSize: isSmallDevice ? '16px':'1.5rem' ,
  alignSelf: 'flex-start',
  width:'100%',
  color: theme.palette.grey[800]
}
  const boxStyle = {
    display:'flex', 
    marginTop: "16px"
  }
  const radioGroupStyle = {
    marginLeft: "16px",
    fontSize: isSmallDevice ? '16px':'1.5rem',
    alignSelf: 'flex-start',
  color: theme.palette.grey[800]
  }

  const btnstyle = {
    margin: '8px 0',
    align: 'end',
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    fontWeight: 'bold',
    // boxShadow: `0px 1px 5px ${Theme.palette.primary.dark}`,
    boxShadow: `0px 5px 10px rgba(0, 0, 0, 0.3)`,
  };


  const showForm = ({
    isValid,
  }: FormikProps<any>) => {
    return (
      <Form>
     

      </Form>
    );
  };

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'row', gap: '16px' }}>
              {isSmallDevice ? (
                <GroupsIcon sx={{ fontSize: '1.5rem', marginLeft: '8px' }} />
              ) : (
                <GroupsIcon sx={{ fontSize: '2.5rem', marginLeft: '16px' }} />
              )}
              <React.Fragment>
                {isSmallDevice ? (
                  <Typography
                    sx={{
                      fontWeight: 'bold', alignSelf: 'center',
                    }}
                  > หน้าจัดการข้อมูลกลุ่ม <br /> / ร้านค้า </Typography>
                ) : (
                  <Typography
                    variant='h5' sx={{
                      fontWeight: 'bold', alignSelf: 'center',
                    }}
                  > หน้าจัดการข้อมูลกลุ่ม / ร้านค้า</Typography>
                )}
              </React.Fragment>
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={2} style={{marginTop: "16px"}} >
        <Grid item xs={12}>
          <Paper sx={{ p: 2,  display:'flex', gap: '4rem' ,
            flexDirection: {
            xs: 'column',
            md: 'row'
          },
  }}>
            <Grid item xs={12} md={4} lg={3}>
              <Image
                objectFit="cover"
                alt="product image"
                src="/static/img/logo.png"
                width={250}
                height={250}
              />
            </Grid>
      
            <Grid item xs={12} md={8} lg={9}>
              <React.Fragment>
              <Box sx={boxStyle}>
          <Typography
            sx={typeographyHeaderStyle}
          >
            ชื่อกลุ่ม / ร้านค้า :
          </Typography>
          <Typography
            sx={typeographyValueStyle}
          >
             {groupData.groupName}
          </Typography>
      </Box>
     
      <Box sx={boxStyle}>
          <Typography
            sx={typeographyHeaderStyle}
          >
            ประเภทกลุ่ม :
          </Typography>
          <RadioGroup
            row
            aria-labelledby="group-type-row-radio-buttons-group-label"
            name="group-type-row-radio-buttons-group"
            sx={typeographyValueStyle}
          >
           <FormControlLabel
                value="shop"
                checked={groupData.groupType === "shop"}
                
                control={<Radio />}
                label={"ร้านค้า"}
              />
               <FormControlLabel
                value="producer"
                checked={groupData.groupType === "producer"}
                
                control={<Radio />}
                label={"กลุ่มผู้ผลิต"}
              />
         
          </RadioGroup>
      </Box>

      <Box sx={boxStyle}>
          <Typography
            sx={typeographyHeaderStyle}
          >
             ชื่อประธาน / เจ้าของร้าน :
          </Typography>
          <Typography
            sx={typeographyValueStyle}
          >
              {groupData.agency}
          </Typography>
      </Box>

      <Box sx={boxStyle}>
          <Typography
            sx={typeographyHeaderStyle}
          >
             เบอร์โทร :
          </Typography>
          <Typography
            sx={typeographyValueStyle}
          >
              {groupData.phone}
          </Typography>
      </Box>

      <Box sx={boxStyle}>
          <Typography
            sx={typeographyHeaderStyle}
          >
             อีเมล :
          </Typography>
          <Typography
            sx={typeographyValueStyle}
          >
              {groupData.email}
          </Typography>
      </Box>
                </React.Fragment>
            </Grid>
          </Paper>

        
        </Grid>

        <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'row', gap: '16px' }}>

        </Paper>
          </Grid>
      </Grid>

  <Container maxWidth="lg" sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
  <Button 
    color='primary' 
    variant="contained" 
    style={{
      margin: '8px 0',
      backgroundColor: theme.palette.primary.main,
      color: '#fff',
      fontWeight: 'bold',
      boxShadow: `0px 5px 10px rgba(0, 0, 0, 0.3)`,
    }}
    onClick={()=>{
      console.log("edit onclick")
      console.log(groupData)
    }}
  >
    แก้ไขข้อมูล
  </Button>
</Container>


      </Container>
 
    </Layout>
  )
}

export default withAuth(UserPanelManageGroup)