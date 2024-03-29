// pages/terms-and-conditions.tsx
import React from "react";
import Head from "next/head";
import { Container, Box, Typography, Paper } from "@mui/material";
import { NextPage } from "next";
import { styled } from "@mui/system";
import MainLayout from "@/components/MainLayout";
import Link from "next/link";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";

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

interface useStyleProps {
  isSmallDevice: any
}

const useStyles = makeStyles((theme) => ({
  topic: {
    fontWeight: "bold",
  },
  p1: {
    marginLeft: (props: useStyleProps) => (props.isSmallDevice ? 0 : 16),
  },
  p1Extra: {
    marginLeft: (props:useStyleProps) => (props.isSmallDevice ? 0 : 16),
    fontWeight: "bold",
  },
  p2: {
    marginLeft: (props:useStyleProps) => (props.isSmallDevice ? 16 : 32),
  },
  p3: {
    marginLeft: (props:useStyleProps) => (props.isSmallDevice ? 16 : 48),
  },
  p3Start: {
    marginLeft: (props:useStyleProps) => (props.isSmallDevice ? 16 : 48),
    marginTop: 16,
  },
  p4: {
    marginLeft: (props:useStyleProps) => (props.isSmallDevice ? 32 : 80),
  },
  PageTitle: {
    padding: 16,
    fontWeight: "bold",
  },
  ContentPaper: {
    padding: (props:useStyleProps) => (props.isSmallDevice ? 16 : 64),
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
}));

const TermsAndConditions: NextPage = () => {
  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down("xs"));
  const classes = useStyles({ isSmallDevice });

  return (
    <MainLayout>
      <Head>
        <title>
          {" "}
          ข้อกำหนดและเงื่อนไขการใช้งานเว็บไซต์ (Terms and Conditions)
        </title>
        <meta
          name="description"
          content="ข้อกำหนดและเงื่อนไขการใช้งานเว็บไซต์ (Terms and Conditions)"
        />
      </Head>
       {/* 
       PARA00
       PARA01
       PARA02
       PARA03
       PARA04
       PARA05
       PARA06
       PARA07
       PARA08
       PARA09
       PARA10
       PARA11
       PARA12
       PARA13
       PARA14
       PARA15
       PARA16
       PARA17
       PARA18
       PARA19
       PARA20
         */}
      <Root maxWidth="md">
        <PageTitle
          variant="h4"
          align="center"
          className={classes.PageTitle}
        >
          ข้อกำหนดและเงื่อนไขการใช้งานเว็บไซต์ <br /> (Terms and Conditions)
        </PageTitle>
        <ContentPaper className={classes.ContentPaper}>
          {/* PARA00  */}
          <Box>
            {/* <Typography variant="body1" paragraph>
			นโยบายความเป็นส่วนตัวสำหรับการใช้งาน
            </Typography> */}
            <Typography variant="body1" paragraph>
            {!isSmallDevice && <React.Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</React.Fragment>}ข้อกำหนดและเงื่อนไขการใช้งานเว็บไซต์ฉบับนี้
              ซึ่งต่อไปในข้อกำหนดฉบับนี้จะเรียกว่า &quot;ข้อกำหนด&quot;
              บังคับใช้ครั้งแรกเมื่อวันที่ 1 พฤษภาคม 2566 โดยมีรายละเอียด
              ดังต่อไปนี้
            </Typography>
          </Box>


          {/* PARA01  */}
          <Box>
            <Typography variant="h5" paragraph className={classes.topic}>
              ข้อ 1 คำนิยาม
            </Typography>
            <Typography variant="body1" paragraph>
              ภายในข้อกำหนดฉบับนี้
            </Typography>

            <Typography
              variant="body1"
              paragraph
              className={classes.p1}
            >
              (ก) &quot;เว็บไซต์&quot; หมายความว่า เว็บไซต์ ชื่อว่า kramtone
              และมีที่อยู่เว็บไซต์ที่{" "}
              <Link
                href="https://www.kramtone.com"
                target="_blank"
                rel="noopener noreferrer"
               className={classes.link}
              >
                https://www.kramtone.com
              </Link>
              &nbsp; ซี่งดำเนินการและให้บริการในลักษณะ ดังต่อไปนี้
            </Typography>

            <Typography
              variant="body1"
              paragraph
              className={classes.p2}
            >
              {!isSmallDevice && <React.Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</React.Fragment>}ระบบบริหารจัดการการเชื่อมโยงแผนภาพโทนสีครามธรรมชาติกับแหล่งผลิตผ้าย้อมคราม
              เพื่อยกระดับผ้าย้อมครามในจังหวัดสกลนครให้เป็นที่รู้จักแพร่หลาย
              ง่ายต่อการเข้าถึง
              ช่วยให้กลุ่มผู้ผลิตหรือร้านค้ากับลูกค้าหรือผู้ที่สนใจในผ้าย้อมครามสามารถสื่อสารกันได้ง่ายขึ้น
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p1}
            >
              (ข) &quot;เจ้าของเว็บไซต์&quot; หมายความว่า BillowDev
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p1}
            >
              (ค) &quot;ผู้ใช้งาน&quot; หมายความว่า ผู้เยี่ยมชม ผู้ใช้ สมาชิก
              ของเว็บไซต์ หรือบุคคลอื่นใดที่เข้าถึงเว็บไซต์ ไม่ว่าการเยี่ยมชม
              การใช้ การเป็นสมาชิก หรือการเข้าถึงนั้นจะกระทำด้วยวิธีใด ลักษณะใด
              ผ่านอุปกรณ์ใด ผ่านช่องทางใด และไม่ว่ามีค่าใช้จ่ายหรือไม่ก็ตาม
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p1}
            >
              (ง) &quot;ข้อมูลส่วนบุคคล&quot; หมายความว่า ข้อมูลใดๆ
              ก็ตามไม่ว่าของผู้ใช้งานหรือบุคคลอื่นใดที่สามารถใช้ในการระบุตัวตนของบุคคลนั้นได้
              ไม่ว่าทางตรงหรือทางอ้อม
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p1}
            >
              (จ) &quot;เนื้อหา&quot; หมายความว่า ข้อความ บทความ ความคิดเห็น
              บทวิเคราะห์ รูปภาพ สัญลักษณ์ เครื่องหมาย รูปภาพประดิษฐ์ ภาพถ่าย
              ภาพเคลื่อนไหว ภาพยนต์ เสียง สิ่งบันทึกเสียง การออกแบบ คำสั่ง
              ชุดคำสั่ง หรือการสื่อสารไม่ว่าในลักษณะใดและวิธีใดๆ ในเว็บไซต์
              และไม่ว่าเนื้อหานั้นจะมีการจำกัดการเข้าถึงหรือไม่ก็ตาม
            </Typography>
          </Box>

          {/* PARA02  */}
          <Box>
            <Typography variant="h5" paragraph className={classes.topic}>
              ข้อ 2 การอนุญาตให้ใช้งานเว็บไซต์
            </Typography>
            <Typography variant="body1" paragraph>
            {!isSmallDevice && <React.Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</React.Fragment>}โดยที่เจ้าของเว็บไซต์ได้เปิดให้ใช้งานซึ่งเว็บไซต์
              ตามข้อกำหนดฉบับนี้
              และผู้ใช้งานมีความประสงค์จะใช้งานเว็บไซต์ดังกล่าว
              โดยในการใช้งานเว็บไซต์
              ผู้ใช้งานได้อ่านและเข้าใจข้อความและเงื่อนไขต่างๆ
              แห่งข้อกำหนดฉบับนี้โดยละเอียดตลอดดีแล้ว
              และตกลงตามเงื่อนไขที่กำหนดไว้ในข้อกำหนดฉบับนี้แล้วทั้งสิ้น
              ในการนี้ เจ้าของเว็บไซต์จึงอนุญาตให้ผู้ใช้งาน ใช้งานเว็บไซต์
              ภายใต้เงื่อนไขแห่งข้อกำหนดฉบับนี้
            </Typography>
          </Box>

          {/* PARA03  */}
          <Box>
            <Typography variant="h5" paragraph className={classes.topic}>
              ข้อ 3 ข้อแนะนำการใช้งาน
            </Typography>
            <Typography variant="body1" paragraph>
            {!isSmallDevice && <React.Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</React.Fragment>}ในการใช้งานเว็บไซต์ของผู้ใช้งาน
              เพื่อให้เกิดประสิทธิภาพและประสบการณ์การใช้งานที่สูงสุดของผู้ใช้งาน
              ผู้ใช้งานอาจใช้งานเว็บไซต์ ตามที่ เจ้าของเว็บไซต์ กำหนด
              ดังต่อไปนี้
            </Typography>

            <Typography variant="body1" paragraph              
             className={classes.p1}
>
              (ก) ผู้ใช้งานทั่วไป
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p2}
            >
              (1) สามารถสมัครสมาชิกได้
              <br /> (2) สามารถค้นหาสินค้าผ้าย้อมครามด้วยโทนสีครามธรรมชาติได้
              <br /> (3) สามารถค้นหาสินค้าด้วยประเภทสินค้าได้
              <br /> (4) สามารถดูข้อมูลโทนสีครามธรรมชาติได้
              <br /> (5) สามารถดูสินค้าผ้าย้อมครามได้
              <br /> (6) สามารถดูข้อมูลกลุ่มผู้ผลิตหรือร้านค้าต่าง ๆ ได้
              <br /> (7) สามารถดูสินค้าผ้าย้อมครามตามประเภทสินค้าได้
              <br /> (8) สามารถดูสินค้าผ้าย้อมครามตามโทนสีครามธรรมชาติได้
              <br /> (9) สามารถดูข้อมูลแผนที่กลุ่มผู้ผลิตหรือร้านค้าได้
            </Typography>

            <Typography variant="body1" paragraph  
            className={classes.p1}>
              (ข) กลุ่มผู้ผลิตหรือร้านค้า
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p2}
            >
              (1) สามารถเข้าสู่ระบบได้
              <br /> (2) สามารถจัดการข้อมูลโปรไฟล์ได้
              <br /> (3) สามารถจัดการข้อมูลสินค้าได้
              <br /> (4) สามารถจัดการข้อมูลประเภทสินค้าได้
              <br /> (5) สามารถเพิ่มโทนสีครามธรรมชาติให้กับสินค้าได้
              <br /> (6) สามารถปักหมุดที่อยู่ได้
              <br /> (7) สามารถค้นหาสินค้าผ้าย้อมครามด้วยโทนสีครามธรรมชาติได้
              <br /> (8) สามารถค้นหาสินค้าด้วยประเภทสินค้าได้
              <br /> (9) สามารถดูข้อมูลแผนภาพโทนสีครามธรรมชาติได้
              <br /> (10) สามารถดูสินค้าผ้าย้อมครามได้
              <br /> (11) สามารถดูข้อมูลกลุ่มผู้ผลิตหรือร้านค้าต่าง ๆ ได้
              <br /> (12) สามารถดูสินค้าผ้าย้อมครามตามประเภทสินค้าได้
              <br /> (13) สามารถดูสินค้าผ้าย้อมครามตามโทนสีครามธรรมชาติได้
              <br /> (14) สามารถดูข้อมูลแผนที่กลุ่มผู้ผลิตหรือร้านค้าได้
              <br /> (15) สามารถดูช่องทางการติดต่อผู้ดูแลระบบได้
              <br /> (16) สามารถออกจากระบบได้
            </Typography>
          </Box>

          {/* PARA04  */}
          <Box>
            <Typography variant="h5" paragraph className={classes.topic}>
             ข้อ 4 การใช้งานเว็บไซต์
            </Typography>
            <Typography variant="body1" paragraph>
            {!isSmallDevice && <React.Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</React.Fragment>}
ในการใช้งานเว็บไซต์ของผู้ใช้งาน ผู้ใช้งานตกลงจะใช้งานเว็บไซต์
              ดังต่อไปนี้ โปรแกรมค้นดูเว็บ (Web Broowser) ที่เข้ากันได้ 
            </Typography>

            <Typography variant="body1" paragraph className={classes.p3}>
              Edge 18+
              <br /> Firefox 60+ (includes Firefox ESR)
              <br /> Chrome 61+
              <br /> Safari 10.1+
              <br /> Opera 48+
              <br /> iOS Safari 10.3+
            </Typography>
          </Box>

          {/* PARA05  */}
          <Box>
            <Typography variant="h5" paragraph className={classes.topic}>
              ข้อ 5 ข้อห้ามการใช้งานเว็บไซต์
            </Typography>
            <Typography variant="body1" paragraph>
            {!isSmallDevice && <React.Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</React.Fragment>}
ไม่ว่าในกรณีใดๆ ในการใช้งานเว็บไซต์ของผู้ใช้งาน
              ผู้ใช้งานตกลงจะไม่ใช้งานเว็บไซต์ ไม่ว่าโดยตรง หรือโดยอ้อม
              ไปในลักษณะใด ลักษณะหนึ่ง ดังต่อไปนี้
            </Typography>

            <Typography
              variant="body1"
              paragraph
              className={classes.p2}
            >
              (ก) กระทำการใดๆ ที่ขัดต่อกฎหมาย คำพิพากษาศาล หรือคำสั่งของรัฐบาล
              หรือหน่วยงานที่ใช้อำนาจรัฐ
            </Typography>

            <Typography
              variant="body1"
              paragraph
              className={classes.p2}
            >
              (ข) กระทำการใดๆ ที่อาจขัดต่อความสงบเรียบร้อยหรือจารีตประเพณี
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p2}
            >
              (ค) กระทำการใดๆ อันเป็นการละเมิดทรัพย์สินทางปัญญา ลิขสิทธิ์
              เครื่องหมายการค้า สิทธิบัตร สิทธิในชื่อเสียง สิทธิส่วนบุคคล
              และสิทธิอื่นใดของเจ้าของเว็บไซต์ หรือบุคคลอื่น
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p2}
            >
              (ง) กระทำการใดๆ ที่นำไปสู่การเก็บรวบรวม
              การเปิดเผยหรือการใช้ซึ่งข้อมูลส่วนบุคคล โดยไม่ชอบด้วยกฎหมาย
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p2}
            >
              (จ) กระทำการใดๆ ที่รบกวนการทำงานของระบบแม่ข่าย ชุดคำสั่ง
              หรือระบบเครือข่ายของเว็บไซต์ และ
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p2}
            >
              (ฉ) กระทำการใดๆ ที่มีลักษณะ ดังนี้
              <Typography
                variant="body1"
                paragraph
                className={classes.p2}
              >
                            {!isSmallDevice && <React.Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</React.Fragment>}
ห้ามผู้ใช้งานอัปโหลดรูปภาพหรือสื่อลามกอนาจารที่ไม่เหมาะสมเข้าสู่ระบบเว็บไซต์ของเรา
                หากเราพบเห็นข้อมูลใดๆที่ไม่เหมาะสมตามความเห็นของทีมงาน
                เราขอสงวนสิทธิ์ในการลบบัญชีผู้ใช้ที่กระทำการดังกล่าวออกจากระบบทันที
                โดยไม่ต้องแจ้งให้ทราบล่วงหน้า
              </Typography>
            </Typography>
          </Box>

          {/* PARA06  */}
          <Box>
            <Typography variant="h5" paragraph className={classes.topic}>
              ข้อ 6 บัญชีผู้ใช้
            </Typography>
            <Typography variant="body1" paragraph>
            {!isSmallDevice && <React.Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</React.Fragment>}
ในการใช้งานเว็บไซต์
              เจ้าของเว็บไซต์อาจจัดให้มีบัญชีผู้ใช้ของแต่ละผู้ใช้
              ตามที่ผู้ใช้งานร้องขอในแต่ละคราว โดยที่เจ้าของเว็บไซต์
              มีสิทธิแต่เพียงผู้เดียวในการ อนุมัติเปิดบัญชีผู้ใช้
              กำหนดประเภทบัญชีผู้ใช้
              กำหนดสิทธิการเข้าถึงข้อมูลของแต่ละประเภทบัญชีผู้ใช้ ค่าใช้จ่ายใดๆ
              เกี่ยวกับบัญชีผู้ใช้ หน้าที่
              ความรับผิดชอบของผู้ใช้งานซึ่งเป็นเจ้าของบัญชีผู้ใช้นั้นๆ
            </Typography>
            <Typography variant="body1" paragraph>
            {!isSmallDevice && <React.Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</React.Fragment>}
ทั้งนี้ ผู้ใช้งานตกลงจะเก็บรักษาชื่อบัญชีผู้ใช้ รหัสผ่าน
              และข้อมูลใดๆ ของตนไว้เป็นความลับอย่างเคร่งครัด
              และตกลงจะไม่ยินยอมให้
              รวมถึงตกลงจะใช้ความพยายามอย่างที่สุดในการป้องกันไม่ให้บุคคลอื่นใช้งานบัญชีผู้ใช้ของผู้ใช้งาน
            </Typography>

            <Typography variant="body1" paragraph>
            {!isSmallDevice && <React.Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</React.Fragment>}
ในกรณีที่มีการใช้บัญชีผู้ใช้ของผู้ใช้งานโดยบุคคลอื่น
              ผู้ใช้งานตกลงและรับรองว่าการใช้งานโดยบุคคลอื่นดังกล่าวได้กระทำในฐานะตัวแทนของผู้ใช้งานและมีผลผูกพันเสมือนหนึ่งผู้ใช้งานเป็นผู้กระทำการเองทั้งสิ้น
            </Typography>
          </Box>

          {/* PARA07  */}
          <Box>
            <Typography variant="h5" paragraph className={classes.topic}>
              ข้อ 7 การเก็บและใช้ข้อมูลส่วนบุคคลของผู้ใช้งาน
            </Typography>
            <Typography variant="body1" paragraph>
            {!isSmallDevice && <React.Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</React.Fragment>}
ในการใช้งานเว็บไซต์ ผู้ใช้งานรับทราบและตกลงให้ เจ้าของเว็บไซต์
              มีสิทธิจัดเก็บ ประมวลผล
              นำไปใช้ประโยชน์ซึ่งข้อมูลส่วนบุคคลของผู้ใช้งานที่ผู้ใช้งานให้ไว้แก่เจ้าของเว็บไซต์
              อันได้แก่ ข้อมูลส่วนบุคคล ดังต่อไปนี้
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p1}
            >
              ชื่อ นามสกุล เบอร์โทรศัพท์ และอีเมล
            </Typography>

            <Typography variant="body1" paragraph>
              โดยที่ข้อมูลส่วนบุคคลของผู้ใช้งานจะถูกนำไปใช้ในวัตถุประสงค์
              ดังต่อไปนี้
            </Typography>

            <Typography
              variant="body1"
              paragraph
              className={classes.p2}
            >
              (ก) สำหรับการศึกษาและวิเคราะห์ความต้องการของผู้ใช้งาน
              เพื่อนำเสนอสินค้าและบริการที่ตรงตามความต้องการของผู้ใช้
              ทำให้การใช้งานเว็บไซต์ของเรานั้นเป็นไปอย่างมีประสิทธิภาพและน่าสนใจยิ่งขึ้น
            </Typography>

            <Typography
              variant="body1"
              paragraph
              className={classes.p2}
            >
              (ข)
              สำหรับให้ข้อมูลประกอบสินค้าที่ผู้ใช้ได้ดำเนินการอัปโหลดขึ้นบนเว็บไซต์
              เพื่อเชื่อมโยงผลิตภัณฑ์กับกลุ่มผู้ผลิต
              ทำให้ผู้ที่สนใจสินค้าหรือบริการนั้น ๆ
              สามารถตัดสินใจในการติดต่อกลุ่มผู้ผลิตเพื่อขอข้อมูลเพิ่มเติม
              หรือสอบถามรายละเอียดเกี่ยวกับสินค้าและบริการที่เกี่ยวข้อง
              โดยไม่มีการขายสินค้าโดยตรงบนเว็บไซต์ของเรา
            </Typography>

            <Typography variant="body1" paragraph>
            {!isSmallDevice && <React.Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</React.Fragment>}โดยที่ผู้ใช้งานมีสิทธิเข้าถึง ลบ แก้ไข เปลี่ยนแปลง โอนย้าย ปฏิเสธ
              ข้อมูลส่วนบุคคลที่ให้ไว้แก่เจ้าของเว็บไซต์ได้ และไม่ว่าเวลาใด
              ผู้ใช้งาน
              อาจถอนความยินยอมการเก็บและใช้ข้อมูลส่วนบุคคลของผู้ใช้งานดังกล่าวได้ตราบเท่าที่ไม่ขัดต่อกฎหมายหรือสิทธิของเจ้าของเว็บไซต์
            </Typography>

            <Typography variant="body1" paragraph>
            {!isSmallDevice && <React.Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</React.Fragment>}ในกรณีที่
              เจ้าของเว็บไซต์นำข้อมูลส่วนบุคคลของผู้ใช้งานออกใช้ประโยชน์
              เจ้าของเว็บไซต์ ตกลงจะใช้ข้อมูลดังกล่าว
              ตราบเท่าที่ไม่ก่อให้เกิดความเสียหาย
              ความเดือดร้อนและความรำคาญแก่เจ้าของข้อมูล
              และจะไม่เปิดเผยข้อมูลดังกล่าวต่อบุคคลภายนอกในลักษณะที่อาจระบุตัวตนของผู้ใช้งานเจ้าของข้อมูลได้
              เว้นแต่ เป็นการใช้และเปิดเผยตามที่กฎหมายกำหนด
              หรือโดยคำสั่งของหน่วยงานที่บังคับใช้อำนาจของรัฐ
            </Typography>
          </Box>

          {/* PARA08  */}
          <Box>
            <Typography variant="h5" paragraph className={classes.topic}>
              ข้อ 8 คำรับรองและหน้าที่ของผู้ใช้งาน
            </Typography>
            <Typography variant="body1" paragraph>
            {!isSmallDevice && <React.Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</React.Fragment>}ในการใช้งานเว็บไซต์ของผู้ใช้งาน ผู้ใช้งานมีหน้าที่
              และให้คำรับรองต่อเจ้าของเว็บไซต์
              ว่าจะใช้ความพยายามอย่างที่สุดเพื่อปฏิบัติตามหน้าที่ของผู้ใช้งานและตลอดจนเงื่อนไขของข้อกำหนด
              ดังต่อไปนี้
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p2}
            >
              (ก) ผู้ใช้งานได้อ่านและเข้าใจข้อความและเงื่อนไขต่างๆ
              แห่งข้อกำหนดฉบับนี้โดยละเอียดตลอดดีแล้ว และโดยในการเข้าเยี่ยมชม
              ใช้งาน หรือการเป็นสมาชิกของเว็บไซต์
              ผู้ใช้งานตกลงตามเงื่อนไขที่กำหนดไว้ในข้อกำหนดฉบับนี้แล้วทั้งสิ้น
            </Typography>

            <Typography
              variant="body1"
              paragraph
              className={classes.p2}
            >
              (ข) ผู้ใช้งานเข้าใจและรับทราบดีว่าข้อกำหนดฉบับนี้
              เป็นสัญญาฉบับหนึ่งซึ่งมีผลผูกพันและสามารถคับใช้ได้ตามกฎหมายระหว่างเจ้าของเว็บไซต์
              และผู้ใช้งาน
            </Typography>

            <Typography
              variant="body1"
              paragraph
              className={classes.p2}
            >
              (ค) ผู้ใช้งานจะดำเนินการใดๆ อันจำเป็นและสมควร
              ให้พนักงานของผู้ใช้งาน ผู้รับจ้างช่วง ผู้ช่วย ที่ปรึกษา
              หรือตัวแทนใดๆ ของผู้ใช้งาน (ถ้ามี)
              ปฏิบัติตามข้อกำหนดฉบับนี้โดยเคร่งครัดด้วย
            </Typography>

            <Typography
              variant="body1"
              paragraph
              className={classes.p2}
            >
              (ง)
              ในกรณีที่มีบุคคลอื่นใช้สิทธิเรียกร้องหรือมีข้อเรียกร้องต่อผู้ใช้งาน
              หรือผู้ใช้งานถูกฟ้องร้องดำเนินคดีเกี่ยวกับหรือมีสาเหตุมาจากการใช้งานเว็บไซต์ของผู้ใช้งาน
              ผู้ใช้งานจะยุติข้อเรียกร้องด้วยค่าใช้จ่ายและความรับผิดชอบของผู้ใช้งานเอง
              และผู้ใช้งานตกลงจะปกป้องด้วยความพยายามอย่างที่สุด ไม่ให้
              เจ้าของเว็บไซต์เข้าไปเกี่ยวข้องในกระบวนการยุติข้อเรียกร้องดังกล่าว
            </Typography>

            <Typography
              variant="body1"
              paragraph
              className={classes.p2}
            >
              (จ) ในกรณีที่
              เจ้าของเว็บไซต์ต้องรับผิดในค่าเสียหายหรือค่าใช้จ่ายเกี่ยวกับหรือมีสาเหตุมาจากการใช้งานเว็บไซต์
              ของผู้ใช้งาน
              ผู้ใช้งานตกลงจะชดใช้ค่าเสียหายหรือค่าใช้จ่ายดังกล่าวให้แก่เจ้าของเว็บไซต์โดยสิ้นเชิง
            </Typography>
          </Box>

          {/* PARA09  */}
          <Box>
            <Typography variant="h5" paragraph className={classes.topic}>
              ข้อ 9 เนื้อหาของผู้ใช้งาน
            </Typography>
            <Typography variant="body1" paragraph>
            {!isSmallDevice && <React.Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</React.Fragment>}ในการใช้งานเว็บไซต์
              ผู้ใช้งานอาจสามารถแสดงเนื้อหาของผู้ใช้งานภายในเว็บไซต์ ได้
              ไม่ว่ามีการจำกัดสิทธิการเข้าถึงเนื้อหาหรือไม่ก็ตาม
              โดยผู้ใช้งานตกลงจะ
            </Typography>

            <Typography
              variant="body1"
              paragraph
              className={classes.p2}
            >
              (ก) ไม่แสดงเนื้อหาที่เป็นการละเมิดสิทธิของบุคคลอื่น
              ซึ่งรวมถึงแต่ไม่จำกัดเฉพาะ ลิขสิทธิ์ ธรรมสิทธิ์ สิทธิบัตร
              สิทธิในเครื่องหมายการค้า สิทธิในแบบผลิตภัณฑ์
              สิทธิในผลิตภัณฑ์อรรถประโยชน์ ความลับทางการค้า
              สิทธิในเกียรติยศชื่อเสียง สิทธิในภาพบุคคล สิทธิส่วนบุคคล
              และสิทธิในชื่อเสียง
            </Typography>

            <Typography
              variant="body1"
              paragraph
              className={classes.p2}
            >
              (ข)
              ไม่แสดงเนื้อหาที่ขัดต่อความสงบเรียบร้อยและศีลธรรมอันดีของประชาชน
              การสนับสนุนความรุนแรง และการกระทำผิดกฎหมาย
            </Typography>

            <Typography
              variant="body1"
              paragraph
              className={classes.p2}
            >
              (ค) ไม่แสดงเนื้อหาใดๆ ที่น่าสงสัย หยาบคาย หลอกลวง
              ล่อลวงหรือชี้แนะในลักษณะที่อาจเป็นเป็นอันตรายต่อผู้ใช้งานรายอื่น
              หรืออาจก่อให้เกิดการกระทำผิดกฎหมาย
            </Typography>

            <Typography
              variant="body1"
              paragraph
              className={classes.p2}
            >
              (ง)
              ไม่แสดงข้อมูลส่วนตัวหรือข้อมูลความลับที่เป็นของผู้อื่นโดยไม่ได้รับอนุญาตจากเจ้าของข้อมูล
            </Typography>

            <Typography
              variant="body1"
              paragraph
              className={classes.p2}
            >
              (จ) ไม่แสดงเนื้อหาที่เป็นเท็จ
              ไม่ว่าการแสดงเนื้อหาอันเป็นเท็จนั้นจะก่อให้เกิดความเสียหายต่อผู้อื่นหรือไม่ก็ตาม
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p2}
            >
              (ฉ) ไม่แสดงเนื้อหาที่นำไปสู่การเลือกปฏิบัติทางเชื้อชาติ ชาติกำเนิด
              สัญชาติ ศาสนา เพศ สถานภาพทางสังคม ฯลฯ
            </Typography>
          </Box>

          {/* PARA10  */}
          <Box>
            <Typography variant="h5" paragraph className={classes.topic}>
              ข้อ 10 การปฏิบัติผิดข้อกำหนดของผู้ใช้งาน
            </Typography>
            <Typography variant="body1" paragraph   className={classes.p1}>
              ในกรณี ดังต่อไปนี้
            </Typography>

            <Typography
              variant="body1"
              paragraph
              className={classes.p2}
            >
              (ก) ผู้ใช้งานฝ่าฝืนข้อกำหนดฉบับนี้
              คำรับรองของผู้ใช้งานที่ให้ไว้ในข้อกำหนดฉบับนี้
              หรือแนวทางปฏิบัติใดๆ
              ที่เจ้าของเว็บไซต์ได้แจ้งให้ผู้ใช้งานทราบไม่ว่าโดยทั่วไปหรือโดยเฉพาะเจาะจง
            </Typography>

            <Typography
              variant="body1"
              paragraph
              className={classes.p2}
            >
              (ข) ผู้ใช้งานใช้งานเว็บไซต์ ไปในวัตถุประสงค์ที่ผิดกฎหมาย
              ขัดต่อความสงบเรียบร้อยของสังคม
            </Typography>

            <Typography
              variant="body1"
              paragraph
              className={classes.p2}
            >
              (ค) ผู้ใช้งานกระทำการใดๆ ที่อาจก่อให้เกิดความเสียหายแก่เว็บไซต์
              เจ้าของเว็บไซต์ ผู้ใช้งานรายอื่นๆ หรือบุคคลภายนอก
            </Typography>

            <Typography
              variant="body1"
              paragraph
              className={classes.p2}
            >
              (ง) ผู้ใช้งานกระทำการใดๆ ที่
              เจ้าของเว็บไซต์พิจารณาเห็นว่าไม่เหมาะสม
            </Typography>
            <Typography variant="body1" paragraph   className={classes.p1}>
              เจ้าของเว็บไซต์ โดยดุลพินิจของเจ้าของเว็บไซต์แต่เพียงผู้เดียว
              อาจดำเนินการ ดังต่อไปนี้
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p2}
            >
              (ก)
              ส่งหนังสือเตือนอย่างเป็นทางการให้แก่ผู้ใช้งานแก้ไขและ/หรือยุติการกระทำพฤติกรรมดังกล่าว
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p2}
            >
              (ข) ระงับการใช้เว็บไซต์ของผู้ใช้งาน ภายในระยะเวลาใดระยะเวลาหนึ่ง
              โดยจะมีกำหนดระยะเวลาหรือไม่ก็ได้ โดยไม่ต้องแจ้งให้ทราบล่วงหน้า และ
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p2}
            >
              (ค) ยกเลิกสิทธิการใช้หรือการเข้าถึง เว็บไซต์ของผู้ใช้งาน
              โดยไม่ต้องแจ้งให้ทราบล่วงหน้า ในกรณีที่ เจ้าของเว็บไซต์
              ระงับการใช้งานหรือยกเลิกสิทธิการใช้ หรือการเข้าถึงเว็บไซต์
              ตามข้อกำหนดฉบับนี้ ผู้ใช้งานรับทราบและตกลงว่า เจ้าของเว็บไซต์
              ไม่มีความรับผิดสำหรับความสูญเสีย ความเสียหาย ข้อเรียกร้อง
              ความรับผิด ค่าใช้จ่ายใดๆ
              ที่เกิดจากหรือเกี่ยวข้องกับการดำเนินการดังกล่าวตามข้อกำหนดฉบับนี้
            </Typography>
          </Box>

          {/* PARA11  */}
          <Box>
            <Typography variant="h5" paragraph className={classes.topic}>
              ข้อ 11 ความพร้อมใช้งานของเว็บไซต์
            </Typography>
            <Typography variant="body1" paragraph>
            {!isSmallDevice && <React.Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</React.Fragment>}
            ผู้ใช้งานตกลงและทราบดีว่า
              เจ้าของเว็บไซต์อาจระงับการใช้งานเว็บไซต์ไม่ว่าทั้งหมดหรือแต่บางส่วน
              ไม่ว่าเป็นการชั่วคราวหรือถาวร
              โดยไม่มีหน้าที่ต้องชดเชยความเสียหายใดๆ ที่อาจเกิดขึ้นแก่ผู้ใช้งาน
              ในกรณี ดังต่อไปนี้
            </Typography>

            <Typography
              variant="body1"
              paragraph
              className={classes.p2}
            >
              (ก) การบำรุงรักษาเครื่องมือ
              และอุปกรณ์ที่จำเป็นในการเปิดให้ใช้งานเว็บไซต์
              อันรวมถึงแต่ไม่จำกัดเพียง การบำรุงรักษาระบบแม่ข่าย (Server
              Maintenance)
            </Typography>

            <Typography
              variant="body1"
              paragraph
              className={classes.p2}
            >
              (ข)
              การปรับปรุงและพัฒนาระบบชุดคำสั่งที่เกี่ยวข้องกับการเปิดให้ใช้งาน
              เว็บไซต์ อันรวมถึงแต่ไม่จำกัดเพียง การปรับปรุงชุดคำสั่งของเว็บไซต์
              (Update) การปรับปรุงชุดคำสั่งของระบบ (Firmware Update)
            </Typography>

            <Typography
              variant="body1"
              paragraph
              className={classes.p2}
            >
              (ค) เครื่องมือ อุปกรณ์
              หรือระบบชุดคำสั่งที่เกี่ยวข้องกับการเปิดให้ใช้งานเว็บไซต์
              ไม่สามารถใช้งานได้ อันเนื่องมาจากเครื่องมือ อุปกรณ์
              หรือระบบชุดคำสั่งนั้น ไม่ว่าเครื่องมือ อุปกรณ์
              หรือระบบชุดคำสั่งนั้นจะอยู่ในความครอบครองของเจ้าของเว็บไซต์
              หรือบุคคลภายนอกก็ตาม
            </Typography>

            <Typography
              variant="body1"
              paragraph
              className={classes.p2}
            >
              (ง) เหตุสุดวิสัย อันรวมถึงแต่ไม่จำกัดเพียง ระบบไฟฟ้าขัดข้อง
              ระบบติดต่อสื่อสารขัดข้อง อุบัติเหตุ อุบัติภัย เพลิงไหม้
              ภัยธรรมชาติ การนัดหยุดงาน การบังคับใช้หรือเปลี่ยนแปลงกฎหมาย
              คำสั่งของรัฐบาล
            </Typography>
          </Box>

          {/* PARA12  */}
          <Box>
            <Typography variant="h5" paragraph className={classes.topic}>
              ข้อ 12 การรายงานปัญหาและพฤติกรรม
            </Typography>
            <Typography variant="body1" paragraph>
            {!isSmallDevice && <React.Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</React.Fragment>}
 ผู้ใช้งานอาจรายงานปัญญาใดๆ จากการใช้งานเว็บไซต์
              อันรวมถึงแต่ไม่จำกัดเพียง ข้อผิดพลาดของเว็บไซต์ หรือของชุดคำสั่ง
              พฤติกรรมการใช้งานของผู้ใช้งานรายอื่นที่ไม่เป็นไปตามข้อกำหนดฉบับนี้
              หรือการใช้งานในลักษณะที่อาจก่อให้เกิดความไม่สงบเรียบร้อย
              ขัดต่อศีลธรรมอันดีของประชาชน การสนับสนุนการใช้ความรุนแรง
              หรือพฤติกรรมการใช้งานในลักษณะที่ก่อกวนผู้ใช้งานรายอื่น ได้ที่
              report@kramtone.com
            </Typography>
          </Box>

          {/* PARA13  */}
          <Box>
            <Typography variant="h5" paragraph className={classes.topic}>
              ข้อ 13 การช่วยเหลือ
            </Typography>
            <Typography variant="body1" paragraph>
            {!isSmallDevice && <React.Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</React.Fragment>}
ในกรณีที่ ผู้ใช้งานมีข้อสงสัย ข้อสอบถาม เกี่ยวการใช้งานเว็บไซต์
              ผู้ใช้งานสามารถ สอบถามได้ที่ support@kramtone.com
            </Typography>
          </Box>
          {/* PARA13  */}
          <Box>
            <Typography variant="h5" paragraph className={classes.topic}>
              ข้อ 14 การยกเว้นความรับผิด
            </Typography>
            <Typography variant="body1" paragraph>
            {!isSmallDevice && <React.Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</React.Fragment>}
ผู้ใช้งานตกลงและทราบดีว่า ไม่มีส่วนหนึ่งส่วนใดในข้อกำหนดฉบับนี้
              หรือภายในเว็บไซต์ ไม่ว่าโดยชัดแจ้งหรือโดยปริยายที่เจ้าของเว็บไซต์
              จะ
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p2}
            >
              (ก) รับประกัน ความเสถียร ความเชื่อถือได้ ความแม่นยำ ความสมบูรณ์
              ประสิทธิผล ความเหมาะสมกับวัตถุประสงค์โดยเฉพาะเจาะจงของผู้ใช้งาน
              ความปลอดภัย ข้อผิดพลาดของเว็บไซต์
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p2}
            >
              (ข) รับผิดชอบค่าเสียหายใดๆ ที่เกิดขึ้นกับผู้ใช้งานในการใช้เว็บไซต์
              อันรวมถึงแต่ไม่จำกัดเพียง ความเสียหายต่ออุปกรณ์ ระบบ
              ที่ผู้ใช้งานใช้ในการใช้งานเว็บไซต์
              หรือการสูญหายของข้อมูลหรือเนื้อหาของผู้ใช้งาน
              สิทธิและชื่อเสียงของผู้ใช้งาน ยกเว้น
              ความเสียหายดังกล่าวเกิดจากการกระทำโดยเจตนาหรือการประมาทเลินเล่ออย่างร้ายแรงของเจ้าของเว็บไซต์
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p2}
            >
              (ค) รับผิดชอบค่าเสียหายใดๆ ที่เกิดขึ้นจากการกระทำของผู้ใช้งานเอง
              ไม่ว่าผู้ใช้งานจะเจตนาหรือไม่ก็ตาม
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p2}
            >
              (ง) รับผิดชอบค่าเสียหายใดๆ ที่เกิดขึ้นจากการกระทำของบุคคลภายนอก
              อันรวมถึงแต่ไม่จำกัดเพียง
              การกระทำของผู้ไม่ได้รับอนุญาตให้เข้าถึงข้อมูล (Hacker)
              อาชญากรคอมพิวเตอร์
            </Typography>
          </Box>

          {/* PARA15  */}
          <Box>
            <Typography variant="h5" paragraph className={classes.topic}>
              ข้อ 15 ทรัพย์สินทางปัญญา
            </Typography>
            <Typography variant="body1" paragraph>
            {!isSmallDevice && <React.Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</React.Fragment>}
 ผู้ใช้งานเข้าใจและรับทราบดีว่าสิทธิในทรัพย์สินทางปัญญาทั้งปวงอันรวมถึงแต่ไม่จำกัดเพียง
              เนื้อหาของเจ้าของเว็บไซต์ ลิขสิทธิ์ สิทธิบัตร เครื่องหมายการค้า
              เครื่องหมายบริการ ชื่อทางการค้า หรือการออกแบบ ระบบงานใด
              ที่ปรากฏในเว็บไซต์และที่ใช้งานบนเว็บไซต์ ไม่ว่าระยะเวลาใด
              เป็นสิทธิเด็ดขาดของเจ้าของเว็บไซต์ทั้งสิ้น
            </Typography>
            <Typography variant="body1" paragraph>
            {!isSmallDevice && <React.Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</React.Fragment>}
 ผู้ใช้งานมีสิทธิใช้ซึ่งทรัพย์สินทางปัญญาอย่างเพิกถอนได้และอย่างไม่สามารถโอนแก่กันได้
              ตราบเท่าที่เจ้าของเว็บไซต์ อนุญาตให้ใช้
              ภายใต้เงื่อนไขแห่งข้อกำหนดฉบับนี้เท่านั้น และไม่ว่า ณ เวลาใดๆ
              ไม่มีข้อตกลงใดในข้อกำหนดฉบับนี้ ไม่ว่าโดยชัดแจ้ง หรือโดยปริยาย
              ที่เป็นการโอนสิทธิใดๆ
              อันเกี่ยวกับทรัพย์สินทางปัญญาดังกล่าวให้แก่ผู้ใช้งาน ทั้งทางตรง
              และทางอ้อม
            </Typography>
          </Box>

          {/* PARA16  */}
          <Box>
            <Typography variant="h5" paragraph className={classes.topic}>
              ข้อ 16 การเก็บรักษาความลับ
            </Typography>
            <Typography variant="body1" paragraph>
            {!isSmallDevice && <React.Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</React.Fragment>}
ในการใช้งานเว็บไซต์ ผู้ใช้งานอาจได้ล่วงรู้
              หรือได้รับข้อมูลจากเจ้าของเว็บไซต์
              หรือจากบุคคลอื่นใดเพื่อการใช้งานเว็บไซต์ตามข้อกำหนดฉบับนี้
              ซึ่งยังไม่ได้มีการเปิดเผยอย่างสาธารณะหรือไม่มีเจตนาให้ถูกเปิดเผยอย่างทั่วไป
              ณ ขณะที่เปิดเผยข้อมูล ผู้ใช้งานตกลงจะรักษาข้อมูลของเจ้าของเว็บไซต์
              หรือข้อมูลที่ได้รับจากเจ้าของเว็บไซต์ไว้เป็นความลับ
              ไม่ว่าจะเป็นข้อมูลส่วนบุคคลหรือข้อมูลทางการค้า
              และไม่ว่าจะมีมูลค่าหรือไม่ก็ตาม และจะไม่เปิดเผย ตีพิมพ์ ประกาศ
              หรือเผยแพร่ต่อบุคคลที่สาม เว้นแต่จะเป็นการกระทำตามกฎหมาย
              คำสั่งของหน่วยงานที่บังคับใช้อำนาจของรัฐ
              หรือได้รับความยินยอมเป็นลายลักษณ์อักษรจากเจ้าของเว็บไซต์ก่อนล่วงหน้า
            </Typography>
          </Box>

          {/* PARA17  */}
          <Box>
            <Typography variant="h5" paragraph className={classes.topic}>
              ข้อ 17 การแก้ไขเปลี่ยนแปลง
            </Typography>
            <Typography variant="body1" paragraph>
            {!isSmallDevice && <React.Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</React.Fragment>}
เจ้าของเว็บไซต์อาจแก้ไขและเปลี่ยนแปลงข้อความในข้อกำหนดฉบับนี้ได้
              ไม่ว่าเวลาใดก็ตาม และไม่ว่าทั้งหมดหรือบางส่วน
              โดยเจ้าของเว็บไซต์จะแจ้งให้ผู้ใช้งานทราบเมื่อมีการเปลี่ยนแปลงในแต่ละคราว
              และให้ถือว่าข้อตกลงที่แก้ไขเพิ่มเติมดังกล่าวเป็นส่วนหนึ่งของข้อกำหนดฉบับนี้ด้วย
            </Typography>
          </Box>

          {/* PARA18  */}
          <Box>
            <Typography variant="h5" paragraph className={classes.topic}>
              ข้อ 18 การบอกกล่าว
            </Typography>
            <Typography variant="body1" paragraph>
            {!isSmallDevice && <React.Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</React.Fragment>}
 ผู้ใช้งานตกลงให้คำบอกกล่าวหรือหนังสือซึ่งเจ้าของเว็บไซต์ต้องแจ้งให้แก่ตนภายใต้ข้อกำหนดฉบับนี้จะถือว่าได้มีการแจ้งแก่กันแล้ว
              หากว่าได้มีการส่งไปยังผู้ใช้งานโดยวิธีที่ระบุไว้ ดังต่อไปนี้
              การแจ้งคำบอกกล่าวไว้ ณ หน้าที่แรกของเว็บไซต์หรือแอปพลิเคชัน
            </Typography>
          </Box>

          {/* PARA19  */}
          <Box>
            <Typography variant="h5" paragraph className={classes.topic}>
              ข้อ 19 กฎหมายที่ใช้บังคับ
            </Typography>
            <Typography variant="body1" paragraph>
              ข้อกำหนดฉบับนี้ให้อยู่ภายใต้บังคับกฎหมายของประเทศไทย
            </Typography>
          </Box>

          {/* PARA020 */}
          <Box>
            <Typography variant="h5" paragraph className={classes.topic}>
              ข้อ 20 การระงับข้อพิพาท
            </Typography>
            <Typography variant="body1" paragraph>
            {!isSmallDevice && <React.Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</React.Fragment>}
 หากมีข้อโต้เถียง ข้อขัดแย้งใดๆ
              เกิดขึ้นอันเนื่องมาจากข้อกำหนดฉบับนี้
              หากคู่สัญญาไม่สามารถตกลงกันได้
              คู่สัญญาตกลงจะนำข้อพิพาทดังกล่าวขึ้นฟ้องต่อศาลในประเทศไทย
            </Typography>
          </Box>

      {/* PARA021 */}
      <Box>
            <Typography variant="h5" paragraph className={classes.topic}>
              ข้อ 21 ข้อกำหนดและเงื่อนไขอื่น ๆ
            </Typography>
            <Typography variant="body1" paragraph>
            {!isSmallDevice && <React.Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</React.Fragment>}
            ในกรณีที่ข้อความในข้อกำหนดและเงื่อนไขการใช้งานเว็บไซต์
(Terms and Conditions) นี้ในภาษาไทยและภาษาอังกฤษไม่ตรงกัน ให้ถือตามข้อความในเว็บไซต์  <Link
                href="https://www.kramtone.com"
                target="_blank"
                rel="noopener noreferrer"
               className={classes.link}
              >
                https://www.kramtone.com
              </Link> ในภาษาไทยเป็นหลัก
หากส่วนหนึ่งส่วนใดในข้อตกลงและเงื่อนไขนี้ไม่เหมาะสมหรือไม่มีผลบังคับใช้ตามกฎหมาย ให้ข้อกำหนดในส่วนดังกล่าวสิ้นผล และให้ข้อตกลงและเงื่อนไขนี้ในส่วนอื่นมีผลใช้บังคับต่อไป
            </Typography>
          </Box>

        </ContentPaper>
      </Root>
    </MainLayout>
  );
};

export default TermsAndConditions;
