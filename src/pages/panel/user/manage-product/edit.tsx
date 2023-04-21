import { Formik, Form, Field } from 'formik';
import { TextField, Button } from '@mui/material';
import { Card, CardContent, CardActions, Typography } from '@mui/material';
import Link from 'next/link';
import Layout from '@/components/Layouts/Layout';
import withAuth from '@/components/withAuth';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from "next/image";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import httpClient from '@/common/utils/httpClient.util';
import { updateProductAction } from '@/store/slices/product.slice';
import { useAppDispatch } from "@/store/store";
import toast from "react-hot-toast";
import * as categoryService from "@/services/category.service"
import * as authService from "@/services/auth.service"
import { CloudUpload } from '@material-ui/icons';
import { Delete } from '@material-ui/icons';

import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,

	List,
	ListItem,
	ListItemText,
} from '@mui/material';
import { CategoryPayload } from '@/models/category.model';
import Swal from 'sweetalert2';



interface Product {
	name: string;
	desc: string;
	price: string;
	images?: FileList;
}
interface AddProductFormProps {
	accessToken?: string;
	product?: ProductPayload,
	categories?: CategoryPayload[],
	gid?: string
}

const AddProductForm = ({ accessToken, categories, gid, product}: AddProductFormProps) => {
	const [selectedCategory, setSelectedCategory] = useState<CategoryPayload>({
		id: "",
		name: "",
		desc: "",
		image: "default_image.png",
	  });
	  const [modalOpen, setModalOpen] = useState(false);
	  
	  const dispatch = useAppDispatch();
	  const router = useRouter();
	  
	  // Pass the product object as a prop to this component
	
	  const initialValues: Product = {
		name: product.name,
		desc: product.desc,
		price: product.price,
		images: undefined,
	  };
	  
	  const [updateValue, setUpdateValue] = useState<Product>(initialValues);
	  const [images, setImages] = useState<File[]>(product.images); // Set the existing images as the initial state
	  const [previewImages, setPreviewImages] = useState<string[]>(product.images); // Set the existing images as the preview images
	  
	  const handleUpdate = async (values: Product) => {
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
				id: product.id, // pass the ID of the product being edited as a parameter
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
	  
	  const handleImageChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		setFieldValue: any
	  ) => {
		if (event.target.files && event.target.files.length > 0) {
		  const files = event.target.files;
		  const urls: string[] = [];
		  for (let i = 0; i < files.length; i++) {
			urls.push(URL.createObjectURL(files[i]));
		  }
		  setPreviewImages((prevPreviewImages) => [...prevPreviewImages, ...urls]);
		  const existingFiles = updateValue.images || [];
		  setFieldValue("images", [...existingFiles, ...files]);
		  setImages((prevImages) => [...prevImages, ...files]); // add new image files to state
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

	const categoryModal = () => {

		return (
			<Dialog open={modalOpen}
				keepMounted
			>
				<DialogTitle>กรุณาเลือกประเภทสินค้า</DialogTitle>
				<DialogContent>
					<List>
						{categories && categories.map((category: any) => (
							<ListItem button key={category.id} onClick={() => handleSelectCategory(category)}>
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
              <Button
                variant="outlined"
                onClick={handleOpenModal}
              >
                {selectedCategory && selectedCategory.name !== "" ? selectedCategory.name : 'เลือกประเภทสินค้า'}
              </Button>

            </div>
            <div style={{ marginTop: 16 }}>
              <input
                type="file"
                onChange={(event) => handleImageChange(event, setFieldValue, values)}
                name="images"
                multiple
                accept="image/*"
                id="files"
                style={{ display: 'none' }}
              />

              <label htmlFor="files" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <CloudUpload style={{ marginRight: 10 }} />
                <span style={{ color: '#00B0CD' }}>เพิ่มรูปภาพ</span>
              </label>

              {previewImages.map((url, index) => (
                <div key={index} style={{ position: 'relative', display: 'inline-block' }}>
                  <img
                    src={url}
                    alt="preview"
                    style={{ maxWidth: 150, maxHeight: 150, margin: 10 }}
                  />
                  <button
                onClick={() => {
					const newImages = [...images];
					newImages.splice(index, 1);
					setImages(newImages);
				  
					const newPreviews = [...previewImages];
					newPreviews.splice(index, 1);
					setPreviewImages(newPreviews);
				  }}
				  style={{
					position: 'absolute',
					top: 0,
					right: 0,
					backgroundColor: 'transparent',
					border: 'none',
					color: 'red',
					cursor: 'pointer',
				  }}
				  >
				  <Delete style={{ color: 'red' }} />
				  </button>
				  </div>
				  ))}
				  </div>
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
				  <input type="hidden" name="id" value={product.id} /> {/* add hidden field for product ID */}
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
) => {const { id }: any = context.query;
  
if (id) {
	const accessToken = context.req.cookies['access_token']
	const { gid } = await authService.getSessionServerSide(accessToken!)

	const categories = await categoryService.getAllCategory()
	const product = await productService.getProductById(id)
	return {
		props: {
			product,
			accessToken,
			categories,
			gid
		},
	};
} else {
  return { props: {} };
}

};
