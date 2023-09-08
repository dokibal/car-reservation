import React, { useEffect } from "react";
import { CarStore } from "../stores/car_store";
import { UserStore } from "../stores/user_store";
import { ReservationStore } from "../stores/reservation_store";
import { observer } from 'mobx-react-lite';
import ReservationCalendar from "./reservation_calendar";
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form"
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import "./reservation_list.css"
import { Car } from "../types/car";

interface ReservationListProps {
    userStore: UserStore;
    reservationStore: ReservationStore;
    carStore: CarStore;
}

const ReservationList = ({ userStore, reservationStore, carStore }: ReservationListProps) => {

    const { carId } = useParams();

    useEffect(() => {
        userStore.loadUser();
        //Fetch cars to fill the dropdown
        carStore.getCars();

        //Check if the carId parameter is valid
        if (carId && (+carId!==0) && !isNaN(+carId)) {
            let car: Car | undefined = getCarById(+carId);
            if (car) {
                reservationStore.setCar(car);
                reservationStore.reloadReservations();
            }
        }
    },[userStore, reservationStore]);

    let getCarById = (id: number): Car | undefined => {
        let cars: Car[] | undefined = carStore.cars?.filter(car => { return car.id === id; });
        if (cars) {
            if (cars.length === 1) {
                return cars[0];
            }
            else {
                console.error("Unexpected number of cars: more than one car with the given id.");
                return undefined;
            }
        }
        else {
            console.error("Unexpected number of cars: no car exists with the given id.");
            return undefined;
        }
    }

    let handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const dateParts = event.target.value.split("-");
        const [year, month, day] = dateParts;
        reservationStore.setStartDate(new Date(Number(year), Number(month) - 1, Number(day)));

        reservationStore.reloadReservations();
    }

    let handleCarDropdownSelection = (eventKey: string | null) => {
        if (eventKey && !isNaN(+eventKey)) {
            let car: Car | undefined = getCarById(+eventKey);
            if (car) {
                reservationStore.setCar(car);
                reservationStore.reloadReservations();
            }
        }
    }

    let displayName = (car: Car): string => {
        return car.brand + " " + car.model;
    }

    return (
                    <div>
                        <DropdownButton className="d-flex justify-content-center mb-2" id="dropdown-basic-button" title={reservationStore.car ? displayName(reservationStore.car) : "Select a car"} onSelect={handleCarDropdownSelection}>
                            {
                                carStore.cars?.map(car => {
                                    return (
                                        <Dropdown.Item eventKey={car.id}>{displayName(car)}</Dropdown.Item>
                                    )
                                }
                                )
                            }
                        </DropdownButton>
                        <Form className="d-flex justify-content-center mb-2">
                            <Form.Control type="date" className="narrow-datepicker" onChange={handleDateChange} />
                        </Form>
                        {
                            reservationStore.car && reservationStore.car.id ?
                                <ReservationCalendar userStore={userStore} reservationStore={reservationStore} /> :
                                <div></div>
                        }
                    </div>
                )
}

export default observer(ReservationList);