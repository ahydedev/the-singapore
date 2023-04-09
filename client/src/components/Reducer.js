const Reducer = ( state, action ) => {
    
    switch ( action.type ) {
        case 'CREATE':
            return {
                ...state,
                bookings: [ ...state.bookings, action.payload ]
            }
        case 'DELETE':
            let filteredBookings = []
            let allBookings = state.bookings.flat()
            for (const booking of allBookings) {
                if (booking._id !== action.payload) {
                    filteredBookings.push(booking)
                }
            }
            return {
                ...state, 
                bookings: [ filteredBookings ]
                // bookings: state.bookings.filter( booking => booking._id !== action.payload )
            }
        case 'UPDATE':
            return {
                ...state,
                bookings: [ action.payload ]
            }
        default:
            return state; 
    }
}

export default Reducer;
