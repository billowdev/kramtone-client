import { Grid, Paper, Typography, Button, Divider } from '@material-ui/core';
import React, {useEffect, useState} from "react";
import Image from 'next/image';
import {ColorSchemePayload} from "@/models/color-scheme.model";
import {GroupDataPayload} from "@/models/group-data.model";

import * as groupDataService from "@/services/group-data.service"
import MainLayout from "@/components/MainLayout"
import { groupDataImageURL } from "@/common/utils/utils";

interface Props {
//   groupName: string;
//   groupType: string;
//   mainProduct: string;
//   colorSchemes: ColorSchemePayload[];
//   groupId: string;
}

const GroupItem = ({
	//  groupName, groupType, mainProduct, colorSchemes, groupId 
	}: Props) => {
		const [groups, setGroups] = useState<any>([]);
	useEffect(() => {
		async function fetchData() {
		  try {
		   const payload = await groupDataService.getAllGroupData();
		   setGroups(payload);
			// setLoading(false);
		  } catch (error) {
			console.error(error);
		  }
		}
		fetchData();
	  }, []);

	  
	return (
		<MainLayout>
  {groups && groups?.map((group:GroupDataPayload, index:number) => (
    <div key={group?.id}>
      <Paper style={{ padding: 16, height: "100vh" }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Image src={groupDataImageURL(group?.logo)} alt="Group Image" width={100} height={100} />
          </Grid>
          <Grid item xs={3}>
            <Typography variant="subtitle1">ชื่อกลุ่มผู้ผลิตหรือร้านค้า : {group?.groupName}</Typography>
            <Typography variant="body2">ประเภทกลุ่ม :   {group?.groupType === "shop"
                        ? "ร้านค้า"
                        : "กลุ่มผู้ผลิต"}</Typography>
            {/* <Typography variant="body2">{group.product}</Typography> */}
          </Grid>
       
          <Grid item xs={3}>
            <Grid container direction="column" alignItems="center" spacing={1}>
              <Grid item>
                <Button variant="contained" color="primary" href={`/group/${group.id}`}>
                  ดูข้อมูลกลุ่ม/ร้าน
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" href={`/product/group/${group.id}`} style={{ marginTop: 8 }}>
                  ดูข้อมูลสินค้า
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      {index < groups.length - 1 && <Divider />} {/* Add divider for all but the last item */}
    </div>
  ))}
</MainLayout>

  );
};

export default GroupItem;
