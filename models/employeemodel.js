const mongoose = require('mongoose');
const schema = mongoose.Schema;

const register_employee = new schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: String,
    address: {
        country: { type: String, default: 'india' },
        state: { type: String },
        city: {
            cityname: String,
            town: String,
            streetname: String
        },
    },
    aadharnumber: { type: Number, required: true },
    gender: String,
    dob: String
});
const add_employee = mongoose.model('add_employee', register_employee);
module.exports = add_employee;