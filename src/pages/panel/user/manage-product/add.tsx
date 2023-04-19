import { Formik, Form, Field } from 'formik';
import { TextField, Button } from '@mui/material';
import { Card, CardContent, CardActions, Typography } from '@mui/material';
import Link from 'next/link';
import Layout from '@/components/Layouts/Layout';
import withAuth from '@/components/withAuth';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from "next/image";

interface Product {
	name: string;
	desc: string;
	price: string;
	images?: FileList;
}

const AddProductForm = () => {
	const initialValues: Product = {
		name: '',
		desc: '',
		price: '',
		images: undefined,
	};

	const router = useRouter();

	const handleSubmit = async (values: Product) => {
		const formData = new FormData();
		formData.append('name', values.name);
		formData.append('desc', values.desc);
		formData.append('price', values.price);
		if (values.images) {
			for (let i = 0; i < values.images.length; i++) {
				formData.append('images', values.images[i]);
			}
		}
		console.log('Form Data:');
		for (const [key, value] of formData.entries()) {
			console.log(key, value);
		}
		console.log("===============")

		// try {
		// 	const res = await fetch('/api/products', {
		// 		method: 'POST',
		// 		body: formData,
		// 	});
		// 	if (res.ok) {
		// 		router.push('/panel/user/manage-product');
		// 	} else {
		// 		const error = await res.json();
		// 		console.error(error);
		// 	}
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
		</Layout>
	);
};

export default withAuth(AddProductForm);