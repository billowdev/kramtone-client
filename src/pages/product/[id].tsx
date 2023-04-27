import React, {useState, useEffect} from 'react'
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
import { styled } from '@mui/material';
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
	},
	reloadCount: {
	  display: "flex",
	  alignItems: "center",
	  justifyContent: "flex-end",
	},

  }));

type Props = {
  product?: ProductPayload;
}

function UserPanelProduct({product}: Props) {
  // console.log(product)
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
	const incrementReloadCount = async () => {
	  if (isMounted && product) {
		const productId = product.id!;
		// Here, you can replace this with your own logic to increment the reload count in your database
		const updatedProduct = await productService.increaseReloadCount(productId);
		console.log(`Increment reload count for product with ID: ${productId}`);
	  } else {
		setIsMounted(true);
	  }
	};
  
	incrementReloadCount();
  }, [isMounted, product]);
  

  const images = product?.productImages.map((image) => image.image);
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
        {images.map((image: string, index: number) => (
          <div key={index}>
           <Image
  src={productImageURL(image)}
  alt={`Product image ${index}`}
  width="250"
  height="250"
  style={{ borderRadius: '5%', objectFit: 'cover' }}
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
          ${product?.price}
        </Typography>
      </Grid>
      <Grid item>
        <div className={classes.reloadCount}>
		<VisibilityIcon className={classes.eyeIcon} />
          <Typography variant="body2">
            {product.reloadCount.toLocaleString()}
          </Typography>
        </div>
      </Grid>
    </Grid>
	{/* =================== */}

	  <Typography gutterBottom variant="h5" component="div">
          {product?.name}
        </Typography>
        {/* ...Other content from the original card... */}
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
    {/* UserPanelProduct
    <IndigoDyeClothCard payload={product} /> */}

<Box>
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
    const product = await productService.getOneProduct(params?.id);

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