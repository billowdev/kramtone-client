import React, { useEffect, useState } from "react";
import PanelPage from "./panel/index";
import MainLayout from "@/components/MainLayout";
import {
  Box,
  Paper,
  Button,
  Typography,
  Grid,
  Modal,
  Backdrop,
  Fade,
  CardMedia,
  Card,
  CardActionArea,
  CardContent,
} from "@mui/material";
import { NextSeo } from "next-seo";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles } from "@material-ui/core/styles";
import { ProductPayload } from "@/models/product.model";
import * as productService from "@/services/product.service";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { productImageURL } from "@/common/utils/utils";
import router from "next/router";
import { shuffle } from "lodash";

import Image from "next/image";
type Props = {};
type Product = {
  id: string;
  name: string;
  image: string;
  description: string;
};

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(4),
    backgroundImage: "url('/static/img/M014-01.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: theme.palette.common.white,
    "& h5": {
      textShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
    },
  },
  title: {
    marginTop : theme.spacing(2),
    marginBottom: theme.spacing(2),
    fontWeight: 500,
  },
  subtitle: {
    marginTop : theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
  logo: {
    marginTop:"16px",
    marginBottom:"16px",

  },
}));

const MainPage = ({}: Props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [products, setProducts] = React.useState<any>([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const payload = await productService.getAllProduct();
        setProducts(payload);
        // setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const logoSize = isSmallScreen ? "250" : "350";
  const shuffledProducts = shuffle(products);

  return (
    <MainLayout>
      <NextSeo
        title="Kramtone"
        description="The development of management system for connecting color scheme of natural indigo dye with indigo textile production sites"
      />

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        // padding={4}
        bgcolor="primary.secondary"
        color="white"
        style={{  backgroundImage: "url('/static/img/M014-01.jpg')" } }
        className={classes.container}
      >
        <Typography variant="h5" component="h5" gutterBottom align="center">
          การพัฒนาระบบบริหารจัดการการเชื่อมโยงแผนภาพโทนสีครามธรรมชาติกับแหล่งผลิตผ้าย้อมคราม
        </Typography>
        <Typography variant="h5" component="h5" gutterBottom align="center">
          The development of management system for connecting color scheme of
          natural indigo dye with indigo textile production sites
        </Typography>

        <Box
          style={{ marginTop: 16, marginButtom: 16}}
          width={logoSize}
          height={logoSize}
          display="flex"
          justifyContent="center"
          alignItems="center"
          className={classes.logo}
          boxShadow="0px 0px 10px rgba(0, 0, 0, 0.5)"
        >
          <Image
            src="/static/img/logo-white.png"
            alt="logo"
            width={logoSize}
            height={logoSize}
          />
        </Box>
      </Box>

      <Grid container spacing={2} minHeight={"100vh"}>
        {/* {products.map((product: ProductPayload, index: number) => ( */}
        {shuffledProducts
          .slice(0, 4)
          .map((product: ProductPayload, index: number) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card
                key={product.id}
                style={{ padding: "20px", margin: "20px", maxWidth: "345" }}
              >
                <CardContent>
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
                    width="100%"
                  >
                    {product?.productImages?.map(
                      (image: any, index: number) => (
                        <div key={index}>
                          <Image
                            src={productImageURL(image?.image)}
                            alt={`Product image ${index}`}
                            width="250"
                            height="250"
                            style={{ borderRadius: "5%", objectFit: "cover" }}
                          />
                        </div>
                      )
                    )}
                  </Carousel>

                  <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                  </Typography>
                  {product?.colorScheme ? (
                    <Grid container alignItems="center">
                      <Grid item>
                        <Box
                          sx={{
                            width: 50, // Adjust width for the rectangle
                            height: 50,
                            backgroundColor: product?.colorScheme.hex,
                            borderRadius: "5%", // Adjust borderRadius for the rectangle
                            border: "1px solid black",
                            marginRight: 2,
                          }}
                        />
                      </Grid>
                      <Grid item sx={{ marginRight: "16px" }}>
                        <Typography gutterBottom component="div">
                          {product?.colorScheme?.hex}
                        </Typography>
                      </Grid>

                      <Grid item>
                        <Typography gutterBottom component="div">
                          {product?.colorScheme?.nameTH}
                        </Typography>
                      </Grid>
                    </Grid>
                  ) : null}

                  <Typography variant="body1" color="text.secondary">
                    ประเภทสินค้า: {product?.category?.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    โทนสี: {product?.colorScheme?.nameTH} (
                    {product?.colorScheme?.nameEN})
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    ราคา: {product?.price} THB
                  </Typography>
                </CardContent>

                {/* <CardActionArea onClick={() => {
                      handleOpen(product)
                    }}>
                    </CardActionArea> */}

                <Typography variant="subtitle1">{product?.desc}</Typography>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => router.push("/product/" + product.id)}
                >
                  รายละเอียดเพิ่มเติม
                </Button>
              </Card>
            </Grid>
          ))}
      </Grid>
    </MainLayout>
  );
};

export default MainPage;
