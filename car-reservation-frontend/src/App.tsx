import './App.css';
import MainPage from './components/main_page';
import ReservationList from './components/reservation_list';
import LoginPage from './components/login_page';
import SignUpPage from './components/sign_up_page';
import ReservationNavbar from './components/reservation_navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { observableUserStore } from './stores/user_store';
import { observableReservationStore } from './stores/reservation_store';
import { observableCarStore } from './stores/car_store'
import {MAIN_PAGE, SIGN_IN_PAGE, SIGN_UP_PAGE, RESERVATION_PAGE} from './constants/config';

function App() {
  return (
    <div className="fullscreen-container">
      <ReservationNavbar></ReservationNavbar>
      <BrowserRouter>
        <Routes>
          <Route path={MAIN_PAGE} element={<MainPage/>}></Route>
          <Route path={SIGN_IN_PAGE} element={<LoginPage userStore={observableUserStore} />}></Route>
          <Route path={SIGN_UP_PAGE} element={<SignUpPage userStore={observableUserStore} />}></Route>
          <Route path={RESERVATION_PAGE} element={<ReservationList userStore={observableUserStore} reservationStore={observableReservationStore} carStore={observableCarStore} />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
