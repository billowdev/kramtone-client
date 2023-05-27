import React from 'react'
import dynamic from "next/dynamic";
import { groupDataSelector } from '@/store/slices/group-data.slice';
import MainLayout from "@/components/MainLayout"
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useAppDispatch } from "@/store/store";
import { getAllGroupDataAction } from '@/store/slices/group-data.slice';
import { useSelector } from 'react-redux';
import { Box, Paper, Typography, Button, AppBar, Toolbar, IconButton, Grid, Container, Divider } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useTheme } from "@material-ui/core/styles";
import PinDropIcon from '@material-ui/icons/PinDrop';
import router from "next/router";

import {
	FacebookShareButton,
	TwitterShareButton,
	LinkedinShareButton,
	FacebookIcon,
	TwitterIcon,
	LinkedinIcon,
  } from 'react-share';
  type Props = {}
function GroupMapPage({ }: Props) {
  const theme = useTheme();
  const handleBackButtonClick = () => {
    router.back();
  };
	const dispatch = useAppDispatch()
	React.useEffect(()=>{
	  dispatch(getAllGroupDataAction());
	}, [dispatch])
  
	const groupData = useSelector(groupDataSelector)
	const shareUrl = `https://www.kramtone.com/group/map`;
	const shareTitle = `Kramtone เชื่อมโยงสินค้าผ้าครามกับแผนภาพโทนสีครามธรรมชาติ`;
  const isSmallDevice = useMediaQuery(theme.breakpoints.down("xs"));
  // const Map = dynamic(() => import("./map"), { ssr: false });

  // console.log('====================================');
  // console.log(groupData);
  // console.log('====================================');

  const GroupMap = React.useMemo(() => dynamic(
    () => import('./map'), // replace '@components/map' with your component's location
    { 
      loading: () => <Typography>A map is loading</Typography>,
      ssr: false // This line is important. It's what prevents server-side render
    }
    
	
  ), [/* list variables which should trigger a re-render here */])
 
  return (
<MainLayout>
  <Box sx={{flexGrow: 1 }}>
  <Container maxWidth="lg">
  <Grid container spacing={3}>
		<Grid item xs={12}>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleBackButtonClick}
        style={{marginTop: 32}}
      >
        ย้อนกลับ
      </Button>
    </Grid>
    </Grid>
        <Paper elevation={3} style={{ padding: 2, marginTop: 16, marginBottom: 64 }}>
          <Grid
            container
            spacing={3}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid
              item
              container
              xs={isSmallDevice ? 12 : 6}
              alignItems="center"
            >
              {isSmallDevice ? (
                <PinDropIcon style={{ fontSize: "1.5rem", marginLeft: "8px" }} />
              ) : (
                <PinDropIcon style={{ fontSize: "2.5rem", marginLeft: "16px" }} />
              )}
              <Typography variant="h5" style={{ marginLeft: "16px" }}>
                ข้อมูลกลุ่มผู้ผลิตหรือร้านค้า ในมุมมองแผนที่
              </Typography>
            </Grid>
            <Grid
              item
              container
              style= {{padding: "24px"}}
              xs={isSmallDevice ? 12 : 6}
              justifyContent="flex-end"
            >
            
            </Grid>
          
          </Grid>
          <Divider />
          <Box p={4}>
           
         
          <Paper style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px', padding: 4,  background: 'none', boxShadow: 'none'   }}>
  <GroupMap groupData={groupData.groupDataArray} />
  
</Paper>

<Grid container spacing={3} alignItems="center" style={{padding: 16,}}>
    <Grid item xs={12} sm={6}>
      <Box display="flex" justifyContent="flex-end">
        <FacebookShareButton url={shareUrl} quote={shareTitle}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <TwitterShareButton url={shareUrl} title={shareTitle}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <LinkedinShareButton url={shareUrl} title={shareTitle}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
      </Box>
    </Grid>
  </Grid>



          </Box>
        </Paper>
      </Container>

  </Box>
</MainLayout>


  )

  // return (
    
  //     <Map places={places} />
  //   // <div>Welcome to homepage
  //   // </div>

  // )
}

export default GroupMapPage