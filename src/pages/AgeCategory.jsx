import '../stylings/temporary.css';

const AgeCategory = () => {
  return (
    <section className='temporary section-wrapper'>
      <div className='section-container-narrow'>
        <h2>Select the age groups</h2>
        <button className='CTA-button-two'>Senior</button>
        <button className='CTA-button-two'>Adult</button>
        <button className='CTA-button-two'>Child</button>
        <button className='CTA-button-one'>Add to cart</button>
      </div>
    </section>
  )
}

export default AgeCategory;