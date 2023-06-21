import { UserStore } from '../stores/user_store'
import { Observer } from 'mobx-react'
import { useNavigate } from 'react-router-dom'
import UserService from '../services/user_service'
import { User } from '../types/user'
import { useEffect } from 'react'

import './login_page.css'

interface LoginPageProps {
    userStore: UserStore;
}

const LoginPage = ({ userStore }: LoginPageProps) => {

    const navigate = useNavigate();

    const typeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        userStore.editEmail(event.target.value);
    }

    const typePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        userStore.editPassword(event.target.value);
    }

    const validateUser = async (): Promise<Boolean> => {
        let validatedUser: User = await UserService.validateUser(userStore.currentUser);
        if (validatedUser.id === 0) {
            return false;
        }
        else {
            userStore.currentUser = validatedUser;
            return true;
        }
    }

    function validateEmptyField(value : string, name : string){
        if(value.length===0){
            userStore.pushSigninIssue(`Property ${name} is empty.`);
        }
    }

    const login = async () => {
        userStore.clearSigninIssues();
        validateEmptyField(userStore.currentUser.email, "email");
        validateEmptyField(userStore.currentUser.password, "password");
        if(userStore.signinIssues.length > 0){
            return;
        }
        //Only start user validation if both fields are filled
        let valid: Boolean = await validateUser();
        if (valid) {
            navigate('/reservations/' + userStore.currentUser.id);
        }
        else{
            userStore.pushSigninIssue("Incorrect combination of email and password. Please check your sign in data.");
        }
    }

    const signup = () => {
        navigate('/signup');
    }

    useEffect(() => {
        userStore.clearSignupIssues();
        userStore.resetUser();
    })

    return (
        <Observer>
            {() => {
                return (

                    <div className="centered-content">
                        {userStore.signinIssues.length ?
                            <div className="alert alert-danger" role="alert">
                                <strong>
                                    Please correct the following issues to sign in.
                                </strong>
                                <ul>
                                    {userStore.signinIssues.map((issue, id) => {
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
                        <input
                            className="user-text-box form-control"
                            type="text"
                            value={userStore.currentUser.email}
                            onChange={typeEmail}
                            placeholder='john.doe@gmail.com'
                        />
                        <input
                            className="user-text-box form-control"
                            type="password"
                            value={userStore.currentUser.password}
                            onChange={typePassword}
                            placeholder='Password'
                        />
                        <div className="action-button">
                            <button type="button" className="action-button btn btn-primary" onClick={login}>Sign in</button>
                            <button type="button" className="action-button btn btn-secondary" onClick={signup}>Sign up</button>
                        </div>
                    </div>
                )
            }}
        </Observer>
    )
}
export default LoginPage;