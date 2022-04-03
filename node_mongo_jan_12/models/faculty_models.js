const mongoose = require("mongoose")
const employees = mongoose.Schema({
    name: {
        type: "string",
        required: true,
    },
    age: {
        type: "string",
        required: true
    },
    Doj: {
        type: "date",
        required: true
    },
    date: {
        type: "date",
        default: Date.now()
    },
    experience: {
        type: "string",
        required: true
    },
    salary:{
        type:"string",
        required:true
    }
})
module.exports = mongoose.model('employees',employees)