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
import { CategoryPayload } from "@/models/category.model";
import { groupDataImageURL } from "@/common/utils/utils";
import GroupsIcon from "@mui/icons-material/Groups";
import { useRouter } from "next/router";
import {
  Container,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Pagination,
} from "@mui/material";
import {
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  ListSubheader,
} from "@mui/material";

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
  useEffect(() => {
    async function fetchData() {
      try {
        const categoriesPayload = await categoryService.getAllCategory();
        const colorSchemesPayload =
          await colorSchemeService.getAllColorScheme();
        setCategories(categoriesPayload);
        setColorSchemes(colorSchemesPayload);

        // Fetch initial group data without filters
        await fetchGroupData();
      } catch (error) {
        console.error(error);
      }
    }

    async function fetchGroupData() {
      try {
        const payload = await groupDataService.getAllGroupData();
        setGroups(payload);
      } catch (error) {
        console.error("Failed to fetch group data:", error);
      }
    }

    fetchData();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };

  // const filteredGroups = useMemo(() => {
  //   let filtered = groups;

  //   if (selectedColorScheme) {
  //     filtered = filtered.filter((group: GroupDataPayload) =>
  //     group.products && group.products.some(product => product.colorSchemeId === selectedColorScheme.id)
  //   );

  //   }

  //     return filtered;
  //   }, [groups, selectedCategory, selectedColorScheme]);

  const filteredGroups = useMemo(() => {
    let filtered = groups;

    if (selectedColorScheme) {
      filtered = filtered.filter(
        (group: GroupDataPayload) =>
          group.products &&
          group.products.some(
            (product) => product.colorSchemeId === selectedColorScheme.id
          )
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (group: GroupDataPayload) =>
          group.groupName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          group.groupType.toLowerCase().includes(searchTerm.toLowerCase()) ||
          group.agency.toLowerCase().includes(searchTerm.toLowerCase()) ||
          group.phone.includes(searchTerm) ||
          group.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          group.hno.toLowerCase().includes(searchTerm.toLowerCase()) ||
          group.village.toLowerCase().includes(searchTerm.toLowerCase()) ||
          group.lane.toLowerCase().includes(searchTerm.toLowerCase()) ||
          group.road.toLowerCase().includes(searchTerm.toLowerCase()) ||
          group.subdistrict.toLowerCase().includes(searchTerm.toLowerCase()) ||
          group.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
          group.province.toLowerCase().includes(searchTerm.toLowerCase()) ||
          group.zipCode.includes(searchTerm) ||
          group.lat.includes(searchTerm) ||
          group.lng.includes(searchTerm) ||
          (group.products &&
            group.products.some(
              (product) =>
                (product.name?.toLowerCase() ?? "").includes(
                  searchTerm.toLowerCase()
                ) ||
                (product.colorSchemeId?.toLowerCase() ?? "").includes(
                  searchTerm.toLowerCase()
                )
            ))
      );
    }

    // if (selectedCategory) {
    //   filtered = filtered.filter((group: GroupDataPayload) =>
    //     group.products && group.products.some(product => product.category.id === selectedCategory.id)
    //   );
    // }

    return filtered;
  }, [groups, searchTerm, selectedColorScheme]);

  const handleClearFilters = () => {
    setSelectedCategory(null);
    setSelectedColorScheme(null);
    setSearchTerm("");
  };

  const [page, setPage] = useState(1);

  const [groupsPerPage, setGroupsPerPage] = useState(5);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  // const handleGroupsPerPageChange = (
  //   event: any
  // ) => {
  //   setGroupsPerPage(event.target.value as number);
  //   setPage(1); // Reset page to 1 when changing the number of groups per page
  // };

  // CategoryFilterModal component
  const CategoryFilterModal = () => {
    return (
      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>เลือกประเภทสินค้า</DialogTitle>
        <DialogContent>
          <Grid container spacing={1} direction="column">
            {categories.map((category: CategoryPayload, index: number) => (
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
      <Dialog
        open={isColorSchemeModalOpen}
        onClose={handleCloseColorSchemeModal}
      >
        <DialogTitle>เลือกโทนสี</DialogTitle>
        <DialogContent>
          <Grid container spacing={1} direction="column">
            {colorSchemes.map(
              (colorScheme: ColorSchemePayload, index: number) => (
                <Grid item key={index}>
                  <Button onClick={() => handleColorSchemeSelect(colorScheme)}>
                    <Box
                      style={{
                        display: "inline-block",
                        width: 50,
                        height: 50,
                        backgroundColor: colorScheme.hex,
                        border: "1px solid black",
                        marginRight: 4,
                      }}
                    />
                    {colorScheme.id} {colorScheme.nameTH} ({colorScheme.nameEN})
                  </Button>
                </Grid>
              )
            )}
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
      <Box style={{ flexGrow: 1, padding: isSmallDevice ? 0 : 4, minHeight:"768px" }}>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <TextField
                label="ค้นหากลุ่ม"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearchInputChange}
                fullWidth
                style={{ height: "100%" }}
              />
            </Grid>
            {/* <Grid item xs={12} md={2}>
              <Button
                variant="outlined"
                onClick={handleOpenModal}
                fullWidth
                style={{ height: '100%' }}
              >
                {selectedCategory && selectedCategory.name !== ""
                  ? selectedCategory.name
                  : "เลือกตามประเภทสินค้า"}
              </Button>
            </Grid> */}
            <Grid item xs={12} md={2}>
              <Button
                variant="outlined"
                onClick={handleOpenColorSchemeModal}
                fullWidth
                style={{ height: "100%" }}
              >
                {selectedColorScheme && selectedColorScheme.nameTH !== ""
                  ? selectedColorScheme.nameTH
                  : "เลือกตามโทนสี"}
              </Button>
            </Grid>
            <Grid item xs={12} md={2}>
              {selectedColorScheme ? (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleClearFilters}
                  fullWidth
                  style={{ height: "100%" }}
                >
                  ล้างตัวเลือก
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  // color="secondary"
                  onClick={handleClearFilters}
                  fullWidth
                  style={{ height: "100%" }}
                >
                  ล้างตัวเลือก
                </Button>
              )}
            </Grid>
          </Grid>
          <CategoryFilterModal />
          <ColorSchemeFilterModal />

          <Paper elevation={3} style={{ padding: 2, marginTop:16 }}>
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
                  <GroupsIcon
                    style={{ fontSize: "1.5rem", marginLeft: "8px" }}
                  />
                ) : (
                  <GroupsIcon
                    style={{ fontSize: "2.5rem", marginLeft: "16px" }}
                  />
                )}
                <Typography variant="h5" style={{ marginLeft: "16px" }}>
                  ข้อมูลกลุ่มผู้ผลิตหรือร้านค้า
                </Typography>
              </Grid>
              <Grid
                item
                container
                style={{ padding: "24px" }}
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
                      <Card
                        style={{
                          marginBottom: 2,
                          background: "none",
                          boxShadow: "none",
                        }}
                      >
                        <CardContent>
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={2}>
                              <Image
                                src={groupDataImageURL(group?.logo)}
                                alt="Group Image"
                                width={100}
                                height={100}
                              />
                            </Grid>
                            <Grid item xs={12} sm={5}>
                              <Typography
                                component="span"
                                variant="subtitle1"
                                style={{ fontWeight: "bold", marginRight: 8 }}
                              >
                                ชื่อกลุ่มผู้ผลิตหรือร้านค้า :
                              </Typography>
                              <Typography component="span" variant="subtitle1">
                                {group?.groupName}
                              </Typography>
                              <br />

                              <Typography
                                component="span"
                                variant="subtitle1"
                                style={{ fontWeight: "bold", marginRight: 8 }}
                              >
                                ประเภทกลุ่ม :
                              </Typography>
                              <Typography component="span" variant="subtitle1">
                                {group?.groupType === "shop"
                                  ? "ร้านค้า"
                                  : "กลุ่มผู้ผลิต"}
                              </Typography>

                              <br />

                              <Typography
                                component="span"
                                variant="subtitle1"
                                style={{ fontWeight: "bold", marginRight: 8 }}
                              >
                                โทร :
                              </Typography>
                              <Typography component="span" variant="subtitle1">
                                {group?.phone}
                              </Typography>
                              <br />

                              <Typography
                                component="span"
                                variant="subtitle1"
                                style={{ fontWeight: "bold", marginRight: 8 }}
                              >
                                ชื่อประธานกลุ่ม :
                              </Typography>
                              <Typography component="span" variant="subtitle1">
                                {group?.agency}
                              </Typography>
                              <br />

                              <Typography
                                component="span"
                                variant="subtitle1"
                                style={{ fontWeight: "bold", marginRight: 8 }}
                              >
                                สินค้าแนะนำ :
                              </Typography>

                              {group?.products
                                .slice(0, 3)
                                .map((product: any, index: any) => (
                                  <div
                                    key={index}
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      marginBottom: "4px",
                                    }}
                                  >
                                    <Typography variant="subtitle1">
                                      {product.recommend ? (
                                        <Typography>
                                          {" "}
                                          {product.name}{" "}
                                        </Typography>
                                      ) : (
                                        <React.Fragment></React.Fragment>
                                      )}
                                    </Typography>
                                  </div>
                                ))}
                            </Grid>

                            <Grid item xs={12} sm={3}>
                              <Grid container spacing={2}>
                                {/* 
                          <Grid item xs={12}>
                        <Typography variant="subtitle1">
                          โทนสีที่มีในร้าน
                        </Typography>
                        {group?.products && (
                          <>
                            {[...new Set(group.products.map((product: any) => product.colorScheme.id))]
                              .sort(() => Math.random() - 0.5)
                              .slice(0, 3)
                              .map((colorSchemeId: string, index: number) => {
                                const product = group.products.find((product: any) => product.colorScheme.id === colorSchemeId);
                                return (
                                  <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                                    <div
                                      style={{
                                        backgroundColor: product.colorScheme.hex,
                                        width: '25px',
                                        height: '25px',
                                        marginRight: '4px',
                                      }}
                                    ></div>
                                    <Typography variant="subtitle1">
                                      รหัสสี {product.colorScheme.id}
                                    </Typography>
                                  </div>
                                );
                              })}
                          </>
                        )}
                      </Grid> */}

                                <Grid item xs={12}>
                                  <Typography variant="subtitle1">
                                    โทนสีที่มีในร้าน
                                  </Typography>
                                  {group?.products && (
                                    <>
                                      {[
                                        ...new Set<string>(
                                          group.products.map(
                                            (product: any) =>
                                              product.colorSchemeId
                                          )
                                        ),
                                      ]
                                        .slice(0, 3)
                                        .map(
                                          (
                                            colorSchemeId: string,
                                            index: number
                                          ) => {
                                            const product = group.products.find(
                                              (product: any) =>
                                                product.colorSchemeId ===
                                                colorSchemeId
                                            );
                                            return (
                                              <div
                                                key={index}
                                                style={{
                                                  display: "flex",
                                                  alignItems: "center",
                                                  marginBottom: "4px",
                                                }}
                                              >
                                                <div
                                                  style={{
                                                    backgroundColor:
                                                      product.colorScheme.hex,
                                                    width: "25px",
                                                    height: "25px",
                                                    marginRight: "4px",
                                                  }}
                                                ></div>
                                                <Typography variant="subtitle1">
                                                  รหัสสี{" "}
                                                  {product.colorScheme.id}
                                                </Typography>
                                              </div>
                                            ) as JSX.Element; // Cast the return value to JSX.Element to satisfy TypeScript
                                          }
                                        )}
                                    </>
                                  )}
                                </Grid>
                              </Grid>
                            </Grid>

                            <Grid item xs={12} sm={2}>
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
