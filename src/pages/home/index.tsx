import React from 'react'
import dynamic from "next/dynamic";
import { placeSelector } from './../../store/slices/place.slice';


import { useAppDispatch } from "@/store/store";
import { fetchPlace } from '@/store/slices/place.slice';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
type Props = {}



function HomePage({ }: Props) {

	const dispatch = useAppDispatch()
	React.useEffect(()=>{
	  dispatch(fetchPlace());
	}, [dispatch])
  
	const myPlaces = useSelector(placeSelector)

  // const Map = dynamic(() => import("./map"), { ssr: false });

  // console.log('====================================');
  // console.log(myPlaces);
  // console.log('====================================');

  const Map = React.useMemo(() => dynamic(
    () => import('./map'), // replace '@components/map' with your component's location
    { 
      loading: () => <Typography>A map is loading</Typography>,
      ssr: false // This line is important. It's what prevents server-side render
    }
    

  ), [/* list variables which should trigger a re-render here */])
  return <Map  places={myPlaces.places}  />

  // return (
    
  //     <Map places={places} />
  //   // <div>Welcome to homepage
  //   // </div>

  // )
}

export default HomePage