import React, { useState, useEffect } from 'react';
import { Box, Paper, Tabs, Tab, Button, Grid, Card, CardContent, Typography  } from '@mui/material';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from 'react-share';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Image from "next/image"
import {ColorSchemePayload} from "@/models/color-scheme.model"
import * as colorSchemeService from "@/services/color-scheme.service"
import MainLayout from '@/components/MainLayout';
import { styled } from "@mui/material/styles";
import router from "next/router";
import Link from "next/link"
const CustomTab = styled(Tab)(({ theme }) => ({
	border: `1px solid ${theme.palette.divider}`,
	borderBottom: "none",
	borderRadius: "4px 4px 0 0",
	"&.Mui-selected": {
	  backgroundColor: theme.palette.primary.main,
	  color: theme.palette.primary.contrastText,
	  borderBottom: "1px solid transparent",
	},
  }));
const NaturalColorTonesPage = () => {
  const theme = useTheme();
  const [tabIndex, setTabIndex] = useState(0);
  const isSmallDevice = useMediaQuery(theme.breakpoints.down("xs"));
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const [colorSchemes, setColorSchemes] = useState<ColorSchemePayload[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const payload = await colorSchemeService.getAllColorScheme();
        setColorSchemes(payload);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);
 
  const renderColorSchemeTab = () => {
    return (
      <Box p={2}>
      <Grid container spacing={3}>
    <Grid item xs={12}>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "row", gap: "16px" }}>
        {isSmallDevice ? (
          <ColorLensIcon sx={{ fontSize: "1.5rem", marginLeft: "8px" }} />
        ) : (
          <ColorLensIcon sx={{ fontSize: "2.5rem", marginLeft: "16px" }} />
        )}
        <Typography
          variant={isSmallDevice ? "subtitle1" : "h5"}
          sx={{
            fontWeight: "bold",
            alignSelf: "center",
          }}
        >
          หน้าข้อมูลโทนสี
        </Typography>
      </Paper>
    </Grid>
  </Grid>
	<Grid container spacing={2}>
	{colorSchemes.map((scheme: any) => (
	  <Grid key={scheme.id} item xs={12} sm={6}>
		<Card sx={{ display: 'flex' }}>
		  <div
			style={{
			  width: 50,
			  backgroundColor: scheme.hex,
			}}
		  />
		  <CardContent>
			<Typography variant="h5">{scheme.nameEN}</Typography>
			<Typography variant="subtitle1">{scheme.nameTH}</Typography>
			<Typography variant="subtitle2">{scheme.hex}</Typography>
		  </CardContent>
		</Card>
	  </Grid>
	))}
  </Grid>
  </Box>
    )
  };

  const renderHistoryOfColorScheme = () => {
    return (
      <React.Fragment>
      <Typography variant={ isSmallDevice ? 'h6': 'h4'} style={{padding: 16}} gutterBottom>
        แผนภาพโทนสีครามธรรมชาติ (Color Scheme of Natural Indigo Dye)
      </Typography>
      <Card style={{ background: 'none', boxShadow: 'none' }}>
        <CardContent>
          <Grid container spacing={isSmallDevice? 1:2}>
            <Grid item xs={12} md={6}>
              <div
                style={{
                  position: 'relative',
                  width: isSmallDevice ? '100%': '90%',
                  height: isSmallDevice ? '70vh':'100vh',
                  boxShadow:
                    '0 4px 6px rgba(0, 0, 0.1, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
                }}
              >
                <Image
                  src="/static/img/fig-25-88-color-scheme-of-natural-indigo-dye.png"
                  alt="Color Scheme of Natural Indigo Dye"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom>
                แผ่นเทียบสี (Color Matching Chart)
              </Typography>

              <Box style={{ marginRight: '24px' }}> 
              <Typography variant="body1" >
                แผ่นเทียบสี (Color Matching Chart)
                แผนภาพโทนสีครามธรรมชาติ กรรณิการ์ กมลรัตน์ & Indigo4.0 Plus (2564: ออนไลน์) เป็นแผนภาพสำหรับใช้ประโยชน์ในการกำหนดโทนสี โดยได้เก็บรวบรวมข้อมูลผ้าย้อมครามในจังหวัดสกลนคร 
                ทั้งที่ทอด้วยฝ้ายเข็นมือ และฝ้ายเรยอน มาจัดทำมาตรฐานโทนสีผ้าย้อมครามธรรมชาติโดยใช้เทคนิคการประมวลผลภาพซึ่งเป็นการนำภาพถ่ายผ้าย้อมครามธรรมชาติเข้าสู่คอมพิวเตอร์ 
                และผ่านโปรแกรมคอมพิวเตอร์ตามเทคนิคการประมวลผลภาพ เพื่อให้ได้มาซึ่งเฉดสีหรือโทนสีต่าง ๆ ของผ้าย้อมครามให้มีความถูกต้องมากที่สุดไม่ว่าจะเป็นค่า RGB CMYK ต่าง ๆ 
                แล้วนำมาพิมพ์จัดทำเป็นแผ่นเทียบสี (Color Matching Chart) สุกัญญา พงษ์สุภาพ และ กรรณิการ์ กมลรัตน์ (2564) 
                เพื่อให้กลุ่มผู้ผลิตผ้าย้อมครามธรรมชาติใช้ในการเทียบสีและกำหนดโทนสีของผ้าย้อมครามธรรมชาติแต่ละผืนที่ผลิตได้ 
                และใช้ในการสื่อสารกับผู้จัดจำหน่ายและผู้บริโภค โดยใช้ร่วมกับสติกเกอร์สีผ้าย้อมคราม 
                ซึ่งได้ออกแบบไว้ให้ผู้ผลิตใช้ติดที่ผืนผ้าหรือแถบป้ายกำกับสินค้า เพื่อระบุข้อมูลสีของผืนผ้าหรือสินค้า 
                และใช้เป็นเครื่องมือหรือสื่อในการสื่อสารต่อไปยังผู้จัดจำหน่ายตลอดจนถึงผู้บริโภคขั้นสุดท้าย 
                ซึ่งจะช่วยให้การสื่อสารสีครามธรรมชาติมีประสิทธิภาพ มีสื่อกลางที่เป็นมาตรฐานเดียวกันในการทำความเข้าใจได้อย่างชัดเจน ถูกต้องตรงกัน 
                ตลอดสายอย่างครบวงจรตั้งแต่ผู้ผลิตจนถึงผู้บริโภค
สำหรับการพัฒนาระบบบริหารจัดการการเชื่อมโยงแผนภาพโทนสีครามธรรมชาติกับแหล่งผลิตผ้าย้อมคราม ผู้จัดทำได้ใช้โทนสีตัวอย่างทั้ง 25 สีตามแผ่นเทียบสีชุด 04-1 สกลคราม 25/88 ซึ่งมีการแบ่งเป็น 6 โทนหลัก แต่ละโทนจะมีเฉดสีย่อยประกอบไปด้วยภาพสีและรหัสสี 
ดังภาพ


              </Typography>
         
              <Typography style={{marginTop:"16px"}}>
  ที่มา:
</Typography>
<Typography style={{marginTop:"16px"}}>
  กรรณิการ์ กมลรัตน์ & Indigo4.0 Plus. (2564). EP.10 แนะนำเครื่องมือตรวจวัดเฉดสีผ้าย้อมครามธรรมชาติของจังหวัดสกลนคร โดย ผศ. กรรณิการ์ กมลรัตน์ [วิดีโอ]. ยูทูบ. 
  <Link href="https://www.youtube.com/watch?v=yJcFUHt9vbc&t" passHref > https://www.youtube.com/watch?v=yJcFUHt9vbc&t</Link>
</Typography>
<Typography style={{marginTop:"16px"}}>
  สุกัญญา พงษ์สุภาพ และ กรรณิการ์ กมลรัตน์. (2564). แผนภาพโทนสีครามธรรมชาติ (Color Scheme of Natural Indigo Dye). ลิขสิทธิ์ประเภทวรรณกรรม ทะเบียนเลขที่ ว.045785. 
  แจ้งข้อมูลลิขสิทธิ์ไว้ต่อ กรมทรัพย์สินทางปัญญา เมื่อวันที่ 15 มิถุนายน 2564.
</Typography>
              </Box>
           

            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </React.Fragment>
    )
  };

  const handleBackButtonClick = () => {
    router.back()
	
  };

  const shareUrl = 'https://www.kramtone.com/color-scheme';
  const shareTitle = 'ข้อมูลโทนสีธรรมชาติ';

  return (
    <MainLayout>
      <Box sx={{ flexGrow: 1, p: isSmallDevice? 1:4 }}>
        <Paper>
       
         <React.Fragment>
         <Box display="flex" justifyContent="space-between" alignItems="center" padding={1}>
            <h1>ข้อมูลโทนสีครามธรรมชาติ</h1>
          </Box>
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <CustomTab label="ข้อมูลโทนสี" />
            <CustomTab label="ข้อมูลแผนภาพโทนสีครามธรรมชาติ" />
          </Tabs>
          {tabIndex === 0 && renderColorSchemeTab()}
          {tabIndex === 1 && renderHistoryOfColorScheme()}
          <Box display="flex" justifyContent="space-between" padding={2}>
            <Box display="flex" gap="8px">
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
            <Button variant="contained" color="primary" onClick={handleBackButtonClick}>
              กลับสู่ก่อนหน้า
            </Button>
          </Box>
         </React.Fragment>
      
        </Paper>

        
      </Box>
    </MainLayout>
  );
};

export default NaturalColorTonesPage;
