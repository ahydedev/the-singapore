const jwt = require('jsonwebtoken'); 
const SECRET_TOKEN = process.env.SECRET_TOKEN;

exports.checkKey = ( req, res, next ) => {

    // const token = req.body.psjwt; 

    console.log('headers > ', req.headers); 

    const authHeader = req.headers.authorization;

    const token = authHeader.split(' ')[1]; 

    console.log( 'autho token ', token); 

    if ( token ) {

        jwt.verify( token, SECRET_TOKEN, (err, decorded) => {

            if ( err ) {
                
                console.log( 'Token verification error > ', err.message )

                res.status( 401 ).json( {
                    success: false,
                    message: 'Token verification failed'
                });


            } else {
                console.log( ' Token verified ', decorded)
                next();

            }

        })
            
    } else {

        console.log('No token present');

        res.status(402).json( {
            success: false,
            message: 'No token present. Access not approved'
        });

    }

}

// res.status(200).json( {
        //     success: true,
        //     message: 'access is authorized',
        //     show: req.baseUrl,
        //     cookies: req.cookies,
        //     originalUrl: req.originalUrl,
        //     path: req.path
        // });