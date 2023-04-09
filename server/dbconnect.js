const mongoose = require('mongoose');


const dbconnect = async ( urlMongoDB ) => {

    try {

        const conn = await mongoose.connect( urlMongoDB, 
            { 
                useUnifiedTopology: true,
                useNewUrlParser: true  }); 

            console.log(`MongoDB connection success: ${conn.connection.host} `);    
            return true;

    } catch (error) {

        console.log('Database connection error', error); 
        return false; 
        
    }

}

module.exports = dbconnect; 
