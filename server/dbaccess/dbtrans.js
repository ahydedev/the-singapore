const userSchema = require( '../model/User');
const bookingSchema = require( '../model/Booking');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_TOKEN = process.env.SECRET_TOKEN;

exports.createTrans =  async ( req, res) => {

    try {

        const checkExist = await userSchema.findOne( {email: req.body.email} )

        if ( checkExist ) {
            return res.status(201).json({ 
                success:false,
                error: `Error: email ${ req.body.email}  has already been used `
            } )
        }
        
        const hashPassword = await bcrypt.hash( req.body.password, 10);

        const newUser = new userSchema(
            {
                name: req.body.name,
                email: req.body.email,
                // password: req.body.password,
                password: hashPassword
            }
        );
        
        const user = await newUser.save();

        const token = createToken( user._id);

        // res.cookie( 'myjwt', token, {
        //     maxAge: 24 * 60 * 60 * 1000,
        //     httpOnly: true 
        // });

        res.status(201).json( {
            success: true, 
            data : {
                    _id: user._id,
                    email: user.email,
                    name: user.name },
            token:  token 
        });

        
    } catch (error) {
        
        console.log('DB save error. please check inputs.', error);
        return res.status(500).json( {
            success: false,
            error: error.message
        })
    }
} 


exports.getTrans = async (req, res) => {

    try {
        const result = await userSchema.find();

        return res.status(201).json( {
            success: true,
            data: result
        })

    } catch (error) {
        console.log('DB find error');
        return res.status(500).json( {
            success: false, 
            error: 'DB find error'
        })
    }

}

exports.updateTrans = async ( req, res ) => {

    console.log('Check params id is ', req.params.id );

    try {
        
        const result = await userSchema.findById( req.params.id );
        result.name = req.body.name;
        result.email = req.body.email;
        result.password = result.password;

        console.log(result);

        const user = await result.save(); 

        res.status(201).json( {
            success: true, 
            data : {
                    _id: user._id,
                    email: user.email,
                    name: user.name }
        });
        
    } catch (error) {
        
        console.log('DB update error'); 
        return res.status(500).json( {
            success: false,
            error: error.message
        })

    }


}

exports.getTransById = async ( req, res ) => {

    try {
        const user = await userSchema.findById( req.params.id);

        res.status(201).json( {
            success: true, 
            data : {
                    _id: user._id,
                    email: user.email,
                    name: user.name }
        });

    } catch (error) {
        console.log('Find by id error');
        return res.status(400).json( {
            success: false,
            error: error.message
        })
    }

}

exports.deleteTrans = async (req, res) => {

    try {
        
        const result = await userSchema.findByIdAndDelete(req.params.id); 

        console.log('Record deleted');
        
        return res.status(201).json( {
            success: true,
            data: result 
        })
      

    } catch (error) {
        console.log('Error in DB record deletion');
        return res.status(401).json({
            success: false,
            error: error.message 
        })
    }
}

// 3 day * 24 hr * 60 min * 60 sec * 1000 msec 
const maxAge = 3 * 24 * 60 * 60 * 1000; 

const createToken = ( id ) => {

    return jwt.sign( {id}, SECRET_TOKEN, {
        expiresIn: maxAge 
    })

}

exports.checkLogin = async ( req, res ) => {

    try {
        const user = await userSchema.findOne({email: req.body.email})
        
        if ( !user ) {
            return res.status(400).json( {
                success: false,
                error: `Error: email ${req.body.email} is not found`
            })
        }

        console.log('At login user > ', user);
     
        const match = await bcrypt.compare(req.body.password, user.password  );

        if (match) {

            const token = createToken( user._id );

            // res.cookie( 'myjwt', token, {
            //     maxAge: maxAge * 1000,
            //     httpOnly: true 
            // });

            console.log('At login match token ', token);

            res.status(201).json( {
                success: true, 
                data : {
                        _id: user._id,
                        email: user.email,
                        name: user.name },
                token: token 
            });

        } else {
            return res.status(401).json( {
                success: false,
                error: 'Incorrect email or password'
            })
        }

    } catch (error) {
        res.status(500).json( {
            success: false,
            error: error.message
        })
    }

}

exports.checkUser = ( req, res, next ) => {

    const token = req.cookies.myjwt; 
    
    if ( token ) {

        jwt.verify(token, SECRET_TOKEN, async (err, decodedToken) => {

            if ( err ) {
                res.locals.user = null;

                res.status(201).json( { 
                    success: false, 
                    data: {
                            _id: null,
                            name: null,
                            email: null }
                });

                next();

            } else {
               
                let user = await userSchema.findById( decodedToken.id);
                res.locals.user = user; 

                console.log('>> ', res.locals.user);

                res.status(201).json( { 
                    success: true, 
                    data: {
                            _id: user._id,
                            name: user.name,
                            email: user.email }
                });
                next(); 
            }

        }  )
    
    } else {
        
        res.locals.user = null;
        res.status(201).json( { 
            success: false, 
            data: {
                    _id: null,
                    name: null,
                    email: null }
        });
        next(); 

    }

}

exports.checkEmail = async ( req, res ) => {

    try {
        const user = await userSchema.findOne({email: req.params.id})
        if ( user ) {

            res.status(201).json( { 
                success: true, 
                data: {
                        _id: user._id,
                        name: user.name,
                        email: user.email }
            });

            
        }
        
    } catch (error) {
        console.log('Email address could not be found', error );
    }
}

exports.logout = (req, res ) => {

   
    res.status(201).json( { 
        success: true, 
        data: {
                _id: null,
                name: null,
                email: null },
        token: '_'
    });

}


exports.addBooking =  async ( req, res ) => {

    try {

        const newBooking = new bookingSchema(
            {
                datefrom: req.body.dateFrom,
                dateto: req.body.dateTo,
                roomtype: req.body.roomType,
                norooms: req.body.noRooms,
                nopersons: req.body.noPersons,
                user: req.body.userid
            }
        );

        console.log(newBooking);

        const booking = await newBooking.save();

        res.status(201).json( {
            success: true, 
            data : {
                    _id: booking._id,
                    datefrom: booking.datefrom,
                    dateto: booking.dateto,
                    roomtype: booking.roomtype,
                    norooms: booking.norooms,
                    nopersons: booking.nopersons,
                    user: booking.user
                }
        });

    } catch (error) {
        
        console.log('DB save error. Please check inputs.', error);
        return res.status(500).json( {
            success: false,
            error: error.message
        })
    }
} 

exports.cancelBooking = async (req, res) => {

    try {
        
        const result = await bookingSchema.findByIdAndDelete(req.params.id); 

        console.log('Booking deleted');
        
        return res.status(201).json( {
            success: true,
            data: result 
        })
      
    } catch (error) {
        console.log('Error in DB record deletion');
        return res.status(401).json({
            success: false,
            error: error.message 
        })
    }
}

exports.myBookings = async ( req, res ) => {

    try {
        const bookings = await bookingSchema.find({ user: req.params.userid })
        console.log(bookings)
        
        if ( bookings ) {
            return res.status(200).json( { 
                success: true, 
                data: { bookings }
            });
        }
        
    } catch (error) {
        console.log('Error', error );
    }
}

