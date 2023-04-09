import React, { createContext, useReducer } from 'react';
import Reducer from './Reducer';
import moment from 'moment'

let initialBookings = {
    bookings: []
}

let today = new Date();
let yesterday = new Date(today.setDate(today.getDate() - 1))

export const BookingContext = createContext( initialBookings );

export const BookingProvider = ( { children } ) => {

    const [ state, dispatch ] = useReducer( Reducer, initialBookings );
    
    function makeBooking( booking ) {
        dispatch( {
            type: 'CREATE',
            payload: booking
        })
    }
    
    function cancelBooking( id ) {
        dispatch( {
            type: 'DELETE',
            payload: id
        })
    }

    function updateBookings( newBookings ) {
        dispatch( {
            type: 'UPDATE',
            payload: newBookings
        })
    }

    return (
        <BookingContext.Provider value={{ 
            
            bookings: state.bookings
                .flat()
                .sort( (a,b) => { return a.datefrom > b.datefrom ? 1 : a.datefrom < b.datefrom ? -1 : 0 } ), 
            upcomingBookings: state.bookings
                .flat()
                .sort( (a,b) => { return a.datefrom > b.datefrom ? 1 : a.datefrom < b.datefrom ? -1 : 0 } )
                .filter( booking => moment(booking.datefrom).isAfter(yesterday) )
                .slice(0, 3), 
            makeBooking, 
            cancelBooking, 
            updateBookings 
            
            }}>
            
            { children }
            
        </BookingContext.Provider>
    )
}
