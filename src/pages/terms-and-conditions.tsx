// pages/terms-and-conditions.tsx
import React from "react";
import Head from "next/head";
import { Container, Box, Typography, Paper  } from "@mui/material";
import { NextPage } from "next";
import { styled } from "@mui/system";
import MainLayout from "@/components/MainLayout";

const Root = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const PageTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const ContentPaper = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(2),
  }));

const TermsAndConditions: NextPage = () => {
  return (
    <MainLayout>
      <Head>
        <title>Terms and Conditions</title>
        <meta name="description" content="Terms and Conditions" />
      </Head>
      <Root maxWidth="md" style={{height:"100vh"}}>
        <PageTitle variant="h4" align="center" style={{padding:16}}>
         ข้อตกลงและเงื่อนไข (Terms and Conditions)
        </PageTitle>
		<ContentPaper>
        {/* Add your terms and conditions content here */}
        <Box>
          <Typography variant="h6" paragraph>
		  1. ยอมรับการใช้ข้อกำหนดและเงื่อนไขของ KRAMTONE
		            </Typography>
          <Typography variant="body1" paragraph>
		  การเข้าถึงและการใช้ KRAMTONE (แอป) ของคุณอยู่ภายใต้ข้อกำหนดและเงื่อนไขเหล่านี้เท่านั้น คุณจะไม่ใช้แอพเพื่อจุดประสงค์ใด ๆ ที่ผิดกฎหมายหรือห้ามโดยข้อกำหนดและเงื่อนไขเหล่านี้ เมื่อใช้แอป ถือว่าคุณยอมรับข้อกำหนด เงื่อนไข และคำปฏิเสธความรับผิดชอบที่มีอยู่ในประกาศนี้โดยสมบูรณ์ หากคุณไม่ยอมรับข้อกำหนดและเงื่อนไขเหล่านี้ คุณต้องหยุดใช้แอปทันที          </Typography>
        </Box>

		<Box>
          <Typography variant="h6" paragraph>
		  1. ยอมรับการใช้ข้อกำหนดและเงื่อนไขของ KRAMTONE
		            </Typography>
          <Typography variant="body1" paragraph>
		  การเข้าถึงและการใช้ KRAMTONE (แอป) ของคุณอยู่ภายใต้ข้อกำหนดและเงื่อนไขเหล่านี้เท่านั้น คุณจะไม่ใช้แอพเพื่อจุดประสงค์ใด ๆ ที่ผิดกฎหมายหรือห้ามโดยข้อกำหนดและเงื่อนไขเหล่านี้ เมื่อใช้แอป ถือว่าคุณยอมรับข้อกำหนด เงื่อนไข และคำปฏิเสธความรับผิดชอบที่มีอยู่ในประกาศนี้โดยสมบูรณ์ หากคุณไม่ยอมรับข้อกำหนดและเงื่อนไขเหล่านี้ คุณต้องหยุดใช้แอปทันที          </Typography>
        </Box>
		</ContentPaper>
      </Root>
    </MainLayout>
  );
};

export default TermsAndConditions;
