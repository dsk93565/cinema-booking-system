import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import '../stylings/booking.css';

const Seats = () => {
  const { shid } = useParams();
  const [seatData, setSeatData] = useState([]);

  useEffect(() => {
    const fetchSeatData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/get-seats`, {
          params: {
            shid: parseInt(shid, 10),
          },
        });
        console.log('API response:', response);
        console.log('API response data:', response.data);
        setSeatData(response.data.seats);
      } catch (error) {
        console.error('Error fetching seat data:', error);
      } // try catch
    };

    fetchSeatData();
  }, [shid]);

  return (
    <section className='booking section-wrapper'>
      <div className='section-container-top'>
        <h2>Select your seats</h2>
        <p>Selected Show ID: {shid}</p>
        {/* Your seats selection UI goes here */}
        <Link to='/book/age'>
          <button className='CTA-button-one'>Next</button>
        </Link>
      </div>
    </section>
  );
};

export default Seats;