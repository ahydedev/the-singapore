const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const { isEmail }   = require('validator');

const Schema = mongoose.Schema; 

const userScheme = new Schema ( {

    name : {
        type: String,
        trim: true, 
        required: [ true, 'name is required']
    },
    email: {
        type: String,
        unique: [ true, 'email must be unique'],
        lowercase: true,
        required: [ true, 'email is required'],
        validate:  [ isEmail, 'invalid email format'    ]
    },
    password: {
        type: String,
        trim: true,
        minlength: 6,
        required: [ true, 'password is required']
    },
    createdAt: {
        type: Date,
        default: Date.now 
    }
    
} ); 

userScheme.plugin( uniqueValidator ); 

module.exports = mongoose.model('User', userScheme );
