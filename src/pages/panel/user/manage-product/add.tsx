import { Formik, Form, Field } from 'formik';
import { TextField, Button, Box } from '@mui/material';
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
import { CloudUpload } from '@material-ui/icons';
import { Delete } from '@material-ui/icons';
import * as colorSchemeService from "@/services/color-scheme.service"

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
import { ColorSchemePayload } from '@/models/color-scheme.model';



interface Product {
	name: string;
	desc: string;
	price: string;
	images?: FileList;
}
interface AddProductFormProps {
	accessToken?: string;
	categories?: CategoryPayload[],
	gid?: string,
	colorSchemes?: ColorSchemePayload[]
}

const AddProductForm = ({ accessToken, categories, gid, colorSchemes }: AddProductFormProps) => {

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


	const colorSchemeModal = () => {
		return (
		  <Dialog open={colorShemeModalOpen} keepMounted>
			<DialogTitle>กรุณาเลือกโทนสี</DialogTitle>
			<DialogContent>
			  <List>
				{colorSchemes &&
				  colorSchemes.map((colorScheme: ColorSchemePayload) => (
					<ListItem
					button
					key={colorScheme.id}
					onClick={() => handleSelectColorScheme(colorScheme)}
				  >
					<ListItemText
					  primary={colorScheme.nameTH}
					  secondary={colorScheme.hex}
					/>
					<Box
					  sx={{
						width: 50,
						height: 50,
						backgroundColor: colorScheme.hex,
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

	const [selectedColorScheme, setSelectedColorScheme] = useState<any>({
		id: "",
		nameEN: "",
		nameTH: "กรุณาเลือกโทนสีสำหรับสินค้า",
		hex: "",
	});
	  const [colorShemeModalOpen, setColorSchemeModalOpen] = useState(false);

	  
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


	  const handleSubmit = async (values: Product) => {
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
					groupId: gid,
					colorSchemeId: selectedColorScheme && selectedColorScheme?.id
				})
			);

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
			{colorSchemeModal()}
		</Layout>
	);
};

export default withAuth(AddProductForm);

export const getServerSideProps: GetServerSideProps = async (
	context: GetServerSidePropsContext
) => {
	const accessToken = context.req.cookies['access_token'] || ''
	const { gid } = await authService.getSessionServerSide(accessToken)
	const categories = await categoryService.getAllCategory()
	const colorSchemes = await colorSchemeService.getAllColorScheme()

	if (accessToken) {
		return {
			props: {
				categories,
				accessToken,
				gid,
				colorSchemes
			},
		};
	} else {
		return { props: {} };
	}
};
