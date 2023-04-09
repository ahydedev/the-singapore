import { React, useEffect } from 'react';
import { Link } from 'react-router-dom';
import room from "../assets/bed-g1bef141f6_1920-cropped-compressed.jpg";


const Rooms = () => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (

    <>
      <div className="section-container-flip">
        <div className="section-img-container">
            <img id="room-img"  className="section-container-flip-img" src={ room } alt="Hotel room" />
        </div>
        <div className="section-container-content">
          <div className="section-container-content-inner">
            <div className="section-text-title">
              <h1>Downtime</h1>
            </div>
            <div className="para">
              <p>
                The hotel offers 495 luxurious rooms with individual design and distinctive detail. Accommodations offer comfort, space and restful privacy, making The Singapore the perfect space for business and leisure travellers looking for a retreat from the bustling city.
              </p>
            </div>
            <div className="section-btns">
              <Link to="/bookings">
                <button className='section-btns-more'>Book a room</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="overlay">
      </div>
    </>
  )
}

export default Rooms
