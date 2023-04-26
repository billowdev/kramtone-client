import { Formik, Form, Field, FieldArray } from "formik";
import { TextField, Button, Box, Paper } from "@mui/material";
import { Card, CardContent, CardActions, Typography, Grid } from "@mui/material";
import Link from "next/link";
import Layout from "@/components/Layouts/Layout";
import withAuth from "@/components/withAuth";
import { useState } from "react";
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

import { ColorSchemePayload } from "@/models/color-scheme.model"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { CategoryPayload } from "@/models/category.model";
import Swal from "sweetalert2";
import * as productService from "@/services/product.service";
import { productImageURL } from "@/common/utils/utils";
import { IconButton } from "@material-ui/core";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


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

  // Pass the product object as a prop to this component

  const initialValues: ProductPayload = {
    name: product?.name,
    desc: product?.desc,
    price: product?.price,
    images: undefined,
  };

  const [updateValue, setUpdateValue] = useState<ProductPayload>(initialValues);

  const handleUpdate = async (values: ProductPayload) => {
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
          categoryId: selectedCategory && selectedCategory?.id,
          colorSchemeId: selectedColorScheme && selectedColorScheme?.id,
        })
      );

      const result = await Swal.fire({
        title: "แก้ไขข้อมูล?",
        text: `คุณต้องการแก้ไขข้อมูลสินค้า ${values.name}`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "ใช่, ยืนยัน!",
        cancelButtonText: "ไม่, ยกเลิก",
      });

      if (result.isConfirmed) {
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
      }
    } catch (error) {
      toast.error("แก้ไขข้อมูลสินค้าไม่สำเร็จ");
      console.error("An error occurred:", error);
      // Handle the error here
    }
  };


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

  const handleDeleteExistImage = async (image: any) => {
    const { id } = image
    await dispatch(deleteProductImageAction({ productId: product?.id, id, accessToken, gid }));
    const updatedImages = existingImages.filter((image: any) => image.id !== id);
    setExistingImages(updatedImages);


    // const result = await Swal.fire({
    //   title: 'ลบรูปภาพ',
    //   text: 'เมื่อลบแล้วไม่สามารถกู้คืนได้!',
    //   icon: 'warning',
    //   showCancelButton: true,
    //   cancelButtonText: 'ยกเลิก',
    //   confirmButtonText: 'ยืนยันการลบ',
    //   reverseButtons: true
    // });

    // if (result.isConfirmed) {
    //   // Call the API or function to delete the image
    //   // await deleteImage(id);
    //   await dispatch(deleteProductImageAction({ productId: product?.id, id, accessToken, gid }));
    //   Swal.fire(
    //     'ลบข้อมูลเรียบร้อย!',
    //     'รูปภาพของคุณถูกลบเรียบร้อยแล้ว',
    //     'success'
    //   );
    //   const updatedImages = existingImages.filter((image: any) => image.id !== id);
    //   setExistingImages(updatedImages);
    // }

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

  return (
    <Layout>
      <Formik
        initialValues={initialValues} // pass initial values as props
        validate={(values) => {
          let errors: any = {};
          if (!values.name) errors.name = "กรุณากรอกชื่อสินค้า";
          if (!values.desc) errors.desc = "กรุณากรอกรายละเอียดสินค้า";
          if (!values.price) errors.price = "กรุณากรอกราคาสินค้า";
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          handleUpdate(values); // call handleUpdate function for updating the product
          setSubmitting(false);
        }}
      >
        {({
          values,
          handleChange,
          handleBlur,
          isSubmitting,
          setFieldValue,
        }) => (
          <Form>
            <Card>
              <CardContent sx={{ padding: 4 }}>
                <Typography gutterBottom variant="h3">
                  แก้ไขข้อมูลสินค้า
                </Typography>

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
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <br />

                <div style={{ marginTop: 16 }}>
                  <Button variant="outlined" onClick={handleOpenModal}>
                    {selectedCategory && selectedCategory.name !== ""
                      ? selectedCategory.name
                      : "เลือกประเภทสินค้า"}
                  </Button>
                </div>
                <br />
                <div style={{ marginTop: 16 }}>
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
</div>


                {/* <div style={{ marginTop: 16 }}>
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
        <IconButton onClick={() => handleDeleteExistImage(image)}>
          <Delete />
        </IconButton>
      </div>
    ))}
  </label>
</div> */}

<div style={{ marginTop: 16 }}>
      <label
        htmlFor="files"
        style={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <Grid container spacing={2}>
          {existingImages?.map((image) => (
            <Grid item key={image.id} xs={12} sm={6} md={4} lg={3}>
              <Paper elevation={3}>
                <Box position="relative">
                  {showPreviewImage({ image: image.image })}
                  <Box
                    position="absolute"
                    top={0}
                    right={0}
                    // zIndex="tooltip"
                    bgcolor="rgba(0, 0, 0, 0.5)"
                    borderRadius="0 0 0 5px"
                  >
                    <IconButton
                      onClick={() => handleDeleteExistImage(image)}
                      color="secondary"
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </label>
    </div>


    <FieldArray
  name="images"
  render={(arrayHelpers) => (
    <div style={{ marginTop: 16 }}>
      <Grid container spacing={2}>
        {previewImages.map((image, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Paper elevation={3}>
              <Box position="relative">
                <img src={image} alt="preview" width="100%" />
                <Box
                  position="absolute"
                  top={0}
                  right={0}
                  zIndex="tooltip"
                  bgcolor="rgba(0, 0, 0, 0.5)"
                  borderRadius="0 0 0 5px"
                >
                  <IconButton
                    onClick={() => handleDeleteImage(image)}
                    color="secondary"
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
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
      </Grid>
    </div>
  )}
/>


              </CardContent>
              <CardActions>
                <Button
                  disabled={isSubmitting}
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
                <input type="hidden" name="id" value={product && product?.id} />{" "}
                {/* add hidden field for product ID */}
              </CardActions>
            </Card>
          </Form>
        )}
      </Formik>
      {categoryModal()}
      {colorSchemeModal()}
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
