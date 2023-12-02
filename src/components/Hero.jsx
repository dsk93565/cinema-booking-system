import { Link } from 'react-router-dom';
import HeroImage from '../images/hero-image.jpg';
import axios from 'axios';

const userToken = localStorage.getItem('userToken');
console.log(userToken);

const getUsername = async(token) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/get-user`, {
      user_token: token
    });

    return(response.data);
    
  } catch (error) {
    console.log('Error occurred while retrieving user, code:', error.code);
    return("!! Error: User Not Found !!")
  }
}

console.log(getUsername(userToken))

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
                    <h1>Welcome back, {}!</h1>
                    <h3>Let us help you find your next thrilling theater experience!</h3>
                  </div>
                )}
            <img src={HeroImage} alt='Cartoons' className='hero-image' />
        </div>
    </section>
  )
}

export default Hero;