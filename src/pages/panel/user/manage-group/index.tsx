import React from 'react'
import Layout from '@/components/Layouts/Layout';
import {Container, Grid, Paper, Typography} from '@mui/material';
import GroupsIcon from "@mui/icons-material/Groups";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

type Props = {}

function UserPanelManageGroup({}: Props) {
  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('xs'));

  return (
	<Layout>
    	<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'row', gap: '16px'}}>
                {isSmallDevice ? (
                    <GroupsIcon sx={{fontSize:'1.5rem', marginLeft:'8px'}} />
                  ) : (
                    <GroupsIcon sx={{fontSize:'2.5rem', marginLeft:'16px'}} />
                  )}

                 
                <React.Fragment> 
                  {isSmallDevice ? (
                    <Typography
                   sx={{
                      fontWeight: 'bold',  alignSelf:'center',
                  }}
                    > หน้าจัดการข้อมูลกลุ่ม <br /> / ร้านค้า </Typography>
                  ) : (
                    <Typography
                    variant='h5' sx={{
                      fontWeight: 'bold',  alignSelf:'center',
                  }}
                    > หน้าจัดการข้อมูลกลุ่ม / ร้านค้า</Typography>
                  )}
                </React.Fragment>
                </Paper>
              </Grid> 
              
              {/* Group Data Table */}
              <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  {/* <Group Data Table /> */}
                  

                </Paper>
              </Grid>
              {/* Recent Deposits */}
             
              {/* Recent Orders */}
              {/* <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                 <Button > เพิ่มข้อมูล </Button>
                </Paper>
              </Grid> */}
            </Grid>
          
          </Container>
  </Layout>
  )
}

export default UserPanelManageGroup