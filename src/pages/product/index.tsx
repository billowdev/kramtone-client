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
  Pagination 
} from "@mui/material";

import { NextSeo } from "next-seo";
import { ProductPayload } from "@/models/product.model";
import * as productService from "@/services/product.service";
import * as categoryService from "@/services/category.service";
import * as colorSchemeService from "@/services/color-scheme.service";

import { productImageURL } from "@/common/utils/utils";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import router from "next/router";
import Image from "next/image";

import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import { CategoryPayload } from "@/models/category.model";
import { ColorSchemePayload } from "@/models/color-scheme.model";
import useMediaQuery from "@material-ui/core/useMediaQuery";

type Props = {};

const useStyles = makeStyles((theme) => ({
  searchContainer: {
    marginBottom: theme.spacing(2),
  },
}));
const ProductPage = ({}: Props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [products, setProducts] = React.useState<any>([]);
  const isSmallDevice = useMediaQuery(theme.breakpoints.down("xs"));
  const [searchTerm, setSearchTerm] = useState("");

  const [categories, setCategories] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryPayload | null>(null);
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

    const [colorSchemes, setColorSchemes] = React.useState<any>([]);
    const [selectedColorScheme, setSelectedColorScheme] =
    useState<ColorSchemePayload | null>(null);
  const [isColorSchemeModalOpen, setIsColorSchemeModalOpen] = useState(false);

  const handleOpenColorSchemeModal = () => {
    setIsColorSchemeModalOpen(true);
  };

  const handleCloseColorSchemeModal = () => {
    setIsColorSchemeModalOpen(false);
  };
  

  const handleColorSchemeSelect = (colorScheme: ColorSchemePayload) => {
    setSelectedColorScheme(colorScheme);
    setIsColorSchemeModalOpen(false);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const payload = await productService.getAllProduct();
        const categoriesPayload = await categoryService.getAllCategory();
        const colorSchemesPayload = await colorSchemeService.getAllColorScheme();
   
        setProducts(payload);
        setCategories(categoriesPayload);
        setColorSchemes(colorSchemesPayload);

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


  const handleClearFilters = () => {
    setSelectedCategory(null);
    setSelectedColorScheme(null);
    setSearchTerm("");
  };

  const filteredProducts = products
  ?.filter((product: any) => {
    const searchTermMatches =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.price.toString().includes(searchTerm.toLowerCase()) || 
      product.colorScheme.nameTH.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.colorScheme.hex.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.colorScheme.nameEN.toLowerCase().includes(searchTerm.toLowerCase()) ;

    const categoryMatches =
      !selectedCategory || product.category.id === selectedCategory.id;
      
      const colorSchemeMatches =
      !selectedColorScheme || product.colorScheme.id === selectedColorScheme.id;

    return searchTermMatches && categoryMatches && colorSchemeMatches;
  })
  ?? [];

  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage: number = 12;
  
  const indexOfLastProduct: number = currentPage * productsPerPage;
  const indexOfFirstProduct: number = indexOfLastProduct - productsPerPage;
  const currentProducts: ProductPayload[] = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  
  const totalPages: number = Math.ceil(filteredProducts.length / productsPerPage);
  

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

  const ColorSchemeFilterModal = () => {
    return (
      <Dialog open={isColorSchemeModalOpen} onClose={handleCloseColorSchemeModal}>
        <DialogTitle>เลือกโทนสี</DialogTitle>
        <DialogContent>
          <Grid container spacing={1} direction="column">
            {colorSchemes.map((colorScheme: ColorSchemePayload, index: number) => (
              <Grid item key={index}>
                <Button onClick={() => handleColorSchemeSelect(colorScheme)}>
                  <Box
                    sx={{
                      display: "inline-block",
                      width: 50,
                      height: 50,
                      backgroundColor: colorScheme.hex,
                      border: "1px solid black",
                      marginRight: 4,
                    }}
                  />
                  {colorScheme.id} - {colorScheme.hex} - {colorScheme.nameTH} ({colorScheme.nameEN})
                </Button>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseColorSchemeModal} color="primary">
            ยกเลิก
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  

  return (
    <MainLayout>
       <Box sx={{ flexGrow: 1, p: isSmallDevice ? 0:4 }}> 

      <NextSeo
        title="หน้าสินค้าทั้งหมด"
        description="ระบบบริหารจัดการการเชื่อมโยงแผนภาพโทนสีครามธรรมชาติกับแหล่งผลิตผ้าย้อมคราม"
      />

<Box display="flex" flexDirection="column" alignItems="center">
  <Typography variant="h4" component="h4" gutterBottom>
    หน้าสินค้าทั้งหมด
  </Typography>
  <Grid container spacing={{ xs: 1, md: 3 }} justifyContent="center">
    <Grid item xs={12} md={3}>
      <TextField
        label="ค้นหาสินค้า"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchInputChange}
        fullWidth
        style={{ height: '100%' }}
      />
    </Grid>
    <Grid item xs={12} md={2}>
      <Button
        variant="outlined"
        onClick={handleOpenModal}
        fullWidth
        style={{ height: '100%' }}
      >
        {selectedCategory && selectedCategory.name !== ""
          ? selectedCategory.name
          : "เลือกตามประเภทสินค้า"}
      </Button>
    </Grid>
    <Grid item xs={12} md={2}>
      <Button
        variant="outlined"
        onClick={handleOpenColorSchemeModal}
        fullWidth
        style={{ height: '100%' }}
      >
        {selectedColorScheme && selectedColorScheme.nameTH !== ""
          ? selectedColorScheme.nameTH
          : "เลือกตามโทนสี"}
      </Button>
    </Grid>
    <Grid item xs={12} md={2}>
    {
        selectedColorScheme || selectedCategory ?   <Button
        variant="outlined"
        // color="secondary"
        onClick={handleClearFilters}
        fullWidth
        style={{ height: '100%' }}
      >
        ล้างตัวเลือก
      </Button> :   <Button
        variant="outlined"
        color="secondary"
        onClick={handleClearFilters}
        fullWidth
        style={{ height: '100%' }}
      >
        ล้างตัวเลือก
      </Button>
      }
    </Grid>
  </Grid>
</Box>


      


      <CategoryFilterModal />

    <ColorSchemeFilterModal />

      <Grid container spacing={2} minHeight={"100vh"}>
      {currentProducts.length === 0 ? (
        <Typography variant="h4" style={{ textAlign: "center", margin: "auto" }}>
          ไม่พบข้อมูลสินค้า
        </Typography>
      ) : (
        currentProducts.map((product: ProductPayload, index: number) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Card
            key={product.id}
            style={{ padding: "20px", margin: "20px", maxWidth: "340px", minWidth: "340px", minHeight: "600px", maxHeight: "600px" }}
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
                  <Typography variant="body1" color="text.secondary">
                    <span style={{fontWeight:'bold'}}> โทนสี:</span> 
                    {product?.colorScheme?.nameTH} (
                    {product?.colorScheme?.nameEN})
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
                          {product?.colorScheme?.id} &nbsp;
                        </Typography>
                      </Grid>
                    </Grid>
                  ) : null}

                  <Typography variant="body1" color="text.secondary">
                  <span style={{fontWeight:'bold'}}> ประเภทสินค้า:</span> 
                  {product?.category?.name}
                  </Typography>
            
                  <Typography variant="body1" color="text.secondary">
                   <span style={{fontWeight:'bold'}}> ราคา:</span> {product?.price} THB
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                   <span style={{fontWeight:'bold'}}> รายละเอียดสินค้า:</span> {product?.desc}
                  </Typography>
               
            </CardContent>
 
            <Button
              variant="contained"
              color="primary"
              onClick={() => router.push("/product/" + product.id)}
            >
              รายละเอียดเพิ่มเติม
            </Button>
          </Card>
        </Grid>
        ))
      )}
    </Grid>

    {totalPages > 1 && (
      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination count={totalPages} page={currentPage} onChange={(event, value) => setCurrentPage(value)} />
      </Box>
    )}

     


      </Box>
    </MainLayout>
  );
};

export default ProductPage;