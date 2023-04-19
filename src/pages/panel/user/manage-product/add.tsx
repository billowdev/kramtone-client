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
import { createProductAction } from '@/store/slices/product.slice';
import { useAppDispatch } from "@/store/store";
import toast from "react-hot-toast";
import * as categoryService from "@/services/category.service"
import * as authService from "@/services/auth.service"

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
	categories?: CategoryPayload[],
	gid?: string
}

const AddProductForm = ({ accessToken, categories, gid }: AddProductFormProps) => {

	const [selectedCategory, setSelectedCategory] = useState<CategoryPayload>({
		id: "",
		name: "",
		desc: "",
		image: "default_image.png",

	});
	const [modalOpen, setModalOpen] = useState(false);

	const dispatch = useAppDispatch();
	const initialValues: Product = {
		name: '',
		desc: '',
		price: '',
		images: undefined,
	};

	const router = useRouter();

	const [addValue, setAddValue] = useState<Product>(initialValues);
	const [images, setImages] = useState<File[]>([]);


	const handleSubmit = async (values: Product) => {
		try {
			console.log(images)
			console.log(values)

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
					groupId: gid,
				})
			);

			// const createStatus = await dispatch(
			// 	createProductAction({ body: formData, accessToken })
			// );

			// if (createStatus.meta.requestStatus === "fulfilled") {
			// 	toast.success("เพิ่มข้อมูลประเภทสินค้าสำเร็จ");
			// 	router.push("/panel/user/manage-product");
			// } else {
			// 	toast.error(
			// 		"เพิ่มข้อมูลประเภทสินค้าไม่สำเร็จ โปรดลองอีกครั้ง"
			// 	);
			// }

			const result = await Swal.fire({
				title: 'เพิ่มข้อมูล?',
				text: `คุณต้องการเพิ่มข้อมูลสินค้า ${values.name}`,
				icon: 'question',
				showCancelButton: true,
				confirmButtonText: 'ใช่, ยืนยัน!',
				cancelButtonText: 'ไม่, ยกเลิก'
			})

			if (result.isConfirmed) {
				const createStatus = await dispatch(
					createProductAction({ body: formData, accessToken })
				);

				if (createStatus.meta.requestStatus === "fulfilled") {
					toast.success("เพิ่มข้อมูลประเภทสินค้าสำเร็จ");
					router.push("/panel/user/manage-product");
				} else {
					toast.error(
						"เพิ่มข้อมูลประเภทสินค้าไม่สำเร็จ โปรดลองอีกครั้ง"
					);
				}
			}


		} catch (error) {
			toast.error("เพิ่มข้อมูลประเภทสินค้าไม่สำเร็จ");
			console.error("An error occurred:", error);
			// Handle the error here
		}
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
			// setFieldValue('images', [...existingFiles, ...files]);
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

	const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

	// const handleConfirm = () => {
	// 	setIsConfirmDialogOpen(false);
	// 	handleSubmit();
	// };

	// const handleCancel = () => {
	// 	setIsConfirmDialogOpen(false);
	// };

	// const handleOpenQuestionConfirm = () => {
	// 	setIsConfirmDialogOpen(true);
	// };



	// const showConfirmDialog = () => {
	// 	return (
	// 		<Dialog open={isConfirmDialogOpen} keepMounted>
	// 			<DialogTitle>ยืนยัน</DialogTitle>
	// 			<DialogContent>
	// 				<p>คุณต้องการเพิ่มสินค้าตัวใหม่ ?</p>
	// 			</DialogContent>
	// 			<DialogActions>
	// 				<Button onClick={handleCancel} color="primary">
	// 					ยกเลิก
	// 				</Button>
	// 				<Button onClick={handleConfirm} color="primary">
	// 					ยืนยัน
	// 				</Button>
	// 			</DialogActions>
	// 		</Dialog>

	// 	)
	// }

	return (
		<Layout>
			<Formik initialValues={initialValues}
				validate={(values) => {
					let errors: any = {};
					if (!values.name) errors.name = "กรุณากรอกชื่อสินค้า";
					if (!values.desc) errors.desc = "กรุณากรอกรายละเอียดสินค้า";
					if (!values.price) errors.price = "กรุณากรอกราคาสินค้า";
					return errors;
				}}
				onSubmit={(values, { setSubmitting }) => {
					// setAddValue(values)
					handleSubmit(values); // call handleSubmit function here
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
									// onClick={handleOpenQuestionConfirm}
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
			{/* {showConfirmDialog()} */}
		</Layout>
	);
};

export default withAuth(AddProductForm);

export const getServerSideProps: GetServerSideProps = async (
	context: GetServerSidePropsContext
) => {
	const accessToken = context.req.cookies['access_token']
	const { gid } = await authService.getSessionServerSide(accessToken!)

	const categories = await categoryService.getAllCategory()
	if (accessToken) {
		return {
			props: {
				categories,
				accessToken,
				gid
			},
		};
	} else {
		return { props: {} };
	}
};
