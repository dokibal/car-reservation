import { useEffect } from "react";
import { CarStore } from "../stores/car_store";
import { UserStore } from "../stores/user_store";
import { ReservationStore } from "../stores/reservation_store";
import { Observer } from 'mobx-react';

import "./reservation_calendar.css";

interface ReservationCalendarProps {
    userStore: UserStore;
    reservationStore: ReservationStore;
}

const ReservationCalendar = ({ userStore, reservationStore }: ReservationCalendarProps) => {

    useEffect(() => {
        reservationStore.fillReservationMap();
    });

    return (
        <Observer>
            {() => {
                return (
                    <div className="calendar-container">
                        {
                            Array.from(reservationStore.viewedReservations).map((day, did) => {
                                return (
                                    <div>
                                        <div>{day[0]}</div>
                                        <div className="day-reservations-container" key={did}>
                                            {
                                                Array.from(day[1]).map((res, hid) => {
                                                    return (
                                                        <div className="reservation-slot" key={day.length * did + hid}>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            }}
        </Observer>
    )
}

export default ReservationCalendar;