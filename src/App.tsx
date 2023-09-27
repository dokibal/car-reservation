import './App.css';
import ReservationList from './components/reservation_list';
import LoginPage from './components/login_page';
import SignUpPage from './components/sign_up_page';
import ReservationNavbar from './components/reservation_navbar';
import UserInfoPage from './components/user_info_page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { observableUserStore } from './stores/user_store';
import { observableReservationStore } from './stores/reservation_store';
import { observableCarStore } from './stores/car_store'
import { observableCommonStore } from './stores/common_store'
import { MAIN_PAGE, SIGN_IN_PAGE, SIGN_UP_PAGE, RESERVATION_PAGE, CAR_PAGE, USER_PAGE } from './constants/config';
import CarList from './components/car_list';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    observableUserStore.loadUser();
  });

  return (
    <div className="fullscreen-container">
      <ReservationNavbar userStore={observableUserStore}></ReservationNavbar>
      <BrowserRouter>
        <Routes>
          <Route path={MAIN_PAGE} element={<ReservationList commonStore={observableCommonStore} userStore={observableUserStore} reservationStore={observableReservationStore} carStore={observableCarStore} />}></Route>
          <Route path={SIGN_IN_PAGE + "/:carId"} element={<LoginPage commonStore={observableCommonStore} userStore={observableUserStore} />}></Route>
          <Route path={SIGN_UP_PAGE} element={<SignUpPage commonStore={observableCommonStore} userStore={observableUserStore} />}></Route>
          <Route path={RESERVATION_PAGE + "/:carId"} element={<ReservationList commonStore={observableCommonStore} userStore={observableUserStore} reservationStore={observableReservationStore} carStore={observableCarStore} />}></Route>
          <Route path={CAR_PAGE} element={<CarList commonStore={observableCommonStore} userStore={observableUserStore} carStore={observableCarStore} />}></Route>
          <Route path={USER_PAGE} element={<UserInfoPage userStore={observableUserStore} />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
