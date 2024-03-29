import Layout from "@/components/Layouts/Layout";
import { Paper } from "@mui/material";
import React from "react";
import Iframe from "react-iframe";
import CopyrightComponent from '@/components/Copyright'

type Props = {};

const AboutUs = ({}: Props) => {
  return (
    <Layout>
      <Paper sx={{ height: "86vh" }}>
        <Iframe
          url="https://www.billowdev.com"
          width="100%"
          height="100%"
          id="myId"
          display="inline"
          position="relative"
        />
      </Paper>
    </Layout>
  );
};

export default AboutUs
