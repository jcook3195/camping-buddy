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

  // database
  const tripsCollectionRef = collection(db, "trips");
  const campgroundsCollectionRef = collection(db, "campgrounds");

  const getCampgrounds = async () => {
    const data = await getDocs(campgroundsCollectionRef);
    setCampgrounds(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
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

  useEffect(() => {
    getCampgrounds();
  }, []);

  return (
    <>
      <Row className="justify-content-center text-center">
        <Col lg={6} xs={12} className="mt-4 mb-4">
          <Button variant="primary" onClick={onNewTripHandler}>
            New Trip +
          </Button>{" "}
        </Col>
      </Row>
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
                  <option defaultChecked disabled>
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
                    <div className="mb-3 form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1"
                        style={{
                          float: "none",
                          marginRight: ".5rem",
                          borderColor: "#000",
                        }}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="exampleCheck1"
                      >
                        Check me out
                      </label>
                    </div>
                  </form>
                </Col>
              </Row>
              <Row className="justify-content-center text-center">
                <Col lg={6} xs={12} className="mt-4 mb-4">
                  <h2>Before Leaving</h2>
                  <form className="text-start">
                    <div className="mb-3 form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck2"
                        style={{
                          float: "none",
                          marginRight: ".5rem",
                          borderColor: "#000",
                        }}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="exampleCheck2"
                      >
                        Check me out
                      </label>
                    </div>
                  </form>
                </Col>
              </Row>
              <Row className="justify-content-center text-center">
                <Col lg={6} xs={12} className="mt-4 mb-4">
                  <h2>After Returning</h2>
                  <form className="text-start">
                    <div className="mb-3 form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck3"
                        style={{
                          float: "none",
                          marginRight: ".5rem",
                          borderColor: "#000",
                        }}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="exampleCheck3"
                      >
                        Check me out
                      </label>
                    </div>
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
