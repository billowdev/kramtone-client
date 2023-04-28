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
                  width: isSmallDevice ? '100%': '80%',
                  height: isSmallDevice ? '70vh':'100vh',
                  boxShadow:
                    '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
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
              <Typography variant="body1" style={{ marginRight: '16px' }}>
                แผ่นเทียบสี (Color Matching Chart)
              </Typography>
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
