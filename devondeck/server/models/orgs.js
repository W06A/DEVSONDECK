const mongoose = require('mongoose');

const orgSchema = new mongoose.Schema({
    orgname: {
        type: String,
        required: [true, "Orgname is required"]
    },
    firstname: {
        type: String,
        required: [true, "First name is required"]
    },
    lastname: {
        type: String,
        required: [true, "Last name is required"]
    },
    contactEmail: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    orgAddress: {
        type: String,
        required: [true, "Address is required"]
    },
    orgCity: {
        type: String,
        required: [true, "City is required"]
    },
    state: {
        type: String,
        required: [true, "State is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be 8 characters or longer"]
    },
    confirm: { 
        type: Boolean, 
        default: true 
    },
    positions: [{
        positionId: {
            type: String,
            trim: true,
            unique: true
        },
        name: {
            type: String,
            trim: true
        },
        description: {
            type: String,
            trim: true
        },
        requiredSkills: {
            type: [String],
            trim: true
        }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Org', orgSchema);
