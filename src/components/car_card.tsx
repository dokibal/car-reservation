import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { CarStore } from "../stores/car_store";
import { observer } from 'mobx-react-lite';
import { Car } from '../types/car';
import { useNavigate } from 'react-router-dom';
import { RESERVATION_PAGE } from '../constants/config';
import './car_card.css'

interface CarCardProps {
    car: Car;
    carStore: CarStore;
}

const CarCard = ({ car, carStore }: CarCardProps) => {

    const navigate = useNavigate();

    const editCar = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        carStore.currentCar = car;
        carStore.setShowCarDialog(true);
    };

    const navigateToReservations = () => {
        navigate(`${RESERVATION_PAGE}/${car.id}`);
    };

    return (
        <Card 
            className="carcard"
            onClick={navigateToReservations}
        >
            <Card.Body>
                <Card.Title className="over-flow-text">{car.brand} {car.model}</Card.Title>
                <p className="over-flow-text">Registration number: {car.registrationNumber}</p>
                <p className="over-flow-text">Capacity: {car.capacity}</p>
                <Button variant="primary" onClick={editCar}>Edit</Button>
            </Card.Body>
        </Card>
    )
}

export default observer(CarCard);