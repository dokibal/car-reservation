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
                    userName: user.userName,
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
}
export default new UserService();