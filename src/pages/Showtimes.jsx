import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDataContext } from '../DataContext';
import axios from 'axios';
import '../stylings/booking.css';

const Showtimes = () => {
  const navigate = useNavigate();
  const { data } = useDataContext();
  const movie = data;
  const [shows, setShows] = useState([]);
  const [selectedShid, setSelectedShid] = useState(null);

  useEffect(() => {
    const fetchShowings = async (mid) => {
      await axios
        .post('http://localhost:8000/api/get-shows', {
          mid: mid,
        })
        .then(function (response) {
          if (response.status === 403) console.log('Not Authorized');
          setShows(response.data.showings);
        })
        .catch(function (error) {
          console.log('Error getting shows: ', error.message);
        });
    };

    fetchShowings(movie.mid);
  }, [data]);

  const handleNextClick = () => {
    if (selectedShid) {
      navigate(`/book/seats/${selectedShid}`);
    } else {
      console.error('Please select a show before proceeding.');
    }
  };

  return (
    <section className='booking section-wrapper'>
      <div className='section-container-narrow'>
        <h2>Select the date and time</h2>
        {shows[0] && (
          <>
            <select
              className='user-info-input'
              onChange={(e) => setSelectedShid(e.target.value)}
            >
              {shows.map((show) => (
                <option key={show.shid} value={show.shid} className='show-listing'>
                  {show.show_date} |
                  Room: {show.room_id} |
                  Period: {show.period_id}
                </option>
              ))}
            </select>
          </>
        )}
        {!shows[0] && <p>No dates available</p>}
        <button className='CTA-button-one' onClick={handleNextClick}>
          Next
        </button>
      </div>
    </section>
  );
};

export default Showtimes;