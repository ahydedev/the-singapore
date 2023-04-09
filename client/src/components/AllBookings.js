import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from './UserProvider'
import ListAllBookings from './ListAllBookings';

const AllBookings = () => {

    const { info  } = useContext( UserContext );
    const { email } = info; 

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (

        <div id="all-bookings-page" className="page-container">

            { email === null ? <Redirect to='/login' /> : null }

            <div id="all-bookings-container" className="section-container-content-inner">
            
                <div className="fade-in-first">
                    <h1 id="all-book-title">All bookings</h1>
                </div>       
                <div className="bookings-text fade-in-first">
                    <ListAllBookings />
                </div>  
            </div>
        </div>

        )
    }

export default AllBookings;