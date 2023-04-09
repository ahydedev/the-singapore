const router = require('express').Router(); 
const path = require('path');

const { createTrans, updateTrans, 
        deleteTrans, checkLogin, myBookings, addBooking, cancelBooking
        } = require('../dbaccess/dbtrans')

const { checkKey } = require('../authcheck/accesscontrol');

router.post('/adduser', createTrans ); 

router.put('/updateuser/:id', checkKey, updateTrans ); 

router.delete('/deleteuser/:id', checkKey, deleteTrans );

router.post( '/login', checkLogin );

router.get('/mybookings/:userid', checkKey, myBookings );

router.post('/addbooking', checkKey, addBooking ); 

router.delete('/deletebooking/:id', checkKey, cancelBooking );

router.get( '/', ( req, res ) => {
        
        res.redirect('/notfound.html');

}  )
router.get( '*', ( req, res ) => {
        // res.status(404).sendFile( path.join( __dirname, '../public/notfound.html'))
        res.redirect('/notfound.html');

}  )
    
module.exports = router; 
