import React,  { useContext } from 'react';
import { Redirect } from 'react-router-dom'
import { UserContext } from './UserProvider';


const Home = () => {

  const { info } = useContext( UserContext );   
  const { email } = info; 
  console.log(email)

  return (
    <>

    { email !== null ? <Redirect to='/bookings' /> : null }

        <div className="home-container">
           <div className="welcome-text-container">
             <h2 className="welcome-text">
              <span className="text">FIVE </span>
              <span className="text">STAR </span>
              <span className="text">LUXURY </span>
              <span className="text">HOTEL </span>
              <span className="text">IN </span>
              <span className="text">THE </span>
              <span className="text">HEART </span>
              <span className="text">OF </span>
              <span className="text">THE </span>
              <span className="text">LION </span>
              <span className="text">CITY </span>
             </h2>
           </div>
           <div className="logo-container transition">
             <h2 className="logo-text flash">THE SINGAPORE</h2>
             <button className="demo-text">This is a demo web app</button>
           </div>
       </div>
        
    </>
  )
}

export default Home;
