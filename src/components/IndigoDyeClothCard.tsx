import React from 'react';
import { Card, CardContent, Typography, CardMedia, CardActions, Button, Box, Grid} from '@mui/material';
import { makeStyles } from "@material-ui/core";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Image from "next/image";
import { productImageURL } from "@/common/utils/utils";

interface Category {
  id: string;
  name: string;
}

interface ProductImage {
  id: string;
  image: string;
}

interface ColorScheme {
  id: string;
  nameEN: string;
  nameTH: string;
  hex: string;
}

interface GroupData {
  id: string;
}

interface Product {
  id: string;
  name: string;
  desc: string;
  price: string;
  colorSchemeId: string;
  createdAt: string;
  updatedAt: string;
  category: Category;
  productImages: ProductImage[];
  colorScheme: ColorScheme;
  groupData: GroupData;
}

interface IndigoDyeClothCardProps {
  payload: Product;
}

const useStyles = makeStyles(() => ({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
}));

const IndigoDyeClothCard: React.FC<IndigoDyeClothCardProps> = ({ payload }) => {
  const classes = useStyles();
  const images = payload.productImages.map((image) => image.image);

  return (
    <Card className={classes.card}>
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
      <CardContent>
	
	  {payload.colorScheme ? (
  <Grid container alignItems="center">
    <Grid item>
      <Box
        sx={{
          width: 50, // Adjust width for the rectangle
          height: 50,
          backgroundColor: payload.colorScheme.hex,
          borderRadius: '5%', // Adjust borderRadius for the rectangle
          border: '1px solid black',
          marginRight: 2,
        }}
      />
    </Grid>
    <Grid item sx={{marginRight: "16px"}}>
      <Typography gutterBottom variant="h6" component="div">
        {payload.colorScheme.hex}
      </Typography>
    </Grid>

    <Grid item>
      <Typography gutterBottom variant="h6" component="div">
        {payload.colorScheme.nameTH}
      </Typography>
    </Grid>
  </Grid>
) : null}


        <Typography gutterBottom variant="h5" component="div">
          {payload.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {payload.desc}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          ประเภทสินค้า: {payload.category.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          โทนสี: {payload.colorScheme.nameTH} ({payload.colorScheme.nameEN})
        </Typography>
        <Typography variant="body1" color="text.secondary">
          ราคา: {payload.price} THB
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          ดูรายละเอียดเพิ่มเติม
        </Button>
        <Button size="small" color="primary">
          ดูข้อมูลกลุ่มผู้ผลิตหรือร้านค้า
        </Button>
      </CardActions>
    </Card>
  );
};

export default IndigoDyeClothCard;
