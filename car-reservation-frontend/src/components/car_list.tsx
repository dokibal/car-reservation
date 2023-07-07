import { CarStore } from "../stores/car_store";
import { Observer } from 'mobx-react'
import CarCard from "./car_card";
import { Button } from "react-bootstrap";
import CarDialog from "./car_dialog";
import { useEffect } from "react";

import './car_list.css'

interface CarCardProps {
    carStore: CarStore;
}

const CarList = ({ carStore }: CarCardProps) => {

    useEffect(() => {
        carStore.getCars();
    });

    const addNewCar = () => {
        carStore.clearCurrentCar();
        carStore.setShowCarDialog(true);
    }

    return (
        <Observer>
            {
                () => {
                    return (
                        <div className="car-container">
                            <Button className="new-car-button" variant="primary" onClick={addNewCar}>Add new</Button>
                            <CarDialog carStore={carStore}></CarDialog>
                            <div className="card-grid">
                                {
                                    carStore.cars?.map(car => {
                                        return (
                                            <CarCard car={car} carStore={carStore}></CarCard>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                }
            }
        </Observer>
    )
}

export default CarList;