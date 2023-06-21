import axios from 'axios';
import { RESERVATION_API_BASE_URL } from '../constants/config';
import { User } from '../types/user';

class UserService{
    async getUsers(){
        let url:string = RESERVATION_API_BASE_URL + "/users";
        try{
            let users:User[] = (await axios.get(url)).data;
            return users;
        }
        catch(err){
            console.error(err);
        }
    }
    async validateUser(user : User){
        let url:string = RESERVATION_API_BASE_URL + "/validateUser";
        try{
            let validatedUser:User = (await axios.get(url, {
                params: {
                    email: user.email,
                    password: user.password
                }
            })).data;
            return validatedUser;
        }
        catch(err){
            console.error(err);
            return {} as User;
        }
    }

    async userExists(email : string){
        let url : string = RESERVATION_API_BASE_URL + "/userExists"
        try{
            let userExists : boolean = (await axios.get(url, {
                params:{
                    email : email
                }
            })).data;
            return userExists;
        }
        catch(err){
            console.error(err);
            return false;
        }
    }

    async addUser(user : User){
        let url : string = RESERVATION_API_BASE_URL + "/user";
        try{
            let signedUpUser : User = (await axios.post(url, user)).data;
            return signedUpUser;
        }
        catch(err){
            console.error(err);
            return {} as User;
        }
    }
}
export default new UserService();