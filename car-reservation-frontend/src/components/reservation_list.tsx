import React, { useEffect } from "react";
import { CarStore } from "../stores/car_store";
import { UserStore } from "../stores/user_store";
import { ReservationStore } from "../stores/reservation_store";
import { Observer } from 'mobx-react'
import ReservationCalendar from "./reservation_calendar";
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form"
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import "./reservation_list.css"

interface ReservationListProps {
    userStore: UserStore;
    reservationStore: ReservationStore;
    carStore: CarStore;
}

const ReservationList = ({ userStore, reservationStore, carStore }: ReservationListProps) => {

    const { carId } = useParams();

    useEffect(() => {
        //Fetch cars to fill the dropdown
        carStore.getCars();

        //Check if the carId parameter is valid
        if (carId && !isNaN(+carId)) {
            reservationStore.setCarId((+carId));
            reservationStore.initReservations();
        }
    });

    let handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const dateParts = event.target.value.split("-");
        const [year, month, day] = dateParts;
        reservationStore.setStartDate(new Date(Number(year), Number(month) - 1, Number(day)));

        reservationStore.fillReservationMap();
    }

    let handleCarDropdownSelection = (eventKey : string | null) => {
        if(eventKey && !isNaN(+eventKey)){
            reservationStore.setCarId(+eventKey);
            reservationStore.fillReservationMap();
            console.log(eventKey);
        }
    }

    return (
        <Observer>
            {() => {
                return (
                    <div>
                        <div>
                            <Form className="d-flex justify-content-center">
                                <Form.Control type="date" className="narrow-datepicker" onChange={handleDateChange} />
                            </Form>
                            <DropdownButton id="dropdown-basic-button" title="Select a car" onSelect={handleCarDropdownSelection}>
                                {
                                    carStore.cars?.map(car => {
                                        return (
                                            <Dropdown.Item eventKey={car.id}>{car.brand} {car.model}</Dropdown.Item>
                                        )
                                    }
                                    )
                                }
                            </DropdownButton>
                        </div>
                        {
                            reservationStore.carId ?
                                <ReservationCalendar userStore={userStore} reservationStore={reservationStore} /> :
                                <div></div>
                        }
                    </div>
                )
            }}
        </Observer>
    )
}

export default ReservationList;