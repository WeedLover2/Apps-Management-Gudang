const mongoose = require('mongoose');

// Skema Database User
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Name is required'],
    },
    role: {
        type: String,
        enum: ["admin","user"],
        default: "user",    
        required: [true, 'Role is required'],
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
});

module.exports = mongoose.model('User', userSchema);