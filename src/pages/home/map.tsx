import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { LatLngExpression, LatLngBoundsExpression } from 'leaflet';

import Image from 'next/image';


type Place = {
	name: string;
	address: string;
	lat: number;
	lng: number;
};

type MapProps = {
	places: Place[];
};

const Map = ({ places }: MapProps) => {

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
			style={{ height: '100vh' }}>
			<TileLayer

				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

			{places.map(({ name, address, lat, lng }) => (
				<Marker key={name} position={[lat, lng]}>
					<Popup>
						<div>
							<h3>{name}</h3>
							<p>{address}</p>
							<Image
								src="https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI"
								alt="My Image"
								width={100}
								height={100}
							/>
						</div>
					</Popup>
				</Marker>
			))}
		</MapContainer>


	);
};

export default Map;
