import { CarStore } from "../stores/car_store";
import { CommonStore } from "../stores/common_store";
import { observer } from 'mobx-react-lite';
import CarCard from "./car_card";
import { Button } from "react-bootstrap";
import CarDialog from "./car_dialog";
import CarRemovalDialog from "./car_removal_dialog";
import { useEffect } from "react";
import CenteredSpinner from "./centered_spinner"

import './car_list.css'
import { UserStore } from "../stores/user_store";

interface CarCardProps {
    commonStore: CommonStore;
    userStore: UserStore
    carStore: CarStore;
}

const CarList = ({ commonStore, userStore, carStore }: CarCardProps) => {

    useEffect(() => {
        userStore.loadUser();
        const fetchData = async () => {
            commonStore.toggleLoading(true);
            await carStore.loadCars();
            commonStore.toggleLoading(false);
        }

        fetchData();
    },[userStore, carStore, commonStore]);

    const addNewCar = () => {
        carStore.clearCurrentCar();
        carStore.setShowCarDialog(true);
    }

    return (

        <div className="car-container">
            {(!carStore.showCarDialog && !carStore.showCarRemovalDialog) ? <CenteredSpinner commonStore={commonStore}/> : <div></div>}
            <Button disabled={userStore.currentUser.id === 0} className="new-car-button" variant="primary" onClick={addNewCar}>Add new</Button>
            <CarDialog commonStore={commonStore} carStore={carStore}></CarDialog>
            <CarRemovalDialog commonStore={commonStore} carStore={carStore}></CarRemovalDialog>
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