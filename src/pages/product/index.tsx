import React, {useEffect, useState} from "react";
import PanelPage from "./panel/index";
import MainLayout from '@/components/MainLayout';
import { Paper, Button, Typography, Grid,
	 Modal, Backdrop, Fade, CardMedia,
	  Card, CardActionArea, 
	  CardContent, Box } from "@mui/material";
import { NextSeo } from 'next-seo';
import { ProductPayload } from "@/models/product.model";
import * as productService from "@/services/product.service";
import { productImageURL } from "@/common/utils/utils";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import router from "next/router";
import Image from 'next/image'
type Props = {};
type Product = {
  id: string,
  name: string,
  image: string,
  description: string,
}
const ProductTest = ({ }: Props) => {

//   const products = [
//     { id: '1', name: 'Product 1', image: 'M014-01.jpg', description: 'Product 1 description' },
//     { id: '2', name: 'Product 2', image: 'M014-01.jpg', description: 'Product 2 description' },
//     { id: '3', name: 'Product 3', image: 'M014-01.jpg', description: 'Product 3 description' },
//     { id: '4', name: 'Product 4', image: 'M014-01.jpg', description: 'Product 4 description' },
//     { id: '5', name: 'Product 5', image: 'M014-01.jpg', description: 'Product 5 description' },
//     { id: '6', name: 'Product 6', image: 'M014-01.jpg', description: 'Product 6 description' },
//     { id: '7', name: 'Product 7', image: 'M014-01.jpg', description: 'Product 7 description' },
//     { id: '8', name: 'Product 8', image: 'M014-01.jpg', description: 'Product 8 description' },
//     // Add more products here
//   ];
  const defaultValue = { 
	id: '', name: '', image: '/static/img/default.png', description: '' 
}
  const [selectedProduct, setSelectedProduct] = React.useState<ProductPayload>(defaultValue);
  const [products, setProducts] = React.useState<ProductPayload[]>([]);
  const [open, setOpen] = React.useState(false);

  const handleOpen = (product: Product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  return (
    <MainLayout>
      <NextSeo
          title="Product Page"
          description="A grid of products with optimized images using Next.js"
        />
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
        >
          <Fade in={open}>
            {selectedProduct ? (
              <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
                <Typography variant="h4">{selectedProduct.name}</Typography>
			
                <Typography variant="subtitle1">{selectedProduct.description}</Typography>
                <Button variant="contained" color="primary" onClick={()=>{handleClose()}}>
                  close
                </Button>
                <Button variant="contained" color="primary" onClick={handleClose}>
                  Read more
                </Button>
              </Paper>
            ) : <></>}
          </Fade>
        </Modal>

        <Grid container spacing={2}>
          {products.map((product: Product, index: number) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
         
			  <Card key={product.id} style={{ padding: '20px', margin: '20px', maxWidth: '345' }}>
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
        {product.productImages.map((image: string, index: number) => (
          <div key={index}>
           <Image
  src={productImageURL(image.image)}
  alt={`Product image ${index}`}
  width="250"
  height="250"
  style={{ borderRadius: '5%', objectFit: 'cover' }}
/>

          </div>
        ))}
      </Carousel>

 <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
		{product.colorScheme ? (
  <Grid container alignItems="center">
    <Grid item>
      <Box
        sx={{
          width: 50, // Adjust width for the rectangle
          height: 50,
          backgroundColor: product.colorScheme.hex,
          borderRadius: '5%', // Adjust borderRadius for the rectangle
          border: '1px solid black',
          marginRight: 2,
        }}
      />
    </Grid>
    <Grid item sx={{marginRight: "16px"}}>
      <Typography gutterBottom  component="div">
        {product.colorScheme.hex}
      </Typography>
    </Grid>

    <Grid item>
      <Typography gutterBottom component="div">
        {product.colorScheme.nameTH}
      </Typography>
    </Grid>
  </Grid>
) : null}
     
        <Typography variant="body1" color="text.secondary">
          ประเภทสินค้า: {product.category.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          โทนสี: {product.colorScheme.nameTH} ({product.colorScheme.nameEN})
        </Typography>
        <Typography variant="body1" color="text.secondary">
          ราคา: {product.price} THB
        </Typography>
		</CardContent>

			    <CardActionArea onClick={() => {
                  handleOpen(product)
                }}>
                </CardActionArea>
                <Typography variant="subtitle1">{product.description}</Typography>
              
			   <Button variant="contained" color="primary"  onClick={() =>
              router.push("/product/" + product.id)
            }>
                  รายละเอียดเพิ่มเติม
                </Button>
			   
              </Card>
            </Grid>
          ))}
        </Grid>

       
    </MainLayout>
  )

};

export default ProductTest;
