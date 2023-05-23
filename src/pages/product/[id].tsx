import React, { useState, useEffect } from "react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Link from "next/link";
import { ProductPayload } from "@/models/product.model";
import * as productService from "@/services/product.service";
import IndigoDyeClothCard from "@/components/IndigoDyeClothCard";
import MainLayout from "@/components/MainLayout";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";
import { productImageURL, groupDataImageURL } from "@/common/utils/utils";
import { styled } from "@mui/material/styles";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import VisibilityIcon from "@mui/icons-material/Visibility";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

import {
  Divider,
  Container,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { makeStyles } from "@material-ui/core";
import StoreIcon from "@mui/icons-material/Store";
import { LatLngExpression, LatLngBoundsExpression } from "leaflet";
import dynamic from "next/dynamic";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from "react-share";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  {
    ssr: false, // disable server-side rendering
  }
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  {
    ssr: false, // disable server-side rendering
  }
);

const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  {
    ssr: false, // disable server-side rendering
  }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false, // disable server-side rendering
});

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
  container: {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gridGap: theme.spacing(2),
    alignItems: "center",
  },
  price: {
    fontSize: theme.typography.h4.fontSize,
    color: theme.palette.primary.main,
  },
  reloadCount: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  colorScheme: {
    marginRight: theme.spacing(1),
  },
  icon: {
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
  title: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
}));

type Props = {
  product?: ProductPayload;
};

function UserPanelProduct({ product }: Props) {
  const shareUrl = `https://www.kramtone.com/product/${product?.id}`;
  const shareTitle = `Kramtone เชื่อมโยงสินค้าผ้าครามกับแผนภาพโทนสีครามธรรมชาติ ${product?.name} ${product?.desc}`;

  // console.log(product)
  const theme = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const isSmallDevice = useMediaQuery(theme.breakpoints.down("xs"));
  const classes = useStyles();
  const router = useRouter();

  const handleBackButtonClick = () => {
    router.back();
  };

  useEffect(() => {
    const incrementReloadCount = async () => {
      if (isMounted && product) {
        const productId = product.id!;
        // Here, you can replace this with your own logic to increment the reload count in your database
        const updatedProduct = await productService.increaseReloadCount(
          productId
        );
      } else {
        setIsMounted(true);
      }
    };

    incrementReloadCount();
  }, [isMounted, product]);

  const center: LatLngExpression = [17.1634, 104.1476]; // Centered on Sakon Nakhon Province
  const position: LatLngExpression = [
    parseFloat(product?.groupData?.lat!),
    parseFloat(product?.groupData?.lng!),
  ]; // Centered on Sakon Nakhon Province
  const zoom: number = 12;

  const StyledTypography = styled(Typography)({
    marginRight: "16px",
  });

  const typeographyHeaderStyle = {
    fontSize: isSmallDevice ? "16px" : "1.2rem",
    alignSelf: "flex-start",
    fontWeight: "bold",
    width: "100%",
    color: theme.palette.grey[800],
  };
  const typeographyValueStyle = {
    fontSize: isSmallDevice ? "16px" : "1.2rem",
    alignSelf: "flex-start",
    width: "100%",
    color: theme.palette.grey[800],
  };
  const boxStyle = {
    display: "flex",
    marginTop: "16px",
  };

  const images =
    product &&
    product.productImages &&
    product.productImages.map((image) => image.image);

  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  let imageCarousel: null | any = null;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (images && images.length > 4) {
    const imageGroups = [];
    for (let i = 0; i < images.length; i += 4) {
      imageGroups.push(images.slice(i, i + 4));
    }

    imageCarousel = (
      <Carousel
        showArrows
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        emulateTouch
        autoPlay={false}
        infiniteLoop={false}
        interval={3000}
        transitionTime={350}
        swipeable
        dynamicHeight
        width="70%"
        selectedItem={Math.floor(currentImageIndex / 4)}
      >
        {imageGroups.map((group, groupIndex) => (
          <div key={groupIndex}>
            <Grid container spacing={2}>
              {group.map((image, index) => (
                <Grid item key={index} xs={3}>
                  <Image
                    src={productImageURL(image)}
                    alt={`Product image ${index}`}
                    width="100"
                    height="100"
                    style={{
                      borderRadius: "5%",
                      objectFit: "contain",
                      cursor: "pointer",
                      border:
                        currentImageIndex === groupIndex * 4 + index
                          ? "1px solid #000"
                          : "none",
                    }}
                    onClick={() => {
                      console.log("click");
                      setCurrentImageIndex(groupIndex * 4 + index);
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        ))}
      </Carousel>
    );
  }

  const renderProductTab = () => (
    <Box p={2}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper
            sx={{ p: 2, display: "flex", flexDirection: "row", gap: "16px" }}
          >
            {isSmallDevice ? (
              <ShoppingBasketIcon
                sx={{ fontSize: "1.5rem", marginLeft: "8px" }}
              />
            ) : (
              <ShoppingBasketIcon
                sx={{ fontSize: "2.5rem", marginLeft: "16px" }}
              />
            )}
            <Typography
              variant={isSmallDevice ? "subtitle1" : "h5"}
              sx={{
                fontWeight: "bold",
                alignSelf: "center",
              }}
            >
              หน้ารายละเอียดสินค้า
            </Typography>
          </Paper>
        </Grid>
      </Grid>
  
      <Box sx={{ minHeight: "100vh" }}>
        <Grid container spacing={2}>

        <Grid item xs={12} sm={4}>
            <Grid container spacing={2}>
              <Carousel
                showArrows
                showStatus={false}
                showIndicators={false}
                showThumbs={false}
                emulateTouch
                autoPlay
                infiniteLoop
                interval={3000}
                transitionTime={350}
                swipeable
                dynamicHeight
                selectedItem={currentImageIndex}
                // width="100%"
              >
                {images &&
                  images.map((image: string, index: number) => (
                    <div key={index}>
                      <Image
                        src={productImageURL(image)}
                        alt={`Product image ${index}`}
                        width={250}
                        height={250}
                        style={{ borderRadius: "5%", objectFit: "contain", marginTop:8, marginBottom:8 }}
                      />
                    </div>
                  ))}
              </Carousel>
              <Grid container spacing={2}>{imageCarousel}</Grid>
            </Grid>
          </Grid>


          <Grid item xs={12} sm={8}>
          <Typography variant="h4" className={classes.price}>
            ฿{product?.price}
          </Typography>

          <Box display="flex" alignItems="center" my={1}>
            <VisibilityIcon />
            <Typography variant="body2">{product?.reloadCount?.toLocaleString()}</Typography>
          </Box>

          <Divider />

          <Typography variant="h6" style={{ fontWeight: 'bold', marginTop: '1em' }}>
            ชื่อสินค้า
          </Typography>
          <Typography variant="body1" style={{  marginTop: '1em' }}>
          {product?.name}
          </Typography>
          <Divider />
          <Typography variant="h6" style={{ fontWeight: 'bold', marginTop: '1em' }}>
            ประเภทสินค้า
          </Typography>
          <Typography variant="body1" style={{  marginTop: '1em' }}>
          {product?.category?.name}
          </Typography>



          <Divider />
          <Typography variant="h6" style={{ fontWeight: 'bold', marginTop: '1em' }}>
            โทนสี
          </Typography>
          <Box display="flex" alignItems="center" my={1}>
            <Box
              sx={{
                width: 50,
                height: 50,
                backgroundColor: product?.colorScheme?.hex,
                borderRadius: "5%",
                border: "1px solid black",
                marginRight: 2,
              }}
            />
            <Typography className={classes.colorScheme}>
              รหัสสี {product?.colorScheme?.id} - สี{product?.colorScheme?.nameTH} ({product?.colorScheme?.nameEN})
            </Typography>
          </Box>

          <Divider />

          <Typography variant="h6" style={{ fontWeight: 'bold', marginTop: '1em' }}>
            ชื่อกลุ่มผู้ผลิตหรือร้านค้า
          </Typography>

          <Typography variant="body1" style={{  marginTop: '1em' }}>
          {product?.groupData?.groupName}
          </Typography>

          <Divider />

          <Typography variant="h6" style={{ fontWeight: 'bold', marginTop: '1em' }}>
            รายละเอียดเพิ่มเติม
          </Typography>
          
          <Typography variant="body1" style={{  marginTop: '1em' }}>
          {product?.desc}
          </Typography>
          <Divider />
      </Grid>



      </Grid>
    </Box>
  </Box>
);  

  const renderProducerTab = () => (
    <Box p={isSmallDevice ? 0 :2}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper
            sx={{ p: 2, display: "flex", flexDirection: "row", gap: "16px" }}
          >
            {isSmallDevice ? (
              <ShoppingBasketIcon
                sx={{ fontSize: "1.5rem", marginLeft: "8px" }}
              />
            ) : (
              <ShoppingBasketIcon
                sx={{ fontSize: "2.5rem", marginLeft: "16px" }}
              />
            )}
            <React.Fragment>
              {isSmallDevice ? (
                <Typography
                  sx={{
                    fontWeight: "bold",
                    alignSelf: "center",
                  }}
                >
                  {" "}
                  หน้าข้อมูลกลุ่มผู้ผลิต : {product?.groupData?.groupName}
                </Typography>
              ) : (
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    alignSelf: "center",
                  }}
                >
                  {" "}
                  หน้าข้อมูลกลุ่มผู้ผลิต : {product?.groupData?.groupName}
                </Typography>
              )}
            </React.Fragment>
          </Paper>
        </Grid>
      </Grid>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={2} style={{ marginTop: "16px" }}>
          <Grid item xs={12} md={12} lg={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                gap: "4rem",
                flexDirection: {
                  xs: "column",
                  md: "row",
                },
                overflow: "hidden",
              }}
            >
              <Image
                alt="product image"
                src={groupDataImageURL(product?.groupData?.banner)}
                width={1120}
                height={160}
              />
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                gap: "4rem",
                flexDirection: {
                  xs: "column",
                  md: "row",
                },
              }}
            >
              <Grid item xs={12} md={4} lg={3}>
                <Image
                  style={{ objectFit: "cover" }}
                  alt="product image"
                  src={groupDataImageURL(product?.groupData?.logo)}
                  width={250}
                  height={250}
                />
              </Grid>

              <Grid item xs={12} md={8} lg={9}>
                <React.Fragment>
                  <Box sx={boxStyle}>
                    <Typography style={typeographyHeaderStyle}>
                      ชื่อกลุ่ม / ร้านค้า
                    </Typography>
                    <Typography style={typeographyValueStyle}>
                      {product?.groupData?.groupName}
                    </Typography>
                  </Box>
                  <Box style={boxStyle}>
                    <Typography style={typeographyHeaderStyle}>
                      ประเภทกลุ่ม
                    </Typography>
                    <Typography style={typeographyValueStyle}>
                      {product?.groupData?.groupType === "shop"
                        ? "ร้านค้า"
                        : "กลุ่มผู้ผลิต"}
                    </Typography>
                  </Box>

                  <Box style={boxStyle}>
                    <Typography style={typeographyHeaderStyle}>
                      ชื่อประธาน / เจ้าของร้าน
                    </Typography>
                    <Typography style={typeographyValueStyle}>
                      {product?.groupData?.agency}
                    </Typography>
                  </Box>

                  <Box style={boxStyle}>
                    <Typography style={typeographyHeaderStyle}>
                      เบอร์โทร
                    </Typography>
                    <Typography style={typeographyValueStyle}>
                      {product?.groupData?.phone}
                    </Typography>
                  </Box>

                  <Box style={boxStyle}>
                    <Typography style={typeographyHeaderStyle}>อีเมล :</Typography>
                    <Typography style={typeographyValueStyle}>
                      {product?.groupData?.email}
                    </Typography>
                  </Box>
                </React.Fragment>
              </Grid>
            </Paper>
          </Grid>

        
  

          <Grid item xs={12} md={12} lg={12}>
            <Paper
              style={{
                // p: 2,
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <Grid
                container
                spacing={2}
                style={{
                  alignSelf: "flex-center",
                  paddingBottom: "16px",
                  paddingLeft: "16px",
                }}
              >
                <Grid item xs={12} md={6}>
                  <Box style={boxStyle}>
                    <Typography style={typeographyHeaderStyle}>
                      บ้านเลขที่/หมู่
                    </Typography>
                    <Typography style={typeographyValueStyle}>
                      {product?.groupData?.hno}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box style={boxStyle}>
                    <Typography style={typeographyHeaderStyle}>ถนน :</Typography>
                    <Typography style={typeographyValueStyle}>
                      {product?.groupData?.road}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box style={boxStyle}>
                    <Typography style={typeographyHeaderStyle}>ซอย :</Typography>
                    <Typography style={typeographyValueStyle}>
                      {product?.groupData?.lane}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box style={boxStyle}>
                    <Typography style={typeographyHeaderStyle}>
                      หมู่บ้าน
                    </Typography>
                    <Typography style={typeographyValueStyle}>
                      {product?.groupData?.village}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box style={boxStyle}>
                    <Typography style={typeographyHeaderStyle}>ตำบล</Typography>
                    <Typography style={typeographyValueStyle}>
                      {product?.groupData?.subdistrict}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box style={boxStyle}>
                    <Typography style={typeographyHeaderStyle}>อำเภอ</Typography>
                    <Typography style={typeographyValueStyle}>
                      {product?.groupData?.district}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box style={boxStyle}>
                    <Typography style={typeographyHeaderStyle}>จังหวัด</Typography>
                    <Typography style={typeographyValueStyle}>
                      {product?.groupData?.province}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box style={boxStyle}>
                    <Typography style={typeographyHeaderStyle}>
                      รหัสไปรษณีย์
                    </Typography>
                    <Typography style={typeographyValueStyle}>
                      {product?.groupData?.zipCode}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <Paper
              style={{
                padding: 2,
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <MapContainer
                center={center}
                zoom={zoom}
                style={{ height: "500px", width: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={position}>
                  <Popup autoClose={false}>
                    <span>หมุดของคุณ</span>
                  </Popup>
                </Marker>
              </MapContainer>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );

  return (
    <MainLayout>
      <NextSeo
        title={`รายละเอียดสินค้า ${product?.name}`}
        description={`หน้าสินค้าทั้งหมดของกลุ่มผู้ผลิตหรือร้านค้าผ้าย้อมคราม ชื่อกลุ่ม ${product?.groupData?.groupName} ประเภทกลุ่ม ${product?.groupData?.groupType} ชื่อสินค้า ${product?.name} รายละเอียด ${product?.desc}`}
      />
      <Box sx={{ flexGrow: 1, p: isSmallDevice ? 0 : 5 }}>
        <Paper>
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
          {tabIndex === 0 && renderProductTab()}
          {tabIndex === 1 && renderProducerTab()}
  
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
              ย้อนกลับ
            </Button>
          </Box>
        </Paper>
      </Box>
    </MainLayout>
  );
 
    
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const accessToken = context.req.cookies["access_token"];

    const params = context.params;
    const product = await productService.getOneProduct(params?.id?.toString());

    return {
      props: {
        product,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};

export default UserPanelProduct;
