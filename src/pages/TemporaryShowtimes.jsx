import { Link } from 'react-router-dom';
import '../stylings/temporary.css';
import { useDataContext } from '../DataContext';
import { useEffect, useState } from 'react';
import axios from 'axios';

const TemporaryShowtimes = () => {
  const { data } = useDataContext();
  const movie = data;
  const [shows, setShows] = useState([]);
  //console.log(data);

  useEffect(() => {
    const fetchShowings = async(mid) => {
        await axios.post('http://localhost:8000/api/get-shows', {
            mid: mid
        }).then(function (response) {
            if (response.status === 403)
                console.log("Not Authorized");
            setShows(response.data.showings);
        }).catch(function(error) {
            console.log("Error getting shows: ", error.message);
        });
    }

    fetchShowings(movie.mid);
  }, [data])

  return (
    <section className='temporary section-wrapper'>
        <div className='section-container-narrow'>
            <h2>Select the date and time</h2>
            {shows[0] && 
              (<select className='user-info-input'>{
                shows.map(show => (
                  <option key={show.shid} value={show.shid} className='show-listing'>
                      Date: {show.show_date}
                      Room: {show.room_id}
                      Period: {show.period_id}       
                  </option>
              ))}</select>)}
            {!shows[0] && <p>No dates available</p>}
            <Link to='../seats'><button className='CTA-button-one'>Next</button></Link>
        </div>
    </section>
  )  
}

export default TemporaryShowtimes;