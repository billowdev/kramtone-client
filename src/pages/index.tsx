import React from "react";
import PanelPage from "./panel";
import MainLayout from '@/components/Layouts/MainLayout';
import { Paper, Button, Typography, Grid, Modal, Backdrop, Fade, CardMedia, Card, CardActionArea } from "@mui/material";
import { NextSeo } from 'next-seo';
import Image from 'next/image'
type Props = {};
type Product = {
  id: string,
  name: string,
  image: string,
  description: string,
}
const ProductTest = ({ }: Props) => {

  const products = [
    { id: '1', name: 'Product 1', image: 'M014-01.jpg', description: 'Product 1 description' },
    { id: '2', name: 'Product 2', image: 'M014-01.jpg', description: 'Product 2 description' },
    { id: '3', name: 'Product 3', image: 'M014-01.jpg', description: 'Product 3 description' },
    { id: '4', name: 'Product 4', image: 'M014-01.jpg', description: 'Product 4 description' },
    { id: '5', name: 'Product 5', image: 'M014-01.jpg', description: 'Product 5 description' },
    { id: '6', name: 'Product 6', image: 'M014-01.jpg', description: 'Product 6 description' },
    { id: '7', name: 'Product 7', image: 'M014-01.jpg', description: 'Product 7 description' },
    { id: '8', name: 'Product 8', image: 'M014-01.jpg', description: 'Product 8 description' },
    // Add more products here
  ];
  const defaultValue = { id: '', name: '', image: '/static/img/default.png', description: '' }
  const [selectedProduct, setSelectedProduct] = React.useState<Product>(defaultValue);
  const [open, setOpen] = React.useState(false);

  const handleOpen = (product: Product) => {
    console.log(product)
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return <React.Fragment>
    <MainLayout>
      <>
        <NextSeo
          title="Product Grid"
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
                <Image
                  src={`/static/img/${selectedProduct.image}`}
                  alt={`${selectedProduct.name} image`}
                  width={400}
                  height={400}
                  loading="lazy"
                />
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
                <CardActionArea onClick={() => {
                  handleOpen(product)
                }}>
                  <Typography variant="h5">{product.name}</Typography>
                  <CardMedia
                    // src={}
                    image={`/static/img/${product.image}`}
                    sx={{ 
                      object: "fit", 
                      maxWidth: '100%',
                      height: 350,
                      width:350 
                    }}
                    title={product.name}
                  />
                </CardActionArea>
                <Typography variant="subtitle1">{product.description}</Typography>
                <Button variant="contained" color="primary" onClick={()=>{handleOpen(product)}}>
                  รายละเอียดเพิ่มเติม
                </Button>
              </Card>
              {/* <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
                <Typography variant="h5">{product.name}</Typography>
                <Image
                  src={product.image}
                  alt={`${product.name} image`}
                  width={300}
                  height={300}
                  loading="lazy"
                />
                <Typography variant="subtitle1">{product.description}</Typography>
                <Button variant="contained" color="primary">
                  Buy Now
                </Button>
                <Button onClick={() => { handleOpen(product) }}>Show Modal</Button>
              </Paper> */}
            </Grid>
          ))}
        </Grid>
      </>

    </MainLayout>
    {/* <PanelPage></PanelPage> */}
  </React.Fragment>;
};

export default ProductTest;
