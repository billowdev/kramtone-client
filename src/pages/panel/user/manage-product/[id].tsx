import React, {useState} from 'react'
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Link from "next/link";
import { ProductPayload } from "@/models/product.model";
import * as productService from "@/services/product.service";
import IndigoDyeClothCard from '@/components/IndigoDyeClothCard';
import Layout from "@/components/Layouts/Layout";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Image from "next/image";
import { productImageURL } from "@/common/utils/utils";
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

type Props = {
  product?: ProductPayload;
}

function UserPanelProduct({product}: Props) {
  // console.log(product)
  const images = product.productImages.map((image) => image.image);

  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const renderProductTab = () => (
    <>
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
        width="25%"
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
        <Typography gutterBottom variant="h5" component="div">
          {product?.name}
        </Typography>
        {/* ...Other content from the original card... */}
      </CardContent>
      {/* <CardActions>
        <Button size="small" color="primary">
          ดูรายละเอียดเพิ่มเติม
        </Button>
        <Button size="small" color="primary">
          ดูข้อมูลกลุ่มผู้ผลิตหรือร้านค้า
        </Button>
      </CardActions> */}
    </>
  );

  const renderProducerTab = () => (
    <Box p={2}>
      {/* Add producer details here */}
      <Typography variant="h6">ข้อมูลกลุ่มผู้ผลิตหรือร้านค้า</Typography>
    </Box>
  );


  return (
	<Layout>
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

    </Layout>
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