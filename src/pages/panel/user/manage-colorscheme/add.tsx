import React, { useState, useEffect } from 'react';
import { Box, Paper, Tabs, Tab, Button, Grid, Card, CardContent, Typography  } from '@mui/material';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from 'react-share';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Image from "next/image"
import {ColorSchemePayload} from "@/models/color-scheme.model"
import * as colorSchemeService from "@/services/color-scheme.service"
import Layout from '@/components/Layouts/Layout';
import { styled } from "@mui/material/styles";
import router from "next/router";
import Link from "next/link"
import { Pagination } from '@mui/material';
import { TextField } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { useAppDispatch } from "@/store/store";
import {createGroupColorScheme} from "@/store/slices/color-scheme.slice"
import toast from "react-hot-toast";


  const useStyles = makeStyles((theme) => ({
    searchContainer: {
      marginBottom: theme.spacing(2),
    },
  }));

const UserPanelAddColorScheme = () => {
	const dispatch = useAppDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const [tabIndex, setTabIndex] = useState(0);
  const isSmallDevice = useMediaQuery(theme.breakpoints.down("xs"));
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };


  const [colorSchemes, setColorSchemes] = useState<ColorSchemePayload[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const payload = await colorSchemeService.getAllColorScheme();
        setColorSchemes(payload);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);
 
  const [search, setSearch] = useState("");
  const [filteredColorSchemes, setFilteredColorSchemes] = useState<ColorSchemePayload[]>([]);
  const [page, setPage] = useState(1);
  const [schemesPerPage, setSchemesPerPage] = useState(10);
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  useEffect(() => {
    setFilteredColorSchemes(
      colorSchemes.filter((scheme) =>
        scheme.nameEN.toLowerCase().includes(search.toLowerCase()) ||
        scheme.nameTH.toLowerCase().includes(search.toLowerCase()) ||
        scheme.hex.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, colorSchemes]);
      
  const handleSelect = async(colorSchemeid:string)=>{

	const createStatus = await dispatch(createGroupColorScheme(colorSchemeid))

	if (createStatus.meta.requestStatus === "fulfilled") {
		toast.success("เพิ่มข้อมูลสำเร็จ")
		router.push("/panel/user/manage-colorscheme");
		}else{
		toast.error("เพิ่มข้อมูลไม่สำเร็จ โปรดลองอีกครั้ง")
		}
	
  }
  const renderColorSchemeTab = () => {
    return (
      <Box p={2}>

        <React.Fragment>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <TextField
                label='ค้นหาโทนสี'
                variant='outlined'
                value={search}
                onChange={handleSearchChange}
                fullWidth
                style={{ height: '100%', marginTop: 16 }}
              />
            </Grid>
            {filteredColorSchemes
              .slice((page - 1) * schemesPerPage, page * schemesPerPage)
              .map((scheme: any) => (
                <Grid key={scheme.id} item xs={12} sm={6}>
                  <Card sx={{ display: 'flex' }}>
                    <div
                      style={{
                        width: 50,
                        backgroundColor: scheme.hex,
                      }}
                    />
                    <CardContent>
                      <Typography variant='h5'>{scheme.nameEN}</Typography>
                      <Typography variant='subtitle1'>{scheme.nameTH}</Typography>
                      <Typography variant='subtitle2'>{scheme.hex}</Typography>
					  <Box display="flex" justifyContent="space-between" style={{marginTop:2}}>
						<Button variant="contained" color="primary" onClick={()=>{handleSelect(scheme.id)}}>
						เพิ่ม
						</Button>
						</Box>
										
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
          <Pagination
            count={Math.ceil(filteredColorSchemes.length / schemesPerPage)}
            page={page}
            onChange={handlePageChange}
            color='primary'
            style={{ marginTop: '16px' }}
          />
        </React.Fragment>
      </Box>
    );
  };
  


  const handleBackButtonClick = () => {
    router.back()
	
  };

  const shareUrl = 'https://www.kramtone.com/color-scheme';
  const shareTitle = 'ข้อมูลโทนสีธรรมชาติ';

  return (
    <Layout>
      <Box sx={{ flexGrow: 1, p: isSmallDevice? 1:4 }}>
        <Paper>
       
         <React.Fragment>
         <Box display="flex" justifyContent="space-between" alignItems="center" padding={1}>
            <h1>เพิ่มโทนสีที่มีในร้าน</h1>
          </Box>
		  {renderColorSchemeTab()}
          <Box display="flex" justifyContent="space-between" padding={2}>

            <Button variant="contained" color="primary" onClick={handleBackButtonClick}>
              ยกเลิก
            </Button>
          </Box>
         </React.Fragment>
        </Paper>

        
      </Box>
    </Layout>
  );
};

export default UserPanelAddColorScheme;
