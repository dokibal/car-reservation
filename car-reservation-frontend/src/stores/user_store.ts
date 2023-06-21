import {makeObservable, observable, action } from 'mobx'
import { User, UserImpl } from '../types/user';
import UserService from '../services/user_service';

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
        pushSigninIssue: action
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
}
  
export const observableUserStore = new UserStore();