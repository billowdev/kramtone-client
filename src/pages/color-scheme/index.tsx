import { useState } from 'react';
import { Box, Paper, Tabs, Tab, Button } from '@mui/material';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from 'react-share';
import MainLayout from '@/components/MainLayout';
import { styled } from "@mui/material/styles";

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

  const renderColorSchemeTab = () => {
    // TODO: Implement rendering of color scheme tab content
  };

  const renderHistoryOfColorScheme = () => {
    // TODO: Implement rendering of history of color scheme tab content
  };

  const handleBackButtonClick = () => {
    // TODO: Handle back button click
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
            <CustomTab label="ข้อมูลสินค้า" />
            <CustomTab label="ข้อมูลกลุ่มผู้ผลิตหรือร้านค้า" />
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
