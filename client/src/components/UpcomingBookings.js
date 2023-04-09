import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from './UserProvider'
import InputBooking from './InputBooking';
import ListBookings from './ListUpcomingBookings';

const Bookings = () => {

    // Disable background overlay in Safari
    let userAgentString = navigator.userAgent;
    let chromeAgent = userAgentString.indexOf("Chrome") > -1;
    let safariAgent = userAgentString.indexOf("Safari") > -1;
    if ((chromeAgent) && (safariAgent)) safariAgent = false;

    const { info  } = useContext( UserContext );
    const { email } = info; 

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (

        <div className={`page-container bookings ${safariAgent === true ? 'no-overlay' : null} `}>
             
            { email === null ? <Redirect to='/login' /> : null }

            <div id="bookings-container" className="section-container-content-inner">
            
                <div className="fade-in-first">
                    <h1 id="book-title">Book a stay</h1>
                </div>
                <div className="bookings-text show-overflow fade-in-first">
                    <InputBooking />
                </div>
                <div className="fade-in-second">
                    <h1 id="upcoming">Upcoming Stays</h1>
                </div>         
                <div className="bookings-text fade-in-second">
                    <ListBookings />
                </div>  
            </div>
        </div>

        )
    }

export default Bookings;