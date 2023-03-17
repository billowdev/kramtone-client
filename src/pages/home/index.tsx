import React from 'react'
import dynamic from "next/dynamic";


type Props = {}

const places = [
  {
     name: 'ชื่อร้าน : ร้าน ABC',
    address: 'ที่อยู่ร้าน : ร้านผ้าคราม ABC',
    lat: 17.191058760990806,
    lng: 104.0894708420397,
  },
  {
     name: 'ชื่อร้าน : ร้าน ABC',
    address: 'ที่อยู่ร้าน : ร้านผ้าคราม ABC',
    lat: 17.190634027635916,
    lng: 104.09040683236034,
  },
  {
     name: 'ชื่อร้าน : ร้าน ABC',
    address: 'ที่อยู่ร้าน : ร้านผ้าคราม ABC',
    lat: 17.190970159860075,
    lng: 104.08848902422882,
  },
  {
     name: 'ชื่อร้าน : ร้าน ABC',
    address: 'ที่อยู่ร้าน : ร้านผ้าคราม ABC',
    lat: 17.189400286942945,
    lng: 104.09174171837972,
  },
  {
     name: 'ชื่อร้าน : ร้าน ABC',
    address: 'ที่อยู่ร้าน : ร้านผ้าคราม ABC',
    lat: 17.188738469975437,
    lng: 104.09137406371342,
  },
  {
     name: 'ชื่อร้าน : ร้าน ABC',
    address: 'ที่อยู่ร้าน : ร้านผ้าคราม ABC',
    lat: 17.189578289590823,
    lng: 104.09041195449454,
  },
  {
     name: 'ชื่อร้าน : ร้าน ABC',
    address: 'ที่อยู่ร้าน : ร้านผ้าคราม ABC',
    lat: 17.15780527924428,
    lng: 104.14923658053135,
  },
  {
     name: 'ชื่อร้าน : ร้าน ABC',
    address: 'ที่อยู่ร้าน : ร้านผ้าคราม ABC',
    lat: 17.136666701006746, 
    lng: 104.10278590101422
  },
  {
     name: 'ชื่อร้าน : ร้าน ABC',
    address: 'ที่อยู่ร้าน : ร้านผ้าคราม ABC',
    lat: 17.14191591985611, 
    lng: 104.1566875681221
  },
  {
    name: 'ชื่อร้าน : ร้าน ABC',
    address: 'ที่อยู่ร้าน : ร้านผ้าคราม ABC',
    lat: 17.15635050708738, 
    lng: 104.06055721065223
  },
  {
    name: 'ชื่อร้าน : ร้าน ABC',
    address: 'ที่อยู่ร้าน : ร้านผ้าคราม ABC',
    lat: 17.213870326570724, 
    lng: 104.1013188160521
  },
  {
    name: 'ชื่อร้าน : ร้าน ABC',
    address: 'ที่อยู่ร้าน : ร้านผ้าคราม ABC',
    lat: 17.17050152249698, 
    lng: 104.11515646800603
  },
];



function HomePage({ }: Props) {
  // const Map = dynamic(() => import("./map"), { ssr: false });
  const Map = React.useMemo(() => dynamic(
    () => import('./map'), // replace '@components/map' with your component's location
    { 
      loading: () => <p>A map is loading</p>,
      ssr: false // This line is important. It's what prevents server-side render
    }
  ), [/* list variables which should trigger a re-render here */])
  return <Map  places={places}  />

  // return (
    
  //     <Map places={places} />
  //   // <div>Welcome to homepage
  //   // </div>

  // )
}

export default HomePage