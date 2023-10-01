import '../stylings/temporary.css';

const TemporaryManageMovies = () => {
  return (
    <section className='temporary section-wrapper'>
        <div className='section-container-narrow'>
            <h2>Manage movies</h2>
            <p>No movies</p>
            <button className='CTA-button-one'>Add movie</button>
            <button className='CTA-button-one'>Remove movie</button>
            <button className='CTA-button-one'>Schedule movie</button>
        </div>
    </section>
  )
}

export default TemporaryManageMovies;