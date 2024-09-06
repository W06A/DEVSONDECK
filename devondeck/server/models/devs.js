const mongoose = require('mongoose');

const devsSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "First name is required"]
  },
  lastname: {
    type: String,
    required: [true, "Last name is required"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true
  },
  address: {
    type: String,
    required: [true, "Address is required"]
  },
  city: {
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
  bio: {
    type: String,
    trim: true
  },
  devskills: {
    type: Array
  },
  accountType: {
    type: String
  },
  orgId: { type: mongoose.Schema.Types.ObjectId, ref: 'Org' }
}, { timestamps: true });

module.exports = mongoose.model('Dev', devsSchema);
