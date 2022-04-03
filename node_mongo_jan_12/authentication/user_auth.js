// const express = require('express');
// const app = express();
// const path = require("path");
const app1 = require("../index")
// const app1.app()

const bcrypt = require('bcrypt');
const customers = require('../models/customers_model')
const mailer = require("@sendgrid/mail");
const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const moment = require('moment');
require("dotenv").config();




const verifyuser = async (req, result) => {
    console.log(req.body, 'body')
    const transporter = nodemailer.createTransport(sendGridTransport(({
        auth: {
            api_key: "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"
        }
    })))
    try {
        const allData = await customers.findOne({ "username": req.body.username });
        console.log(allData.password)
        console.log(allData.id,'idd111')
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


}

const verifyotp = async (req, result) => {
    console.log(req.body, 'req.body');
    let id = req.body.id
    console.log(req.app.locals.Id, 'iddddd')
    let otp = req.app.locals.Id;
    let userId = req.app.locals.userId
    console.log(otp, 'otp')
    console.log(userId, 'userId')


    const allData = await customers.findOne({ "id": id });
    if (req.body.id == userId && req.body.otp == otp) {
        console.log('verified')
        // if (req.body.otp == otp) {
        let jwtSecretKey = `${process.env.JWT_SECRET_KEY}`;
        let data = {
            time: Date(),
            // userId: res1.rows[0].id,
        }
        const token = jwt.sign(data, jwtSecretKey);
        console.log(token, 'token')
        result.send({ "token": token, "username": allData.first_name, "last_name": allData.last_name, "id": allData.id, "msg": "successfully verified!", "role": "user" });
        // }

    }
    else {
        result.send("wrong otp")
    }
}

module.exports = { verifyuser, verifyotp }