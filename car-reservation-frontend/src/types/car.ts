export interface Car{
    id: number;
    brand: string;
    model: string;
    registrationNumber: string;
    capacity: number;
}

export class CarImpl implements Car{

    public id: number;
    public brand: string;
    public model: string;
    public registrationNumber: string;
    public capacity: number;

    constructor(){
        this.id = 0;
        this.brand = "";
        this.model = "";
        this.registrationNumber = "";
        this.capacity = 0;
    }
}