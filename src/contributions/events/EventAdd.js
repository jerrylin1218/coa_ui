import './EventAdd.css';
import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';

import EventDetails from "./EventDetails.js";
import SiteSelector from "./SiteSelector.js";

export default function EventAddButton() {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [siteId, setSiteId] = useState(undefined);
    const [numVolunteers, setNumVolunteers] = useState(null);
    const [numTrashBags, setNumTrashBags] = useState(null);
    const [trashWeight, setTrashWeight] = useState(null);
    const [walkingDistance, setWalkingDistance] = useState(null);

    const handleClose = () => setIsPopupVisible(false);
    const handleShow = () => setIsPopupVisible(true);

    const updateSiteId = (siteId) => {
        setSiteId(siteId);
    };

    const addEventClicked = () => {
        console.log(addEventClicked);
        console.log("NumVolunteers: ", numVolunteers);
        console.log("NumTrashBags: ", numTrashBags);
        console.log("trashWeight: ", trashWeight);
        console.log("WalkingDistance: ", walkingDistance);
        handleClose();
    }

    return(
        <div>
            <button onClick={handleShow}>
                Add Cleanup Event
            </button>
            <Modal show={isPopupVisible} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Cleanup Event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Location</h4>
                    <SiteSelector updateSiteId={updateSiteId}/>
                    <h4>Details</h4>
                    <EventDetails
                        setNumVolunteers={setNumVolunteers}
                        setNumTrashBags={setNumTrashBags}
                        setTrashWeight={setTrashWeight}
                        setWalkingDistance={setWalkingDistance}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button disabled={!siteId} variant="primary" onClick={addEventClicked}>
                        Add
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
  