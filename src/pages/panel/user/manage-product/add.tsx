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
import {createProductAction} from '@/store/slices/product.slice';
import { useAppDispatch } from "@/store/store";
import toast from "react-hot-toast";
import * as categoryService from "@/services/category.service"



import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,

  List,
  ListItem,
  ListItemText,
} from '@mui/material';

function CategoryModal(props:any) {
  const { categories, open, onClose, onSelect } = props;

  const handleSelect = (category:any) => {
    onClose();
    onSelect(category);
  };

  
}



interface Product {
	name: string;
	desc: string;
	price: string;
	images?: FileList;
}
interface AddProductFormProps {
	accessToken?: string;
	categories? : any
  }
  
  const AddProductForm = ({ accessToken, categories }: AddProductFormProps) => {



	const dispatch = useAppDispatch();
	const initialValues: Product = {
		name: '',
		desc: '',
		price: '',
		images: undefined,
	};

	const router = useRouter();

	const handleSubmit = async (values: Product) => {
		const formData = new FormData();
		
	
		if (values.images) {
			for (let i = 0; i < values.images.length; i++) {
				formData.append('images', values.images[i]);
			}
		}

		formData.append('product', JSON.stringify({
			'name': values.name,
			'desc' : values.desc,
			'price': values.price
		}));
		const createStatus = await dispatch(createProductAction({body:formData, accessToken}))

		if (createStatus.meta.requestStatus === "fulfilled") {
		  toast.success("เพิ่มข้อมูลประเภทสินค้าสำเร็จ")
		//   router.push("/panel/user/manage-product");
		}else{
		  toast.error("เพิ่มข้อมูลประเภทสินค้าไม่สำเร็จ โปรดลองอีกครั้ง")
		}
		// console.log('Form Data:');
		// for (const [key, value] of formData.entries()) {
		// 	console.log(key, value);
		// }
		// console.log("===============")

		// try {
		// 	const res = await httpClient.post(`/products`, formData,{
		// 		headers: {
		// 			Authorization: `Bearer ${accessToken}`
		// 		},
		// 		baseURL: process.env.NEXT_PUBLIC_BASE_URL_API
		// 	});
		// 	console.log("=========res============")
		// 	console.log(res)

		// 	// if (res.ok) {
		// 	// 	router.push('/panel/user/manage-product');
		// 	// } else {
		// 	// 	const error = await res.json();
		// 	// 	console.error(error);
		// 	// }
		// } catch (error) {
		// 	console.error(error);
		// }
	};

	const [previewImages, setPreviewImages] = useState<string[]>([]);

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: any, values: Product) => {
		if (event.target.files && event.target.files.length > 0) {
			const files = event.target.files;
			const urls: string[] = [];
			for (let i = 0; i < files.length; i++) {
				urls.push(URL.createObjectURL(files[i]));
			}
			setPreviewImages((prevPreviewImages) => [...prevPreviewImages, ...urls]);
			const existingFiles = values.images || [];
			setFieldValue('images', [...existingFiles, ...files]);
		}
	};


	const [selectedCategory, setSelectedCategory] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);

	const handleSelectCategory = (category) => {
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
				  <DialogTitle>Select a category</DialogTitle>
				  <DialogContent>
					<List>
					  {categories.map((category:any) => (
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
			<Formik initialValues={initialValues} onSubmit={handleSubmit}>
				{({
					values,
					handleChange,
					handleBlur,
					handleSubmit,
					isSubmitting,
					setFieldValue,
				}) => (
					<Form>
						<Card>
							<CardContent sx={{ padding: 4 }}>
								<Typography gutterBottom variant="h3">
									เพิ่มข้อมูลสินค้า
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
                  {selectedCategory ? selectedCategory.name : 'Select a category'}
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

									<label htmlFor="files">
										<Image
											alt="category image"
											src="/static/img/default.png"
											width={25}
											height={20}
										/>
										<span style={{ color: '#00B0CD', marginLeft: 10 }}>
											เพิ่มรูปภาพ
										</span>
									</label>

									{previewImages.map((url) => (
										<img
											key={url}
											src={url}
											alt="preview"
											style={{ maxWidth: 150, maxHeight: 150, margin: 10 }}
										/>
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
									เพิ่ม
								</Button>
								<Link href="/panel/user/manage-product" passHref>
									<Button variant="outlined" fullWidth>
										ยกเลิก
									</Button>
								</Link>
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
	const accessToken = context.req.cookies['access_token']
	const categories = await categoryService.getAllCategory()
	if (accessToken) {
		return {
			props: {
				categories,
				accessToken
			},
		};
	} else {
		return { props: {} };
	}
};
