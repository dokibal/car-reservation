import React, { useEffect, useCallback } from "react";
import { CarStore } from "../stores/car_store";
import { UserStore } from "../stores/user_store";
import { ReservationStore } from "../stores/reservation_store";
import { CommonStore } from "../stores/common_store";
import { observer } from 'mobx-react-lite';
import ReservationCalendar from "./reservation_calendar";
import { useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form"
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import "./reservation_list.css"
import { Car } from "../types/car";
import { RESERVATION_PAGE } from "../constants/config";
import "./reservation_calendar.css"
import CenteredSpinner from './centered_spinner'
import { Container, Row, Col } from 'react-bootstrap'

interface ReservationListProps {
    commonStore: CommonStore;
    userStore: UserStore;
    reservationStore: ReservationStore;
    carStore: CarStore;
}

const ReservationList = ({ commonStore, userStore, reservationStore, carStore }: ReservationListProps) => {

    const { carId } = useParams();

    const navigate = useNavigate();

    const getCarById = useCallback((id: number): Car | undefined => {
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
            console.error("Unexpected number of cars: no car exists with id: " + id);
            return undefined;
        }
    }, [carStore.cars]);

    const setCar = useCallback(async (carId: string | undefined | null): Promise<boolean> => {

        //Check if the carId parameter is valid
        if (carId && (+carId !== 0) && !isNaN(+carId)) {
            let car: Car | undefined = getCarById(+carId);
            if (car) {
                reservationStore.setCar(car);
            }
            return true;
        }
        else {
            return false;
        }
    }, [reservationStore, getCarById]);

    useEffect(() => {
        userStore.loadUser();
        //Fetch cars to fill the dropdown
        //Inner function trick to be able to use async function inside useEffect
        const fetchData = async () => {

            commonStore.toggleLoading(true);
            await carStore.loadCars();
            await setCar(carId);
            await reservationStore.reloadReservations();
            commonStore.toggleLoading(false);
        }

        fetchData();
    }, [carId]);

    let handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const dateParts = event.target.value.split("-");
        const [year, month, day] = dateParts;
        reservationStore.setStartDate(new Date(Number(year), Number(month) - 1, Number(day)));

        reservationStore.reloadReservations();
    }

    let handleCarDropdownSelection = async (eventKey: string | null) => {
        commonStore.toggleLoading(true);
        let loaded: boolean = await setCar(eventKey);
        await reservationStore.reloadReservations();
        commonStore.toggleLoading(false);
        if (loaded) {
            navigate(`${RESERVATION_PAGE}/${eventKey!}`);
        }
    }

    let displayName = (car: Car): string => {
        return car.brand + " " + car.model;
    }

    return (

        <div>
            {!reservationStore.showReservationDialog ?
                <CenteredSpinner commonStore={commonStore} />
                :
                <div></div>
            }
            <Container>
                <Row>
                    <Col lg={6}>

                        <div className="centered-selector-container">
                            <DropdownButton className="d-flex justify-content-center mb-2" id="dropdown-basic-button" title={reservationStore.car ? displayName(reservationStore.car) : "Select a car"} onSelect={handleCarDropdownSelection}>
                                {
                                    carStore.cars?.map(car => {
                                        return (
                                            <Dropdown.Item key={car.id} eventKey={car.id}>{displayName(car)}</Dropdown.Item>
                                        )
                                    }
                                    )
                                }
                            </DropdownButton>
                            <Form className="d-flex justify-content-center mb-2">
                                <Form.Control type="date" className="narrow-datepicker" onChange={handleDateChange} />
                            </Form>
                        </div>
                    </Col>
                    <Col lg={6} style={{display:"flex", justifyContent:"center"}}>
                        <table className="reservation-info-table">
                            <tbody>
                                <tr>
                                    <td><div className="free little-square"></div></td>
                                    <td><div>Available</div></td>
                                    <td><div className="reserved little-square"></div></td>
                                    <td><div>Reserved by others</div></td>
                                </tr>
                                <tr>
                                    <td><div className="own little-square"></div></td>
                                    <td><div>Reserved by me</div></td>
                                    <td><div className="inactive little-square"></div></td>
                                    <td><div>No car selected</div></td>
                                </tr>
                            </tbody>
                        </table>
                    </Col>
                </Row>
            </Container>
            <ReservationCalendar commonStore={commonStore} userStore={userStore} reservationStore={reservationStore} />
        </div >
    )
}

export default observer(ReservationList);