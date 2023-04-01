import React from 'react'
import ThemeLayout from '@/components/Layouts/Layout'
import Chart from '@/components/Layouts/Chart';
import Deposits from '@/components/Layouts/Deposits';
import Orders from '@/components/Layouts/Orders';
import Copyright from '@/components/Copyright';
import {Container, Grid, Paper} from '@mui/material';
import Link from '@mui/material/Link';
type Props = {}

function TESTSITE({}: Props) {
  return (
	<div>
    <ThemeLayout> 
	<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Chart />
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Deposits />
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Orders />
                </Paper>
              </Grid>
            </Grid>
          
          </Container>
    </ThemeLayout>
  </div>
  )
}

export default TESTSITE