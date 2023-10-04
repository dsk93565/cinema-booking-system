import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SearchBar = () => {
    
    // Search Bar Outline
    const [searchInput, setSearchInput] = useState(false);
    const handleInputFocus = () => {
        setSearchInput(true);
    };
    const handleInputBlur = () => {
        setSearchInput(false);
    };

    // Disable Search Button With Empty Search Input
    const [inputData, setinputData] = useState('');
    const handleinputData = (e) => {
        setinputData(e.target.value);
    };


    const handleSubmit = () => {
        // You can access the input data from the 'inputData' state variable.
        console.log('Submitted data:', inputData);
        // You can now perform further actions, such as sending the data to a server or processing it.
      };

    return (
        <form className={`search-bar ${searchInput ? 'is-active' : ''}`}>
          <input 
            type='text' placeholder='Search' onFocus={handleInputFocus} onBlur={handleInputBlur}
            onChange={(e) => handleinputData(e)} className='search-input'
          />
          <Link to='search-results' state='inputData'>
            <button type='submit' disabled={!inputData} className='search-icon-wrapper'>
              <FontAwesomeIcon icon='fa-solid fa-magnifying-glass fa-1x' className='search-icon' />
            </button>
          </Link>
        </form>
    )
}

export default SearchBar;