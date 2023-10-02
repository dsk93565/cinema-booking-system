import { Link } from 'react-router-dom';
import HeroImage from '../images/hero-image.jpg';

const Hero = () => {
  return (
    <section className='section-wrapper'>
        <div className='section-container-top'>
            <div className='hero-info'>
                <h1>The new era of cinema</h1>
                <p>Reserve your tickets in a convenient and timely manner</p>
                <Link to='sign-up'><button className='CTA-button-one'>Get started</button></Link>
            </div>
            <img src={HeroImage} alt='Cartoons' className='hero-image' />
        </div>
    </section>
  )
}

export default Hero;