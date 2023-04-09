import { React, useEffect } from 'react'
import { Link } from 'react-router-dom';
import lobby from '../assets/ko-olina-ga4b5c6edd_1920-cropped-compressed.jpg';

const Hotel = () => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (

  <>    
    <div className="section-container-flip">
      <div className="section-img-container">
        <div className="img-flex">
          <img  className="section-container-flip-img" src={ lobby } alt="Hotel lobby" />
        </div>
      </div>
      <div className="section-container-content">
        <div className="section-container-content-inner">
          <div className="section-text-title">
            <h1>A luxury escape</h1>
          </div>
          <div className="para">
            <p>
              Located on the shore of Marina Bay and nestled within acres of landscaped gardens, The Singapore is a tropical sanctuary offering exceptional amenities, first-class culinary experiences and outstanding city views.    
            </p>
          </div>
          <div className="section-btns">
            <Link to="/welcome">
              <button className='section-btns-more'> See more </button>
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

export default Hotel;
