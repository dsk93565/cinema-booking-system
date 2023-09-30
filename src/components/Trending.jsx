import { Link } from 'react-router-dom';

const Trending = () => {
  return (
    <section className='section-wrapper'>
      <div className='section-container'>
        <div className='movies-card'>
          <h2>Trending</h2>
          <div className='movies'>
            <div className='movie'>
              <div className='movie-image-placeholder'></div> {/* For testing purposes */}
              <h3 className='movie-title'>Movie one</h3>
              <div className='movie-info'>2 HR 15 MIN • PG</div>
            </div>
            <div className='movie'>
              <div className='movie-image-placeholder'></div> {/* For testing purposes */}
              <h3 className='movie-title'>Movie two</h3>
              <div className='movie-info'>1 HR 54 MIN • PG13</div>
            </div>
            <div className='movie'>
              <div className='movie-image-placeholder'></div> {/* For testing purposes */}
              <h3 className='movie-title'>Movie three</h3>
              <div className='movie-info'>3 HR • Rated R</div>
            </div>
            <div className='movie'>
              <div className='movie-image-placeholder'></div> {/* For testing purposes */}
              <h3 className='movie-title'>Movie four</h3>
              <div className='movie-info'>2 HR 7 MIN • PG13</div>
            </div>
            <div className='movie'>
              <div className='movie-image-placeholder'></div> {/* For testing purposes */}
              <h3 className='movie-title'>Movie five</h3>
              <div className='movie-info'>1 HR 49 MIN • Rated R</div>
            </div>
          </div>
          <Link to='trending'><button className='CTA-button-one'>View all</button></Link>
        </div>
      </div>
    </section>
  )
}

export default Trending;