const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/college", { useNewUrlParser: true }, (err, res) => {
    if (err) {
        console.log(err)
    }

    else {
        console.log("Database  successfully connected !!")
    }
})
