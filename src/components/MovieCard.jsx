const MovieCard = ({movie}) => {
    const IMAGE_PATH ='https://image.tmdb.org/t/p/w500';

    return (
        <div className='movie-card'>
            <img className='movie-poster' src={IMAGE_PATH + movie.poster_path} alt={movie.title} />
            <h3 className='movie-title'>{movie.title}</h3>
            <div className='movie-brief-info'>2 HR 7 MIN • PG13</div>
        </div>
    )
}

export default MovieCard;