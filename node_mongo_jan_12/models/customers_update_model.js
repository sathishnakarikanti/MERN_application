const mongoose = require("mongoose");
const customers = mongoose.Schema({
    id: {
        type: "string",
        required: true
    },
    first_name: {
        type: "string",
        required: false
    },
    last_name: {
        type: "string",
        required: false
    },
    mobile_number: {
        type: "string",
        required: false
    },
    pincode: {
        type: "string",
        required: true
    },
    username: {
        type: "string",
        required: true
    },
    password: {
        type: "string",
        required: false
    },
    address: {
        type: "string",
        required: false
    }

})
module.exports = mongoose.model('customers', customers)
