import React from "react";
import PanelPage from "./panel/index";
import MainLayout from '@/components/MainLayout';
import { Box, Paper, Button, Typography, Grid, Modal, Backdrop, Fade, CardMedia, Card, CardActionArea } from "@mui/material";
import { NextSeo } from 'next-seo';
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles } from '@material-ui/core/styles';

import Image from 'next/image'
type Props = {};
type Product = {
  id: string,
  name: string,
  image: string,
  description: string,
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(4),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  title: {
    marginBottom: theme.spacing(2),
    fontWeight: 500,
  },
  subtitle: {
    marginBottom: theme.spacing(4),
  },
  logo: {
    width: '100%',
    height: '100%',
  },
}));


const ProductTest = ({ }: Props) => {
  const classes = useStyles();

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

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const logoSize = isSmallScreen ? '250px' : '500px';

  
  const handleOpen = (product: Product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <MainLayout>
      <NextSeo
          title="Product Grid"
          description="A grid of products with optimized images using Next.js"
        />

<Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding={4}
      bgcolor="primary.secondary"
      color="primary.black"
    >
      <Typography variant="h5" component="h5" gutterBottom align="center" >
      การพัฒนาระบบบริหารจัดการการเชื่อมโยงแผนภาพโทนสีครามธรรมชาติกับแหล่งผลิตผ้าย้อมคราม
      </Typography>
      <Typography variant="h5" component="h5" gutterBottom align="center" >
      The development of management system for connecting color scheme of natural indigo dye with indigo textile production sites
      </Typography>
      <Box width={logoSize} height={logoSize}>
        <img src="/static/img/logo-white.png" alt="logo" width="100%" height="100%" />
      </Box>
    </Box>


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
            </Grid>
          ))}
        </Grid>

       
    </MainLayout>
  )

};

export default ProductTest;
