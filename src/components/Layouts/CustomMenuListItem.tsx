import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { blue } from "@mui/material/colors";
import { Box, ListItem, Stack } from "@mui/material";
import Link from "next/link";
import { Layers, BarChart, Person } from "@mui/icons-material";
import { useRouter } from "next/router";
const drawerWidth = 240;
import { authSelector } from "@/store/slices/auth.slice";
import { useSelector } from "react-redux";
import LoginIcon from '@mui/icons-material/Login';
import {CustomTheme} from "@/pages/_app"


type Props = {
	href: string;
	icon: React.ElementType;
	text: string;
	open?: boolean
}

const CustomMenuListItem: React.FC<Props> = ({ href, icon, text, open }) => {
	const router = useRouter();
	const isActive = router.pathname === href;
	
	return (
	  <Link href={href} passHref>
		<Box boxShadow={2} style={{ borderRadius: "50px", 
	 margin: "16px 8px"
	 
		}}>
		  <ListItem
			button
			selected={isActive}
			classes={{ selected: "Mui-selected" }}
			style={{
			  backgroundColor: isActive ?  CustomTheme.palette.primary.main : "#FFF",
			  borderRadius: "50px",
			//   paddingTop: "16px",
			//   paddingBottom: "16px"
			}}
		  >
			
			 <ListItemIcon>
			  {React.createElement(icon, {
				  style: {
					  color: isActive ? "#ffffff" :  CustomTheme.palette.grey[900],
					//   margin: `${open ? '0 0 0 0px' : '0 0 0 -8px'}`
					}
				})}
			</ListItemIcon>
			<ListItemText primary={text}
			  style={{ color: isActive ? "#ffffff" : CustomTheme.palette.grey[900], 
			//    margin: '0 0 0 -16px'
			 }}
			  /> 

		  </ListItem>
		</Box>
	  </Link>
	);
}

export default CustomMenuListItem