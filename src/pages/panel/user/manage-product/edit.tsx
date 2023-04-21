import { Formik, Form, Field, FieldArray } from "formik";
import { TextField, Button } from "@mui/material";
import { Card, CardContent, CardActions, Typography } from "@mui/material";
import Link from "next/link";
import Layout from "@/components/Layouts/Layout";
import withAuth from "@/components/withAuth";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import httpClient from "@/common/utils/httpClient.util";
import { updateProductAction } from "@/store/slices/product.slice";
import { useAppDispatch } from "@/store/store";
import toast from "react-hot-toast";
import * as categoryService from "@/services/category.service";
import * as authService from "@/services/auth.service";
import { CloudUpload } from "@material-ui/icons";
import { Delete } from "@material-ui/icons";
import { ProductPayload } from "@/models/product.model";
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

interface Product {
  name: string;
  desc: string;
  price: string;
  images?: FileList;
}
interface AddProductFormProps {
  accessToken?: string;
  product?: ProductPayload;
  categories?: CategoryPayload[];
  gid?: string;
}

const AddProductForm = ({
  accessToken,
  categories,
  gid,
  product,
}: AddProductFormProps) => {
  const [selectedCategory, setSelectedCategory] = useState<any>({
    id: product?.category?.id,
    name: product?.category?.name,
    desc: "",
    image: "default_image.png",
  });
  const [modalOpen, setModalOpen] = useState(false);

  const dispatch = useAppDispatch();
  const router = useRouter();

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

  // const [images, setImages] = useState<File[]>(product?.images); // Set the existing images as the initial state
  // const [previewImages, setPreviewImages] = useState<any>(
  // 	product?.productImages
  // ); // Set the existing images as the preview images

  // const handleImageChange = (
  // 	event: React.ChangeEvent<HTMLInputElement>,
  // 	setFieldValue: any,
  // 	values: any
  // ) => {
  // 	if (event.target.files && event.target.files.length > 0) {
  // 		const files = event.target.files;
  // 		const urls: string[] = [];
  // 		for (let i = 0; i < files.length; i++) {
  // 			urls.push(URL.createObjectURL(files[i]));
  // 		}
  // 		setPreviewImages((prevPreviewImages) => [...prevPreviewImages, ...urls]);
  // 		const existingFiles = updateValue.images || [];
  // 		setFieldValue("images", [...existingFiles, ...files]);
  // 		setImages((prevImages) => [...prevImages, ...files]); // add new image files to state
  // 	}
  // };
  const [previewImages, setPreviewImages] = useState([]);
  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>(product?.productImages);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: any) => {
    const files = event.target.files;
    const urls: string[] = [];
    for (let i = 0; i < files.length; i++) {
      urls.push(URL.createObjectURL(files[i]));
    }

    setPreviewImages((prevPreviewImages) => [...prevPreviewImages, ...urls]);
    setImages([...images, ...files]);
  };

  const handleDeleteImage = (index: number) => {
    const newPreviewImages = [...previewImages];
    newPreviewImages.splice(index, 1);
    setPreviewImages(newPreviewImages);

    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleDeleteExistingImage = async (index: number) => {
    const existingImageName = existingImages[index];

    try {
      await deleteImage(existingImageName);
      const newExistingImages = [...existingImages];
      newExistingImages.splice(index, 1);
      setExistingImages(newExistingImages);
    } catch (error) {
      console.log(error);
    }
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

  const showPreviewImage = (values: any) => {
    if (values.file_obj) {
      return (
        <Image
          objectFit="contain"
          alt="product image"
          src={values.file_obj}
          width={100}
          height={100}
        />
      );
    } else if (values.image) {
      return (
        <Image
          objectFit="contain"
          alt="product image"
          src={productImageURL(values.image)}
          width={100}
          height={100}
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

				<div style={{ marginTop: 16 }}>
				<label
                  htmlFor="files"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  {product.productImages.map((image) => (
                    <div key={image.id}>
                      {showPreviewImage({ image: image.image })}
                      {!image.isApiImage && (
                        <IconButton onClick={() => handleDeleteImage(image)}>
                          <Delete />
                        </IconButton>
                      )}
                    </div>
                  ))}
                </label>
                </div>

               
              

                {/* <FieldArray
                  name="images"
                  render={(arrayHelpers) => (
                    <div>
                      {previewImages && previewImages.length > 0 ? (
                        previewImages.map((image, index) => (
                          <div key={index}>
                            <img
                              src={image}
                              alt="preview"
                              width={250}
                              height={250}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                arrayHelpers.remove(index); // remove the image from the list
                                setImages((prevImages) => {
                                  const images = [...prevImages];
                                  images.splice(index, 1); // remove the image from state
                                  return images;
                                });
                                setPreviewImages((prevPreviewImages) => {
                                  const previewImages = [...prevPreviewImages];
                                  previewImages.splice(index, 1); // remove the preview image from state
                                  return previewImages;
                                });
                              }}
                            >
                              Remove
                            </button>
                          </div>
                        ))
                      ) : (
                        <div>
                          <label htmlFor="images" style={{ cursor: "pointer" }}>
                            <CloudUpload style={{ marginRight: 10 }} />
                            <span style={{ color: "#00B0CD" }}>
                              Add Picture
                            </span>
                          </label>
                          <input
                            id="images"
                            name="images"
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(event) => {
                              handleImageChange(event, setFieldValue, values);
                              arrayHelpers.push(event.currentTarget.files[0]);
                            }}
                            style={{ display: "none" }}
                          />
                        </div>
                      )}
                    </div>
                  )}
                /> */}

<FieldArray
      name="images"
      render={(arrayHelpers) => (
        <div>
          {/* {existingImages.map((image, index) => (
            <div key={index}>
              <img src={image} alt="preview" width={250} height={250} />
              <button type="button" onClick={() => handleDeleteExistingImage(index)}>
                Remove
              </button>
            </div>
          ))} */}
          {previewImages.map((image, index) => (
            <div key={index}>
              <img src={image} alt="preview" width={250} height={250} />
              <button type="button" onClick={() => handleDeleteImage(index)}>
                Remove
              </button>
            </div>
          ))}
          <div>
            <label htmlFor="images" style={{ cursor: "pointer" }}>
              <CloudUpload style={{ marginRight: 10 }} />
              <span style={{ color: "#00B0CD" }}>Add Picture</span>
            </label>
            <input
              id="images"
              name="images"
              type="file"
              accept="image/*"
              multiple
              onChange={(event) => {
                handleImageChange(event, arrayHelpers.setFieldValue);
                arrayHelpers.push(event.currentTarget.files[0]);
              }}
              style={{ display: "none" }}
            />
          </div>
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
                  อัพเดท
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
    return {
      props: {
        product,
        accessToken,
        categories,
        gid,
      },
    };
  } else {
    return { props: {} };
  }
};
