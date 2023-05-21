import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import {Button} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import { authSelector } from "@/store/slices/auth.slice";
import { useSelector } from "react-redux";
const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}


const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

type HeaderProp = {
	open: boolean;
	onDrawerOpen: () => void;
};
	
export default function AppBarComponent({ open, onDrawerOpen }: HeaderProp) {
	const userData = useSelector(authSelector);
	// const [setShowProfileMenu] = React.useState(false);
	// const dispatch = useAppDispatch();

	return (
		<AppBar position="absolute" open={open}>
			<Toolbar
				sx={{
					pr: '24px', // keep right padding when drawer closed
				}}
			>
				{/* <IconButton
					edge="start"
					color="inherit"
					aria-label="open drawer"
					onClick={onDrawerOpen}
					sx={{
						marginRight: '36px',
						...(open && { display: 'none' }),
					}}
				>
					<MenuIcon />
				</IconButton> */}
				<button
  type="button"
  aria-label="open drawer"
  onClick={onDrawerOpen}
  style={{
    display: open ? 'none' : 'inline-flex',
    marginRight: '36px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
  }}
>
  <MenuIcon />
</button>


				{/* <IconButton color="inherit">
					<Typography
						component="h1"
						variant="h6"
						color="inherit"
						noWrap
						sx={{ flexGrow: 1 }}
					>
						version {process.env.NEXT_PUBLIC_VERSION}
					</Typography>
				</IconButton> */}

				<Typography
					component="h1"
					variant="h6"
					color="inherit"
					noWrap
					sx={{ flexGrow: 1 ,textAlign: 'end' }}
				>
					{userData.groupName ? userData.groupName: "" } &nbsp;&nbsp;{userData.role === "admin" ? "สถานะ : ผู้ดูแลระบบ": userData.groupType === "producer" ? "ประเภทกลุ่ม : กลุ่มผู้ผลิต": "ประเภทกลุ่ม : ร้านค้า"}
				</Typography>
				
			</Toolbar>
		</AppBar>
	);
}