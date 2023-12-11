import { React, useState } from 'react';
import { createPortal } from 'react-dom';
import TrailerLoader from './TrailerLoader';
import ReactCardFlip from 'react-card-flip';
import MovieInfo from './MovieInfo';
import { useDataContext } from '../DataContext';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie, origin, isFlipped, onFlip }) => {
    
    const moviePosterImage = movie.poster_path;
    const cardStyle = {
        height: `${origin === "MoviesCard" ? 20 : 10}rem`,
        width: `${origin === "MoviesCard" ? 13 : 6.5}rem`,
        rowGap: `${origin === "MoviesCard" ? 1 : 0.1}rem`
    };

    const handlePosterFlip = () => {
        onFlip(movie.mid); // Use the passed function to handle flip
    };

    const [showTrailer, setShowTrailer] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const { setSharedData } = useDataContext();
    const navigate = useNavigate();

    function sendToBook() {
        setSharedData(movie);
        navigate('/book');
    }

    return (
        <div className='movie-card'>
            <div className='movie-poster-container' style={cardStyle}>
                <ReactCardFlip isFlipped={isFlipped} flipDirection='horizontal'>
                    <div>
                        <img style={cardStyle} onClick={handlePosterFlip} src={moviePosterImage} alt={movie.title} className='movie-poster' />
                    </div>

                    <div className='movie-poster-back' style={cardStyle}>
                        <img onClick={handlePosterFlip} style={cardStyle} src={moviePosterImage} alt={movie.title} className='movie-poster' />
                        <button onClick={() => setShowTrailer(true)} className='CTA-button-one'>Watch trailer</button>
                        <button onClick={() => setShowInfo(true)} className='CTA-button-one'>Movie info</button>
                        <button onClick={() => sendToBook()} className='CTA-button-one'>Book tickets</button>
                    </div>
                </ReactCardFlip>
            </div>

            {showTrailer && createPortal(
                <TrailerLoader movie={movie} onClose={() => setShowTrailer(false)} onClick={(e) => e.stopPropagation()} />, document.body
            )}

            {showInfo && createPortal(
                <MovieInfo movie={movie} onClose={() => setShowInfo(false)} onClick={(e) => e.stopPropagation()} />, document.body
            )}
        </div>
    );
}

export default MovieCard;
