import { UserStore } from "../stores/user_store";
import { CommonStore } from "../stores/common_store";
import { ReservationStore } from "../stores/reservation_store";
import { observer } from 'mobx-react-lite';
import { Modal } from "react-bootstrap";
import CenteredSpinner from './centered_spinner'
import Button from 'react-bootstrap/Button';

import "./reservation_calendar.css";
import { Reservation } from "../types/reservation";
import { Nullable } from "../types/nullable";

interface ReservationDialogProps {
    commonStore: CommonStore;
    userStore: UserStore;
    reservationStore: ReservationStore;
}

const ReservationDialog = ({ commonStore, userStore, reservationStore }: ReservationDialogProps) => {

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
        commonStore.toggleLoading(true);
        let reservation: Nullable<Reservation> = await reservationStore.save();
        commonStore.toggleLoading(false);
        if (reservation !== null && reservation.id) {
            reservationStore.setShowReservationDialog(false);
            reservationStore.reloadReservations();
        }
    }

    const cancel = async () => {
        commonStore.toggleLoading(true);
        let deleted = await reservationStore.cancel();
        commonStore.toggleLoading(false);
        reservationStore.setShowReservationDialog(false);
        if (deleted) {
            reservationStore.reloadReservations();
        }
    }

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
                    {reservationStore.currentReservation.id ?
                        <Modal.Title>Manage reservation</Modal.Title> :
                        <Modal.Title>Confirm reservation</Modal.Title>
                    }

                </Modal.Header>

                <Modal.Body>
                    {<CenteredSpinner commonStore={commonStore} />}
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
                            <Button variant="danger" onClick={() => { cancel() }}>Cancel</Button>
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
}

export default observer(ReservationDialog);