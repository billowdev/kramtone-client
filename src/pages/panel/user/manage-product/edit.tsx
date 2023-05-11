import { Formik, Form, Field, FieldArray, FormikProps } from "formik";
import { TextField, Button, Box, Paper } from "@mui/material";
import { Card, CardContent, CardActions, Typography, Grid} from "@mui/material";
import Link from "next/link";
import Layout from "@/components/Layouts/Layout";
import withAuth from "@/components/withAuth";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import httpClient from "@/common/utils/httpClient.util";
import { updateProductAction, deleteProductAction, deleteProductImageAction } from "@/store/slices/product.slice";
import { useAppDispatch } from "@/store/store";
import toast from "react-hot-toast";
import * as categoryService from "@/services/category.service";
import * as authService from "@/services/auth.service";
import { CloudUpload } from "@material-ui/icons";
import { Delete } from "@material-ui/icons";
import { ProductPayload } from "@/models/product.model";
import * as colorSchemeService from "@/services/color-scheme.service"

import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';


import { ColorSchemePayload } from "@/models/color-scheme.model"
import {
 
  CardMedia,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText
} from "@mui/material";
import { CategoryPayload } from "@/models/category.model";
import Swal from "sweetalert2";
import * as productService from "@/services/product.service";
import { productImageURL } from "@/common/utils/utils";
import { IconButton } from "@material-ui/core";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import { CheckboxWithLabel } from 'formik-material-ui';


interface AddProductFormProps {
  accessToken?: string;
  product?: ProductPayload;
  categories?: CategoryPayload[];
  colorschemes?: ColorSchemePayload[];
  gid?: string;
}

const AddProductForm = ({
  accessToken,
  categories,
  gid,
  product,
  colorschemes
}: AddProductFormProps) => {
  const [selectedCategory, setSelectedCategory] = useState<any>({
    id: product?.category?.id,
    name: product?.category?.name,
    desc: "",
    image: "default_image.png",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const theme = useTheme();
	const isSmallDevice = useMediaQuery(theme.breakpoints.down("xs"));

  const [selectedColorScheme, setSelectedColorScheme] = useState<any>({
    id: product?.colorScheme?.id,
    nameEN: product?.colorScheme?.nameEN,
    nameTH: product?.colorScheme?.nameTH,
    hex: product?.colorScheme?.hex,
  });
  const [colorShemeModalOpen, setColorSchemeModalOpen] = useState(false);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const [previewImages, setPreviewImages] = useState<any>([]);
  const [images, setImages] = useState<any>([]);
  const [existingImages, setExistingImages] = useState<any>(product?.productImages);
  const [selectedImage, setSelectedImage] = useState(null);
  const totalImages = existingImages.length + images.length;

const disableAddImage = totalImages === 3;

  // Pass the product object as a prop to this component

  const initialValues: ProductPayload = {
    name: product?.name,
    desc: product?.desc,
    price: product?.price,
    publish: product?.publish,
    recommend: product?.recommend,
    images: undefined,
  };
const [publish, setPublish] = useState<boolean>(product?.publish!)
const [recommend, setRecommend] = useState<boolean>(product?.recommend!)

  const [updateValue, setUpdateValue] = useState<ProductPayload>(initialValues);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      setImages([...images, ...Array.from(files)]);
      const urls: string[] = [];
      const length = files.length;
      for (let i = 0; i < length; i++) {
        urls.push(URL.createObjectURL(files[i]));
      }

      setPreviewImages((prevPreviewImages: string[]) => [...prevPreviewImages, ...urls]);
    }
  };

  const handleDeleteImage = (index: number) => {
    const newPreviewImages = [...previewImages];
    newPreviewImages.splice(index, 1);
    setPreviewImages(newPreviewImages);

    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };
  const [deleteImage, setDeleteImage] = useState(null);
  const [openDeleteConfirmationDialog, setOpenDeleteConfirmationDialog] = useState(false)

  const handleOpenDeleteConfirmationDialog = ()=>{
    setOpenDeleteConfirmationDialog(true)
    
  }
  const handleCloseDeleteConfirmationDialog = ()=>{
    setOpenDeleteConfirmationDialog(false)
  }
  const showDeleteConfirmDialog = () =>{
   return (
    <Dialog open={openDeleteConfirmationDialog}>
		<DialogTitle>ลบรูปภาพ</DialogTitle>
		<DialogContent>
		  <Typography>คุณต้องการลบรูปภาพ</Typography>
		</DialogContent>
		<DialogActions>
		  <Button variant="outlined" onClick={handleCloseDeleteConfirmationDialog}>
			ยกเลิก
		  </Button>
		  <Button variant="contained" onClick={handleDeleteExistImage} autoFocus>
			ลบ
		  </Button>
		</DialogActions>
	  </Dialog>
   )
  } 
 const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleDeleteExistImage = async () => {
    const { id } = deleteImage
   
    await dispatch(deleteProductImageAction({ productId: product?.id, id, accessToken, gid }));
    // Swal.fire(
    //   'ลบข้อมูลเรียบร้อย!',
    //   'รูปภาพของคุณถูกลบเรียบร้อยแล้ว',
    //   'success'
    // );
    const updatedImages = existingImages.filter((image: any) => image.id !== id);
    setExistingImages(updatedImages);
    setOpenDeleteConfirmationDialog(false)
    setShowSuccessAlert(true);
   
  };


  const handleSelectCategory = (category: CategoryPayload) => {
    setSelectedCategory(category);
    setModalOpen(false);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  
  const handleSelectColorScheme = (colorScheme: ColorSchemePayload) => {
    setSelectedColorScheme(colorScheme);
    setColorSchemeModalOpen(false);
  };
  const handleOpenColorSchemeModal = () => {
    setColorSchemeModalOpen(true);
  };

  const handleCloseColorSchemeModal = () => {
    setColorSchemeModalOpen(false);
  };

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleEditProduct = () => {
    // show confirmation dialog before editing product
    setShowConfirmation(true);
  };

  const handleConfirmEditProduct = async () => {
    // edit product
    // console.log(updateValue)
    const values = updateValue
    try {
      const formData = new FormData();
      if (images) {
        for (let i = 0; i < images.length; i++) {
          formData.append("images", images[i]);
        }
      }

      formData.append(
        "product",
        JSON.stringify({
          name: values.name,
          desc: values.desc,
          price: values.price,
          publish: publish,
          recommend: recommend,
          categoryId: selectedCategory && selectedCategory?.id,
          colorSchemeId: selectedColorScheme && selectedColorScheme?.id,
        })
      );
      const updateStatus = await dispatch(
        updateProductAction({
          id: product?.id, // pass the ID of the product being edited as a parameter
          body: formData,
          accessToken,
        })
      );

      if (updateStatus.meta.requestStatus === "fulfilled") {
        toast.success("แก้ไขข้อมูลสินค้าสำเร็จ");
        // console.log(updateStatus)
        router.push("/panel/user/manage-product");
      } else {
        toast.error("แก้ไขข้อมูลสินค้าไม่สำเร็จ โปรดลองอีกครั้ง");
      }
    } catch (error) {
      toast.error("แก้ไขข้อมูลสินค้าไม่สำเร็จ");
      console.error("An error occurred:", error);
      // Handle the error here
    }

    setShowConfirmation(false);
  };

  const handleCancelEditProduct = () => {
    setShowConfirmation(false);
  };


  const [openDialog, setOpenDialog] = useState(false);
  const isLargeDevice = useMediaQuery(theme.breakpoints.up('lg'));

  const showPreviewImage = (values: any) => {
    if (values.file_obj) {
      return (
        <Image
          alt="product image"
          src={values.file_obj}
          width={150}
          height={150}
        />
      );
    } else if (values.image) {
      return (
        <Image
          alt="product image"
          src={productImageURL(values.image)}
          width={150}
          height={150}
        />
      );
    }
  };

  const categoryModal = () => {
    return (
      <Dialog open={modalOpen} keepMounted>
        <DialogTitle>กรุณาเลือกประเภทสินค้า</DialogTitle>
        <DialogContent>
          <List>
            {categories &&
              categories.map((category: any) => (
                <ListItem
                  button
                  key={category.id}
                  onClick={() => handleSelectCategory(category)}
                >
                  <ListItemText primary={category.name} />
                </ListItem>
              ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
        </DialogActions>
      </Dialog>
    );
  };

  const colorSchemeModal = () => {
    return (
      <Dialog open={colorShemeModalOpen} keepMounted>
        <DialogTitle>กรุณาเลือกโทนสี</DialogTitle>
        <DialogContent>
          <List>
            {colorschemes &&
              colorschemes.map((colorscheme: any) => (
                <ListItem
                button
                key={colorscheme.id}
                onClick={() => handleSelectColorScheme(colorscheme)}
              >
                <ListItemText
                  primary={colorscheme.nameTH}
                  secondary={colorscheme.hex}
                />
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    backgroundColor: colorscheme.hex,
                    borderRadius: "50%",
                    border: "1px solid black",
                    marginLeft: 2,
                  }}
                />
              </ListItem>
              
              ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseColorSchemeModal}>Cancel</Button>
        </DialogActions>
      </Dialog>
    );
  };

  const showForm = ({
    values,
  handleChange,
  handleBlur,
  isSubmitting,
  setFieldValue,
  }: FormikProps<ProductPayload>) => {
    return (
      <Form>
        <Card>
          <CardContent sx={{ padding: 4 }}>
          <Field
		  style={{ marginTop: 16 }}
		  fullWidth
		  as={TextField}
		  name="name"
		  type="text"
		  label="ชื่อสินค้า"
		  value={values.name}
		  onChange={handleChange}
		  onBlur={handleBlur}
		/>
		<br />
		<Field
		  style={{ marginTop: 16 }}
		  fullWidth
		  as={TextField}
		  name="desc"
		  type="string"
		  label="รายละเอียดสินค้า"
		  value={values.desc}
		  onChange={handleChange}
		  onBlur={handleBlur}
		/>
		<br />
		<Field
		  style={{ marginTop: 16 }}
		  fullWidth
		  as={TextField}
		  name="price"
		  type="number"
		  label="ราคาสินค้า"
		  value={values?.price}
		  onChange={handleChange}
		  onBlur={handleBlur}
		/>
		<br />
           
    <Grid container direction="row">
  <Grid item>
    <Field
      component={CheckboxWithLabel}
      name="publish"
      id="publish-checkbox"
      checked={publish}
      onChange={() => {
        setPublish(!publish);
      }}
      Label={{
        label: 'แสดงสินค้า',
      }}
    />
  </Grid>

  <Grid item>
    <Field
      component={CheckboxWithLabel}
      name="recommend"
      id="recommend-checkbox"
      checked={recommend}
      onChange={() => {
        setRecommend(!recommend);
      }}
      Label={{
        label: 'สินค้าแนะนำ',
      }}
    />
  </Grid>
</Grid>


    <Box mt={2}>
        <Button variant="outlined" onClick={handleOpenModal}>
          {selectedCategory && selectedCategory.name !== ""
            ? selectedCategory.name
            : "เลือกประเภทสินค้า"}
        </Button>
      </Box>
      <Box mt={2}>
        <Button variant="outlined" onClick={handleOpenColorSchemeModal}>
          {selectedColorScheme ? (
            <Box
              sx={{
                width: 50,
                height: 50,
                backgroundColor: selectedColorScheme.hex,
                borderRadius: "50%",
                border: "1px solid black",
                marginRight: 2,
              }}
            />
          ) : null}
          {selectedColorScheme
            ? `${selectedColorScheme.nameTH} / ${selectedColorScheme.nameEN} / ${selectedColorScheme.hex}  `
            : "เลือกโทนสี"}
        </Button>
      </Box>

      <Box mt={2}>
       
    
          <label
            htmlFor="files"
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            {existingImages?.map((image: any) => (
              <div key={image.id}>
                {showPreviewImage({ image: image.image })}
              
                <Button onClick={() => {
                  setDeleteImage(image)
                  handleOpenDeleteConfirmationDialog()
                }
                } style={{ background: "none", border: "none", cursor: "pointer" }}>
                  <Delete style={{ fontSize: 20 }} />
                </Button>

              </div>
            ))}
          </label>

      </Box>

          
      <FieldArray
  name="images"
  render={(arrayHelpers) => (
    <div style={{ marginTop: 16 }}>
      <Grid container spacing={2}>
        {previewImages.map((image:any, index:number) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Paper elevation={3}>
              <Box position="relative">
              {showPreviewImage({file_obj: image})}
                {/* <Image src={productImageURL(image)} alt="preview" width={250} height={250} /> */}
                <Box
                  position="absolute"
                  top={0}
                  right={0}
                  // zIndex="tooltip"
                  bgcolor="rgba(0, 0, 0, 0.5)"
                  borderRadius="0 0 0 5px"
                >
                    
                <Button onClick={() => handleDeleteImage(image)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                  <Delete style={{ fontSize: 20 }} />
                </Button>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}

         {!disableAddImage && (
         
        <Grid item xs={12} sm={6} md={4}>
        <label htmlFor="images" style={{ cursor: "pointer" }}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            border="1px dashed #00B0CD"
            borderRadius="5px"
            minHeight="250px"
          >
            <CloudUpload style={{ marginRight: 10 }} />
            <span style={{ color: "#00B0CD" }}>เพิ่มรูปภาพ</span>
          </Box>
          <input
            id="images"
            name="images"
            type="file"
            accept="image/*"
            multiple
            onChange={(event) => {
              if (event.currentTarget.files) {
                handleImageChange(event);
              }
            }}
            style={{ display: "none" }}
          />
        </label>
      </Grid>
        )}

      </Grid>
    </div>
  )}
/>

          </CardContent>
          <CardActions>
            <Button
              // disabled={!isValid}
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              sx={{ marginRight: 1 }}
            >
              แก้ไข
            </Button>
            <Link href="/panel/user/manage-product" passHref>
              <Button variant="outlined" fullWidth>
                ยกเลิก
              </Button>
            </Link>
          </CardActions>
        </Card>
      </Form>
    );
  };


  return (
    <Layout>

<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
     <Grid container spacing={3}>
         <Grid item xs={12}>
         <Paper sx={{ p: 2, display: 'flex', flexDirection: 'row', gap: '16px'}}>
         {isSmallDevice ? (
             <ShoppingBagIcon sx={{fontSize:'1.5rem', marginLeft:'8px'}} />
           ) : (
             <ShoppingBagIcon sx={{fontSize:'2.5rem', marginLeft:'16px'}} />
           )}

          
         <React.Fragment> 
           {isSmallDevice ? (
             <Typography
            sx={{
               fontWeight: 'bold',  alignSelf:'center',
           }}
             > แก้ไขข้อมูลสินค้า</Typography>
           ) : (
             <Typography
             variant='h5' sx={{
               fontWeight: 'bold',  alignSelf:'center',
           }}
             > แก้ไขข้อมูลสินค้า</Typography>
           )}
         </React.Fragment>
         </Paper>
       </Grid> 
       <Grid item xs={12} md={12} lg={12}>
       <Formik
        validate={(values) => {
          let errors: any = {};
          if (!values.name) errors.name = "กรุณากรอกชื่อสินค้า";
          return errors;
        }}
        initialValues={initialValues!}
        onSubmit={async (values, { setSubmitting }) => {
          setUpdateValue(values)
          handleEditProduct()
          // handleUpdate(values); // call handleUpdate function for updating the product
          setSubmitting(false);
        }}
      >
        {(props) => showForm(props)}
      </Formik>

      {categoryModal()}
      {colorSchemeModal()}

      <ConfirmationDialog
        title="ยืนยันการแก้ไขสินค้า"
        message="คุณต้องการแก้ไขสินค้าใช่หรือไม่ ?"
        open={showConfirmation}
        onClose={handleCancelEditProduct}
        onConfirm={handleConfirmEditProduct}
      />
  {showDeleteConfirmDialog()}
  <Snackbar
      open={showSuccessAlert}
      autoHideDuration={6000}
      onClose={() => setShowSuccessAlert(false)}
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        onClose={() => setShowSuccessAlert(false)}
        severity="success"
        sx={{ width: '100%' }}
      >
        {"ลบข้อมูลเรียบร้อย! รูปภาพของคุณถูกลบเรียบร้อยแล้ว"}
      </MuiAlert>
    </Snackbar>
       </Grid>
   
     </Grid>
   
   </Container>

     
    </Layout>
  );
};

export default withAuth(AddProductForm);

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id }: any = context.query;

  if (id) {
    const accessToken = context.req.cookies["access_token"];
    const { gid } = await authService.getSessionServerSide(accessToken!);
    const categories = await categoryService.getAllCategory();
    const product = await productService.getOneProduct(id);
    const colorschemes = await colorSchemeService.getAllColorScheme()
    return {
      props: {
        product,
        accessToken,
        categories,
        gid,
        colorschemes
      },
    };
  } else {
    return { props: {} };
  }
};