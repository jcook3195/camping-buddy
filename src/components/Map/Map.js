import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebase";
import {
  collection,
  getDocs,
  updateDoc,
  addDoc,
  doc,
} from "firebase/firestore";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

// database
const campgroundsCollectionRef = collection(db, "campgrounds");

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

// const markers = [
//   {
//     id: 1,
//     name: "240 Plum",
//     position: { lat: 32.24675453083131, lng: -83.26449168979302 },
//     rating: 5,
//     description: "Lorem ipsum dolor sit amet",
//   },
//   {
//     id: 2,
//     name: "Pine Lake Campground",
//     position: { lat: 33.819275581433864, lng: -83.46483518727811 },
//     rating: 5,
//     description: "Lorem ipsum dolor sit amet",
//   },
//   {
//     id: 3,
//     name: "Raccoon Mountain Campground",
//     position: { lat: 35.02123693312453, lng: -85.40793136750601 },
//     rating: 5,
//     description: "Lorem ipsum dolor sit amet",
//   },
//   {
//     id: 4,
//     name: "General Coffee State Park",
//     position: { lat: 31.515757865704632, lng: -82.76081024612775 },
//     rating: 5,
//     description: "Lorem ipsum dolor sit amet",
//   },
//   {
//     id: 5,
//     name: "River Falls at the Gorge",
//     position: { lat: 34.75875144350865, lng: -83.39552168498739 },
//     rating: 5,
//     description: "Lorem ipsum dolor sit amet",
//   },
//   {
//     id: 6,
//     name: "Hearthstone Cabins & Camping",
//     position: { lat: 34.70914057291674, lng: -83.74786043895789 },
//     rating: 5,
//     description: "Lorem ipsum dolor sit amet",
//   },
//   {
//     id: 7,
//     name: "High Falls State Park River Campground",
//     position: { lat: 33.173327817453725, lng: -84.00968668809972 },
//     rating: 5,
//     description: "Lorem ipsum dolor sit amet",
//   },
// ];

const Map = () => {
  // state management
  const [activeMarker, setActiveMarker] = useState(null);
  const [newCampground, setNewCampground] = useState(false);
  const [addCampground, setAddCampground] = useState(false);
  const [cgName, setCgName] = useState("");
  const [cgLat, setCgLat] = useState("");
  const [cgLng, setCgLng] = useState("");
  const [cgRating, setCgRating] = useState("");
  const [cgDesc, setCgDesc] = useState("");
  const [markers, setMarkers] = useState(null);

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

  const getMarkers = async () => {
    const data = await getDocs(campgroundsCollectionRef);
    setMarkers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  // action handlers
  const onNewCampgroundHandler = () => {
    setNewCampground(true);
  };

  const cgNameOnChangeHandler = (e) => {
    setCgName(e.target.value);
  };

  const cgLatOnChangeHandler = (e) => {
    setCgLat(e.target.value);
  };

  const cgLngOnChangeHandler = (e) => {
    setCgLng(e.target.value);
  };

  const cgRatingOnChangeHandler = (e) => {
    setCgRating(e.target.value);
  };

  const cgDescriptionOnChangeHandler = (e) => {
    setCgDesc(e.target.value);
  };

  const onAddCampgroundHandler = async () => {
    setAddCampground(true);
    const docRef = await addDoc(campgroundsCollectionRef, {
      name: cgName,
      lat: cgLat,
      lng: cgLng,
      rating: cgRating,
      description: cgDesc,
    });

    setNewCampground(false);
    setCgName("");
    setCgLat("");
    setCgLng("");
    setCgRating("");
    setCgDesc("");
    getMarkers();
    console.log("Added Campground with ID of: " + docRef.id);
  };

  useEffect(() => {
    getMarkers();
  }, []);

  // loading error handlers
  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <>
      <Row className="justify-content-center">
        <Col xs lg={6} className="mt-4 mb-4 text-center">
          <h1>Campground Map</h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs lg={6} className="mt-4 mb-4 text-center">
          <Button variant="primary" onClick={onNewCampgroundHandler}>
            New Campground +
          </Button>{" "}
        </Col>
      </Row>
      {newCampground && (
        <>
          <Row className="justify-content-center">
            <Col xs lg={6} className="mt-4 mb-4 text-center">
              <Form>
                <Form.Group className="mb-3" controlId="cgName">
                  <Form.Label>Campground Name</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={cgNameOnChangeHandler}
                    value={cgName}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="cgLat">
                  <Form.Label>Campground Lat</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={cgLatOnChangeHandler}
                    value={cgLat}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="cgLng">
                  <Form.Label>Campground Lng</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={cgLngOnChangeHandler}
                    value={cgLng}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="cgRating">
                  <Form.Label>Campground Rating</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={cgRatingOnChangeHandler}
                    value={cgRating}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="cgDesc">
                  <Form.Label>Campground Description</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={cgDescriptionOnChangeHandler}
                    value={cgDesc}
                  />
                </Form.Group>
              </Form>
            </Col>
          </Row>
          <Row className="justify-content-center text-center">
            <Col lg={6} xs={12} className="mt-4 mb-4">
              <Button variant="primary" onClick={onAddCampgroundHandler}>
                Add Campground
              </Button>{" "}
            </Col>
          </Row>
        </>
      )}
      {addCampground && (
        <Row>
          <Col>
            <p>Added campground!</p>
          </Col>
        </Row>
      )}
      <Row>
        <Col>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={10}
            center={center}
          >
            {markers !== null ? (
              markers.map(({ id, name, lat, lng, rating, description }) => (
                <MarkerF
                  key={id}
                  position={{ lat: Number(lat), lng: Number(lng) }}
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
              ))
            ) : (
              <></>
            )}
          </GoogleMap>
        </Col>
      </Row>
    </>
  );
};

export default Map;
