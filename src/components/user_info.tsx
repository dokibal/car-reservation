import { UserStore } from '../stores/user_store'
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom'
import { SIGN_IN_PAGE } from '../constants/config';

import './sign_up_page.css'
import './user_info.css'

interface UserInfoProps {
    signup: () => {};
    readonly: boolean;
    userStore: UserStore;
}

const UserInfo = ({ signup, readonly, userStore }: UserInfoProps) => {

    const navigate = useNavigate();

    function navigateToLogin() {
        navigate(SIGN_IN_PAGE);
    }

    return (

        <form className="user-form">
            <div className="user-form-group form-group">
                <label htmlFor="inputEmail">Email address</label>
                <input
                    type="email"
                    className="form-control"
                    id="inputEmail"
                    aria-describedby="emailHelp"
                    placeholder="john.doe@gmail.com"
                    disabled={readonly}
                    value={userStore.currentUser.email}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        userStore.editEmail(event.target.value);
                    }}
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
                    disabled={readonly}
                    value={userStore.currentUser.password}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        userStore.editPassword(event.target.value);
                    }}
                >
                </input>
                {
                    readonly ?
                        <div></div> :
                        <small id="passwordHelp" className="form-text text-muted">Minimum length of password is 8. It should contain at least one number and one letter.</small>
                }
            </div>
            <div className="user-form-group form-group">
                <label htmlFor="inputDisplayName">Display name</label>
                <input
                    type="text"
                    className="form-control"
                    id="inputDisplayName"
                    placeholder="John Doe"
                    disabled={readonly}
                    value={userStore.currentUser.displayName}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        userStore.editDisplayName(event.target.value);
                    }}
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
                    disabled={readonly}
                    value={userStore.currentUser.phoneNumber}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        userStore.editPhoneNumber(event.target.value);
                    }}
                >
                </input>
                {
                    readonly ?
                        <div></div> :
                        <small id="phoneHelp" className="form-text text-muted">Input format: +36701111111</small>
                }
            </div>
            {!readonly ?
                <div className="action-button-container">
                    <button type="button" className="action-button btn btn-primary" onClick={signup}>Sign up</button>
                    <button type="button" className="action-button btn btn-secondary" onClick={navigateToLogin}>Sign in</button>
                </div> :
                <div></div>
            }
        </form>
    )
}
export default observer(UserInfo);