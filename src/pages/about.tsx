import MainLayout from "@/components/MainLayout";
import { Box, Container, Paper, Typography, Grid, Button } from "@mui/material";
import React from "react";
import Image from "next/image";
import Iframe from "react-iframe";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from "react-share";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

type Props = {};

export default function AboutKramtone({}: Props) {
  const shareUrl = `https://www.kramtone.com`;
  const shareTitle = `Kramtone เชื่อมโยงสินค้าผ้าครามกับแผนภาพโทนสีครามธรรมชาติ`;

  const router = useRouter();

  const handleBackButtonClick = () => {
    router.back();
  };
  return (
    <MainLayout>
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          เกี่ยวกับ
        </Typography>
        <Paper>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <Image
                src="/static/img/logo.png"
                alt="kramtone logo"
                width={250}
                height={250}
              />
            </Grid>
			<Grid item xs={12} sm={8} md={6} lg={4}>
              <Typography variant="body1" gutterBottom sx={{padding: 2}}>
			  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;เพื่อยกระดับผ้าย้อมครามในจังหวัดสกลนครให้เป็นที่รู้จักแพร่หลาย ง่ายต่อการเข้าถึง 
ช่วยให้กลุ่มผู้ผลิตหรือร้านค้ากับลูกค้าหรือผู้ที่สนใจในผ้าย้อมครามสามารถสื่อสารกันได้ง่ายขึ้น ผู้พัฒนาจึงได้นำเทคโนโลยีเว็บมาพัฒนาระบบ ซึ่งเป็นเว็บแอปพลิเคชันเพื่อเชื่อมโยงแผนภาพโทนสีครามธรรมชาติกับแหล่งผลิตผ้าย้อมคราม ให้กลุ่มผู้ผลิตหรือร้านค้า
 และลูกค้าหรือผู้ที่สนใจในผ้าย้อมครามมีความเข้าใจในแผนภาพโทนสีธรรมชาติมากขึ้น <br />  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
 อีกทั้งยังเป็นช่องทางหนึ่งเพื่อให้ลูกค้าหรือผู้ที่สนใจ ในสินค้าผ้าย้อมครามจังหวัดสกลนคร สามารถเลือกดูข้อมูลสินค้าต่าง ๆ ที่เกิดจากการย้อมผ้าย้อมคราม เช่น ผ้าคลุมไหล่ ผ้าพันคอ ผ้าผืน ผ้าถุง เป็นต้น เพื่อประกอบการตัดสินใจในการเลือกซื้อสินค้า และยังเป็นการเชื่อมโยงสินค้าจากชุมชนไปสู่ตลาดทั้งในประเทศและต่างประเทศ

              </Typography>
            </Grid>
          </Grid>

          <Box display="flex" justifyContent="center" padding={2}>
            <Typography variant="h3" gutterBottom>
              ข้อมูลผู้พัฒนา
            </Typography>
          </Box>

          <Box display="flex" justifyContent="center" padding={2}>
            <Paper sx={{ height: "86vh", width: "80%" }}>
              <Iframe
                url="https://www.billowdev.com"
                width="100%"
                height="100%"
                id="myId"
              />
            </Paper>
          </Box>
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
            <Button
              variant="contained"
              color="primary"
              onClick={handleBackButtonClick}
            >
              กลับสู่ก่อนหน้า
            </Button>
          </Box>
        </Paper>
      </Box>
    </MainLayout>
  );
}
