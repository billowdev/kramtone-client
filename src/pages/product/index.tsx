import React, { useEffect, useState } from "react";
import MainLayout from "@/components/MainLayout";
import {
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
  TextField,
  CardContent,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import { NextSeo } from "next-seo";
import { ProductPayload } from "@/models/product.model";
import * as productService from "@/services/product.service";
import * as categoryService from "@/services/category.service";

import { productImageURL } from "@/common/utils/utils";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import router from "next/router";
import Image from "next/image";

import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import { CategoryPayload } from "@/models/category.model";

type Props = {};

const useStyles = makeStyles((theme) => ({
  searchContainer: {
    marginBottom: theme.spacing(2),
  },
}));
const ProductTest = ({}: Props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [products, setProducts] = React.useState<any>([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryPayload | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const payload = await productService.getAllProduct();
        const categoriesPayload = await categoryService.getAllCategory();
        setProducts(payload);
        setCategories(categoriesPayload);

        // setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCategorySelect = (category: CategoryPayload) => {
    setSelectedCategory(category);
    setIsModalOpen(false);
  };

  const handleClearFilters = () => {
    setSelectedCategory(null);
    setSearchTerm("");
  };

  const filteredProducts = products.filter((product:any) => {
    const searchTermMatches = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const categoryMatches =
      !selectedCategory || product.category.id === selectedCategory.id;
    return searchTermMatches && categoryMatches;
  });

  // CategoryFilterModal component
  const CategoryFilterModal = () => {
    return (
      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>เลือกประเภทสินค้า</DialogTitle>
        <DialogContent>
          <Grid container spacing={1} direction="column">
            {categories.map((category:CategoryPayload, index:number) => (
              <Grid item key={index}>
                <Button onClick={() => handleCategorySelect(category)}>
                  {category.name}
                </Button>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            ยกเลิก
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <MainLayout>
      <NextSeo
        title="Product Page"
        description="A grid of products with optimized images using Next.js"
      />

      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4" component="h4" gutterBottom>
          หน้าสินค้าทั้งหมด
        </Typography>
        <Box className={classes.searchContainer} display="flex">
          <TextField
            label="ค้นหาสินค้า"
            variant="outlined"
            value={searchTerm}
            style={{ width: '300px' }}
            onChange={handleSearchInputChange}
          />
          <Button
            variant="outlined"
            onClick={handleOpenModal}
            style={{ marginLeft: "8px" }}
          >
            {selectedCategory && selectedCategory.name !== ""
              ? selectedCategory.name
              : "กรองตามประเภทสินค้า"}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClearFilters}
            style={{ marginLeft: "8px" }}
          >
            ล้างตัวกรอง
          </Button>
        </Box>
      </Box>

      <CategoryFilterModal />

      <Grid container spacing={2}>
        {filteredProducts.map((product: ProductPayload, index: number) => (
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
                  {product?.productImages?.map((image: any, index: number) => (
                    <div key={index}>
                      <Image
                        src={productImageURL(image?.image)}
                        alt={`Product image ${index}`}
                        width="250"
                        height="250"
                        style={{ borderRadius: "5%", objectFit: "cover" }}
                      />
                    </div>
                  ))}
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

        {/* {products.map((product: ProductPayload, index: number) => (
         
          ))} */}
      </Grid>
    </MainLayout>
  );
};

export default ProductTest;
