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
    // imgurl:{type:String},
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
    dob: String,
    // imgurl:{type:String}
},{strict: false});
register_employee.add({imgurl:String});
const add_employee = mongoose.model('add_employee', register_employee);
module.exports = add_employee;