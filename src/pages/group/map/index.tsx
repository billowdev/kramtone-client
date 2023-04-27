import React from 'react'
import dynamic from "next/dynamic";
import { groupDataSelector } from '@/store/slices/group-data.slice';
import MainLayout from "@/components/MainLayout"

import { useAppDispatch } from "@/store/store";
import { getAllGroupDataAction } from '@/store/slices/group-data.slice';
import { useSelector } from 'react-redux';
import { Box, Paper, Typography, Button, AppBar, Toolbar, IconButton, Grid} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

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
	
	const dispatch = useAppDispatch()
	React.useEffect(()=>{
	  dispatch(getAllGroupDataAction());
	}, [dispatch])
  
	const groupData = useSelector(groupDataSelector)
	const shareUrl = `https://www.kramtone.com/group/map`;
	const shareTitle = `Kramtone เชื่อมโยงสินค้าผ้าครามกับแผนภาพโทนสีครามธรรมชาติ`;
	
  // const Map = dynamic(() => import("./map"), { ssr: false });

  // console.log('====================================');
  // console.log(groupData);
  // console.log('====================================');
  function handleBackButtonClick() {
	window.history.back();
  }
  const GroupMap = React.useMemo(() => dynamic(
    () => import('./map'), // replace '@components/map' with your component's location
    { 
      loading: () => <Typography>A map is loading</Typography>,
      ssr: false // This line is important. It's what prevents server-side render
    }
    
	
  ), [/* list variables which should trigger a re-render here */])
  return (
<MainLayout>
  <Box
    sx={{
      padding: 2,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center'
    }}
  >
    {/* <IconButton edge="start" color="inherit" aria-label="ย้อนกลับ" onClick={handleBackButtonClick}>
      <ArrowBackIcon /> ย้อนกลับ
    </IconButton> */}
      <Button variant="contained" color="primary" onClick={handleBackButtonClick}>
            กลับสู่ก่อนหน้า
          </Button>
    <Typography variant="h5" style={{padding: 16}}>
      ข้อมูลกลุ่มผู้ผลิตหรือร้านค้า ในมุมมองแผนที่
    </Typography>

	<Paper style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px', padding: 16  }}>
  <GroupMap groupData={groupData.groupDataArray} />
  
</Paper>

<Grid container spacing={3} alignItems="center" style={{marginTop: 16}}>
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
</MainLayout>


  )

  // return (
    
  //     <Map places={places} />
  //   // <div>Welcome to homepage
  //   // </div>

  // )
}

export default GroupMapPage