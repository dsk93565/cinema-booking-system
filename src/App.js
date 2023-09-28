import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Navigation from './components/Navigation';

library.add(fas, faSearch);

function App() {
  return (
    <>
      <Navigation />
    </>
  );
}

export default App;