import React, { useState, useEffect } from 'react';
import { Box, Paper, Tabs, Tab, Button, Grid, Card, CardContent, Typography, CircularProgressProps, CircularProgress } from '@mui/material';
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
import { ColorSchemePayload } from "@/models/color-scheme.model"
import * as colorSchemeService from "@/services/color-scheme.service"
import MainLayout from '@/components/MainLayout';
import { styled } from "@mui/material/styles";
import router from "next/router";
import Link from "next/link"
import { Pagination } from '@mui/material';
import { TextField } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";


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

const useStyles = makeStyles((theme) => ({
  searchContainer: {
    marginBottom: theme.spacing(2),
  },
}));

const NaturalColorTonesPage = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [tabIndex, setTabIndex] = useState(0);
  const isSmallDevice = useMediaQuery(theme.breakpoints.down("xs"));
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };


  const [colorSchemes, setColorSchemes] = useState<ColorSchemePayload[]>([]);



  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = React.useState(10);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const payload = await colorSchemeService.getAllColorScheme();
        setColorSchemes(payload);
        setLoading(false)
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const [search, setSearch] = useState("");
  const [filteredColorSchemes, setFilteredColorSchemes] = useState<ColorSchemePayload[]>([]);
  const [page, setPage] = useState(1);
  const [schemesPerPage, setSchemesPerPage] = useState(10);
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    setFilteredColorSchemes(
      colorSchemes.filter((scheme) =>
        scheme.id.toLowerCase().includes(search.toLowerCase()) ||
        scheme.nameEN.toLowerCase().includes(search.toLowerCase()) ||
        scheme.nameTH.toLowerCase().includes(search.toLowerCase()) ||
        scheme.hex.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, colorSchemes]);



  // const schemesByPrefix: { [prefix: string]: ColorSchemePayload[] } = {};
  // filteredColorSchemes.forEach((scheme: ColorSchemePayload) => {
  //   const prefix = scheme.id.substr(0, 3);
  //   if (!schemesByPrefix[prefix]) {
  //     schemesByPrefix[prefix] = [];
  //   }
  //   schemesByPrefix[prefix].push(scheme);
  // });

  // const groups = (Object.entries(schemesByPrefix) as [string, ColorSchemePayload[]][]).reduce((acc, [prefix, schemes]) => {

  //   if (prefix === "SK1" || prefix === "SK2") {
  //     acc.push({
  //       prefix,
  //       schemes,
  //     });

  //   } else if (prefix === "SK5" || prefix === "SK6"){
  //     acc.push({
  //       prefix,
  //       schemes,
  //     });

  //   }else{
  //     acc.push({
  //       prefix,
  //       schemes,
  //     });

  //   }
  //   return acc;
  // }, [] as { prefix: string; schemes: ColorSchemePayload[] }[]);


  const schemesByPrefix: { [prefix: string]: ColorSchemePayload[] } = {};
  filteredColorSchemes.forEach((scheme: ColorSchemePayload) => {
    const prefix = scheme.id.substr(0, 3);
    if (!schemesByPrefix[prefix]) {
      schemesByPrefix[prefix] = [];
    }
    schemesByPrefix[prefix].push(scheme);
  });

  // const groups = Object.entries(schemesByPrefix).reduce(
  //   (acc, [prefix, schemes]) => {
  //     if (prefix === 'SK1' || prefix === 'SK2') {
  //       const existingGroup = acc.find(group => group.prefix === 'SK1/SK2');
  //       if (existingGroup) {
  //         existingGroup.schemes = existingGroup.schemes.concat(schemes);
  //       } else {
  //         acc.push({
  //           prefix: 'SK1/SK2',
  //           schemes,
  //         });
  //       }
  //     } else if (prefix === 'SK5') {
  //       const sk5Group = acc.find(group => group.prefix === 'SK5');
  //       if (sk5Group) {
  //         sk5Group.schemes = sk5Group.schemes.concat(schemes);
  //       } else {
  //         acc.push({
  //           prefix: 'SK5',
  //           schemes,
  //         });
  //       }
  //     } else if (prefix === 'SK6') {
  //       const sk6Group = acc.find(group => group.prefix === 'SK6');
  //       const sk5Schemes = schemesByPrefix['SK5'];
  //       if (sk6Group) {
  //         sk6Group.schemes = sk6Group.schemes.concat(schemes);
  //         if (sk5Schemes) {
  //           const sk5SchemesToInclude = sk5Schemes.filter(sk5Scheme =>
  //             ['SK5-15', 'SK5-16'].includes(sk5Scheme.id)
  //           );
  //           sk6Group.schemes = sk6Group.schemes.concat(sk5SchemesToInclude);
  //         }
  //       } else {
  //         const sk5SchemesToInclude = sk5Schemes
  //           ? sk5Schemes.filter(sk5Scheme =>
  //               ['SK5-15', 'SK5-16'].includes(sk5Scheme.id)
  //             )
  //           : [];
  //         acc.push({
  //           prefix: 'SK6',
  //           schemes: schemes.concat(sk5SchemesToInclude),
  //         });
  //       }
  //     } else {
  //       acc.push({
  //         prefix,
  //         schemes,
  //       });
  //     }
  //     return acc;
  //   },
  //   [] as { prefix: string; schemes: ColorSchemePayload[] }[]
  // );

  const groups = Object.entries(schemesByPrefix).reduce(
    (acc, [prefix, schemes]) => {
      if (prefix === 'SK1' || prefix === 'SK2') {
        const existingGroup = acc.find(group => group.prefix === 'SK1/SK2');
        if (existingGroup) {
          existingGroup.schemes = existingGroup.schemes.concat(schemes);
        } else {
          acc.push({
            prefix: 'SK1/SK2',
            schemes,
          });
        }
      } else if (prefix === 'SK5') {
        const sk5Group = acc.find(group => group.prefix === 'SK5');
        if (sk5Group) {
          sk5Group.schemes = sk5Group.schemes.concat(
            schemes.filter(
              scheme => scheme.id !== 'SK5-15' && scheme.id !== 'SK5-16'
            )
          );
        } else {
          acc.push({
            prefix: 'SK5',
            schemes: schemes.filter(
              scheme => scheme.id !== 'SK5-15' && scheme.id !== 'SK5-16'
            ),
          });
        }
      } else if (prefix === 'SK6') {
        const sk6Group = acc.find(group => group.prefix === 'SK6');
        const sk5Schemes = schemesByPrefix['SK5'];

        if (sk6Group) {
          const sk5SchemesToInclude = sk5Schemes.filter(
            scheme => scheme.id === 'SK5-15' || scheme.id === 'SK5-16'
          );
          sk6Group.schemes = sk6Group.schemes.concat(sk5SchemesToInclude);
        } else {
          const sk5SchemesToInclude = sk5Schemes.filter(
            scheme => scheme.id === 'SK5-15' || scheme.id === 'SK5-16'
          );
          acc.push({
            prefix: 'SK6',
            schemes: schemes.concat(sk5SchemesToInclude),
          });
        }

      }
      else {
        acc.push({
          prefix,
          schemes,
        });
      }
      return acc;
    },
    [] as { prefix: string; schemes: ColorSchemePayload[] }[]
  );






  const renderColorSchemeTab = () => {
    return (
      <Box p={2}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'row',
                gap: '16px',
              }}
            >
              {isSmallDevice ? (
                <ColorLensIcon sx={{ fontSize: '1.5rem', marginLeft: '8px' }} />
              ) : (
                <ColorLensIcon sx={{ fontSize: '2.5rem', marginLeft: '16px' }} />
              )}
              <Typography
                variant={isSmallDevice ? 'subtitle1' : 'h5'}
                sx={{
                  fontWeight: 'bold',
                  alignSelf: 'center',
                }}
              >
                หน้าข้อมูลโทนสี
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <React.Fragment>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <TextField
                label='ค้นหาโทนสี'
                variant='outlined'
                value={search}
                onChange={handleSearchChange}
                fullWidth
                style={{ height: '100%', marginTop: 16 }}
              />
            </Grid>


            <Grid container spacing={2}>
              {groups.map((group, i) => (
                <Grid key={i} item xs={12}>

                  <Typography variant='h5' gutterBottom>
                    {group.prefix === 'SK1/SK2'
                      ? `SK1 - ${group.schemes[0].nameTH} (${group.schemes[0].nameEN}) และ SK2 - ${group.schemes[1].nameTH} (${group.schemes[1].nameEN})`
                      : `${group.prefix} - ${group.schemes[0].nameTH} (${group.schemes[0].nameEN})`}
                  </Typography>

                  <Grid container spacing={2}>
                    {group.schemes.map((scheme: ColorSchemePayload, j) => (
                      <Grid key={j} item xs={12} sm={6} md={4} lg={2} xl={2}>
                        <Card
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: 1,
                            backgroundColor: 'transparent',
                            boxShadow: 'none',
                          }}
                        >
                          <div
                            style={{
                              width: 100,
                              height: 100,
                              backgroundColor: scheme.hex,
                            }}
                          />
                          <CardContent>
                            <Typography variant='h6'>{scheme.id}</Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              ))}
            </Grid>



          </Grid>

        </React.Fragment>




      </Box>
    );
  };


  const renderHistoryOfColorScheme = () => {
    return (
      <React.Fragment>
        <Typography variant={isSmallDevice ? 'h6' : 'h4'} style={{ padding: 16 }} gutterBottom>
          แผนภาพโทนสีครามธรรมชาติ (Color Scheme of Natural Indigo Dye)
        </Typography>
        <Card style={{ background: 'none', boxShadow: 'none' }}>
          <CardContent>
            <Grid container spacing={isSmallDevice ? 1 : 2}>
              <Grid item xs={12} md={6}>
                <div
                  style={{
                    position: 'relative',
                    width: isSmallDevice ? '100%' : '80%',
                    height: isSmallDevice ? '65vh' : '100vh',
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

                  <Typography style={{ marginTop: "16px" }}>
                    ที่มา:
                  </Typography>
                  <Typography style={{ marginTop: "16px" }}>
                    กรรณิการ์ กมลรัตน์ & Indigo4.0 Plus. (2564). EP.10 แนะนำเครื่องมือตรวจวัดเฉดสีผ้าย้อมครามธรรมชาติของจังหวัดสกลนคร โดย ผศ. กรรณิการ์ กมลรัตน์ [วิดีโอ]. ยูทูบ.
                    <Link href="https://www.youtube.com/watch?v=yJcFUHt9vbc&t" passHref > https://www.youtube.com/watch?v=yJcFUHt9vbc&t</Link>
                  </Typography>
                  <Typography style={{ marginTop: "16px" }}>
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
      <Box sx={{ flexGrow: 1, p: isSmallDevice ? 1 : 4 }}>
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
                ย้อนกลับ
              </Button>
            </Box>
          </React.Fragment>

        </Paper>


      </Box>
    </MainLayout>
  );
};

export default NaturalColorTonesPage;
