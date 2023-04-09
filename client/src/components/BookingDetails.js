import React, { useContext } from 'react';
import { BookingContext } from './BookingProvider';
import moment from 'moment'
import keys from './keys';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  { reactLocalStorage } from 'reactjs-localstorage';

const { WEB_BASE_URL, API_DELETE_BOOKING } = keys; 

toast.configure(); 

const BookingDetails = ( { booking } ) => {

  let arrDate = moment.utc(booking.datefrom).format('MM/DD/YYYY'); 
  let depDate = moment.utc(booking.dateto).format('MM/DD/YYYY'); 

  const { cancelBooking } = useContext( BookingContext );
  
  const onCancel = ( bkid ) => {

    const pskey = reactLocalStorage.get('UserInfoKey')
    const psjwt = pskey;

    let config = {
      headers: {
        authorization: 'Bearer ' + psjwt 
      }
    }
    
    const CANCEL_BOOKING_URL = `${ WEB_BASE_URL }${API_DELETE_BOOKING}${bkid}`

    axios.delete( CANCEL_BOOKING_URL, config )

    .then( response => {

      console.log("Booking deleted")

      const { success } = response.data;
      
      if ( success === true ) {
        toast.success( 'Booking deleted', {
                position: 'bottom-right',
                duration: 1000
        });
      }

      cancelBooking( bkid )

    })
    .catch ( err => {
      console.log( 'Delete booking failed >', err.message );
      toast.warning(`Delete booking failed: ${ err.message }. Please logout / login again.`, {
        position: 'bottom-right',
        duration: 1000,
      });
    })
    
  }

  return (
    <>
    <div className="booking-row">
      <div className="inline-sm">
        <span className="booking-data block-sm"><b>{ booking.roomtype }</b></span>
        <span className="booking-data block-sm">{ arrDate } to { depDate }</span>
        <span className="booking-data space-right">{ booking.norooms } { booking.norooms > 1 ? "rooms" : "room" }</span>
        <br className="booking-data-line-br" />
        <span className="booking-data">{ booking.nopersons } { booking.nopersons > 1 ? "guests" : "guest" }</span>
        <span className="booking-data block-md block-sm minimize-sm">Ref: &nbsp; { booking._id }</span>
      </div>
      <button className="cancel-btn" onClick={ () => onCancel( booking._id ) }>Cancel</button>
    </div>
    </>
  )
}

export default BookingDetails;
