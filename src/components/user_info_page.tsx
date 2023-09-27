import { UserStore } from '../stores/user_store'
import { CommonStore } from "../stores/common_store";
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom'
import UserService from '../services/user_service'
import { useEffect } from 'react'
import { MAIN_PAGE } from '../constants/config';

import './sign_up_page.css'
import UserInfo from'./user_info'

interface UserInfoPageProps {
    userStore: UserStore;
}

const UserInfoPage = ({ userStore }: UserInfoPageProps) => {

    function signup() {
        return true;
    }

    return (
        <div className="centered-content">
            <UserInfo signup={signup} readonly={true} userStore={userStore}/>
        </div>
    )
}
export default observer(UserInfoPage);