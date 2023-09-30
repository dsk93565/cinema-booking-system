const PromoSubscription = () => {
  return (
    <section className='promo-subscription section-wrapper'>
        <div className='section-container'>
          <h2>Want to receive promotional codes and weekly newsletters?</h2>
          <form>
            <input type='email' className='user-info-input' />
            <button className='CTA-button-one'>Subscribe</button>
          </form>
        </div>
    </section>
  )
}

export default PromoSubscription;