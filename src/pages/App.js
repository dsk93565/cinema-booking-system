import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Routes, Route } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import SearchResults from './SearchResults';

library.add(fas, faSearch);

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='sign-up' element={<SignUp />} />
        <Route path='search-results' element={<SearchResults />} />
      </Routes>
    </>
  );
}

export default App;