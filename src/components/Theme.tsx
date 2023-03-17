import { createTheme } from '@material-ui/core/styles';
const drawerWidth = 240;




const Theme = createTheme({
	// components:
	overrides: {
		MuiDrawer: {
			paper: {
				backgroundImage: 'url("/static/img/background_menu.jpg")',
				backgroundRepeat: "no-repeat",
				backgroundPosition: "bottom",
				width: drawerWidth,
			},
		},
	},
	typography: {
		fontFamily: "Kanit",
		fontWeightLight: 300,
		fontWeightRegular: 400,
		fontWeightMedium: 500,
		fontWeightBold: 700,
	},
	spacing: 8,
	palette: {

		// #103D81 has an RGB value of 16 61 129, 
		// and you could create a lighter tone by adding 20
		//  to each of the RGB values, resulting in a color like 36 81 149,

		primary: {
			main: "#103D81",
			light: "#3B5B8E",
			dark: "#03080C"
		},
		common: {
			white: "#F6F8FF",
		},
		grey: {
			50: '#FAFAFA',
			100: '#F0F0F0',
			200: '#D9D9D9',
			300: '#BFBFBF',
			400: '#A6A6A6',
			500: '#8C8C8C',
			600: '#838383',
			700: '#6E6E6E',
			800: '#5A5A5A',
			900: '#464646',
			A100: '#D9D9D9',
			A200: '#A6A6A6',
			A400: '#838383',
			A700: '#6E6E6E',
		},
		secondary: {
			dark: "#868EBB",
			main: "#9AA2CF",
			light: "#AEB6E3",
		},
		background: {
			default: "#FDFDFD",
			paper: "#F1F1E6"
		},
		info: {
			dark: "#5E9BFB",
			main: "#72AFFF",
			light: "#DAF1FE",
		},
		warning: {
			dark: "#F2C543",
			main: "#FFD957",
			light: "#FDF7CF",

		},
		success: {
			dark: "#87D746",
			main: "#9BEB5A",
			light: " #B9FFC8"
		},
		error: {
			dark: "#E66558",
			main: "#FA796C",
			light: "#FAE8DA",
		}
	}

});

export default Theme;
