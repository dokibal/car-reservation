import { UserStore } from '../stores/user_store'
import { observer } from 'mobx-react-lite';

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