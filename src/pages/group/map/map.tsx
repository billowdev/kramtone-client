import type { LatLngExpression, LatLngBoundsExpression } from 'leaflet';

import Image from 'next/image';
import { useRouter } from "next/router";
import dynamic from 'next/dynamic';
import React from 'react';
import { Typography, Button } from '@mui/material';
import { GroupDataPayload } from '@/models/group-data.model';
import {groupDataImageURL} from "@/common/utils/utils"

const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), {
	ssr: false, // disable server-side rendering
});

const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), {
	ssr: false, // disable server-side rendering
});
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), {
	ssr: false, // disable server-side rendering
});
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), {
	ssr: false, // disable server-side rendering
});


type MapProps = {
	groupData: GroupDataPayload[];
};

const GroupMap = ({ groupData }: MapProps) => {
	const router = useRouter();
	// fix it can't yean build 
	// stackoverflow
	// https://stackoverflow.com/questions/57704196/leaflet-with-next-js
	const [isBrowser, setIsBrowser] = React.useState(false);
	React.useEffect(() => {
		setIsBrowser(true);
	}, []);

	if (!isBrowser) {
		return null;
	}

	// const center: LatLngExpression =  [13.736717, 100.523186]; // Centered on Bangkok
	// const center: LatLngExpression = [17.2706, 101.7229]; // Centered on Northeast Thailand
	const center: LatLngExpression = [17.1634, 104.1476]; // Centered on Sakon Nakhon Province
	const zoom: number = 12;

	// const bounds: LatLngBoundsExpression = [
	// 	[5.612851, 97.343589], // Southwest corner of Thailand
	// 	[20.463634, 105.631856] // Northeast corner of Thailand
	// ];


	// const bounds: LatLngBoundsExpression = [
	// 	[14.1497, 98.7219], // Southwest corner of Northeast Thailand
	// 	[20.8441, 105.6397] // Northeast corner of Northeast Thailand
	// ];

	const bounds: LatLngBoundsExpression = [
		[16.3453, 103.0333], // Southwest corner of Sakon Nakhon Province
		[18.0813, 105.2619] // Northeast corner of Sakon Nakhon Province
	];
	return (
		<MapContainer
			center={center}
			zoom={zoom}
			bounds={bounds}
			scrollWheelZoom={true}
			style={{
				height: "100vh",
				width: "100%"
			}}
		>
			<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

			{groupData.map((group:any) => (
				<Marker key={group.id} position={[Number(group.lat), Number(group.lng)]}>
					
					<Popup>
						
						<div>
						<Image
								src={group?.banner === "banner.png" ? "/static/img/banner.png" : groupDataImageURL(group?.banner)}
								alt="banner image"
								
								width={275}
								height={35}
							/>
							<Image
								src={group?.logo === "logo.png" ? "/static/img/logo.png" : groupDataImageURL(group?.logo)}
								alt="logo image"
								width={75}
								height={75}
							/>
							<h3>{group.groupName}</h3>
							<Typography>{`${group.type == "shop" ? "ร้านค้า" : "กลุ่มผู้ผลิต" } `}</Typography>
							<Typography>{`ที่อยู่ : ${group.hno} ${group.village} ${group.subdistrict} ${group.district} ${group.province}`}</Typography>
							   <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {
                                      router.push(`/group/${group.id}`);
                                    }}
                                    fullWidth
                                  >
                                    ดูข้อมูลเพิ่มเติม
                                  </Button>
						</div>
					</Popup>
				</Marker>
			))}
		</MapContainer>
	);
};

export default GroupMap;
