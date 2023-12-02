import { Link } from 'react-router-dom';
import HeroImage from '../images/hero-image.jpg';

const userToken = localStorage.getItem('userToken');

const Hero = () => {
  return (
    <section className='section-wrapper'>
        <div className='section-container-top'>
                {/** If user is not logged in, show this */}
                {!userToken && (
                  <div className='hero-info'>
                    <h1>The new era of cinema</h1>
                    <p>Reserve your tickets in a convenient and timely manner</p>
                    <Link to='sign-up'><button className='CTA-button-one'>Get started</button></Link>
                  </div>
                )}
                {/** If user is logged in, show this */}
                {userToken && (
                  <div className='hero-info'>
                    <h1>Welcome back, {"username"}!</h1>
                    <h3>Let us help you find your next thrilling theater experience!</h3>
                  </div>
                )}
            <img src={HeroImage} alt='Cartoons' className='hero-image' />
        </div>
    </section>
  )
}

export default Hero;