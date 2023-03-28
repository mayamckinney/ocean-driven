import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

function Map() {
  const mapContainerStyle = {
    width: "100%",
    height: "400px"
  };

  const center = {
    lat: 27.9484684,
    lng: -111.0555218
  };

  const options = {
    styles: [
      {
        featureType: "poi",
        stylers: [
          { visibility: "on" }
        ]
      }
    ]
  };


  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDOwZIfZODsxWOq_U800-HkPAtewRJLwXo"
    >
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={17}
        mapTypeId="hybrid"
        options={options}
      >
      </GoogleMap>
    </LoadScript>
  );
}

export default Map;
