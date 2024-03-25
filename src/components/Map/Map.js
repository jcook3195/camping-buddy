import React, { useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";

// google maps libraries
const libraries = ["places"];

// map styles
const mapContainerStyle = {
  width: "100%",
  height: "80vh",
};

// center point of the map on load
const center = {
  lat: 32.24675453083131,
  lng: -83.26449168979302,
};

const markers = [
  {
    id: 1,
    name: "240 Plum",
    position: { lat: 32.24675453083131, lng: -83.26449168979302 },
    rating: 5,
    description: "Lorem ipsum dolor sit amet",
  },
  {
    id: 2,
    name: "Pine Lake Campground",
    position: { lat: 33.819275581433864, lng: -83.46483518727811 },
    rating: 5,
    description: "Lorem ipsum dolor sit amet",
  },
  {
    id: 3,
    name: "Raccoon Mountain Campground",
    position: { lat: 35.02123693312453, lng: -85.40793136750601 },
    rating: 5,
    description: "Lorem ipsum dolor sit amet",
  },
  {
    id: 4,
    name: "General Coffee State Park",
    position: { lat: 31.515757865704632, lng: -82.76081024612775 },
    rating: 5,
    description: "Lorem ipsum dolor sit amet",
  },
  {
    id: 5,
    name: "River Falls at the Gorge",
    position: { lat: 34.75875144350865, lng: -83.39552168498739 },
    rating: 5,
    description: "Lorem ipsum dolor sit amet",
  },
  {
    id: 6,
    name: "Hearthstone Cabins & Camping",
    position: { lat: 34.70914057291674, lng: -83.74786043895789 },
    rating: 5,
    description: "Lorem ipsum dolor sit amet",
  },
  {
    id: 7,
    name: "High Falls State Park River Campground",
    position: { lat: 33.173327817453725, lng: -84.00968668809972 },
    rating: 5,
    description: "Lorem ipsum dolor sit amet",
  },
];

const Map = () => {
  // state management
  const [activeMarker, setActiveMarker] = useState(null);

  // active marker handling
  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  // api key and libraries on load
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBSN8xcuSK5SkqWe27rYDXo29l44U4EnQU",
    libraries,
  });

  // loading error handlers
  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
      >
        {markers.map(({ id, name, position, rating, description }) => (
          <MarkerF
            key={id}
            position={position}
            onClick={() => handleActiveMarker(id)}
          >
            {activeMarker === id ? (
              <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                <div className="text-center">
                  <h5>{name}</h5>
                  <div>{rating}</div>
                  <img src="https://picsum.photos/200" alt="" />
                  <p>{description}</p>
                </div>
              </InfoWindowF>
            ) : null}
          </MarkerF>
        ))}
      </GoogleMap>
    </div>
  );
};

export default Map;
