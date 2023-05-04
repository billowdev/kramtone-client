import React from 'react'
import Layout from '@/components/Layouts/Layout';
import {Container, Grid, Paper, Typography} from '@mui/material';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import withAuth from "@/components/withAuth";

type Props = {
  gid:string
}

function UserPanelManageGroupColorScheme({gid}: Props) {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('xs'));
  const colorSchemeData = useSelector(colorSchemeSelector);

  const [selectedGroupColorScheme, setSelectedGroupColorScheme] = React.useState<GroupColorSchemePayload | null>(null);


  return (
	<Layout>
     	<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'row', gap: '16px'}}>
                {isSmallDevice ? (
                    <ColorLensIcon sx={{fontSize:'1.5rem', marginLeft:'8px'}} />
                  ) : (
                    <ColorLensIcon sx={{fontSize:'2.5rem', marginLeft:'16px'}} />
                  )}

                 
                <React.Fragment> 
                  {isSmallDevice ? (
                    <Typography
                   sx={{
                      fontWeight: 'bold',  alignSelf:'center',
                  }}
                    > หน้าจัดการข้อมูลโทนสี<br />ครามธรรมชาติ</Typography>
                  ) : (
                    <Typography
                    variant='h5' sx={{
                      fontWeight: 'bold',  alignSelf:'center',
                  }}
                    > จัดการโทนสีที่มีในร้าน</Typography>
                  )}
                </React.Fragment>
                </Paper>
              </Grid> 

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
            </Grid>
          
          </Container>
  </Layout>
  )
}

export default withAuth(UserPanelManageGroupColorScheme)

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const accessToken = context.req.cookies['access_token']
    const { gid } = await authService.getSessionServerSide(accessToken!)

    return {
      props: {
        gid,
        accessToken,
      },
    };
  } catch (error) {
    return {
      props: {

      },
    };
  }

};