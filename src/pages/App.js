import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faSearch, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Routes, Route } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Home from './Home';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import ChangePassword from './ChangePassword';
import SignUp from './SignUp';
import UserProfile from './UserProfile';
import SearchResults from './SearchResults';
import TemporaryShowtimes from './TemporaryShowtimes';
import TemporarySeats from './TemporarySeats';
import TemporaryAgeCategory from './TemporaryAgeCategory';
import Cart from './Cart';
import TemporaryCheckout from './TemporaryCheckout';
import TemporaryCheckoutConfirmation from './TemporaryCheckoutConfirmation';
import TemporaryAdminView from './TemporaryAdminView';
import ManageMovies from './ManageMovies';
import TemporaryManagePromotions from './TemporaryManagePromotions';
import TemporaryManageUsers from './TemporaryManageUsers';

library.add(fas, faSearch, faEye, faEyeSlash);

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login'>
          <Route path='' element={<Login />} />
          <Route path='forgot' element={<ForgotPassword />} />
        </Route>
        <Route path='/change-password/:identifier/:token' element={<ChangePassword />} />
        <Route path='/sign-up'>
          <Route path='' element={<SignUp />} />
          <Route path=':verifyStep' element={<SignUp />} />
        </Route>
        <Route path='/profile' element={<UserProfile />} />
        <Route path='/search-results' element={<SearchResults />} />
        <Route path='/book'>
          <Route path='' element={<TemporaryShowtimes />} />
          <Route path='seats' element={<TemporarySeats />} />
          <Route path='age' element={<TemporaryAgeCategory />} />
        </Route>
        <Route path='/cart'>
          <Route path='' element={<Cart />} />
          <Route path='checkout' element={<TemporaryCheckout />} />
          <Route path='confirmation' element={<TemporaryCheckoutConfirmation />} />
        </Route>
        <Route path='/admin'>
          <Route path='' element={<TemporaryAdminView />} />
          <Route path='manage-movies' element={<ManageMovies />} />
          <Route path='manage-promotions' element={<TemporaryManagePromotions />} />
          <Route path='manage-users' element={<TemporaryManageUsers />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;