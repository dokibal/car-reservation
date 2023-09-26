import { CarStore } from "../stores/car_store";
import { observer } from 'mobx-react-lite';
import { Modal } from "react-bootstrap";
import Button from 'react-bootstrap/Button';

import "./reservation_calendar.css";

interface CarRemovalDialogProps {
    carStore: CarStore;
}

const CarRemovalDialog = ({ carStore }: CarRemovalDialogProps) => {

    const removeCar = async () => {

        let success : Boolean = await carStore.removeCar();

        if (success) {
            await carStore.loadCars();
        }
        
        carStore.setShowCarRemovalDialog(false);
        carStore.setShowCarDialog(false);
        carStore.clearCurrentCar();
    }

    return (

        <div>
            <Modal
                show={carStore.showCarRemovalDialog}
                onHide={() => { carStore.setShowCarRemovalDialog(false) }}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>
                    <h4>
                        Are you sure you would like to remove the current car and all corresponding reservations?
                    </h4>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="danger" onClick={() => { removeCar() }}>Remove</Button>
                    <Button variant="secondary" onClick={() => { carStore.setShowCarRemovalDialog(false) }}>Cancel</Button>

                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default observer(CarRemovalDialog);