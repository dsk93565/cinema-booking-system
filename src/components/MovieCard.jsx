import { useState } from 'react';
import ReactCardFlip from 'react-card-flip';

const MovieCard = ({movie}) => {
    const moviePosterImage = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
    const [isFlipped, setIsFlipped] = useState(false);
    const handlePosterFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className='movie-card'>
            <div className='movie-poster-container'>
                <ReactCardFlip isFlipped={isFlipped} flipDirection='horizontal'>
                    <div>
                        <img src={moviePosterImage} alt={movie.title} onClick={handlePosterFlip}className='movie-poster' />
                    </div>

                    <div className='movie-poster-back'>
                        <img src={moviePosterImage} alt={movie.title} onClick={handlePosterFlip} className='movie-poster' />
                        <button className='CTA-button-one'>Watch trailer</button>
                        <button className='CTA-button-one'>Movie info</button>
                        <button className='CTA-button-one'>Book tickets</button>
                    </div>
                </ReactCardFlip>
            </div>
            <h3 onClick={handlePosterFlip} className='movie-title'>{movie.title}</h3>
            <div className='movie-brief-info'>2 HR 7 MIN • PG13</div>
        </div>
    )
}

export default MovieCard;