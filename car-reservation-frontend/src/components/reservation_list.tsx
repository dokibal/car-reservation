import { CarStore } from "../stores/car_store";
import { UserStore } from "../stores/user_store";
import { ReservationStore } from "../stores/reservation_store";
import { Observer } from 'mobx-react'
import ReservationCalendar from "./reservation_calendar";
import { useParams } from "react-router-dom";

interface ReservationListProps {
    userStore: UserStore;
    reservationStore: ReservationStore;
    carStore: CarStore;
}

const ReservationList = ({ userStore, reservationStore, carStore }: ReservationListProps) => {

    const {carId} = useParams();

    return (
        <Observer>
            {() => {
                return (
                    <div>
                        <ReservationCalendar userStore={userStore} reservationStore={reservationStore} />
                    </div>
                )
            }}
        </Observer>
    )
}

export default ReservationList;