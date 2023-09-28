import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Routes, Route } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Home from '../pages/Home';
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import SignUp from '../pages/SignUp';
import SearchResults from '../pages/SearchResults';

library.add(fas, faSearch);

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='forgot' element={<ForgotPassword />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='results' element={<SearchResults />} />
      </Routes>
    </>
  );
}

export default App;