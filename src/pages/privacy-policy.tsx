// pages/privacy-policy.tsx
import React from "react";
import Head from "next/head";
import { Container, Box, Typography, Paper } from "@mui/material";
import { NextPage } from "next";
import { styled } from "@mui/system";
import MainLayout from "@/components/MainLayout";
import Link from "next/link";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from '@material-ui/core/styles';

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


const useStyles = makeStyles((theme) => ({
  topic: {
    fontWeight: "bold"
  },
  p1: {
    marginLeft: (props) => (props.isSmallDevice ? 0: 16),
  },
  p1Extra: {
    marginLeft: (props) => (props.isSmallDevice ? 0: 16),
    fontWeight: 'bold'
  },
  p2: {
    marginLeft: (props) => (props.isSmallDevice ? 16 : 32 ),
  },
  p3: {
    marginLeft: (props) => (props.isSmallDevice ? 16: 48 ),
  },
  p3Start: {
    marginLeft: (props) => (props.isSmallDevice ?  16: 48 ),
    marginTop: 16
  },
  p4: {
    marginLeft: (props) => (props.isSmallDevice ?  32:80),
  },
  PageTitle: {
    padding: 16, 
    fontWeight: "bold"
  },
  ContentPaper : {
    padding: (props) => (props.isSmallDevice ?  16:64),
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
}));


const PrivacyPolicy: NextPage = () => {
  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down("xs"));
  const classes = useStyles({isSmallDevice});

  return (
    <MainLayout>
      <Head>
        <title>Privacy Policy</title>
        <meta name="description" content="Privacy Policy" />
      </Head>
      <Root maxWidth="md">
        <PageTitle
          variant="h4"
          align="center"
          className={classes.PageTitle}
        >
          นโยบายความเป็นส่วนตัว (Privacy Policy)
        </PageTitle>
        <ContentPaper  className={classes.ContentPaper}>
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
          */}

          {/* PARA00  */}
          <Box>
            {/* <Typography variant="body1" paragraph>
			นโยบายความเป็นส่วนตัวสำหรับการใช้งาน
            </Typography> */}
            {/* <Typography variant="body1" paragraph>
              นโยบายความเป็นส่วนตัวฉบับนี้
              ซึ่งต่อไปนี้จะเรียกว่า &quot;นโยบาย&quot;
              บังคับใช้ครั้งแรกเมื่อวันที่ 1 พฤษภาคม 2566 โดยมีรายละเอียด
              ดังต่อไปนี้
            </Typography> */}

         
            <Typography variant="body1" paragraph>
          {!isSmallDevice && <React.Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</React.Fragment>}นโยบายความเป็นส่วนตัวฉบับนี้ ซึ่งต่อไปนี้จะเรียกว่า "นโยบาย" บังคับใช้ครั้งแรกเมื่อวันที่ 1 พฤษภาคม 2566 โดยมีรายละเอียดดังต่อไปนี้
        </Typography>

          </Box>

          {/* PARA01  */}
          <Box>
            <Typography variant="h5" paragraph className={classes.topic}>
              ข้อ 1 คำนิยาม
            </Typography>
            <Typography variant="body1" paragraph>
              ภายในนโยบายฉบับนี้
            </Typography>

            {/* <Typography
              variant="body1"
              paragraph
              className={classes.p1}
            >
              (ก) &quot;เว็บไซต์&quot; หมายความว่า เว็บไซต์ ชื่อว่า kramtone
              และมีที่อยู่เว็บไซต์ที่
              <Link
                href="https://www.kramtone.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                https://www.kramtone.com
              </Link>
            </Typography> */}

      <Typography variant="body1" paragraph className={classes.p1}>
            (ก) &quot;เว็บไซต์&quot; หมายความว่า เว็บไซต์ ชื่อว่า kramtone
            และมีที่อยู่เว็บไซต์ที่
            <Link
              href="https://www.kramtone.com"
              target="_blank"
              rel="noopener noreferrer"
              className={classes.link}
            >
              https://www.kramtone.com
            </Link>
          </Typography>

            <Typography
              variant="body1"
              paragraph
              className={classes.p1}
            >
              (ข) &quot;ผู้ควบคุมข้อมูล&quot; หมายความว่า
              ผู้ให้บริการหรือเจ้าของเว็บไซต์ ตามนโยบายฉบับนี้ อันได้แก่ <br />{" "}
              BillowDev ติดต่อ akkarapon@billowdev.com
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p1}
            >
              (ค) &quot;ผู้ประมวลผลข้อมูล&quot; หมายความว่า
              บุคคลภายนอกซึ่งประมวลข้อมูลเพื่อประโยชน์หรือในนามของผู้ควบคุมข้อมูล
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p1}
            >
              (ง) &quot;ข้อมูล&quot; หมายความว่า
              สิ่งที่สื่อความหมายให้รู้เรื่องราวข้อเท็จจริง ข้อมูล หรือสิ่งใดๆ
              ไม่ว่าการสื่อความหมายนั้นจะทำได้โดยสภาพของสิ่งนั้นเองหรือโดยผ่านวิธีการใดๆ
              และไม่ว่าจะได้จัดทำไว้ในรูปของเอกสาร แฟ้ม รายงาน หนังสือ แผนผัง
              แผนที่ ภาพวาด ภาพถ่าย ฟิล์ม การบันทึกภาพหรือเสียง
              การบันทึกโดยเครื่องคอมพิวเตอร์ โดยวิธีการทางอิเล็กทรอนิกส์
              หรือวิธีอื่นใดที่ทำให้สิ่งที่บันทึกไว้ปรากฏได้
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p1}
            >
              (จ) &quot;ข้อมูลส่วนบุคคล&quot; หมายความว่า
              ข้อมูลเกี่ยวกับบุคคลธรรมดาใดๆ
              ซึ่งทำให้สามารถระบุตัวของบุคคลนั้นได้ไม่ว่าทางตรงหรือทางอ้อม
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p1}
            >
              (ฉ) &quot;ข้อมูลส่วนบุคคลที่มีความอ่อนไหว&quot; หรือ
              &quot;Sensitive Data&quot; หมายความว่า
              ข้อมูลส่วนบุคคลของผู้ใช้งานที่เกี่ยวกับเชื้อชาติ เผ่าพันธ์ุ
              ความคิดเห็นทางการเมือง ความเชื่อในลัทธิ ศาสนา หรือปรัชญา
              พฤติกรรมทางเพศ ประวัติอาชญากรรม ข้อมูลสุขภาพ ความพิการ พันธุกรรม
              ข้อมูลชีวภาพ ข้อมูลภาพจำลองใบหน้า ม่านตา หรือลายนิ้วมือ
              ข้อมูลสหภาพแรงงาน
              หรือข้อมูลอื่นใดซึ่งคณะกรรมการคุ้มครองข้อมูลส่วนบุคคลตามกฎหมายคุ้มครองข้อมูลส่วนบุคคลได้ประกาศให้เป็นข้อมูลส่วนบุคคลที่มีความอ่อนไหว
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p1}
            >
              (ช) &quot;ผู้ใช้งาน&quot; หมายความว่า ท่าน ผู้เยี่ยมชม ผู้ใช้
              ผู้เป็นสมาชิกของเว็บไซต์
              ซึ่งเป็นเจ้าของข้อมูลส่วนบุคคลตามนโยบายฉบับนี้
            </Typography>
          </Box>

          {/* PARA02  */}
          <Box>
            <Typography variant="h5" paragraph className={classes.topic}>
              ข้อ 2 ความยินยอมของผู้ใช้งาน
            </Typography>
            <Typography variant="body1" paragraph>
              ในการเข้าใช้งานเว็บไซต์
              ผู้ใช้งานตกลงและให้ความยินยอมเกี่ยวกับการเก็บรวบรวมและใช้ข้อมูลส่วนบุคคล
              ดังต่อไปนี้
            </Typography>

            <Box>
              <Typography
                variant="body1"
                paragraph
               className={classes.p1Extra}
              >
                (ก) วัตถุประสงค์แห่งการเก็บรวบรวมและใช้ข้อมูลส่วนบุคคล
              </Typography>

              <Typography
                variant="body1"
                paragraph
                className={classes.p2}
              >
                {!isSmallDevice && <React.Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</React.Fragment>}ผู้ใช้งานรับทราบ
                ตกลง และยินยอมให้ผู้ควบคุมข้อมูลเก็บรวบรวมและใช้ข้อมูลส่วนบุคคล
                เพื่อวัตถุประสงค์ดังต่อไปนี้เท่านั้น การประชาสัมพันธ์ทางการตลาด
                และการให้บริการสื่อสังคม
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="body1"
                paragraph
                className={classes.p1Extra}
              >
                (ข) ข้อมูลส่วนบุคคลที่เก็บรวบรวมและใช้
              </Typography>

              <Typography
                variant="body1"
                paragraph
                className={classes.p2}
              >
                {!isSmallDevice && <React.Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</React.Fragment>}ผู้ใช้งานรับทราบ
                ตกลง และยินยอมให้ผู้ควบคุมข้อมูลเก็บรวบรวมและใช้ข้อมูลส่วนบุคคล
                ดังต่อไปนี้เท่านั้น ชื่อ นามสกุล ที่อยู่ เบอร์โทรศัพท์ อีเมล
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="body1"
                paragraph
                className={classes.p1Extra}
              >
                (ค) ระยะเวลาในการเก็บรวบรวมข้อมูล
              </Typography>

              <Typography
                variant="body1"
                paragraph
                className={classes.p2}
              >
                {!isSmallDevice && <React.Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</React.Fragment>}ผู้ใช้งานรับทราบ
                ตกลง
                และยินยอมให้ผู้ควบคุมข้อมูลเก็บรวบรวมและใช้ข้อมูลส่วนบุคคลเป็นระยะเวลาทั้งสิ้น
                12 (สิบสอง)
                เดือนนับจากวันที่ได้มีความยินยอมให้เก็บรวบรวมและใช้ข้อมูลส่วนบุคคลตามนโยบายฉบับนี้
              </Typography>
            </Box>
          </Box>

          {/* PARA03  */}
          <Box>
            <Typography variant="h5" paragraph className={classes.topic}>
              ข้อ 3
              การเชื่อมโยงข้อมูลของผู้ใช้งานเว็บไซต์กับผู้ให้บริการบุคคลที่สาม
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p1}
            >
              {!isSmallDevice && <React.Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</React.Fragment>} ผู้ใช้งานรับทราบ
              ตกลง
              และยินยอมให้ผู้ควบคุมข้อมูลอาจการเชื่อมโยงข้อมูลของผู้ใช้งานเว็บไซต์กับผู้ให้บริการบุคคลที่สาม
              โดยในการเชื่อมโยงหรือแบ่งปันข้อมูลต่อผู้ให้บริการบุคคลที่สามในแต่ละคราว
              ผู้ควบคุมข้อมูลจะแจ้งให้ผู้ใช้งานทราบว่าข้อมูลของผู้ใช้งานใดที่จะถูกเชื่อมโยงหรือแบ่งปันแก่ผู้ให้บริการบุคคลที่สาม
              ทั้งนี้
              เมื่อผู้ใช้งานได้แสดงเจตนาโดยชัดแจ้งในการอนุญาตให้มีการเชื่อมโยงหรือแบ่งปันดังกล่าวนั้น
              อันรวมถึงแต่ไม่จำกัดเพียง การกดยอมรับ อนุญาต เชื่อมโยง
              แบ่งปันหรือการกระทำใดๆ
              อันมีลักษณะโดยชัดแจ้งว่าผู้ใช้งานได้ยินยอมในการเชื่อมโยงหรือแบ่งปันข้อมูลต่อผู้ให้บริการบุคคลที่สามนั้น
            </Typography>
          </Box>

          {/* PARA04  */}
          <Box>
            <Typography variant="h5" paragraph className={classes.topic}>
              ข้อ 4 การถอนความยินยอมของผู้ใช้งาน
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p1}
            >
              {!isSmallDevice && <React.Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</React.Fragment>}ผู้ใช้งานรับทราบว่าผู้ใช้งานมีสิทธิที่จะถอนความยินยอมใดๆ
              ที่ผู้ใช้งานได้ให้ไว้แก่ผู้ควบคุมข้อมูลตามนโยบายฉบับนี้ได้
              ไม่ว่าเวลาใดโดยการดำเนินการ ดังต่อไปนี้
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p1}
            >
              เลือก &quot;ไม่ยินยอม&quot;
              ในเมนูการตั้งค่าความเป็นส่วนตัวภายในเว็บไซต์/แอปพลิเคชันโดยตรง
            </Typography>

            <Typography
              variant="body1"
              paragraph
              className={classes.p1}
            >
              โดยผู้ใช้งานยังรับทราบอีกว่าเมื่อผู้ใช้งานได้ดำเนินการถอนความยินยอมแล้ว
              ผู้ใช้งานจะได้รับผลกระทบ ดังต่อไปนี้
            </Typography>

            <Typography
              variant="body1"
              paragraph
              className={classes.p1}
            >
              {!isSmallDevice && <React.Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</React.Fragment>}ผู้ใช้งานจะไม่สามารถใช้บริการพิเศษภายในเว็บไซต์/แอปพลิเคชันได้
              มีเพียงสิทธิเยี่ยมชมเท่านั้น
              ผู้ใช้งานอาจได้รับบริการที่ไม่ถูกต้องและไม่มีประสิทธิภาพ
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p1}
            >
              โดยที่
              ผู้ใช้งานยังได้ตกลงยอมรับซึ่งผลแห่งการถอนความยินยอมนั้นทั้งสิ้น
            </Typography>
          </Box>

          {/* PARA05  */}
          <Box>
            <Typography variant="h5" paragraph className={classes.topic}>
              ข้อ 5 บัญชีผู้ใช้
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p1}
            >
              {!isSmallDevice && <React.Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</React.Fragment>}ในการใช้งานเว็บไซต์
              ผู้ควบคุมข้อมูลอาจจัดให้มีบัญชีผู้ใช้ของแต่ละผู้ใช้งานเพื่อการใช้งานเว็บไซต์
              โดยที่ผู้ควบคุมข้อมูลมีสิทธิแต่เพียงผู้เดียวในการอนุมัติเปิดบัญชีผู้ใช้
              กำหนดประเภทบัญชีผู้ใช้
              กำหนดสิทธิการเข้าถึงข้อมูลของแต่ละประเภทบัญชีผู้ใช้
              สิทธิการใช้งานเว็บไซต์ ค่าใช้จ่ายใดๆ เกี่ยวกับบัญชีผู้ใช้
              หน้าที่และความรับผิดชอบของผู้ใช้งานซึ่งเป็นเจ้าของบัญชีผู้ใช้นั้นๆ{" "}
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p1}
            >
              {!isSmallDevice && <React.Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</React.Fragment>}ทั้งนี้
              ผู้ใช้งานตกลงจะเก็บรักษาชื่อบัญชีผู้ใช้ รหัสผ่าน และข้อมูลใดๆ
              ของตนไว้เป็นความลับอย่างเคร่งครัด และตกลงจะไม่ยินยอมให้
              รวมถึงใช้ความพยายามอย่างที่สุดในการป้องกันไม่ให้บุคคลอื่นใช้งานบัญชีผู้ใช้ของผู้ใช้งาน{" "}
            </Typography>

            <Typography
              variant="body1"
              paragraph
              className={classes.p1}
            >
              {!isSmallDevice && <React.Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</React.Fragment>}ในกรณีที่มีการใช้บัญชีผู้ใช้ของผู้ใช้งานโดยบุคคลอื่น
              ผู้ใช้งานตกลงและรับรองว่าการใช้งานโดยบุคคลอื่นดังกล่าวได้กระทำในฐานะตัวแทนของผู้ใช้งานและมีผลผูกพันเสมือนหนึ่งผู้ใช้งานเป็นผู้กระทำการเองทั้งสิ้น
            </Typography>
          </Box>

          {/* PARA06 */}
          <Box>
            <Typography variant="h5" paragraph className={classes.topic}>
              ข้อ 6 สิทธิของผู้ใช้งาน
            </Typography>
            <Typography variant="body1" paragraph>
              {!isSmallDevice && <React.Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</React.Fragment>}ในการเข้าใช้งานเว็บไซต์ตามนโยบายฉบับนี้และการให้ความยินยอมใดๆ
              ตามนโยบายฉบับนี้
              ผู้ใช้งานได้รับทราบถึงสิทธิของตนในฐานะเจ้าของข้อมูลส่วนบุคคลตามกฎหมายคุ้มครองข้อมูลส่วนบุคคลเป็นอย่างดีแล้ว
              อันรวมถึงแต่ไม่จำกัดเพียงสิทธิของผู้ใช้งาน ดังต่อไปนี้
            </Typography>

            <Typography
              variant="body1"
              paragraph
              className={classes.p1}
            >
              (ก) ผู้ใช้งานอาจถอนความยินยอมที่ให้ไว้ตามนโยบายฉบับนี้เมื่อใดก็ได้
              โดยการแจ้งเป็นลายลักษณ์อักษรแก่ผู้ควบคุมข้อมูลตามวิธีและช่องทางที่กำหนดในนโยบายฉบับนี้
            </Typography>

            <Typography
              variant="body1"
              paragraph
              className={classes.p1}
            >
              (ข)
              ผู้ใช้งานมีสิทธิการเข้าถึงและขอรับสำเนาข้อมูลส่วนบุคคลของตนหรือที่เกี่ยวข้องกับตนที่ผู้ควบคุมข้อมูลได้เก็บรวบรวมเอาไว้ตามนโยบายฉบับนี้
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p1}
            >
              (ค)
              ผู้ใช้งานมีสิทธิได้รับการเปิดเผยจากผู้ควบคุมข้อมูลถึงการได้มาซึ่งข้อมูลส่วนบุคคลของตนหรือที่เกี่ยวข้องกับตนซึ่งตนไม่ได้ให้ความยินยอม
              หากว่ามีกรณีเช่นว่า
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p1}
            >
              (ง)
              ผู้ใช้งานอาจให้ผู้ควบคุมข้อมูลส่งหรือโอนข้อมูลส่วนบุคคลของตนหรือที่เกี่ยวข้องกับตนไปยังผู้ควบคุมข้อมูลรายอื่น
              รวมถึงการขอรับข้อมูลที่ได้ส่งหรือโอนดังกล่าวโดยตรงจากผู้ควบคุมข้อมูลที่ส่งหรือโอนข้อมูลนั้นด้วย
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p1}
            >
              (จ) ผู้ใช้งานอาจคัดค้านการเก็บรวบรวม ใช้
              หรือเปิดเผยข้อมูลส่วนบุคคลของตนหรือที่เกี่ยวข้องกับตนได้ในกรณีดังต่อไปนี้
            </Typography>

            <Typography
              variant="body1"
              paragraph
              className={classes.p3Start}
            >
              (1) ผู้ควบคุมข้อมูลเก็บรวบรวม ใช้
              หรือเปิดเผยข้อมูลส่วนบุคคลของผู้ใช้งานด้วยความจำเป็นเพื่อประโยชน์โดยชอบด้วยกฎหมายของผู้ควบคุมข้อมูลหรือของบุคคลอื่นซึ่งผู้ใช้งานอาจพิสูจน์ได้ว่าตนมีสิทธิดีกว่าผู้ควบคุมข้อมูล{" "}
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p3}
            >
              (2) ผู้ควบคุมข้อมูลเก็บรวบรวม ใช้
              หรือเปิดเผยข้อมูลส่วนบุคคลของผู้ใช้งานเพื่อเป็นการปฏิบัติตามกฎหมายของผู้ควบคุมข้อมูลซึ่งผู้ใช้งานอาจพิสูจน์ได้ว่าตนมีสิทธิดีกว่าผู้ควบคุมข้อมูล
            </Typography>

            <Typography
              variant="body1"
              paragraph
              className={classes.p3}
            >
              (3) ผู้ควบคุมข้อมูลเก็บรวบรวม ใช้
              หรือเปิดเผยข้อมูลส่วนบุคคลนั้นไปเพื่อวัตถุประสงค์เกี่ยวกับการตลาดแบบตรง{" "}
            </Typography>

            <Typography
              variant="body1"
              paragraph
              className={classes.p3}
            >
              (4) ผู้ควบคุมข้อมูลเก็บรวบรวม ใช้
              หรือเปิดเผยข้อมูลส่วนบุคคลนั้นไปเพื่อวัตถุประสงค์เกี่ยวกับการศึกษาวิจัยทางวิทยาศาสตร์
              ประวัติศาสตร์ หรือสถิติ
              โดยที่การศึกษาวิจัยนั้นไม่มีความจำเป็นในการดำเนินการเพื่อก่อให้เกิดประโยชน์สาธารณะ
            </Typography>

            <Typography
              variant="body1"
              paragraph
              className={classes.p1}
            >
              (ฉ) ผู้ใช้งานอาจให้ผู้ควบคุมข้อมูลดำเนินการลบ ทำลาย
              หรือทำให้ข้อมูลไม่สามารถระบุตัวบุคคลผู้เป็นเจ้าของข้อมูลได้
              ในกรณีดังต่อไปนี้
            </Typography>

            <Typography
              variant="body1"
              paragraph
              className={classes.p3}
            >
              (1)
              เมื่อข้อมูลส่วนบุคคลหมดความจำเป็นในการเก็บรักษาไว้ตามวัตถุประสงค์ในการเก็บรวบรวม
              ใช้ หรือเปิดเผยข้อมูลส่วนบุคคลนั้น
            </Typography>

            <Typography
              variant="body1"
              paragraph
              className={classes.p3}
            >
              (2)
              เมื่อผู้ใช้งานซึ่งเป็นเจ้าของข้อมูลส่วนบุคคลได้ถอนความยินยอมในการเก็บรวบรวม
              ใช้
              หรือเปิดเผยข้อมูลส่วนบุคคลนั้นและผู้ควบคุมข้อมูลนั้นไม่มีอำนาจอื่นตามกฎหมายที่จะเก็บรวบรวม
              ใช้ หรือเปิดเผยข้อมูลส่วนบุคคลนั้นได้อีกต่อไป
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p3}
            >
              (3) เมื่อผู้ใช้งานได้คัดค้านการเก็บรวบรวม ใช้
              หรือเปิดเผยข้อมูลนั้นโดยชอบด้วยกฎหมาย
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p3}
            >
              (4) เมื่อข้อมูลส่วนบุคคลได้ถูกเก็บรวบรวม ใช้
              หรือเปิดเผยโดยไม่ชอบด้วยกฎหมาย กฎ ระเบียบ
              ข้อบังคับเกี่ยวกับการคุ้มครองข้อมูลส่วนบุคคล
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p1}
            >
              (ช)
              ผู้ใช้งานอาจให้ผู้ควบคุมข้อมูลระงับการใช้ข้อมูลส่วนบุคคลนั้นโดยยังคงเก็บรักษาเอาไว้ได้อยู่
              ในกรณีดังต่อไปนี้
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p3}
            >
              (1)
              ผู้ควบคุมข้อมูลอยู่ในระหว่างการถูกตรวจสอบโดยคณะกรรมการผู้เชี่ยวชาญตามกฎหมายคุ้มครองข้อมูลส่วนบุคคลซึ่งผู้ใช้งานได้ร้องเรียนให้มีการตรวจสอบดังกล่าว
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p3}
            >
              (2) ข้อมูลส่วนบุคคลได้ถูกเก็บรวบรวม ใช้
              หรือเปิดเผยโดยไม่ชอบด้วยกฎหมาย กฎ ระเบียบ
              ข้อบังคับเกี่ยวกับการคุ้มครองข้อมูลส่วนบุคคล
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p3}
            >
              (3)
              ในกรณีที่ผู้ใช้งานมีความจำเป็นต้องการให้ผู้ควบคุมข้อมูลเก็บรักษาข้อมูลส่วนบุคคลของตนเอาไว้เพื่อประโยชน์ในสิทธิเรียกร้องของผู้ใช้งานเอง
              อันได้แก่ การก่อสิทธิเรียกร้องตามกฎหมายของผู้ใช้งาน
              การปฏิบัติตามหรือการใช้สิทธิเรียกร้องตามกฎหมาย
              หรือการยกขึ้นต่อสู้สิทธิเรียกร้องตามกฎหมาย
              ผู้ใช้งานอาจให้ผู้ควบคุมข้อมูลเพียงระงับการใช้ข้อมูลแทนการดำเนินการลบ
              ทำลาย หรือทำให้ข้อมูลไม่สามารถระบุตัวบุคคลผู้เป็นเจ้าของข้อมูลได้
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p3}
            >
              (4)
              ผู้ควบคุมข้อมูลอยู่ในระหว่างการพิสูจน์หรือตรวจสอบเพื่อปฏิเสธการคัดค้านการเก็บรวบรวม
              ใช้
              หรือเผยแพร่ข้อมูลส่วนบุคคลของผู้ใช้งานตามกฎหมายคุ้มครองข้อมูลส่วนบุคคลซึ่งผู้ใช้งานได้คัดค้านโดยชอบด้วยกฎหมายนั้น
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p1}
            >
              (ซ) เมื่อผู้ใช้งานพบเห็นว่าข้อมูลส่วนบุคคลของผู้ใช้งานผิด ล้าหลัง
              ไม่ชัดเชน
              ผู้ใช้งานมีสิทธิให้ผู้ควบคุมข้อมูลดำเนินการแก้ไขข้อมูลส่วนบุคคลนั้นให้ถูกต้อง
              เป็นปัจจุบัน สมบูรณ์ และไม่ก่อให้เกิดความเข้าใจผิดได้
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p1}
            >
              (ฌ)
              ผู้ใช้งานอาจร้องเรียนต่อคณะกรรมการผู้เชี่ยวชาญตามกฎหมายคุ้มครองข้อมูลส่วนบุคคลในกรณีที่เกี่ยวกับการกระทำการฝ่าฝืนหรือการไม่ปฏิบัติตามกฎหมาย
              กฎ ระเบียบ
              ข้อบังคับเกี่ยวกับการคุ้มครองข้อมูลส่วนบุคคลของผู้ควบคุมข้อมูล{" "}
            </Typography>
          </Box>

          {/* PARA07  */}
          <Box>
            <Typography variant="h5" paragraph className={classes.topic}>
              ข้อ 7 การรักษาความมั่นคงปลอดภัย
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p1}
            >
              {!isSmallDevice && <React.Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</React.Fragment>}ในการเก็บรวบรวมและใช้ข้อมูลส่วนบุคคลตามนโยบายฉบับนี้
              ผู้ควบคุมข้อมูลจะจัดให้มีมาตรการรักษาความมั่นคงปลอดภัยที่เหมาะสมเพื่อป้องกันการสูญหาย
              การเข้าถึง ใช้ เปลี่ยนแปลง แก้ไข
              หรือการเปิดเผยข้อมูลที่ไม่เป็นไปตามกฎหมาย ด้วยมาตรการ มาตรฐาน
              เทคโนโลยีและ/หรือด้วยระบบ ดังต่อไปนี้
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p1}
            >
              {!isSmallDevice && <React.Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</React.Fragment>}กำหนดสิทธิการเข้าถึงข้อมูล
              (Access Right) ให้กับผู้ที่เกี่ยวข้อง ใช้การเข้ารหัสข้อมูล
              (Encryption) ในการส่งผ่านข้อมูล
            </Typography>
          </Box>
          {/* PARA08  */}
          <Box>
            <Typography variant="h5" paragraph className={classes.topic}>
              ข้อ 8 การแก้ไขปรับปรุงข้อมูลส่วนบุคคล
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p1}
            >
              ผู้ควบคุมข้อมูลจะจัดให้มีระบบและมาตรการตรวจสอบ ดังต่อไปนี้
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p3}
            >
              (ก) ดำเนินการปรับปรุงแก้ไขข้อมูลส่วนบุคคลให้ถูกต้อง เป็นปัจจุบัน
              สมบูรณ์ และไม่ก่อให้เกิดความเข้าใจผิด
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p3}
            >
              (ข) ลบ
              ทำลายข้อมูลส่วนบุคคลที่เกินระยะเวลาเก็บรวบรวมที่ผู้ใช้งานได้ให้ความยินยอมเอาไว้
              และ
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p3}
            >
              (ค) ลบ
              ทำลายข้อมูลส่วนบุคคลที่ไม่เกี่ยวข้องกับการใช้ข้อมูลส่วนบุคคลดังกล่าวตามที่ผู้ใช้งานได้ให้ความยินยอมเอาไว้
            </Typography>
          </Box>

          {/* PARA09  */}
          <Box>
            <Typography variant="h5" paragraph className={classes.topic}>
              ข้อ 9 การเก็บรวบรวม
              ใช้และ/หรือเปิดเผยข้อมูลส่วนบุคคลตามกฎหมายคุ้มครองข้อมูลส่วนบุคคล
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p1}
            >
              {!isSmallDevice && <React.Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</React.Fragment>}ผู้ใช้งานรับทราบและตกลงว่าผู้ควบคุมข้อมูลอาจเก็บรวบรวม
              ใช้
              และ/หรือเปิดเผยข้อมูลของผู้ใช้งานได้โดยไม่ต้องได้รับความยินยอมจากผู้ใช้งานก่อนล่วงหน้า
              ทั้งนี้เท่าที่จำเป็นและตราบเท่าที่เป็นไปตามวัตถุประสงค์และในกรณีดังต่อไปนี้เท่านั้น
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p3}
            >
              (ก)
              เพื่อให้บรรลุวัตถุประสงค์ที่เกี่ยวกับการจัดทำเอกสารประวัติศาสตร์หรือจดหมายเหตุเพื่อประโยชน์สาธารณะ
              หรือเกี่ยวกับการศึกษาวิจัยหรือสถิติซึ่งได้จัดให้มีมาตรการปกป้องที่เหมาะสมเพื่อคุ้มครองสิทธิและเสรีภาพของข้อมูลส่วนบุคคลของผู้ใช้งาน
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p3}
            >
              (ข) เพื่อป้องกันหรือระงับอันตรายต่อชีวิต ร่างกาย
              หรือสุขภาพของบุคคลใดๆ
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p3}
            >
              (ค)
              เป็นการจำเป็นเพื่อการปฏิบัติตามสัญญาซึ่งผู้ใช้งานเจ้าของข้อมูลส่วนบุคคลนั้นเป็นคู่สัญญาหรือเพื่อใช้ในการดำเนินการตามคำขอของผู้ใช้งานเจ้าของข้อมูลส่วนบุคคลก่อนเข้าทำสัญญาดังกล่าวนั้น
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p3}
            >
              (ง)
              เป็นการจำเป็นเพื่อการปฏิบัติหน้าที่ในการดำเนินการเพื่อประโยชน์สาธารณะของผู้ควบคุมข้อมูลหรือปฏิบัติหน้าที่ในการใช้อำนาจรัฐที่ได้มอบให้แก่ผู้ควบคุมข้อมูลนั้น{" "}
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p3}
            >
              (จ)
              เป็นการจำเป็นเพื่อประโยชน์โดยชอบด้วยกฎหมายของผู้ควบคุมข้อมูลหรือของบุคคลอื่นซึ่งประโยชน์ดังกล่าวมีความสำคัญมากกว่าสิทธิขั้นพื้นฐานในข้อมูลส่วนบุคคลของผู้ใช้งานนั้น{" "}
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p3}
            >
              (ฉ) เป็นการปฏิบัติตามกฎหมายของผู้ควบคุมข้อมูล{" "}
            </Typography>
            <Typography
              variant="body1"
              paragraph
              style={{ marginLeft: "16px", marginTop: "16px" }}
            >
              ทั้งนี้ ผู้ควบคุมข้อมูลจะบันทึกการเก็บรวบรวม ใช้
              หรือเปิดเผยข้อมูลส่วนบุคคลของผู้ใช้งานตามวรรคก่อนหน้าไว้เป็นสำคัญ
            </Typography>
          </Box>

          {/* PARA10  */}
          <Box>
            <Typography variant="h5" paragraph className={classes.topic}>
              ข้อ 10 การเก็บรวบรวม
              ใช้และ/หรือเปิดเผยข้อมูลส่วนบุคคลที่มีความอ่อนไหว (Sensitive Data)
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p1}
            >
              {!isSmallDevice && <React.Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</React.Fragment>}ผู้ใช้งานรับทราบและตกลงว่านอกจากการเก็บรวบรวม
              ใช้และ/หรือเปิดเผยข้อมูลส่วนบุคคลซึ่งผู้ใช้งานได้ให้ความยินยอมไว้โดยชัดแจ้งให้เก็บรวบรวม
              ใช้และ/หรือเปิดเผยข้อมูลส่วนบุคคลตามนโยบายฉบับนี้แล้ว
              ผู้ควบคุมข้อมูลอาจเก็บรวบรวม
              ใช้และ/หรือเปิดเผยข้อมูลส่วนบุคคลที่มีความอ่อนไหว (Sensitive Data)
              ของผู้ใช้งานได้โดยไม่ต้องได้รับความยินยอมจากผู้ใช้งานก่อนล่วงหน้า
              ทั้งนี้เท่าที่จำเป็นและตราบเท่าที่เป็นไปตามวัตถุประสงค์และในกรณีดังต่อไปนี้เท่านั้น{" "}
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p3}
            >
              (ก) เพื่อป้องกันหรือระงับอันตรายต่อชีวิต ร่างกาย
              หรือสุขภาพของผู้ใช้งานเจ้าของข้อมูลส่วนบุคคลซึ่งไม่สามารถให้ความยินยอมได้
              ไม่ว่าด้วยเหตุใดก็ตาม
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p3}
            >
              (ข)
              เป็นข้อมูลที่เปิดเผยต่อสาธารณะด้วยความยินยอมโดยชัดแจ้งของผู้ใช้งานเจ้าของข้อมูลส่วนบุคคลนั้น
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p3}
            >
              (ค) เป็นการจำเป็นเพื่อการก่อตั้ง การปฏิบัติตาม
              การใช้หรือการยกขึ้นต่อสู้ซึ่งสิทธิเรียกร้องตามกฎหมาย
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p3}
            >
              (ง)
              เป็นการจำเป็นในการปฏิบัติตามกฎหมายเพื่อให้บรรลุวัตถุประสงค์อันเกี่ยวกับ{" "}
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p4}
            >
              (1) เวชศาสตร์ป้องกันหรืออาชีวเวชศาสตร์
              การประเมินความสามารถในการทำงานของลูกจ้าง การวินิจฉัยโรคทางการแพทย์
              การให้บริการด้านสุขภาพหรือด้านสังคม การรักษาทางการแพทย์
              การจัดการด้านสุขภาพ หรือระบบและการให้บริการด้านสังคมสงเคราะห์
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p4}
            >
              (2) ประโยชน์สาธารณะด้านการสาธารณสุข เช่น
              การป้องกันด้านสุขภาพจากโรคติดต่ออันตรายหรือโรคระบาดที่อาจติดต่อหรือแพร่เข้ามาในราชอาณาจักร
              หรือการควบคุมมาตรฐานหรือคุณภาพของยา เวชภัณฑ์ หรือเครื่องมือแพทย์
              ซึ่งได้จัดให้มีมาตรการที่เหมาะสมและเจาะจงเพื่อคุ้มครองสิทธิเสรีภาพของผู้ใช้งานเจ้าของข้อมูลส่วนบุคคลโดยเฉพาะการรักษาความลับของข้อมูลส่วนบุคคลตามหน้าที่หรือตามจริยธรรมแห่งวิชาชีพ
            </Typography>
            <Typography
              variant="body1"
              paragraph
               className={classes.p4}
            >
              (3) การคุ้มครองแรงงาน การประกันสังคม หลักประกันสุขภาพแห่งชาติ
              สวัสดิการเกี่ยวกับการรักษาพยาบาลของผู้มีสิทธิตามกฎหมาย
              การคุ้มครองผู้ประสบภัยจากรถหรือการคุ้มครองทางสังคม
              ซึ่งการเก็บรวมรวมข้อมูลส่วนบุคคลของผู้ใช้งานนั้นเป็นสิ่งที่จำเป็นในการปฏิบัติตามสิทธิหรือหน้าที่ของผู้ควบคุมข้อมูลหรือผู้ใช้งานเจ้าของข้อมูล
              โดยได้จัดให้มีมาตรการที่เหมาะสมเพื่อคุ้มครองสิทธิขั้นพื้นฐานและประโยชน์ของผู้ใช้งานเจ้าของข้อมูลส่วนบุคคลนั้น
            </Typography>
            <Typography
              variant="body1"
              paragraph
               className={classes.p4}
            >
              (4) การศึกษาวิจัยทางวิทยาศาสตร์ ประวัติศาสตร์ หรือสถิติ
              หรือประโยชน์สาธารณะอื่น ทั้งนี้ ด้วยการเก็บรวบรวม ใช้
              และ/หรือเปิดเผยเพียงเท่าที่จำเป็นและได้จัดให้มีมาตรการที่เหมาะสมเพื่อคุ้มครองสิทธิขั้นพื้นฐานและประโยชน์ของผู้ใช้งานเจ้าของข้อมูลส่วนบุคคลนั้นตามที่คณะกรรมการคุ้มครองข้อมูลส่วนบุคคลได้ประกาศกำหนด
            </Typography>
            <Typography
              variant="body1"
              paragraph
               className={classes.p4}
            >
              (5) ประโยชน์สาธารณะที่สำคัญ
              โดยได้จัดให้มีมาตรการที่เหมาะสมเพื่อคุ้มครองสิทธิขั้นพื้นฐานและประโยชน์ของผู้ใช้งานเจ้าของข้อมูลส่วนบุคคลนั้น
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p1}
            >
              {!isSmallDevice && <React.Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</React.Fragment>}ทั้งนี้
              ผู้ควบคุมข้อมูลจะบันทึกการเก็บรวบรวม ใช้
              หรือเปิดเผยข้อมูลส่วนบุคคลของผู้ใช้งานตามวรรคก่อนหน้าไว้เป็นสำคัญ
            </Typography>
          </Box>

          {/* PARA11  */}
          <Box>
            <Typography variant="h5" paragraph className={classes.topic}>
              ข้อ 11 การใช้งานเว็บไซต์ของบุคคลซึ่งอยู่ในความปกครอง อนุบาล
              หรือพิทักษ์ของผู้ใช้งาน
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p1}
            >
              {!isSmallDevice && <React.Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</React.Fragment>}ผู้ใช้งานขอรับรองว่าตัวเองไม่ใช่และจะไม่ยินยอมให้บุคคลที่มีลักษณะต่อไปนี้
              เยี่ยมชม ใช้งาน หรือสมัครเป็นสมาชิกของเว็บไซต์นี้
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p1}
            >
              (ก) คนไร้ความสามารถซึ่งอยู่ในความอนุบาลของผู้ใช้งาน
            </Typography>

            <Typography
              variant="body1"
              paragraph
              className={classes.p1}
            >
              (ข) คนเสมือนไร้ความสามารถซึ่งอยู่ในความพิทักษ์ของผู้ใช้งาน
            </Typography>

            <Typography
              variant="body1"
              paragraph
              className={classes.p1}
            >
              {!isSmallDevice && <React.Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</React.Fragment>}ในกรณีที่ผู้ใช้งานยินยอมให้บุคคลลักษณะดังกล่าวข้างต้นเยี่ยมชม
              ใช้งาน หรือเป็นสมาชิกของเว็บไซต์
              ผู้ใช้งานตกลงให้ถือว่าผู้ใช้งานได้ใช้อำนาจปกครอง อนุบาล
              หรือพิทักษ์ของบุคคลดังกล่าว แล้วแต่กรณี
              ในการตกลงและให้ความยินยอมตามนโยบายฉบับนี้ทั้งสิ้นเพื่อและในนามของบุคคลดังกล่าวด้วย
            </Typography>
          </Box>

          {/* PARA12  */}
          <Box>
            <Typography variant="h5" paragraph className={classes.topic}>
              ข้อ 12 การส่งหรือโอนข้อมูลส่วนบุคคลไปยังต่างประเทศ
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p1}
            >
              ผู้ควบคุมข้อมูลอาจส่งหรือโอนข้อมูลส่วนบุคคลของผู้ใช้งานไปยังต่างประเทศได้ในกรณีดังต่อไปนี้
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p2}
            >
              (ก)
              ประเทศปลายทางหรือองค์การระหว่างประเทศที่รับข้อมูลส่วนบุคคลนั้นมีมาตรฐานการคุ้มครองข้อมูลส่วนบุคคลที่เพียงพอตามที่กฎหมาย
              กฎ ระเบียบ ข้อบังคับเกี่ยวกับการคุ้มครองข้อมูลส่วนบุคคล
            </Typography>

            <Typography
              variant="body1"
              paragraph
              className={classes.p2}
            >
              (ข) ได้รับความยินยอมจากเจ้าของข้อมูลส่วนบุคคล
              โดยที่ผู้ใช้งานเจ้าของข้อมูลส่วนบุคคลได้รับแจ้งและรับทราบถึงมาตรฐานการคุ้มครองข้อมูลส่วนบุคคลที่ไม่เพียงพอของประเทศปลายทางหรือองค์การระหว่างประเทศที่รับข้อมูลนั้นแล้ว
            </Typography>

            <Typography
              variant="body1"
              paragraph
              className={classes.p2}
            >
              (ค) เป็นการปฏิบัติตามกฎหมาย
            </Typography>

            <Typography
              variant="body1"
              paragraph
              className={classes.p2}
            >
              (ง)
              เป็นการจำเป็นเพื่อการปฏิบัติตามสัญญาซึ่งผู้ใช้งานเจ้าของข้อมูลส่วนบุคคลเป็นคู่สัญญานั้นหรือเพื่อใช้ในการดำเนินการตามคำขอของผู้ใช้งานเจ้าของข้อมูลส่วนบุคคลก่อนการเข้าทำสัญญานั้น
            </Typography>

            <Typography
              variant="body1"
              paragraph
              className={classes.p2}
            >
              (จ)
              เป็นการกระทำการตามสัญญาระหว่างผู้ควบคุมข้อมูลกับบุคคลอื่นโดยเป็นไปเพื่อประโยชน์ของผู้ใช้งานเจ้าของข้อมูลส่วนบุคคลนั้น
            </Typography>

            <Typography
              variant="body1"
              paragraph
              className={classes.p2}
            >
              (ฉ) เพื่อป้องกันหรือระงับอันตรายต่อชีวิต ร่างกาย
              หรือสุขภาพของผู้ใช้งานเจ้าของข้อมูลส่วนบุคคลนั้นหรือบุคคลใดๆ
              เมื่อเจ้าของข้อมูลส่วนบุคคลไม่สามารถให้ความยินยอมในขณะนั้นได้
            </Typography>

            <Typography
              variant="body1"
              paragraph
              className={classes.p2}
            >
              (ช) เป็นการจำเป็นเพื่อการดำเนินภารกิจเพื่อประโยชน์สาธารณะที่สำคัญ
            </Typography>
          </Box>

          {/* PARA13  */}
          <Box>
            <Typography variant="h5" paragraph className={classes.topic}>
              ข้อ 13 การแจ้งเตือนเหตุการละเมิดข้อมูลส่วนบุคคล
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p1}
            >
              {!isSmallDevice && <React.Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</React.Fragment>}ในกรณีที่ผู้ควบคุมข้อมูลทราบถึงการละเมิดข้อมูลส่วนบุคคลไม่ว่าจะมีการละเมิดโดยบุคคลใด
              ผู้ควบคุมข้อมูลจะดำเนินการดังต่อไปนี้
            </Typography>
            <Typography
              variant="body1"
              paragraph
              style={{ marginLeft: isSmallDevice ? "16px":"32px", marginTop: "16px" }}
            >
              (ก) ในกรณีมีความเสี่ยงที่จะมีผลกระทบต่อสิทธิหรือเสรีภาพของบุคคลใดๆ
              ผู้ควบคุมข้อมูลจะแจ้งเหตุการละเมิดข้อมูลส่วนบุคคลดังกล่าวต่อสำนักงานคณะกรรมการคุ้มครองข้อมูลส่วนบุคคล
              โดยไม่ชักช้าเท่าที่จะสามารถกระทำได้ภายใน 72 (เจ็ดสิบสอง)
              ชั่วโมงนับแต่ทราบเหตุ
            </Typography>

            <Typography
              variant="body1"
              paragraph
              className={classes.p2}
            >
              (ข)
              ในกรณีมีความเสี่ยงที่จะมีผลกระทบอย่างสูงต่อสิทธิหรือเสรีภาพของบุคคลใดๆ
              ผู้ควบคุมข้อมูลจะแจ้งเหตุการละเมิดข้อมูลส่วนบุคคลดังกล่าวและแนวทางการเยียวยาต่อสำนักงานคณะกรรมการคุ้มครองข้อมูลส่วนบุคคลและต่อผู้ใช้งานเจ้าของข้อมูลส่วนบุคคลนั้น
              โดยไม่ชักช้าเท่าที่จะสามารถกระทำได้ภายใน 72 (เจ็ดสิบสอง)
              ชั่วโมงนับแต่ทราบเหตุ
            </Typography>
          </Box>

          {/* PARA14  */}
          <Box>
            <Typography variant="h5" paragraph className={classes.topic}>
              ข้อ 14 การร้องเรียนและการแจ้งปัญหาเกี่ยวกับข้อมูลส่วนบุคคล
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p1}
            >
              {!isSmallDevice && <React.Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</React.Fragment>}ผู้ใช้งานอาจร้องเรียนและรายงานปัญหาเกี่ยวกับข้อมูลส่วนบุคคล
              อันรวมถึงแต่ไม่จำกัดเพียง
              การขอให้ผู้ควบคุมข้อมูลแก้ไขปรับปรุงข้อมูลให้เป็นปัจจุบันและ/หรือให้ถูกต้อง
              การคัดค้านการเก็บรวบรวมข้อมูล หรือระงับการใช้ข้อมูล
              ได้ที่ช่องทางดังต่อไปนี้
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p1}
            >
              report@kramtone.com
            </Typography>
          </Box>

          {/* PARA15  */}
          <Box>
            <Typography variant="h5" paragraph className={classes.topic}>
              ข้อ 15 การบันทึกรายการสำคัญ
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p1}
            >
              {!isSmallDevice && <React.Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</React.Fragment>}เว้นแต่กฎหมายคุ้มครองข้อมูลส่วนบุคคลจะกำหนดให้สิทธิผู้ควบคุมข้อมูลไว้เป็นเป็นอย่างอื่น
              ผู้ควบคุมข้อมูลจะบันทึกรายการสำคัญเกี่ยวกับการจัดเก็บ การใช้
              หรือการเปิดเผยข้อมูลเป็นหนังสือหรือระบบอิเล็กทรอนิกส์เพื่อการตรวจสอบจากผู้ใช้งานเจ้าของข้อมูลหรือจากหน่วยงานของรัฐ
              อันรวมถึงแต่ไม่จำกัดเพียงรายการ ดังต่อไปนี้
            </Typography>

            <Typography
              variant="body1"
              paragraph
              className={classes.p2}
            >
              (ก) ข้อมูลส่วนบุคคลที่มีการเก็บรวบรวม
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p2}
            >
              (ข) วัตถุประสงค์ของการเก็บรวบรวมข้อมูลส่วนบุคคลแต่ละประเภท
            </Typography>

            <Typography
              variant="body1"
              paragraph
              className={classes.p2}
            >
              (ค) ข้อมูลเกี่ยวกับผู้ควบคุมข้อมูล
            </Typography>

            <Typography
              variant="body1"
              paragraph
              className={classes.p2}
            >
              (ง) ระยะเวลาการเก็บรักษาข้อมูลส่วนบุคคล
            </Typography>

            <Typography
              variant="body1"
              paragraph
              className={classes.p2}
            >
              (จ) สิทธิและวิธีการเข้าถึงข้อมูลส่วนบุคคล
              รวมทั้งเงื่อนไขเกี่ยวกับบุคคลที่มีสิทธิเข้าถึงข้อมูลส่วนบุคคลและเงื่อนไขในการเข้าถึงข้อมูลส่วนบุคคลนั้น
            </Typography>

            <Typography
              variant="body1"
              paragraph
              className={classes.p2}
            >
              (ฉ) การเก็บรวบรวม ใช้
              หรือเปิดเผยข้อมูลส่วนบุคคลที่ได้รับยกเว้นไม่ต้องขอความยินยอมจากผู้ใช้งานเจ้าของข้อมูล
            </Typography>

            <Typography
              variant="body1"
              paragraph
              className={classes.p2}
            >
              (ช) การปฏิเสธคำขอและการคัดค้านต่างๆ
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p2}
            >
              (ซ)
              รายละเอียดเกี่ยวกับมาตรการรักษาความมั่นคงปลอดภัยในข้อมูลส่วนบุคคล
            </Typography>
          </Box>

          {/* PARA16  */}
          <Box>
            <Typography variant="h5" paragraph className={classes.topic}>
              ข้อ 16 การแก้ไขเปลี่ยนแปลงนโยบาย
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p1}
            >
              {!isSmallDevice && <React.Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</React.Fragment>}ผู้ควบคุมข้อมูลอาจแก้ไขและเปลี่ยนแปลงข้อความในนโยบายฉบับนี้ได้
              ไม่ว่าเวลาใดก็ตาม และไม่ว่าทั้งหมดหรือบางส่วน
              โดยผู้ควบคุมข้อมูลจะแจ้งให้ผู้ใช้งานทราบเมื่อมีการเปลี่ยนแปลงในแต่ละคราวเพื่อให้ผู้ใช้งานได้พิจารณาและดำเนินการยอมรับด้วยวิธีการทางอิเล็กทรอนิกส์หรือวิธีการอื่นใด
              และหากว่าผู้ใช้งานได้ดำเนินการเพื่อยอมรับนั้นแล้วให้ถือว่านโยบายที่แก้ไขเพิ่มเติมดังกล่าวเป็นส่วนหนึ่งของนโยบายฉบับนี้ด้วย
            </Typography>

            <Typography
              variant="body1"
              paragraph
              style={{ marginLeft: "16px", marginTop: "16px" }}
            >
              {!isSmallDevice && <React.Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</React.Fragment>} อนึ่ง
              ผู้ใช้งานอาจเข้าถึงนโยบายความเป็นส่วนตัวที่มีการแก้ไขและเปลี่ยนแปลงล่าสุดได้จากแหล่งที่ผู้ควบคุมข้อมูลจัดแสดงไว้จากช่องทาง
              ดังต่อไปนี้
            </Typography>
            <Typography
              variant="body1"
              paragraph
              className={classes.p1}
            >
              <Link
                href="https://www.kramtone.com/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                https://www.kramtone.com/privacy-policy
              </Link>
            </Typography>
          </Box>
        </ContentPaper>
      </Root>
    </MainLayout>
  );
};

export default PrivacyPolicy;
