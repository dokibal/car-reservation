import { UserStore } from "../stores/user_store";
import { ReservationStore } from "../stores/reservation_store";
import { CommonStore } from "../stores/common_store";
import { observer } from 'mobx-react-lite';
import "./reservation_calendar.css";
import { Reservation } from "../types/reservation";
import ReservationDialog from "./reservation_dialog";
import { Days } from "../types/days";
import { useNavigate } from "react-router-dom";
import { SIGN_IN_PAGE } from "../constants/config";

interface ReservationCalendarProps {
    commonStore: CommonStore;
    userStore: UserStore;
    reservationStore: ReservationStore;
}

const ReservationCalendar = ({ commonStore, userStore, reservationStore }: ReservationCalendarProps) => {

    const navigate = useNavigate();

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
                    Days[(date.getDay() as Days)].slice(0,3)
                }
            </div>
        </div>)
    }

    const onReservationClicked = (event: React.MouseEvent<HTMLElement>, reservation: Reservation) => {
        //Don't do anything if the slot is already reserved and not by the current user
        if (reservation.id && reservation.user.id !== userStore.currentUser.id) {
            return;
        }
        if (!reservation.car || !reservation.car.id){
            return;
        }
        //Don't do anything if the user is not signed in
        if (!userStore.currentUser || !userStore.currentUser.id){
            navigate(`${SIGN_IN_PAGE}/${reservation.car.id}`);
            return;
        }
        reservationStore.currentReservation = reservation;
        reservationStore.currentReservation.user = userStore.currentUser;
        reservationStore.setShowReservationDialog(true);
    };

    let getReservationSlotClass = (res: Reservation) => {
        let baseClass : String = "reservation-slot";

        if(!reservationStore.car || !reservationStore.car.id){
            return baseClass + " inactive";
        }

        if(res.id){
            if(userStore.currentUser && res.user.id === userStore.currentUser.id){
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
            <ReservationDialog commonStore={commonStore} userStore={userStore} reservationStore={reservationStore} />
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