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
        //Don't do anything if the slot is already reserved and not by the current user
        if (reservation.id && reservation.user.id != userStore.currentUser.id) {
            return;
        }
        reservationStore.currentReservation = reservation;
        reservationStore.currentReservation.user = userStore.currentUser;
        reservationStore.setShowReservationDialog(true);
    };

    let getReservationSlotClass = (res: Reservation) => {
        let baseClass : String = "reservation-slot";
        if(res.id){
            if(res.user.id == userStore.currentUser.id){
                return baseClass + " own";
            }
            else{
                return baseClass + " reserved";
            }
        }
        else{
            return baseClass + " free";
        }
    }

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
                            return (
                                <tr key={hid}>
                                    <td className="table-center">{formatHour(hour[0])}</td>
                                    {
                                        Array.from(hour[1]).map((res, did) => {
                                            return (
                                                <td className="table-center" key={did}>
                                                    <div className={getReservationSlotClass(res[1])} onClick={(event) => { onReservationClicked(event, res[1]) }}>

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