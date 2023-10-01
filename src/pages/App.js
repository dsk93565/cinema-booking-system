import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faSearch, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Routes, Route } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Home from './Home';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import SignUp from './SignUp';
import SignUpShippingAddress from './SignUpShippingAddress';
import SignUpPaymentInfo from './SignUpPaymentInfo';
import SignUpVerification from './SignUpVerification';
import SignUpConfirmation from './SignUpConfirmation';
import TemporaryUserProfile from './TemporaryUserProfile';
import SearchResults from './SearchResults';
import TemporaryBookTicket from './TemporaryBookTicket';
import TemporaryShowtimes from './TemporaryShowtimes';
import TemporarySeats from './TemporarySeats';
import TemporaryAgeCategory from './TemporaryAgeCategory';
import TemporaryOrderSummary from './TemporaryOrderSummary';
import TemporaryCheckout from './TemporaryCheckout';
import TemporaryCheckoutConfirmation from './TemporaryCheckoutConfirmation';
import TemporaryAdminView from './TemporaryAdminView';
import TemporaryManageMovies from './TemporaryManageMovies';
import TemporaryManagePromotions from './TemporaryManagePromotions';
import TemporaryManageUsers from './TemporaryManageUsers';

library.add(fas, faSearch, faEye, faEyeSlash);

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='login'>
          <Route path='' element={<Login />} />
          <Route path='forgot' element={<ForgotPassword />} />
        </Route>
        <Route path='sign-up'>
          <Route path='' element={<SignUp />} />
          <Route path='shipping-address' element={<SignUpShippingAddress />} />
          <Route path='payment-info' element={<SignUpPaymentInfo />} />
          <Route path='verification' element={<SignUpVerification />} />
          <Route path='confirmation' element={<SignUpConfirmation />} />
        </Route>
        <Route path='profile' element={<TemporaryUserProfile />} />
        <Route path='search-results' element={<SearchResults />} />
        <Route path='book'>
          <Route path='' element={<TemporaryBookTicket />} />
          <Route path='showtimes' element={<TemporaryShowtimes />} />
          <Route path='seats' element={<TemporarySeats />} />
          <Route path='age' element={<TemporaryAgeCategory />} />
        </Route>
        <Route path='order'>
          <Route path='' element={<TemporaryOrderSummary />} />
          <Route path='checkout' element={<TemporaryCheckout />} />
          <Route path='confirmation' element={<TemporaryCheckoutConfirmation />} />
        </Route>
        <Route path='admin'>
          <Route path='' element={<TemporaryAdminView />} />
          <Route path='manage-movies' element={<TemporaryManageMovies />} />
          <Route path='manage-promotions' element={<TemporaryManagePromotions />} />
          <Route path='manage-users' element={<TemporaryManageUsers />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;