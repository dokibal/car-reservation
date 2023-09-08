import {makeObservable, observable, action } from 'mobx'
import { User, UserImpl } from '../types/user';
import UserService from '../services/user_service';
import { USER_KEY } from '../constants/config';

export class UserStore {

    users : User[] | null= null;
    currentUser : User = new UserImpl();
    signupIssues : string[] = [];
    signinIssues : string[] = [];

    constructor() {
      makeObservable(this, {
        users: observable,
        currentUser: observable,
        signupIssues: observable,
        signinIssues: observable,
        getUsers: action,
        editPassword: action,
        editDisplayName: action,
        resetUser: action,
        clearSignupIssues: action,
        pushSignupIssue: action,
        clearSigninIssues: action,
        pushSigninIssue: action,
        signout: action,
        signin: action,
        loadUser: action
      });

    }
  
    async getUsers(){
        const fetchedUsers = await UserService.getUsers();
        if(fetchedUsers){
            this.users = fetchedUsers;
        }
    }

    editEmail(email : string){
        this.currentUser = {...this.currentUser, email};
    }

    editPassword(password : string){
        this.currentUser = {...this.currentUser, password};
    }

    editDisplayName(displayName : string){
        this.currentUser = {...this.currentUser, displayName};
    }

    editPhoneNumber(phoneNumber : string){
        this.currentUser = {...this.currentUser, phoneNumber};
    }
    
    resetUser(){
        this.currentUser = new UserImpl();
    }

    clearSignupIssues(){
        this.signupIssues=[];
    }
    
    pushSignupIssue(issue : string){
        this.signupIssues.push(issue);
    }

    clearSigninIssues(){
        this.signinIssues=[];
    }
    
    pushSigninIssue(issue : string){
        this.signinIssues.push(issue);
    }

    signout(){
        this.currentUser = new UserImpl();
        console.log(this.currentUser);
    }

    signin(user : User){
        this.currentUser = user;
        localStorage.setItem(USER_KEY,JSON.stringify(this.currentUser));
    }

    loadUser(){
        let userString = localStorage.getItem(USER_KEY);
        if(userString){
            this.currentUser = JSON.parse(userString);
        }
    }
}
  
export const observableUserStore = new UserStore();