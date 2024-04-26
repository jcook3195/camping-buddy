import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebase";
import {
  collection,
  getDocs,
  updateDoc,
  addDoc,
  doc,
} from "firebase/firestore";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function ToDo() {
  // state management
  const [newTrip, setNewTrip] = useState(false);
  const [addTrip, setAddTrip] = useState(false);
  const [tripName, setTripName] = useState("");
  const [tripDate, setTripDate] = useState("");
  const [currentTripId, setCurrentTripId] = useState("");
  const [campgrounds, setCampgrounds] = useState("");
  const [selectedCampground, setSelectedCampground] = useState("");
  const [trips, setTrips] = useState("");
  const [showTrips, setShowTrips] = useState(false);
  const [bflChecklist, setBflChecklist] = useState(null);
  const [afrChecklist, setAfrChecklist] = useState(null);
  const [pckChecklist, setPckChecklist] = useState(null);
  const [bflCheckedState, setBflCheckedState] = useState(null);
  const [afrCheckedState, setAfrCheckedState] = useState(null);
  const [pckCheckedState, setPckCheckedState] = useState(null);

  // database
  const tripsCollectionRef = collection(db, "trips");
  const campgroundsCollectionRef = collection(db, "campgrounds");
  const bflCollectionRef = collection(db, "beforeLeavingChecklist");
  const afrCollectionRef = collection(db, "afterReturningChecklist");
  const pckCollectionRef = collection(db, "packingChecklist");

  const getCampgrounds = async () => {
    const data = await getDocs(campgroundsCollectionRef);
    setCampgrounds(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const getTrips = async () => {
    const data = await getDocs(tripsCollectionRef);
    setTrips(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const getChecklists = async () => {
    const bflData = await getDocs(bflCollectionRef);
    const afrData = await getDocs(afrCollectionRef);
    const pckData = await getDocs(pckCollectionRef);

    setBflChecklist(bflData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setAfrChecklist(afrData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setPckChecklist(pckData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const onNewTripHandler = () => {
    setNewTrip(true);
  };

  const onAddTripHandler = async () => {
    setAddTrip(true);
    const docRef = await addDoc(tripsCollectionRef, {
      name: tripName,
      date: tripDate,
      campground: selectedCampground,
    });
    setNewTrip(false);
    setTripName("");
    setTripDate("");
    setCurrentTripId(docRef.id);
  };

  const onShowTripsHandler = () => {
    setShowTrips(true);
    console.log(trips);
  };

  const onNameChangeHandler = (e) => {
    setTripName(e.target.value);
  };

  const onDatesChangeHandler = (e) => {
    setTripDate(e.target.value);
  };

  const onCampgroundSelectChangeHandler = (e) => {
    setSelectedCampground(e.target.value);
    console.log(e.target.value);
  };

  const onBflCheckChangeHandler = (position) => {
    const updatedCheckedState = bflCheckedState.map((item, index) =>
      index === position ? !item : item
    );

    setBflCheckedState(updatedCheckedState);
  };

  const onAfrCheckChangeHandler = (position) => {
    const updatedCheckedState = afrCheckedState.map((item, index) =>
      index === position ? !item : item
    );

    setAfrCheckedState(updatedCheckedState);
  };

  const onPckCheckChangeHandler = (position) => {
    const updatedCheckedState = pckCheckedState.map((item, index) =>
      index === position ? !item : item
    );

    setPckCheckedState(updatedCheckedState);
  };

  useEffect(() => {
    getCampgrounds();
    getTrips();
    getChecklists();
  }, [currentTripId]);

  useEffect(() => {
    if (bflChecklist != null) {
      setBflCheckedState(new Array(bflChecklist.length).fill(false));
    }
  }, [bflChecklist]);
  useEffect(() => {
    if (afrChecklist != null) {
      setAfrCheckedState(new Array(afrChecklist.length).fill(false));
    }
  }, [afrChecklist]);
  useEffect(() => {
    if (pckChecklist != null) {
      setPckCheckedState(new Array(pckChecklist.length).fill(false));
    }
  }, [pckChecklist]);

  return (
    <>
      <Row className="justify-content-center text-center">
        <Col lg={6} xs={12} className="mt-4 mb-4">
          <Button variant="primary" onClick={onNewTripHandler}>
            New Trip +
          </Button>{" "}
          <Button variant="secondary" onClick={onShowTripsHandler}>
            Load Trips
          </Button>{" "}
        </Col>
      </Row>
      {showTrips && (
        <Row className="justify-content-center text-start">
          <Col lg={6} xs={12} className="mt-4 mb-4">
            {trips.map((i) => {
              // console.log(i);
              return (
                <p key={i.id}>
                  {i.name} - {i.date}
                </p>
              );
            })}
          </Col>
        </Row>
      )}
      {newTrip && (
        <>
          <Row className="justify-content-center text-center">
            <Col lg={6} xs={12} className="mt-4 mb-4">
              <Form>
                <Form.Group className="mb-3" controlId="tripName">
                  <Form.Label>Trip Name</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={onNameChangeHandler}
                    value={tripName}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="tripDates">
                  <Form.Label>Trip Dates</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={onDatesChangeHandler}
                    value={tripDate}
                  />
                </Form.Group>
                <Form.Select
                  aria-label="Default select example"
                  onChange={onCampgroundSelectChangeHandler}
                >
                  <option selected disabled>
                    Select a Campground
                  </option>

                  {campgrounds.map((i) => {
                    // console.log(i);
                    return (
                      <option key={i.id} value={i.name}>
                        {i.name}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form>
            </Col>
          </Row>
          <Row className="justify-content-center text-center">
            <Col lg={6} xs={12} className="mt-4 mb-4">
              <Button variant="primary" onClick={onAddTripHandler}>
                Add Trip
              </Button>{" "}
            </Col>
          </Row>
        </>
      )}
      {addTrip && (
        <>
          <Row>
            <Col>
              <p>Trip added!</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Row className="justify-content-center text-center">
                <Col lg={6} xs={12} className="mt-4 mb-4">
                  <h2>Packing List</h2>
                  <form className="text-start">
                    {pckChecklist.map((item, index) => (
                      <div className="mb-3 form-check" key={index}>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="exampleCheck1"
                          style={{
                            float: "none",
                            marginRight: ".5rem",
                            borderColor: "#000",
                          }}
                          onChange={onPckCheckChangeHandler}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="exampleCheck1"
                        >
                          {item.item}
                        </label>
                      </div>
                    ))}
                  </form>
                </Col>
              </Row>
              <Row className="justify-content-center text-center">
                <Col lg={6} xs={12} className="mt-4 mb-4">
                  <h2>Before Leaving</h2>
                  <form className="text-start">
                    {bflChecklist.map((item, index) => (
                      <div className="mb-3 form-check" key={index}>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="exampleCheck1"
                          style={{
                            float: "none",
                            marginRight: ".5rem",
                            borderColor: "#000",
                          }}
                          onChange={onBflCheckChangeHandler}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="exampleCheck1"
                        >
                          {item.item}
                        </label>
                      </div>
                    ))}
                  </form>
                </Col>
              </Row>
              <Row className="justify-content-center text-center">
                <Col lg={6} xs={12} className="mt-4 mb-4">
                  <h2>After Returning</h2>
                  <form className="text-start">
                    {afrChecklist.map((item, index) => (
                      <div className="mb-3 form-check" key={index}>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="exampleCheck1"
                          style={{
                            float: "none",
                            marginRight: ".5rem",
                            borderColor: "#000",
                          }}
                          onChange={onAfrCheckChangeHandler}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="exampleCheck1"
                        >
                          {item.item}
                        </label>
                      </div>
                    ))}
                  </form>
                </Col>
              </Row>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}

export default ToDo;
