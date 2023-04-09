const express = require('express');
const dbconnect = require('./dbconnect');
const cors = require('cors');

const app = express();

app.use( express.json()); 
app.use(express.urlencoded({extended: true}));

app.options( '*', cors());
app.use( cors() ); 

require('dotenv').config(); 

const path = require('path'); 
const dir = path.join( __dirname, 'public'); 
app.use( express.static( dir ));

const trans = require('./routes/trans');

app.get( '/api/', ( req, res ) => {
    // res.status(404).sendFile( path.join( __dirname, '/public/notfound.html'))
    res.redirect('/notfound.html'); 
}  )

app.use('/api/trans' , trans );

app.get( '*', ( req, res ) => {
    res.redirect('/notfound.html'); 
    // res.status(404).sendFile( path.join( __dirname, '/public/notfound.html'))
}  );

const errorHandler = ( err, req, res, next ) => {

	console.log('Error handling.', err);
	if ( err ) {
		res.status(403).json( { 
			success: false,
			error: err.message
		})
	}
}
app.use( errorHandler );

const PORT = process.env.PORT || 5000;
const DATABASE = process.env.DB_MONGO_URL; 
console.log(DATABASE);

if ( dbconnect( DATABASE ) ) { 

app.listen( PORT, () => console.log(`Server listening ${PORT}`));

} 

