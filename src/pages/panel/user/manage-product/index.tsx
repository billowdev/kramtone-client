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
import InfoIcon from '@mui/icons-material/Info';

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
  Paper,
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
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import toast from "react-hot-toast";

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
import ConfirmationDialog from "@/components/ConfirmationDialog";
import { GridCellParams } from '@mui/x-data-grid';
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

const CustomToolbar: FunctionComponent<{
  setFilterButtonEl: Dispatch<
    SetStateAction<HTMLButtonElement | null>
  >;
}> = ({ setFilterButtonEl }) => (
  <GridToolbarContainer>
    <GridToolbarColumnsButton />
    <GridToolbarDensitySelector />
    <GridToolbarFilterButton ref={setFilterButtonEl} />
    <Link href="/panel/user/manage-product/add" passHref>
      <Button
        variant="contained"
        color="primary"
        aria-label="add"
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
        }}
      >
        <AddIcon />
      </Button>
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


  const [showConfirmation, setShowConfirmation] = React.useState(false);

  const handleDeleteProduct =  () => {
    setShowConfirmation(true);
  }
    const [deleteId, setDeleteId] = React.useState("")

  const handleConfirmDeleteProduct = async () => {
    // console.log(deleteId, accessToken)
    const response = await dispatch(deleteProductAction({ id:deleteId, gid, accessToken }))
      if (response.meta.requestStatus === "fulfilled") {
        toast.success("ลบข้อมูลสินค้าสำเร็จ")
        setTimeout(() => {
          window.location.reload(); // Reload the page after 2 seconds
        }, 200);
        // router.push("/panel/user/manage-product");
      }else{
       toast.error("ลบข้อมูลสินค้าไม่สำเร็จ โปรดลองอีกครั้ง")
      }
    setShowConfirmation(false);
  };
  
  const handleCancelDeleteProduct = () => {
    setShowConfirmation(false);
  };

  React.useEffect(() => {
    dispatch(getAllProductByGroupAction(gid!));
  }, [dispatch, gid]);

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


  type PublishCellRendererProps = GridCellParams<ProductPayload>;

const PublishCellRenderer: React.FC<PublishCellRendererProps> = ({ value }) => {
  const isPublish = value as boolean;

  return (
    <Typography
      style={{
        color: isPublish ? 'green' : 'orange', // Set the color based on the value of 'activated'
      }}
    >
      {isPublish ? 'แสดง' : 'ไม่แสดง'} {/* Show different text based on the value of 'activated' */}
    </Typography>
  );
};

type RecommendCellRendererProps = GridCellParams<ProductPayload>;

const RecommendCellRenderer: React.FC<RecommendCellRendererProps> = ({ value }) => {
  const isRecommend = value as boolean;

  return (
    <Typography
      style={{
        color: isRecommend ? 'green' : 'orange', // Set the color based on the value of 'activated'
      }}
    >
      {isRecommend ? 'แสดง' : 'ไม่แสดง'} {/* Show different text based on the value of 'activated' */}
    </Typography>
  );
};
  const columns: GridColDef[] = [
    {
      field: "name",
      editable: true,
      headerName: "ชื่อสินค้า",
      width: 160,
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
      width: 80,
    },
    {
      field: 'publish',
      headerName: 'แสดงสินค้า',
      width: 100,
      renderCell: (params: GridCellParams<ProductPayload>) => <PublishCellRenderer {...params} />,
    },
    {
      field: 'recommend',
      headerName: 'แสดงบนกลุ่ม',
      width: 100,
      renderCell: (params: GridCellParams<ProductPayload>) => <RecommendCellRenderer {...params} />,
    },
    // {
    //   field: 'colorScheme',
    //   headerName: 'โทนสี',
    //   width: 100,
    //   renderCell: ({ value }: GridRenderCellParams<ProductPayload>) => (
    //     <Box
    //       sx={{
    //         width: 50,
    //         height: 50,
    //         backgroundColor: value?.hex,
    //         borderRadius: "50%",
    //         border: "1px solid black",
    //         marginLeft: 2,
    //       }}
    //     />
    //   ),
    // },
    {
      field: "colorScheme",
      editable: false,
      headerName: "สี",
      width: 100,
      renderCell: (params: GridCellParams<ColorSchemePayload>) => {
        // const hex = params?.value?.hex as string;
        const hex = (params?.value as { hex: string })?.hex;
        return (
          <div style={{
            backgroundColor: hex,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            color:"white",
            alignItems: 'center',
          }}>
            {hex}
          </div>
        );
      },
  
    },
  
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
    // handleDeleteProduct( id: row.id, accessToken)
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
            aria-label="ลบข้อมูล"
            size="large"
            onClick={()=>{
              setDeleteId(row.id)
              handleDeleteProduct()
            }}
            >
            <DeleteIcon fontSize="inherit" />
            </IconButton>

          {/* <IconButton
            aria-label="ลบข้อมูล"
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
          </IconButton> */}

          <IconButton
            aria-label="แก้ไขข้อมูล"
            size="large"
            onClick={() =>
              router.push("/panel/user/manage-product/edit?id=" + row.id)
            }
          >
            <EditIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            aria-label="ดูข้อมูล"
            size="large"
            onClick={() =>
              router.push("/panel/user/manage-product/" + row.id)
            }
          >
            <InfoIcon fontSize="inherit" />
          </IconButton>

        </Stack>
      ),
    },
  ];

  const isSmallDevice = useMediaQuery(theme.breakpoints.down("xs"));




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
                > หน้าจัดการข้อมูลสินค้า</Typography>
              ) : (
                <Typography
                variant='h5' sx={{
                  fontWeight: 'bold',  alignSelf:'center',
              }}
                > จัดการข้อมูลสินค้า</Typography>
              )}
            </React.Fragment>
            </Paper>
          </Grid> 
          <Grid item xs={12} md={12} lg={12}>
              <DataGrid
              sx={{ backgroundColor: "white", width: "100%", height: "100%", minHeight: "200px" }}
              rows={productData ?? []}
              columns={columns}
              // pageSize={25}
              // rowsPerPageOptions={[25]}
              localeText={
                { noRowsLabel: "ไม่พบข้อมูล",}
                }
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
      
          </Grid>
      
        </Grid>
      
      </Container>

      {/* <CategoryDialog category={selectedCategory} open={viewCategoryOpen} onClose={handleViewCategoryClose} /> */}
      {showEditDialog()}

      {/* show confirmation dialog if user clicks Edit button */}
      <ConfirmationDialog
        title="ลบข้อมูลสินค้า"
        message="ยืนยันการลบข้อมูลสินค้า"
        open={showConfirmation}
        onClose={handleCancelDeleteProduct}
        onConfirm={handleConfirmDeleteProduct}
      />

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
    const productArray = await productService.getAllProductByGroupForManage(gid)
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


