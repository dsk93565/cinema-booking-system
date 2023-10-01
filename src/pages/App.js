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
import SearchResults from './SearchResults';

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
        </Route>
        <Route path='search-results' element={<SearchResults />} />
      </Routes>
    </>
  );
}

export default App;