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
import Showtimes from './Showtimes';
import Seats from './Seats';
import AgeCategory from './AgeCategory';
import Cart from './Cart';
import Checkout from './Checkout';
import CheckoutConfirmation from './CheckoutConfirmation';
import AdminView from './AdminView';
import ManageMovies from './ManageMovies';
import ManagePromotions from './ManagePromotions';
import ManageUsers from './ManageUsers';

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
          <Route path='' element={<Showtimes />} />
          <Route path='seats/:shid' element={<Seats />} />
          <Route path='age' element={<AgeCategory />} />
        </Route>
        <Route path='/cart'>
          <Route path='' element={<Cart />} />
          <Route path='checkout' element={<Checkout />} />
          <Route path='confirmation' element={<CheckoutConfirmation />} />
        </Route>
        <Route path='/admin'>
          <Route path='' element={<AdminView />} />
          <Route path='manage-movies' element={<ManageMovies />} />
          <Route path='manage-promotions' element={<ManagePromotions />} />
          <Route path='manage-users' element={<ManageUsers />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;