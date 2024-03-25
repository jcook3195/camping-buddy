import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebase";
import {
  collection,
  getDocs,
  updateDoc,
  addDoc,
  doc,
} from "firebase/firestore";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function ToDo() {
  // state management
  const [newTrip, setNewTrip] = useState(false);
  const [addTrip, setAddTrip] = useState(false);
  const [tripName, setTripName] = useState("");
  const [tripDate, setTripDate] = useState("");

  // database
  const tripsCollectionRef = collection(db, "trips");

  const onNewTripHandler = () => {
    setNewTrip(true);
  };

  const onAddTripHandler = async () => {
    setAddTrip(true);
    await addDoc(tripsCollectionRef, { name: tripName, date: tripDate });
    setNewTrip(false);
  };

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
        <Row className="justify-content-center text-center">
          <Col lg={6} xs={12} className="mt-4 mb-4">
            <Button variant="primary" onClick={onAddTripHandler}>
              Add Trip
            </Button>{" "}
          </Col>
        </Row>
      )}
      {addTrip && (
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
                    <label className="form-check-label" for="exampleCheck1">
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
                    <label className="form-check-label" for="exampleCheck2">
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
                  <div class="mb-3 form-check">
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
                    <label className="form-check-label" for="exampleCheck3">
                      Check me out
                    </label>
                  </div>
                </form>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </>
  );
}

export default ToDo;
