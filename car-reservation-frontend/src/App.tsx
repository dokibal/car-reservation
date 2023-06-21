import './App.css';
import ReservationList from './components/reservation_list';
import LoginPage from './components/login_page';
import SignUpPage from './components/sign_up_page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {observableCarStore} from './stores/car_store'
import { observableUserStore } from './stores/user_store';

function App() {
  return (
    <div className="fullscreen-container">
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<LoginPage userStore={observableUserStore}/>}></Route>
          <Route path = "/signup" element = {<SignUpPage userStore={observableUserStore}/>}></Route>
          <Route path = "/reservations" element = {<ReservationList carStore={observableCarStore}/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
