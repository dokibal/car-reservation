import { UserStore } from "../stores/user_store";
import { ReservationStore } from "../stores/reservation_store";
import { Observer } from 'mobx-react';
import { Modal } from "react-bootstrap";
import Button from 'react-bootstrap/Button';

import "./reservation_calendar.css";
import { Reservation } from "../types/reservation";
import { Nullable } from "../types/nullable";

interface ReservationDialogProps {
    userStore: UserStore;
    reservationStore: ReservationStore;
}

const ReservationDialog = ({ userStore, reservationStore }: ReservationDialogProps) => {

    const showReservationDetails = (res: Reservation) => {
        return (
            <div>
                <ul>
                    <li>Brand: {res.car.brand}</li>
                    <li>Model: {res.car.model}</li>
                    <li>RegistrationNumber: {res.car.registrationNumber}</li>
                    <li>Capacity: {res.car.capacity}</li>
                    <li>Start date: {res.startDate.toLocaleString()}</li>
                    <li>End date: {res.endDate.toLocaleString()}</li>
                </ul>
            </div>
        )
    }

    const save = async () => {
        let reservation : Nullable<Reservation> = await reservationStore.save();
        if(reservation !== null && reservation.id){
            reservationStore.setShowReservationDialog(false);
        }
    }

    return (
        <Observer>
            {() => {
                return (
                    <div>
                        <Modal
                            show={reservationStore.showReservationDialog}
                            onHide={() => { reservationStore.setShowReservationDialog(false) }}
                            size="lg"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                        >

                            <Modal.Header closeButton>
                                <Modal.Title>Confirm reservation</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                {reservationStore.currentReservation.id ?
                                    <div>
                                        {showReservationDetails(reservationStore.currentReservation)}
                                    </div>
                                    :
                                    <div>
                                        <p>Are you sure you would like to confirm the following reservation?</p>
                                        {showReservationDetails(reservationStore.currentReservation)}
                                    </div>
                                }
                            </Modal.Body>

                            <Modal.Footer>
                                {reservationStore.currentReservation.id ? (

                                    reservationStore.currentReservation.user.id === userStore.currentUser.id ?
                                        <Button variant="danger">Cancel</Button>
                                        :
                                        <div>
                                        </div>
                                )
                                    :
                                    <Button variant="primary" onClick={() => { save() }}>Confirm</Button>
                                }
                                <Button variant="secondary" onClick={() => { reservationStore.setShowReservationDialog(false) }}>Close</Button>

                            </Modal.Footer>
                        </Modal>
                    </div>
                )
            }}
        </Observer >
    )
}

export default ReservationDialog;