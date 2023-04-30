import MainLayout from "@/components/MainLayout";
import {
  Grid,
  Paper,
  Typography,
  Button,
  Divider,
  Box,
  Card,
  CardContent,
  CardActions,
} from "@material-ui/core";
import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { ColorSchemePayload } from "@/models/color-scheme.model";
import { GroupDataPayload } from "@/models/group-data.model";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import * as groupDataService from "@/services/group-data.service";
import * as categoryService from "@/services/category.service";
import * as colorSchemeService from "@/services/color-scheme.service";
import {CategoryPayload} from "@/models/category.model"
import { groupDataImageURL } from "@/common/utils/utils";
import GroupsIcon from "@mui/icons-material/Groups";
import { useRouter } from "next/router";
import { Container, TextField,   Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Pagination  } from "@mui/material";
  import { FormControl, MenuItem, Select, InputLabel, ListSubheader   } from "@mui/material";

  
const GroupItem = () => {
  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down("xs"));
  const router = useRouter();

 

  const [categories, setCategories] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryPayload | null>(null);
    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
    
  
    const handleCategorySelect = (category: CategoryPayload) => {
      setSelectedCategory(category);
      setIsModalOpen(false);
    };


  const [colorSchemes, setColorSchemes] = React.useState<any>([]);
  const [selectedColorScheme, setSelectedColorScheme] =
  useState<ColorSchemePayload | null>(null);
const [isColorSchemeModalOpen, setIsColorSchemeModalOpen] = useState(false);

const handleOpenColorSchemeModal = () => {
  setIsColorSchemeModalOpen(true);
};

const handleCloseColorSchemeModal = () => {
  setIsColorSchemeModalOpen(false);
};


const handleColorSchemeSelect = (colorScheme: ColorSchemePayload) => {
  setSelectedColorScheme(colorScheme);
  setIsColorSchemeModalOpen(false);
};

const [groups, setGroups] = useState<any>([]);

// Function to fetch group data with filters
const fetchGroupData = async () => {
  try {
    const payload = await groupDataService.getAllGroupData({
      categoryId : selectedCategory?.id || null,  
      colorSchemeId : selectedColorScheme?.id || null
    });
    setGroups(payload);
  } catch (error) {
    console.error("Failed to fetch group data:", error);
  }
};

// useEffect(() => {
//   async function fetchData() {
//     try {
//       const payload = await groupDataService.getAllGroupData();
//       const categoriesPayload = await categoryService.getAllCategory();
//       const colorSchemesPayload = await colorSchemeService.getAllColorScheme();
//       setCategories(categoriesPayload);
//       setColorSchemes(colorSchemesPayload);

//       setGroups(payload);
//     } catch (error) {
//       console.error(error);
//     }
//   }
//   fetchData();
// }, []);
 // Fetch initial data
 useEffect(() => {
  async function fetchData() {
    try {
      const categoriesPayload = await categoryService.getAllCategory();
      const colorSchemesPayload = await colorSchemeService.getAllColorScheme();
      setCategories(categoriesPayload);
      setColorSchemes(colorSchemesPayload);

      // Fetch initial group data without filters
      await fetchGroupData();
    } catch (error) {
      console.error(error);
    }
  }
  fetchData();
}, []);

 // Refetch group data when selectedCategory or selectedColorScheme changes
 useEffect(() => {
  // const filters = {
  //   categoryId: selectedCategory?.id || null,
  //   colorSchemeId: selectedColorScheme?.id || null,
  // };
  fetchGroupData();
}, [selectedCategory, selectedColorScheme]);

 const [searchTerm, setSearchTerm] = useState("");
  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };


const filteredGroups = useMemo(() => {
  let filtered = groups;

  // if (selectedCategory) {
  //   filtered = filtered.filter(
  //     (group: GroupDataPayload) => group.categoryId === selectedCategory.id
  //   );
  // }

  // if (selectedColorScheme) {
  //   filtered = filtered.filter(
  //     (group: GroupDataPayload) =>
  //       group.colorSchemeId === selectedColorScheme.id
  //   );
  // }

  return filtered;
}, [groups, selectedCategory, selectedColorScheme]);

const handleClearFilters = () => {
  setSelectedCategory(null);
  setSelectedColorScheme(null);
  setSearchTerm("");
};

const [page, setPage] = useState(1);

const [groupsPerPage, setGroupsPerPage] = useState(5);

const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
  setPage(value);
};


const handleGroupsPerPageChange = (
  event: any
) => {
  setGroupsPerPage(event.target.value as number);
  setPage(1); // Reset page to 1 when changing the number of groups per page
};

// CategoryFilterModal component
const CategoryFilterModal = () => {
  return (
    <Dialog open={isModalOpen} onClose={handleCloseModal}>
      <DialogTitle>เลือกประเภทสินค้า</DialogTitle>
      <DialogContent>
        <Grid container spacing={1} direction="column">
          {categories.map((category:CategoryPayload, index:number) => (
            <Grid item key={index}>
              <Button onClick={() => handleCategorySelect(category)}>
                {category.name}
              </Button>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal} color="primary">
          ยกเลิก
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const ColorSchemeFilterModal = () => {
  return (
    <Dialog open={isColorSchemeModalOpen} onClose={handleCloseColorSchemeModal}>
      <DialogTitle>เลือกโทนสี</DialogTitle>
      <DialogContent>
        <Grid container spacing={1} direction="column">
          {colorSchemes.map((colorScheme: ColorSchemePayload, index: number) => (
            <Grid item key={index}>
              <Button onClick={() => handleColorSchemeSelect(colorScheme)}>
               
                {colorScheme.id} - {colorScheme.hex} - {colorScheme.nameTH} ({colorScheme.nameEN})
              </Button>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseColorSchemeModal} color="primary">
          ยกเลิก
        </Button>
      </DialogActions>
    </Dialog>
  );
};


  const handleNavigation = () => {
    router.push(`/group/map`);
  };

  return (
    <MainLayout>
        <Box sx={{  p: 5 }}> 

     
    

   {/* <Box position="absolute" zIndex="modal">
  <ColorSchemeFilterModal />
</Box> */}

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
    
      <Grid container spacing={2}>
      <Grid item xs={12} md={3}>
        <TextField
          label="ค้นหากลุ่ม"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchInputChange}
          fullWidth
          style={{ height: '100%' }}
        />
      </Grid>
      <Grid item xs={12} md={2}>
        <Button
          variant="outlined"
          onClick={handleOpenModal}
          fullWidth
          style={{ height: '100%' }}
        >
          {selectedCategory && selectedCategory.name !== ""
            ? selectedCategory.name
            : "กรองตามประเภทกลุ่ม"}
        </Button>
      </Grid>
      <Grid item xs={12} md={2}>
            <Button
            variant="outlined"
            onClick={handleOpenColorSchemeModal}
            fullWidth
            style={{ height: '100%' }}
          >
               {selectedColorScheme && selectedColorScheme.nameTH !== ""
            ? selectedColorScheme.nameTH
            : "กรองตามประเภทกลุ่ม"}
          </Button>

      </Grid>
      <Grid item xs={12} md={2}>
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleClearFilters}
        fullWidth
        style={{ height: '100%' }}
      >
        ล้างตัวกรอง
      </Button>
    </Grid>
    </Grid>
    <CategoryFilterModal />
    <ColorSchemeFilterModal />

    
    <FormControl style={{ width: '60%' }}>
  <InputLabel id="groups-per-page-label">Groups per page</InputLabel>
  <Select
    labelId="groups-per-page-label"
    id="groups-per-page"
    value={groupsPerPage}
    label="จำนวนรายการที่จะแสดง"
    onChange={handleGroupsPerPageChange}
    MenuProps={{
      // getContentAnchorEl: null,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'center',
      },
      transformOrigin: {
        vertical: 'top',
        horizontal: 'center',
      },
      PaperProps: {
        style: {
          maxHeight: 250,
          width: 250,
        },
      },
    }}
  >
    {[5, 25, 50, 75, 100, -1].map((value) => (
     <MenuItem key={value} value={value} style={{ padding: '8px 16px' }}>
     {value === -1 ? 'All' : value}
   </MenuItem>
   
    ))}
  </Select>
</FormControl>







        <Paper elevation={3} style={{ padding: 2 }}>
          <Grid
            container
            spacing={3}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid
              item
              container
              xs={isSmallDevice ? 12 : 6}
              alignItems="center"
            >
              {isSmallDevice ? (
                <GroupsIcon sx={{ fontSize: "1.5rem", marginLeft: "8px" }} />
              ) : (
                <GroupsIcon sx={{ fontSize: "2.5rem", marginLeft: "16px" }} />
              )}
              <Typography variant="h5" style={{ marginLeft: "16px" }}>
                ข้อมูลกลุ่มผู้ผลิตหรือร้านค้า
              </Typography>
            </Grid>
            <Grid
              item
              container
              style= {{padding: "24px"}}
              xs={isSmallDevice ? 12 : 6}
              justifyContent="flex-end"
            >
              <Button
              
                variant="contained"
                color="primary"
                onClick={handleNavigation}
              >
                ดูข้อมูลในมุมมองแผนที่
              </Button>
            </Grid>
          
          </Grid>
          <Divider />
          <Box p={4}>


{filteredGroups &&
  filteredGroups
    .slice((page - 1) * groupsPerPage, page * groupsPerPage)
    .map((group: any, index: any) => (
      <Box key={group?.id}>
        <Card style={{ marginBottom: 2, background: 'none', boxShadow: 'none' }}>
        <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <Image
                  src={groupDataImageURL(group?.logo)}
                  alt="Group Image"
                  width={100}
                  height={100}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">
                  ชื่อกลุ่มผู้ผลิตหรือร้านค้า : {group?.groupName}
                </Typography>
                <Typography variant="body2">
                  ประเภทกลุ่ม :{" "}
                  {group?.groupType === "shop"
                    ? "ร้านค้า"
                    : "กลุ่มผู้ผลิต"}
                </Typography>
                <Typography variant="subtitle1">
                  โทร : {group?.phone}
                </Typography>
                <Typography variant="subtitle1">
                  ชื่อประธานกลุ่ม : {group?.agency}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        router.push(`/group/${group.id}`);
                      }}
                      fullWidth
                    >
                      ดูข้อมูลกลุ่ม/ร้าน
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        router.push(`/product/group/${group.id}`);
                      }}
                      fullWidth
                      style={{ marginTop: 8 }}
                    >
                      ดูข้อมูลสินค้า
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        {index < filteredGroups.length - 1 && <Divider />}
      </Box>
    ))}


{/* 
          {filteredGroups &&
    filteredGroups
      .slice((page - 1) * groupsPerPage, page * groupsPerPage)
      .map((group: any, index: any) => (
       
      ))} */}


<Pagination
  count={Math.ceil(filteredGroups.length / groupsPerPage)}
  page={page}
  onChange={handlePageChange}
  color="primary"
  style={{ marginTop: "16px" }}
/>
            {/* {groups &&
              groups.map((group: any, index: any) => (
               
              ))} */}
          </Box>
        </Paper>
      </Container>
      </Box>
    </MainLayout>
  );
};

export default GroupItem;
