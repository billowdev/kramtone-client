import React from 'react'
import Layout from '@/components/Layouts/Layout';
import { useAppDispatch } from "@/store/store";
import { getAllProductByGroupAction, productSelector, deleteProductAction } from "@/store/slices/product.slice";
import router from "next/router";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { TransitionProps } from "@mui/material/transitions";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import withAuth from "@/components/withAuth";
import { useTheme } from "@material-ui/core/styles";
import * as productService from "@/services/product.service"
import * as authService from "@/services/auth.service"
import * as colorSchemeService from "@/services/color-scheme.service"

import { ProductPayload } from "@/models/product.model"
import { ColorSchemePayload } from "@/models/color-scheme.model"
import { useSelector } from "react-redux";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
} from "next";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  Grid,
  Container,
  IconButton,
  Slide,
  Stack,
  TextField,
  Typography,
  Toolbar,
  FormControl,
  InputLabel,
  Select
} from "@mui/material";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// import EditDialog from "./components"
import { makeStyles } from "@material-ui/core";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import Swal from "sweetalert2";
import { productImageURL } from "@/common/utils/utils";


import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


const useStyles = makeStyles({
  customToolbar: {
    position: 'relative',
  },
  addButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  formControl: {
    minWidth: 120,
    marginRight: 2,
  },
  tableContainer: {
    paddingTop: '20px',
    paddingLeft: '20px',
    marginTop: "20px",
    marginLeft: "20px",
    width: "80%",
    height: "100%"
  },
});

const CustomToolbar: React.FunctionComponent<{
  setFilterButtonEl: React.Dispatch<
    React.SetStateAction<HTMLButtonElement | null>
  >;
}> = ({ setFilterButtonEl }) => (
  <GridToolbarContainer>
    <GridToolbarColumnsButton />
    <GridToolbarDensitySelector />

    <GridToolbarFilterButton ref={setFilterButtonEl} />
    <Link href="/panel/user/manage-product/add" passHref>
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
        }}
      >
        <AddIcon />
      </Fab>
    </Link>
  </GridToolbarContainer>
);



type Props = {
  gid?: string,
  accessToken?: string,
  productArray?: ProductPayload[]
  colorschemes?: ColorSchemePayload[]
}

function UserPanelManageCategory({ accessToken, gid, productArray }: Props) {
  const theme = useTheme();
  // const classes = useStyles();
  const [productData, setProductData] = React.useState<ProductPayload[]>(productArray!);
  const dispatch = useAppDispatch();
  const prodductData = useSelector(productSelector);

  const [openDeleteDialog, setOpenDeleteDialog] = React.useState<boolean>(false);
  const [openEditDialog, setOpenEditDialog] = React.useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedCategory, setSelectedCategory] = React.useState<ProductPayload | null>(null);


  React.useEffect(() => {
    dispatch(getAllProductByGroupAction(gid!));
  }, [dispatch]);

  const [filterButtonEl, setFilterButtonEl] =
    React.useState<HTMLButtonElement | null>(null);

  const handleDeleteConfirm = () => {
    if (selectedCategory) {
      //     const sid = selectedCategory.id
      //     // dispatch(deleteCategoryAction({id:sid, gid}!))
      console.log(selectedCategory)
    }
    setOpenDeleteDialog(false);
  }

  const handleEditConfirm = () => {
    if (selectedCategory) {
      console.log(selectedCategory)
    }
    setOpenEditDialog(false);
  }



  const showEditDialog = () => {
    if (selectedCategory === null) {
      return;
    }

    return (
      <Dialog
        open={openEditDialog}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">

          Confirm to delete the product? : {selectedCategory.name}
        </DialogTitle>
        <DialogContent>

        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)} color="info">
            Cancel
          </Button>
          <Button onClick={handleEditConfirm} color="primary">
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    );
  };


  const columns: GridColDef[] = [
    {
      field: "name",
      editable: true,
      headerName: "ชื่อโหนด",
      width: 180,
    },
    {
      field: "desc",
      editable: true,
      headerName: "รายละเอียด",
      width: 180,
    },
    {
      field: "price",
      headerName: "ราคา",
      width: 180,
    },
    // {
    //   disableColumnMenu: true,
    //   headerName: "รูปภาพ",
    //   field: "productImages",
    //   width: 80,
    //   renderCell: ({ value }: GridRenderCellParams<any>) => (
    //     <Zoom>
    //       <Image
    //         height={500}
    //         width={500}
    //         objectFit="cover"
    //         alt="product image"
    //         src={productImageURL(value[0]?.image)}
    //         style={{ width: 70, height: 70, borderRadius: "5%" }}
    //       />
    //     </Zoom>
    //   ),
    // },

    {
      field: 'colorScheme',
      headerName: 'โทนสี',
      width: 100,
      renderCell: ({ value }: GridRenderCellParams<ProductPayload>) => (
        <Box
          sx={{
            width: 50,
            height: 50,
            backgroundColor: value?.hex,
            borderRadius: "50%",
            border: "1px solid black",
            marginLeft: 2,
          }}
        />
      ),
    },

    // {
    //   field: 'productImages',
    //   headerName: 'รูปภาพ',
    //   width: 100,
    //   renderCell: ({ value }: GridRenderCellParams<ProductPayload>) => (
    //     <Image
    //       height={500}
    //       width={500}
    //       src={productImageURL(value[0]?.image)}
    //       style={{ width: 100, height: 70, borderRadius: '5%' }} alt={'product image'} />

    //   ),
    // },
    {
      field: 'productImages',
      headerName: 'รูปภาพ',
      width: 200,
      renderCell: (params: any) => {
        const images = params.value.map((image: any) => productImageURL(image.image));

        return (
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
            {images.map((image: any, index: number) => (
              <Image
                key={index}
                src={image}
                height={70}
                width={100}
                alt={`Product image ${index}`}
                style={{ borderRadius: '5%' }}
              />
            ))}
          </Carousel>
        );
      },
    },
    {
      headerName: "การดำเนินการ",
      field: ".",
      width: 180,
      renderCell: ({ row }: GridRenderCellParams<any>) => (
        <Stack direction="row">
          {/* <IconButton
            aria-label="delete"
            size="large"
            onClick={() => {
              // setSelectedCategory(row);
              // setOpenDeleteDialog(true);
            }}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton> */}
          <IconButton
            aria-label="delete"
            size="large"
            onClick={() => {
              Swal.fire({
                title: 'ลบสินค้า',
                text: 'เมื่อลบแล้วไม่สามารถกู้คืนได้!',
                icon: 'warning',
                showCancelButton: true,
                cancelButtonText: 'ยกเลิก',
                confirmButtonText: 'ยืนยันการลบ',
                reverseButtons: true
              }).then((result) => {
                if (result.isConfirmed) {
                  // Dispatch the deleteProductAction here
                  dispatch(deleteProductAction({ id: row.id, accessToken }))
                  Swal.fire(
                    'ลบข้อมูลเรียบร้อย!',
                    'สินค้าของคุณถูกลบเรียบร้อยแล้ว',
                    'success'
                  ).then(() => {
                    setTimeout(() => {
                      window.location.reload(); // Reload the page after 2 seconds
                    }, 200);
                  });

                }
              });
            }}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            aria-label="edit"
            size="large"
            onClick={() =>
              router.push("/panel/user/manage-product/edit?id=" + row.id)
            }
          // onClick={() => {
          //   setSelectedCategory(row);
          //   // setOpenEditDialog(true);
          // }}
          >
            <EditIcon fontSize="inherit" />
          </IconButton>

        </Stack>
      ),
    },
  ];
  const isSmallDevice = useMediaQuery(theme.breakpoints.down("xs"));




  return (
    <Layout>
      <Container sx={{
        marginLeft: isSmallDevice ? 0 : 2,
        marginTop: isSmallDevice ? 0 : 4,
      }}>

        {/* Summary Icons */}
        <DataGrid
          sx={{ backgroundColor: "white", height: "100vh", width: "80vw" }}
          rows={productData ?? []}
          columns={columns}
          // pageSize={25}
          // rowsPerPageOptions={[25]}
          components={{
            Toolbar: CustomToolbar,
          }}

          componentsProps={{
            panel: {
              anchorEl: filterButtonEl,
            },
            toolbar: {
              setFilterButtonEl,
            },
          }}
        />
      </Container>

      {showEditDialog()}
    </Layout>
  )
}

export default withAuth(UserPanelManageCategory)

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const accessToken = context.req.cookies['access_token']
    const { gid } = await authService.getSessionServerSide(accessToken!)
    const productArray = await productService.getAllProductByGroup(gid)
    const colorschemes = await colorSchemeService.getAllColorScheme()
    return {
      props: {
        gid,
        accessToken,
        productArray,
        colorschemes
      },
    };
  } catch (error) {
    return {
      props: {

      },
    };
  }

};


