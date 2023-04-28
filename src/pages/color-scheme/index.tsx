import React, { useState, useEffect } from 'react';
import { Box, Paper, Tabs, Tab, Button, Grid, Card, CardContent, Typography  } from '@mui/material';

import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from 'react-share';

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
  const [tabIndex, setTabIndex] = useState(0);

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
	<Box p={2}>
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
  };

  const renderHistoryOfColorScheme = () => {
	<Typography variant="h4">hello</Typography>
  };

  const handleBackButtonClick = () => {
    router.back()
	
  };

  const shareUrl = 'https://www.kramtone.com/color-scheme';
  const shareTitle = 'ข้อมูลโทนสีธรรมชาติ';

  return (
    <MainLayout>
      <Box sx={{ flexGrow: 1, p: 5 }}>
        <Paper>
          <Box display="flex" justifyContent="space-between" alignItems="center" padding={2}>
            <h1>ข้อมูลโทนสีธรรมชาติ</h1>
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
        </Paper>
      </Box>
    </MainLayout>
  );
};

export default NaturalColorTonesPage;
