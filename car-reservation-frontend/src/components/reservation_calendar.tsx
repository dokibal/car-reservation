import { CarStore } from "../stores/car_store";
import { UserStore } from "../stores/user_store";
import { ReservationStore } from "../stores/reservation_store";
import { observer } from 'mobx-react-lite';
import "./reservation_calendar.css";
import { Reservation } from "../types/reservation";
import ReservationDialog from "./reservation_dialog";
import { Days } from "../types/days";

interface ReservationCalendarProps {
    userStore: UserStore;
    reservationStore: ReservationStore;
}

const ReservationCalendar = ({ userStore, reservationStore }: ReservationCalendarProps) => {

    function formatNumberWithLeadingZero(num: number): string {
        return new Intl.NumberFormat('en-US', { minimumIntegerDigits: 2 }).format(num);
    }
    function formatHour(num: number): string {
        return formatNumberWithLeadingZero(num) + ":00";
    }

    function formatDate(date: Date) {
        return (<div>
            <div>
                {
                    formatNumberWithLeadingZero(date.getDate())
                    + "/" +
                    formatNumberWithLeadingZero(date.getMonth() + 1)
                }
            </div>
            <div>
                {
                    Days[(date.getDay() as Days)]
                }
            </div>
        </div>)
    }

    const onReservationClicked = (event: React.MouseEvent<HTMLElement>, reservation: Reservation) => {
        //Don't do anything if the slot is already reserved
        if (reservation.id) {
            return;
        }
        reservationStore.currentReservation = reservation;
        reservationStore.currentReservation.user = userStore.currentUser;
        reservationStore.setShowReservationDialog(true);
    };

    return (
        <div className="centered-content">
            <ReservationDialog userStore={userStore} reservationStore={reservationStore} />
            <table>
                <thead>
                    <tr>
                        <th key={-1}></th>
                        {
                            Array.from(reservationStore.viewedDates).map(dateMap => {
                                return (
                                    <th className="table-center" key={dateMap[0]}>
                                        {formatDate(dateMap[1])}
                                    </th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        Array.from(reservationStore.viewedReservations).map((hour, hid) => {
                            console.log("Hour: " + hour);
                            return (
                                <tr key={hid}>
                                    <td className="table-center">{formatHour(hour[0])}</td>
                                    {
                                        Array.from(hour[1]).map((res, did) => {
                                            console.log("date: " + res[1].startDate);
                                            console.log("Day: " + res[0]);
                                            if(res[1].id){
                                                console.log(res[1].startDate);
                                            }
                                            return (
                                                <td className="table-center" key={did}>
                                                    <div className={"reservation-slot " + (res[1].id ? "reserved" : "free")} onClick={(event) => { onReservationClicked(event, res[1]) }}>

                                                    </div>
                                                </td>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default observer(ReservationCalendar);