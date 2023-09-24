"use client";

import Button from "@/components/Button/Button";
import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";

interface TripLocationProps {
  location: string;
  locationDescription: string;
  latitude: number;
  longitude: number;
}

const TripLocation = ({
  location,
  locationDescription,
  latitude,
  longitude
}: TripLocationProps) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string
  });

  if (!isLoaded) return <div>Loading...</div>;

  const center = {
    lat: latitude,
    lng: longitude
  };

  const handleButtonClick = () => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`,
      "_blank"
    );
  };

  return (
    <div className="p-5">
      <h2 className="font-semibold text-lg text-primary mb-5">Localização</h2>
      <div className="relative h-[280px] w-full">
        <GoogleMap
          zoom={10}
          center={center}
          mapContainerClassName="rounded-lg shadow-md h-full w-full"
        >
          <Marker position={center} />
        </GoogleMap>
      </div>

      <h3 className="text-primary text-base font-semibold mt-5">{location}</h3>
      <p className="text-sm leading-6 text-gray-900 mt-3">
        {locationDescription}
      </p>
      <Button
        variant="outlined"
        className="w-full mt-5"
        onClick={handleButtonClick}
      >
        Ver no Google Maps
      </Button>
    </div>
  );
};

export default TripLocation;
