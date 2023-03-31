import React from 'react'
import Layout from '@/components/Layouts/Layout';
import {Container, Grid, Paper, Button} from '@mui/material';

type Props = {}

function UserPanelManageGroup({}: Props) {
  return (
	<Layout>
    	<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
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