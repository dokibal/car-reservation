import React, { useEffect } from "react";
import { CarStore } from "../stores/car_store";
import { Observer } from 'mobx-react'

interface ReservationListProps {
    carStore: CarStore;
}

const ReservationList = ({ carStore }: ReservationListProps) => {

    useEffect(() => {
        carStore.getCars();
    });

    return (
        <Observer>
            {() => {
                return (
                    <div>
                        {carStore.cars?.map(car => {
                            return (
                                <div>
                                    {car.brand}
                                </div>
                            )
                        })}
                    </div>
                )
            }}
        </Observer>
    )
}

export default ReservationList;