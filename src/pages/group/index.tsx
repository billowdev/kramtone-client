import {
  Grid,
  Paper,
  Typography,
  Button,
  Divider,
  Box,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ColorSchemePayload } from "@/models/color-scheme.model";
import { GroupDataPayload } from "@/models/group-data.model";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import * as groupDataService from "@/services/group-data.service";
import MainLayout from "@/components/MainLayout";
import { groupDataImageURL } from "@/common/utils/utils";
import GroupsIcon from "@mui/icons-material/Groups";
import { useRouter } from "next/router";
import Link from "next/link";

import { Container } from "@mui/material";

const GroupItem = () => {
  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down("xs"));
  const [groups, setGroups] = useState<any>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const payload = await groupDataService.getAllGroupData();
        setGroups(payload);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const handleNavigation = () => {
    router.push(`/group/map`);
  };

  const typeographyHeaderStyle = {
    fontSize: isSmallDevice ? "16px" : "1.2rem",
    alignSelf: "flex-start",
    fontWeight: "bold",
    width: "100%",
    color: theme.palette.grey[800],
  };
  const typeographyValueStyle = {
    fontSize: isSmallDevice ? "16px" : "1.2rem",
    alignSelf: "flex-start",
    width: "100%",
    color: theme.palette.grey[800],
  };
  const boxStyle = {
    display: "flex",
    marginTop: "16px",
  };

  return (
    <MainLayout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper>
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
              <Typography variant="h5" sx={{ marginLeft: "16px" }}>
                ข้อมูลกลุ่มผู้ผลิตหรือร้านค้า
              </Typography>
            </Grid>
            <Grid
              item
              container
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
        </Paper>
        <Box p={4}>
          {groups &&
            groups.map((group: any, index: any) => (
              <Box key={group?.id}>
                <Paper style={{ padding: 16 }}>
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
                </Paper>
                {index < groups.length - 1 && <Divider />}
              </Box>
            ))}
        </Box>
      </Container>
    </MainLayout>
  );
};

export default GroupItem;
