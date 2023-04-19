import Layout from "@/components/Layouts/Layout";
import withAuth from "@/components/withAuth";
import { ProductPayload } from "@/models/product.model";
// import { updateCategory } from "@/services/category.service";
import { createCategoryAction } from "@/store/slices/category.slice";
import { categoryImageURL } from "@/common/utils/utils";
import {
	Card,
	CardContent,
	Typography,
	CardActions,
	Button,
} from "@mui/material";
import { Field, Form, Formik, FormikProps } from "formik";
import { TextField } from "formik-material-ui";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import httpClient from "@/common/utils/httpClient.util";
import { Switch, FormControlLabel, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { useAppDispatch } from "@/store/store";
import toast from "react-hot-toast";

type Props = {
	// category?: ProductPayload;
	accessToken?: string;
};

const UserPanelAddProduct = ({ accessToken }: Props) => {
	const router = useRouter();
	const [openDialog, setOpenDialog] = React.useState<boolean>(false);
	const [imageFile, setImageFile] = React.useState<any | Blob>("")
	const [imageObj, setImageObj] = React.useState<URL | string>("")
	const dispatch = useAppDispatch();
	const initialValues: ProductPayload = {
		id: "",
		name: "",
		desc: "",
		price: "",
		productImages: []
	}
	const [addValue, setAddValue] = React.useState<ProductPayload>(initialValues);
	const showForm = ({
		values,
		setFieldValue,
		isValid,
	}: FormikProps<ProductPayload>) => {
		return (
			<Form>
				<Card>
					<CardContent sx={{ padding: 4 }}>
						<Typography gutterBottom variant="h3">
							เพิ่มข้อมูลสินค้า
						</Typography>

						<Field
							style={{ marginTop: 16 }}
							fullWidth
							component={TextField}
							name="name"
							type="text"
							label="ชื่อสินค้า"
						/>
						<br />
						<Field
							style={{ marginTop: 16 }}
							fullWidth
							component={TextField}
							name="desc"
							type="string"
							label="รายละเอียดสินค้า"
						/>

						<div style={{ margin: 16 }}>{showPreviewImage(values)}</div>

						<div>
							<Image
								// objectFit="cover"
								alt="category image"
								src="/static/img/default.png"
								width={25}
								height={20}
							/>
							<span style={{ color: "#00B0CD", marginLeft: 10 }}>
								เพิ่มรูปภาพ
							</span>

							<input
								type="file"
								onChange={(e: React.ChangeEvent<any>) => {
									e.preventDefault();
									setFieldValue("image_file", e.target.files[0]); // for upload
									setFieldValue(
										"image_obj",
										URL.createObjectURL(e.target.files[0])
									); // for preview image
								}}
								name="image"
								click-type="type1"
								multiple
								accept="image/*"
								id="files"
								style={{ padding: "20px 0 0 20px" }}
							/>
						</div>
					</CardContent>
					<CardActions>
						<Button
							disabled={!isValid}
							fullWidth
							variant="contained"
							color="primary"
							type="submit"
							sx={{ marginRight: 1 }}
						>
							เพิ่ม
						</Button>
						<Link href="/panel/user/manage-category" passHref>
							<Button variant="outlined" fullWidth>
								ยกเลิก
							</Button>
						</Link>
					</CardActions>
				</Card>
			</Form>
		);
	};

	const handleEditConfirm = async () => {
		if (addValue) {

			let data = new FormData();

			if (imageFile != "") {
				data.append("image", imageFile);
			}
			// data.append("id", String(addValue.id));
			data.append("name", String(addValue.name));
			data.append("desc", String(addValue.desc));

			const createStatus = await dispatch(createCategoryAction({ body: data, accessToken }))

			if (createStatus.meta.requestStatus === "fulfilled") {
				toast.success("เพิ่มข้อมูลสินค้าสำเร็จ")
				router.push("/panel/user/manage-category");
			} else {
				toast.error("เพิ่มข้อมูลสินค้าไม่สำเร็จ โปรดลองอีกครั้ง")
			}
			setOpenDialog(false);
		}
	};

	const showDialog = () => {
		if (addValue === null) {
			return;
		}

		return (
			<Dialog
				open={openDialog}
				keepMounted
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle id="alert-dialog-slide-title">
					<br />
					เพิ่มข้อมูล : {addValue?.name} ?
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						คุณต้องการเพิ่มข้อมูลใช่หรือไม่
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpenDialog(false)} color="info">
						ยกเลิก
					</Button>
					<Button onClick={handleEditConfirm} color="primary">
						เพิ่ม
					</Button>
				</DialogActions>
			</Dialog>
		);
	};

	const showPreviewImage = (values: any) => {
		if (values.image_obj) {
			return (
				<Image
					// objectFit="contain"
					alt="รูปภาพสินค้า"
					src={values.image_obj}
					width={250}
					height={250}
				/>
			);
		} else if (values.image) {
			return (
				<Image
					// objectFit="contain"
					alt="รูปภาพสินค้า"
					src={categoryImageURL(values.image)}
					width={250}
					height={250}
				/>
			);
		}
	};

	return (
		<Layout>
			<Formik
				validate={(values) => {
					let errors: any = {};
					if (!values.name) errors.name = "กรุณากรอกชื่อสินค้า";
					return errors;
				}}
				initialValues={initialValues}
				onSubmit={async (values, { setSubmitting }) => {
					setAddValue(values)
					// setImageFile(values.image_file)
					setOpenDialog(true);
					setSubmitting(false);
				}}
			>
				{(props) => showForm(props)}
			</Formik>
			{showDialog()}
		</Layout>
	);
};

export default withAuth(UserPanelAddProduct);

export const getServerSideProps: GetServerSideProps = async (
	context: GetServerSidePropsContext
) => {
	const accessToken = context.req.cookies['access_token']
	if (accessToken) {
		return {
			props: {
				accessToken
			},
		};
	} else {
		return { props: {} };
	}
};
