import React, { useContext, useEffect } from 'react';
import { BookingContext } from './BookingProvider';
import BookingDetails from './BookingDetails';
import axios from 'axios';
import keys from './keys';
import { UserContext } from './UserProvider'
import { Link } from 'react-router-dom';
import  { reactLocalStorage } from 'reactjs-localstorage';

const ListBookings = () => {

    let { bookings, upcomingBookings, updateBookings } = useContext( BookingContext );
  
    const { WEB_BASE_URL, API_GET_BOOKINGS } = keys; 
    const GET_BOOKINGS_URL = WEB_BASE_URL + API_GET_BOOKINGS;
    const { info } = useContext( UserContext ); 
    const { userid } = info; 

    const getBookings = async () => {

      const pskey = reactLocalStorage.get('UserInfoKey')
      const psjwt = pskey; 
          
      let config = {
        headers: {
          authorization: 'Bearer ' + psjwt 
        }
      }
      
      try {
      
          const result = await axios.get( `${GET_BOOKINGS_URL}/${userid}`, config )
          const userBookings = result.data.data.bookings
          setTimeout( () => {
            updateBookings( userBookings )
          }, 1500);

       } catch (error) {
         console.log('Error in get data request', error.message);
       }   

    }

    useEffect( () => {  
         getBookings();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log(upcomingBookings)

    return (

      <div id="booking-list" className="form form-inline">

        { upcomingBookings.length > 0 ? ( 
        
          <ul>
            { upcomingBookings.map( booking => 
               <li key={booking._id}>
                <BookingDetails booking={ booking } />
               </li>
            ) }
          </ul>
        
        ) : (

          <p className="no-bookings">There are no bookings to display.</p>
        
        )}

        { bookings.length > 3 ? ( 
        
          <Link className="view-all" to="/all-bookings">
          <p>Show all bookings</p> 
          </Link>
          
        ) : null }

      </div>
      
  )
}

export default ListBookings;
