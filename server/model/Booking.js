const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const bookingScheme = new Schema ( {

    datefrom : {
        type: Date,
        required: [ true, 'Arrival date is required']
    },
    dateto: {
        type: Date,
        required: [ true, 'Departure date is required']
    },
    roomtype: {
        type: String,
        required: [ true, 'Room type is required']
    },
    norooms: {
        type: Number,
        min: 1,
        max: 100,
        required: [true, 'Please enter number of rooms']
    },
    nopersons: {
        type: Number,
        min: 1,
        max: 100,
        required: [true, 'Please enter number of guests']
    },
    user : {
        type: String,
        required: [ true, 'User ID is required']
    }
} ); 

module.exports = mongoose.model('Booking', bookingScheme );