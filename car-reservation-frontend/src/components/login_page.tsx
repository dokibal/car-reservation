import { UserStore } from '../stores/user_store'
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom'
import UserService from '../services/user_service'
import { User } from '../types/user'
import { useEffect } from 'react'
import { MAIN_PAGE, SIGN_UP_PAGE, USER_KEY } from '../constants/config';

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

    const validateUser = async (): Promise<User> => {
        return await UserService.validateUser(userStore.currentUser);
    }

    function validateEmptyField(value: string, name: string) {
        if (value.length === 0) {
            userStore.pushSigninIssue(`Property ${name} is empty.`);
        }
    }

    const login = async () => {
        userStore.clearSigninIssues();
        validateEmptyField(userStore.currentUser.email, "email");
        validateEmptyField(userStore.currentUser.password, "password");
        if (userStore.signinIssues.length > 0) {
            return;
        }
        //Only start user validation if both fields are filled
        let user: User = await validateUser();
        if (user && user.id) {
            userStore.signin(user);
            navigate(MAIN_PAGE);
        }
        else {
            userStore.pushSigninIssue("Incorrect combination of email and password. Please check your sign in data.");
        }
    }

    const signup = () => {
        navigate(SIGN_UP_PAGE);
    }

    useEffect(() => {
        userStore.clearSignupIssues();
        userStore.loadUser();
    },[userStore])

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
}
export default observer(LoginPage);