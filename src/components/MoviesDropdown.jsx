import axios from "axios";
import { useEffect, useState } from "react";
import Select from 'react-select';
import AsyncSelect from 'react-select/async';

export default function MoviesDropdown ({movies}) {

    const [moviesList, setMoviesList] = useState([]);
    
    // Select Styling
    const selectStyling = {
        control: (provided, state) => ({
        ...provided,
        backgroundColor: '#D7CDEB',
        border: 'none',
        borderRadius: '2rem',
        boxShadow: 'none',
        outline: state.isFocused ? '#7D41E1 0.125rem solid' : 'transparent 0.125rem solid',
        fontSize: '1rem',
        fontWeight: '400',
        width: '100%',
        padding: '1rem 1.125rem',
        transition: 'outline 0.2s ease-in-out',
        }),
        input: (provided) => ({
        ...provided,
        margin: '0',
        padding: '0',
        }),
        singleValue: (provided) => ({
        ...provided,
        color: '#0F1419',
        }),
        valueContainer: (provided) => ({
        ...provided,
        padding: '0',
        overflowY: "scroll",
        }),
        placeholder: (provided) => ({
        ...provided,
        color: '#7D7387',
        }),
        dropdownIndicator: (provided) => ({
        ...provided,
        color: '#7D7387',
        padding: '0',
        ':hover': {
            color: '#7D7387',
        }
        }),
        indicatorSeparator: (provided) => ({
        ...provided,
        display: 'none',
        }),
        indicatorsContainer: (provided) => ({
        ...provided,
        margin: '0',
        padding: '0',
        }),
        option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? '#FFFFFF' : '#0F1419',
        backgroundColor: state.isSelected ? '#7D41E1' : '',
        '&:hover': {
            ...provided,
            backgroundColor: state.isSelected ? '#7D41E1' : '#D7CDEB',
        },
        }),
    };

    /* const dispatchMovie = (movie) => {
        const event = new CustomEvent("movie_selected", { detail: movie});
        window.dispatchEvent(event);
    } */

    const selectMoviesList = () => {
        const playingMovies = movies.filter(movie => (movie.state_id === "2"));
        const list = playingMovies.map(movie => (movie.title));
        console.log(list);
        setMoviesList(playingMovies);
    }

    useEffect(() => {
        selectMoviesList();
    }, [])

    return (
        <div>
            <div>
                <Select
                    placeholder='Select Movie'
                    styles={selectStyling}
                    options={moviesList}                    
                />
            </div>
        </div>
    )
}