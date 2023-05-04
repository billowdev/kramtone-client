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


type Props = {
	href: string;
	icon: React.ElementType;
	text: string;
	open?: boolean;
	useStartWithPath?: boolean; // Changed the type to boolean
	startWithPath?: string; // Added a new prop for the string value
}

const CustomMenuListItem: React.FC<Props> = ({ href, icon, text, open, useStartWithPath, startWithPath }) => {
	const theme = useTheme();
	const router = useRouter();
	const isActive = href != null && (router.pathname === href || (useStartWithPath || false) && router.pathname.startsWith(startWithPath || ''));

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
			  backgroundColor: isActive ?  theme.palette.primary.main : "#FFF",
			  borderRadius: "50px",
			}}
		  >
			 <ListItemIcon>
			  {React.createElement(icon, {
				  style: {
					  color: isActive ? "#ffffff" :  theme.palette.grey[900],
					}
				})}
			</ListItemIcon>
			<ListItemText primary={text}
			  style={{ color: isActive ? "#ffffff" : theme.palette.grey[900], 
			 }}
			  /> 

		  </ListItem>
		</Box>
	  </Link>
	);
}

export default CustomMenuListItem