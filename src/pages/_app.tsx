import "../styles/globals.css";
import type { AppProps } from "next/app";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { fetchSession } from "@/store/slices/auth.slice";
const drawerWidth = 240;

export const Theme = createTheme({
		components: {
			MuiDrawer: {
				styleOverrides: {
					paper: {
						backgroundImage: 'url("/static/img/background_menu.jpg")',
						backgroundRepeat: "no-repeat",
						backgroundPosition: "bottom",
						width: drawerWidth,
					},
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
				// paper: "#F1F1E6"
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
		},
	});

function MyApp({ Component, pageProps }: AppProps) {
	React.useEffect(() => {
		store.dispatch(fetchSession());
	}, []);



	return (
		<Provider store={store}>
			<ThemeProvider theme={Theme}>
				<Component {...pageProps} />
				<Toaster />
			</ThemeProvider>
		</Provider>
	);
}

export default MyApp;
