import { CarStore } from "../stores/car_store";
import { CommonStore } from "../stores/common_store";
import { observer } from 'mobx-react-lite';
import { Modal } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import CenteredSpinner from './centered_spinner'

import "./reservation_calendar.css";
import { Car } from "../types/car";
import { Nullable } from "../types/nullable";

interface CarDialogProps {
    commonStore: CommonStore;
    carStore: CarStore;
}

const CarDialog = ({ commonStore, carStore }: CarDialogProps) => {

    const validateEmptyField = (value: string, name: string): void => {
        if (value === "") {
            carStore.pushCarIssue(`Property ${name} is empty.`);
        }
    }

    const validateCapacity = (capacity: number): void => {
        if (!capacity) {
            carStore.pushCarIssue(`Capacity ${capacity} is not valid. The minimum value of capacity is 1.`);
        }
    }

    const validateCarInput = (): Boolean => {

        carStore.clearCarIssues();

        validateEmptyField(carStore.currentCar.brand, "brand");
        validateEmptyField(carStore.currentCar.model, "model");
        validateEmptyField(carStore.currentCar.registrationNumber, "registration number");

        validateCapacity(carStore.currentCar.capacity);

        if (carStore.carIssues.length === 0) {
            return true;
        }
        else {
            return false;
        }
    }

    const showCarRemovalConfirmation = () => {
        carStore.setShowCarRemovalDialog(true);
    }

    const saveCar = async () => {
        if (!validateCarInput()) {
            return;
        }
        
        commonStore.toggleLoading(true);
        let car: Nullable<Car> = await carStore.save();
        commonStore.toggleLoading(false);
        if (car !== null && car.id) {
            carStore.setShowCarDialog(false);
            carStore.loadCars();
            carStore.clearCurrentCar();
        }
    }

    const typeBrand = (event: React.ChangeEvent<HTMLInputElement>) => {
        carStore.editBrand(event.target.value);
    }

    const typeModel = (event: React.ChangeEvent<HTMLInputElement>) => {
        carStore.editModel(event.target.value);
    }

    const typeRegistrationNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
        carStore.editRegistrationNumber(event.target.value);
    }

    const typeCapacity = (event: React.ChangeEvent<HTMLInputElement>) => {
        carStore.editCapacity(Number(event.target.value));
    }

    return (

        <div>
            <Modal
                show={!carStore.showCarRemovalDialog && carStore.showCarDialog}
                onHide={() => { carStore.setShowCarDialog(false) }}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>{carStore.currentCar.id ? "Edit car" : "New car"}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {<CenteredSpinner commonStore={commonStore}/>}
                    {carStore.carIssues.length ?
                        <div className="alert alert-danger" role="alert">
                            <strong>
                                Please correct the following issues to save car.
                            </strong>
                            <ul>
                                {carStore.carIssues.map((issue, id) => {
                                    return (
                                        <li key={id.toString()}>
                                            {issue}
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                        :
                        <div></div>
                    }
                    <Form>
                        <Form.Group className="mb-3" controlId="carForm.brand">
                            <Form.Label>Brand</Form.Label>
                            <Form.Control type="text" placeholder="Lamborghini"
                                defaultValue={carStore.currentCar.brand}
                                onChange={typeBrand}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="carForm.model">
                            <Form.Label>Model</Form.Label>
                            <Form.Control type="text" placeholder="Aventador"
                                defaultValue={carStore.currentCar.model}
                                onChange={typeModel}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="carForm.registrationNumber">
                            <Form.Label>Registration number</Form.Label>
                            <Form.Control type="text" placeholder="AA AA 999"
                                defaultValue={carStore.currentCar.registrationNumber}
                                onChange={typeRegistrationNumber}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="carForm.capacity">
                            <Form.Label>Capacity</Form.Label>
                            <Form.Control type="number" min="1" placeholder="1"
                                defaultValue={carStore.currentCar.capacity}
                                onChange={typeCapacity}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={() => { saveCar() }}>Save</Button>
                    {carStore.currentCar.id ? <Button variant="danger" onClick={() => { showCarRemovalConfirmation() }}>Remove</Button>:<div></div>}
                    <Button variant="secondary" onClick={() => { carStore.setShowCarDialog(false) }}>Close</Button>

                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default observer(CarDialog);