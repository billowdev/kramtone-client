import React, { useState, useEffect } from 'react'
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Link from "next/link";
import { ProductPayload } from "@/models/product.model";
import * as productService from "@/services/product.service";
import IndigoDyeClothCard from '@/components/IndigoDyeClothCard';
import MainLayout from "@/components/MainLayout";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Image from "next/image";
import { productImageURL } from "@/common/utils/utils";
import { styled } from "@mui/material/styles";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import VisibilityIcon from '@mui/icons-material/Visibility';

import {
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
} from '@mui/material';
import { makeStyles } from "@material-ui/core";
import StoreIcon from '@mui/icons-material/Store';
const CustomTab = styled(Tab)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderBottom: 'none',
  borderRadius: '4px 4px 0 0',
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderBottom: '1px solid transparent',
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
}

function UserPanelProduct({ product }: Props) {
  // console.log(product)
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const incrementReloadCount = async () => {
      if (isMounted && product) {
        const productId = product.id!;
        // Here, you can replace this with your own logic to increment the reload count in your database
        const updatedProduct = await productService.increaseReloadCount(productId);
      } else {
        setIsMounted(true);
      }
    };

    incrementReloadCount();
  }, [isMounted, product]);

  const StyledTypography = styled(Typography)({
    marginRight: "16px",
  });

  const images = product && product.productImages && product.productImages.map((image) => image.image);

  const classes = useStyles();

  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const renderProductTab = () => (
    <>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
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
  {images && images.map((image: string, index: number) => (
    <div key={index}>
      <Image
        src={productImageURL(image)}
        alt={`Product image ${index}`}
        width="250"
        height="250"
        style={{ borderRadius: '5%', objectFit: 'contain' }}
      />

    </div>
  ))}
</Carousel>

          </Grid>
          <Grid item xs={12} sm={8}>
            {/* =================== */}
            <Grid container className={classes.container}>
              <Grid item>
                <Typography variant="h4" className={classes.price}>
                  ฿{product && product?.price}
                </Typography>
              </Grid>
              <Grid item>
                <div className={classes.reloadCount}>
                  <VisibilityIcon />
                  <Typography variant="body2">
                    {product?.reloadCount?.toLocaleString()}
                  </Typography>
                </div>
              </Grid>
            </Grid>
            {/* =================== */}

            <Typography gutterBottom variant="h6" component="div">
              ชื่อสินค้า : {product?.name}
            </Typography>

            <Grid container alignItems="center">
              <Grid item>
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
              </Grid>

              <Grid item>
                <Typography gutterBottom component="div" className={classes.colorScheme}>
                  สี{product?.colorScheme?.nameTH}
                </Typography>
              </Grid>
              <Grid item>
                <StyledTypography gutterBottom className={classes.colorScheme}>
                  {product?.colorScheme?.hex}
                </StyledTypography>
              </Grid>
              <Grid item>
                <StyledTypography gutterBottom className={classes.colorScheme}>
                  รหัสสี {product?.colorScheme?.id}
                </StyledTypography>
              </Grid>
            </Grid>

            <Typography variant="body1" color="text.secondary">
              <ShoppingBasketIcon className={classes.icon} />ประเภทสินค้า: {product?.category?.name}
            </Typography>

            <Typography variant="body1" color="text.secondary">
              <StoreIcon className={classes.icon} />ชื่อกลุ่มผู้ผลิตหรือร้านค้า: {product?.groupData?.groupName}
            </Typography>

            <Typography variant="h6" component="div" className={classes.title}>
              รายละเอียดเพิ่มเติม
            </Typography>

            <Typography variant="body1" color="text.secondary">
              {product?.desc}
            </Typography>

          </Grid>
        </Grid>
      </CardContent>

    </>
  );

  const renderProducerTab = () => (
    <Box p={2}>
      {/* Add producer details here */}
      <Typography variant="h6">ข้อมูลกลุ่มผู้ผลิตหรือร้านค้า</Typography>
    </Box>
  );


  return (
    <MainLayout>
      <Box sx={{ height: "100vh" }}>
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
        </Paper>
      </Box>

    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const accessToken = context.req.cookies['access_token']

    const params = context.params;
    const product = await productService.getOneProduct(params?.id?.toString());


    return {
      props: {
        product
      },
    };
  } catch (error) {
    return {
      props: {

      },
    };
  }

};

export default UserPanelProduct