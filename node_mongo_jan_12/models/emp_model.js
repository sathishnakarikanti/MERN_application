const mongoose = require("mongoose");
const demo3 = mongoose.Schema({
     empid: {
        type: "string",
        required: true
    },
    full_name: {
        first_name: {
            type: "string",
            required: true
        },
        last_name: {
            type: "string",
            required: true
        }
    },
    current_address: {
        city: {
            type: "string",
            required: true
        },
        state: {
            type: "string",
            required: true
        },
        country: {
            type: "string",
            required: true
        }
    },
    bond: {
        type: "string",
        required: true
    },
    workingStatus: {
        type: "string",
        required: true
    },
    personal_Details: {
        mobile_number: {
            type: "string",
            required: true
        }, mobile_number: {
            type: "string",
            required: true
        },
        perminent_Address: {
            loaction: {
                type: "string",
            },
            pincode: {
                type: "string",
            }
        }

    },
    technologies_known: {
        type: Array,
        "default": []
    },


})
module.exports = mongoose.model("demo3",demo3)