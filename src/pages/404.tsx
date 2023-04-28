import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import Image from "next/image";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import CardMedia from "@mui/material/CardMedia";
import Link from "next/link"
import MainLayout from "@/components/MainLayout"
export default function Error() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
   <MainLayout>
     <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} md={4}>
            <Typography variant="h1">404</Typography>
            <Typography variant="h6">
              The page you’re looking for doesn’t exist.
            </Typography>
            <Typography variant="h6">ไม่พบหน้าเพจที่คุณต้องการ</Typography>
            <Link href="/">
            <Button variant="contained">กลับสู่หน้าหลัก</Button>
              </Link>
          </Grid>
          
          <Grid item xs={12} sm={8} md={8} >
            <CardMedia
              image="/static/img/404-error.webp"
              title="Image title"
              style={{ height: 0, paddingTop: "75%", borderRadius: "0%"}}
            />
          </Grid>

        </Grid>

      </Container>
    </Box>
    </MainLayout>
  );
}
