import { React, useState } from 'react';
import { createPortal } from 'react-dom';
import TrailerLoader from './TrailerLoader';
import ReactCardFlip from 'react-card-flip';
import MovieInfo from './MovieInfo';


const MovieCard = ({movie, origin}) => {
    const moviePosterImage = movie.poster_path;
        
    // Card Styling
    const cardStyle = {
        height: `${origin === "MoviesCard" ? 20 : 10}rem`,
        width: `${origin === "MoviesCard" ? 13 : 6.5}rem`,
        rowGap: `${origin === "MoviesCard" ? 1 : 0.1}rem`
    };

    // Poster Flip
    const [isFlipped, setIsFlipped] = useState(false);
    const handlePosterFlip = () => {
        setIsFlipped(!isFlipped);
    };

    // Movie Trailer
    const [showTrailer, setShowTrailer] = useState(false);
    
    // Movie Info Modal
    const [showInfo, setShowInfo] = useState(false);
    

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
                        <button className='CTA-button-one'>Book tickets</button>
                    </div>
                </ReactCardFlip>
            </div>
            

            {/* Movie Trailer Modal */}
            { showTrailer && createPortal(
                <TrailerLoader movie={movie}
                                onClose={() => setShowTrailer(false)}
                                onClick={(e) => e.stopPropagation()}
                                />, document.body
            )}

            {/* Info Modal */}
            { showInfo && createPortal(
                <MovieInfo movie={movie}
                                onClose={() => setShowInfo(false)}
                                onClick={(e) => e.stopPropagation()}
                                />, document.body
            )}
        </div>
    )
}

export default MovieCard;