import { UserStore } from '../stores/user_store'
import { Observer } from 'mobx-react'
import { useNavigate } from 'react-router-dom'
import UserService from '../services/user_service'
import { User } from '../types/user'

import './login_page.css'

interface LoginPageProps {
    userStore: UserStore;
}

const LoginPage = ({ userStore }: LoginPageProps) => {

    const navigate = useNavigate();

    const typeUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
        userStore.editUserName(event.target.value);
    }

    const typePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        userStore.editPassword(event.target.value);
    }

    const validateUser = async (): Promise<Boolean> => {
        let validatedUser: User = await UserService.validateUser(userStore.currentUser);
        if(validatedUser.id === 0){
            return false;
        }
        else{
            userStore.currentUser = validatedUser;
            return true;
        }
    }

    const login = async () => {
        let valid: Boolean = await validateUser();
        if (valid) {
            navigate('/reservations/' + userStore.currentUser.id);
        }
    }

    const signup = () => {
        navigate('/reservations/' + userStore.currentUser.id);
    }

    return (
        <Observer>
            {() => {
                return (
                    <div className="centered-content">
                        <input
                            className="user-text-box form-control"
                            type="text"
                            value={userStore.currentUser.userName}
                            onChange={typeUserName}
                            placeholder='User name'
                        />
                        <input
                            className="user-text-box form-control"
                            type="password"
                            value={userStore.currentUser.password}
                            onChange={typePassword}
                            placeholder='Password'
                        />
                        <div className="action-button">
                            <button type="button" className="btn btn-primary" onClick={login}>Login</button>
                            <button type="button" className="btn btn-secondary" onClick={signup}>Sign up</button>
                        </div>
                    </div>
                )
            }}
        </Observer>
    )
}
export default LoginPage;