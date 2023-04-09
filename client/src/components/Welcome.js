import { React, useEffect } from 'react'
import reception from "../assets/pexels-pixabay-262047-cropped-compressed.jpg";
import { Link } from 'react-router-dom'

const Welcome = () => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (

  <>    
    <div className="section-container-flip">
      <div className="section-img-container">
        <div className="img-flex">        
          <img  className="section-container-flip-img" src={ reception } alt="Hotel reception" />
        </div>
      </div>
      <div className="section-container-content">
        <div className="section-container-content-inner">
          <div className="section-text-title">
            <h1>Service and style</h1>
          </div>
          <div className="para">
            <p>
              The Singapore is an expression of outstanding hospitality - a place where guests are warmly embraced with smiles and impeccable service.  
            </p>
            <p>
              The hotel has an atmosphere of space, calm and wellbeing, boasting beautiful contemporary design and a host of elegant spaces and amenities where guests can relax and unwind during their stay. 
            </p>
          </div>
          <div className="section-btns">
            <Link to="/rooms">
              <button className='section-btns-more'>Accommodation</button>
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

export default Welcome;
