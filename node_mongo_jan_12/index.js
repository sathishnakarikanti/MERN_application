const express = require('express');
const cors = require("cors");
const Joi = require("joi")
const bcrypt = require('bcrypt');
const mailer = require("@sendgrid/mail");
const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const moment = require('moment');
require("dotenv").config();
const config = require('./config/config')
const customers = require("./models/customers_model")
const router = require("./routes/user_routes")
const bodyparser = require('body-parser');
const path = require("path");
const expresshadlerbars = require('express-handlebars');
const { required, string } = require('joi');
const { AssertionError } = require('assert');
const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }))
app.use(express.json());


app.use(cors());
app.use((req, res, next) => {
    req.connection = config;
    next()
})
app.use("", router);
app.get('/app', (req, res) => {
    res.send('Running in 3000 port')
})
app.post("/verifyuser", async (req, result) => {
    console.log(req.body, 'body')
    const transporter = nodemailer.createTransport(sendGridTransport(({
        auth: {
            api_key: "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"
        }
    })))
    try {
        const allData = await customers.findOne({ "username": req.body.username });
        console.log(allData.password)
        const isMatch = bcrypt.compare(req.body.password, allData.password, async (err, res) => {
            if (res) {
                let Id = "";
                let digits = "1234567890";
                for (i = 0; i <= 5; i++) {
                    Id += digits[Math.floor(Math.random() * 10)]
                    console.log(Id, 'Id')
                }
                app.locals.Id = Id;
                app.locals.userId = allData.id;
                let msg1 = "Hello Mr.";
                let msg2 = "your OTP is"
                transporter.sendMail({
                    to: allData.username,
                    from: 'sathishnakarikanti95@gmail.com',
                    subject: 'OTP',
                    html: `<h2>${msg1}</h2><h3>${allData.first_name}</h3><p>${msg2}</p> <h1>${Id}</h1> `
                }).then(res => console.log('message sent'))
                    .catch(res => console.log('filed to sent'))

                // return false;
                result.send(allData.id);
            }
            else {
                result.send({ message: 'Invalid Password' })
            }
        })

    }
    catch (err) {
        console.log(err.message)
    }
})

app.post('/verifyotp', async (req, result) => {
    console.log(req.body, 'req.body');
    let id = req.body.id
    let otp = req.app.locals.Id;
    let userId = req.app.locals.userId
    console.log(otp, 'otp')
    console.log(userId, 'userId')
    const allData = await customers.findOne({ "id": id });
    if (req.body.id == userId && req.body.otp == otp) {
        console.log('verified')
        let jwtSecretKey = `${process.env.JWT_SECRET_KEY}`;
        let data = {
            time: Date(),
        }
        const token = jwt.sign(data, jwtSecretKey);
        console.log(token, 'token')
        result.send({ "token": token, "username": allData.first_name, "last_name": allData.last_name, "id": allData.id, "msg": "successfully verified!", "role": "user" });
    }
    else {
        result.send("wrong otp")
    }
})






app.listen(3001, (req, res) => {
    console.log("port is running in 3001")
})