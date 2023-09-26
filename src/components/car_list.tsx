import { CarStore } from "../stores/car_store";
import { observer } from 'mobx-react-lite';
import CarCard from "./car_card";
import { Button } from "react-bootstrap";
import CarDialog from "./car_dialog";
import CarRemovalDialog from "./car_removal_dialog";
import { useEffect } from "react";

import './car_list.css'
import { UserStore } from "../stores/user_store";

interface CarCardProps {
    userStore: UserStore
    carStore: CarStore;
}

const CarList = ({ userStore, carStore }: CarCardProps) => {

    useEffect(() => {
        userStore.loadUser();
        carStore.loadCars();
    },[userStore, carStore]);

    const addNewCar = () => {
        carStore.clearCurrentCar();
        carStore.setShowCarDialog(true);
    }

    return (

        <div className="car-container">
            <Button disabled={userStore.currentUser.id === 0} className="new-car-button" variant="primary" onClick={addNewCar}>Add new</Button>
            <CarDialog carStore={carStore}></CarDialog>
            <CarRemovalDialog carStore={carStore}></CarRemovalDialog>
            <div className="card-grid">
                {
                    carStore.cars?.map(car => {
                        return (
                            <CarCard key={car.id} car={car} carStore={carStore}></CarCard>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default observer(CarList);