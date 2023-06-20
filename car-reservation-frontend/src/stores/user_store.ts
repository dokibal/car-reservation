import {makeObservable, observable, action } from 'mobx'
import { User, UserImpl } from '../types/user';
import UserService from '../services/user_service';

export class UserStore {
    users : User[] | null= null;
    currentUser : User = new UserImpl();

    constructor() {
      makeObservable(this, {
        users: observable,
        currentUser: observable,
        getUsers: action,
        editUserName: action,
        editPassword: action
      });
    }
  
    async getUsers(){
        const fetchedUsers = await UserService.getUsers();
        if(fetchedUsers){
            this.users = fetchedUsers;
        }
    }

    editUserName(userName : string){
        this.currentUser = {...this.currentUser, userName};
    }

    editPassword(password : string){
        this.currentUser = {...this.currentUser, password};
    }
}
  
export const observableUserStore = new UserStore();