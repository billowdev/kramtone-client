import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Footer from "@/components/Footer";
import Navbar from '@/components/Navbar';

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface LayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: LayoutProps) {
  const [open, setOpen] = React.useState(true);

  return (
    <React.Fragment>
      <CssBaseline />
      <Navbar />
      <Box component="main" 
      // sx={{ flexGrow: 1, p: 5 }}
      >
        <DrawerHeader />
        {children}
      </Box>
      <Footer />
    </React.Fragment>
  );
}