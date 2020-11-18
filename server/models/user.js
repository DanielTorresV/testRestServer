const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

let validRol = {
    values: ['admin_role', 'user_role'],
    message: '{VALUE} is not a role'
}

let Schema = mongoose.Schema;

let userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'The name is required']
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'user_role',
        enum: validRol
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

userSchema.plugin(uniqueValidator, {message:`{PATH} has to be unique`})

module.exports = mongoose.model('User', userSchema)