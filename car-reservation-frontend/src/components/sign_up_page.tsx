import { UserStore } from '../stores/user_store'
import { Observer } from 'mobx-react'
import { useNavigate } from 'react-router-dom'
import UserService from '../services/user_service'
import { useEffect } from 'react'
import {MAIN_PAGE, SIGN_IN_PAGE} from '../constants/config';

import './sign_up_page.css'

interface SignUpPageProps {
    userStore: UserStore;
}

const SignUpPage = ({ userStore }: SignUpPageProps) => {

    const navigate = useNavigate();

    const typeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        userStore.editEmail(event.target.value);
    }

    const typePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        userStore.editPassword(event.target.value);
    }

    const typeDisplayName = (event: React.ChangeEvent<HTMLInputElement>) => {
        userStore.editDisplayName(event.target.value);
    }

    const typePhoneNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
        userStore.editPhoneNumber(event.target.value);
    }

    function validateEmptyField(value: string, name: string): void {
        if (value === "") {
            userStore.pushSignupIssue(`Property ${name} is empty.`);
        }
    }

    async function validateEmail(value: string) {

        if (await UserService.userExists(value)) {
            userStore.pushSignupIssue("User with the given e-mail address already exists.")
            return;
        }

        let emailParts: string[] = value.split("@");

        //Check how many @ symbol it contains
        let numberOfAts: number = emailParts.length - 1;
        if (numberOfAts === 0) {
            userStore.pushSignupIssue("Invalid email address. It shall contain an '@' symbol.");
            return;
        }
        if (numberOfAts > 1) {
            userStore.pushSignupIssue("Invalid email address. It shouldn't contain more than one '@' symbols.");
            return;
        }

        //If email contains only 1 @ symbol: emailParts length is 2
        //We will check the second part of the email address now
        let emailSecondPart: string = emailParts[1];

        //Check how many . it contains in the second part, it should be 1
        let emailEndingParts: string[] = emailSecondPart.split(".");
        let numberOfDots: number = emailEndingParts.length - 1;
        if (numberOfDots === 0) {
            userStore.pushSignupIssue("Invalid ending of email address.");
            return;
        }
        if (numberOfAts > 1) {
            userStore.pushSignupIssue("Invalid ending of email address. Only one '.' is valid at the end of the address.");
            return;
        }

    }

    function validatePassword(password: string): void {
        if (password.length < 8) {
            userStore.pushSignupIssue("The password should be at least 8 characters long.");
        }
        if (!(/\d/.test(password))) {
            userStore.pushSignupIssue("The password should contain at least one number.");
        }
        let regExp = /[a-zA-Z]/g;
        if (!regExp.test(password)) {
            userStore.pushSignupIssue("The password should contain at least one letter.");
        }
    }

    function validatePhoneNumber(phoneNumber: string): void {

        if (phoneNumber && phoneNumber.length && phoneNumber.charAt(0) !== '+') {
            userStore.pushSignupIssue("The phone number shall start with '+' character.");
            return;
        }

        let phoneNumericPart: string = phoneNumber.substring(1, phoneNumber.length - 1);
        //Check if the reamining part after the + symbol is fully numeric
        if (isNaN(Number(phoneNumericPart.toString()))) {
            userStore.pushSignupIssue("The phone number can only contain numbers after the '+' symbol. Expected format: +36701111111");
        }
    }

    function validateUserInput(): boolean {

        userStore.clearSignupIssues();

        validateEmptyField(userStore.currentUser.email, "email");
        validateEmptyField(userStore.currentUser.password, "password");
        validateEmptyField(userStore.currentUser.displayName, "display name");
        validateEmptyField(userStore.currentUser.phoneNumber, "phone number");

        validateEmail(userStore.currentUser.email);

        validatePassword(userStore.currentUser.password);

        validatePhoneNumber(userStore.currentUser.phoneNumber);

        if (userStore.signupIssues.length === 0) {
            return true;
        }
        else {
            return false;
        }
    }

    async function signup() {
        if (!validateUserInput()) {
            return;
        }
        userStore.currentUser = await UserService.addUser(userStore.currentUser);
        if (userStore.currentUser.id !== 0) {
            navigate(MAIN_PAGE);
        }
    }

    function navigateToLogin() {
        navigate(SIGN_IN_PAGE);
    }

    useEffect(()=>{
        userStore.clearSigninIssues();
        userStore.resetUser();
    })

    return (
        <Observer>
            {() => {
                return (
                    <div className="centered-content">
                        {userStore.signupIssues.length ?
                            <div className="alert alert-danger" role="alert">
                                <strong>
                                    Please correct the following issues to sign up.
                                </strong>
                                <ul>
                                    {userStore.signupIssues.map((issue, id) => {
                                        return (
                                            <li key={id.toString()}>
                                                {issue}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                            :
                            <div></div>
                        }
                        <form>
                            <div className="user-form-group form-group">
                                <label htmlFor="inputEmail">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="inputEmail"
                                    aria-describedby="emailHelp"
                                    placeholder="john.doe@gmail.com"
                                    value={userStore.currentUser.email}
                                    onChange={typeEmail}
                                >
                                </input>
                            </div>
                            <div className="user-form-group form-group">
                                <label htmlFor="inputPassword">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="inputPassword"
                                    placeholder="Password"
                                    value={userStore.currentUser.password}
                                    onChange={typePassword}
                                >
                                </input>
                                <small id="passwordHelp" className="form-text text-muted">Minimum length of password is 8. It should contain at least one number and one letter.</small>
                            </div>
                            <div className="user-form-group form-group">
                                <label htmlFor="inputDisplayName">Display name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputDisplayName"
                                    placeholder="John Doe"
                                    value={userStore.currentUser.displayName}
                                    onChange={typeDisplayName}
                                >
                                </input>
                            </div>
                            <div className="user-form-group form-group">
                                <label htmlFor="inputPhone">Phone number</label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    id="inputPhone"
                                    placeholder="+36701111111"
                                    value={userStore.currentUser.phoneNumber}
                                    onChange={typePhoneNumber}
                                >
                                </input>
                                <small id="phoneHelp" className="form-text text-muted">Input format: +36701111111</small>
                            </div>
                            <div className="action-button-container">
                                <button type="button" className="action-button btn btn-primary" onClick={signup}>Sign up</button>
                                <button type="button" className="action-button btn btn-secondary" onClick={navigateToLogin}>Sign in</button>
                            </div>
                        </form>
                    </div>
                )
            }}
        </Observer>
    )
}
export default SignUpPage;