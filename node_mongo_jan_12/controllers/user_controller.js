const customers = require("../models/customers_model")
const Joi = require("joi")
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const path = require("path");

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
        console.log(allData.id, 'idd111')
        const isMatch = bcrypt.compare(req.body.password, allData.password, async (err, res) => {
            if (res) {
                let Id = "";
                let digits = "1234567890";
                for (i = 0; i <= 5; i++) {
                    Id += digits[Math.floor(Math.random() * 10)]
                    console.log(Id, 'Id')
                }
                app.locals.Id = Id;
                console.log(app.locals.Id, 'local.otp')
                app.locals.userId = allData.id;
                console.log(app.locals.userId, 'local.id')

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







const getUser = async (req, res) => {
    try {
        const allData = await customers.find({ $or: [{ _id: "61e65ff8dcdc0028388c4d73" }, { _id: "61e6a9b327f69b76ca7a7c0e" }] })
        console.log(allData, 'allData');
        await res.send(allData);
        console.log("successfully get the customers Data!!")
    }
    catch (err) {
        console.log(err.message)
        res.send(err.message)
    }
}



const insertCustomer = async (req, res) => {
    console.log(req.body, 'insert....');
    let data = req.body;
    function validateData(data) {
        const schema = Joi.object({
            id: Joi.string().min(5).max(8).required(),
            pincode: Joi.string().min(6).max(6).required(),
            first_name: Joi.string().optional(),
            last_name: Joi.string().optional(),
            mobile_number: Joi.string().min(10).max(10),
            username: Joi.string().min(6).required(),
            password: Joi.string().min(8).max(16).required(),
            address: Joi.string().optional()

        }).options({ abortEarly: false });
        return schema.validate(data)
    }
    const response = validateData(data)
    if (response.error) {
        console.log(response.error.details)
    }
    else if (data.length != 0) {
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(req.body.password, salt, function async(err, hash) {
                req.body.password = hash;
                if (hash) {
                    const { id, first_name, last_name, mobile_number, pincode, username, password, address } = req.body;
                    try {
                        console.log(req.body, ' req.body111')
                        const newData = new customers({ id, first_name, last_name, mobile_number, pincode, username, password, address });
                        console.log(newData, 'newData')
                        // return false
                        newData.save();
                        console.log("successfully inserted the customer Record!!")
                    }
                    catch (err) {
                        console.log(err.message);
                        res.send(err.message)
                    }
                }
            })
        })
    }
}

const updateCustomer = async (req, res) => {
    const data = req.body;
    console.log(data, 'data')
    function validateData(data) {
        const schema = Joi.object({
            id: Joi.string().min(5).max(8).required(),
            pincode: Joi.string().min(6).max(6).required(),
            first_name: Joi.string().optional(),
            last_name: Joi.string().optional(),
            mobile_number: Joi.string().min(10).max(10),
            username: Joi.string().min(6).required(),
            address: Joi.string().optional()
        })
        return schema.validate(data)
    }
    const response = validateData(data)
    if (response.error) {
        console.log(response.error.details)
        res.send(response.error)
    }
    else if (data.length != 0) {
        // const { id, first_name, last_name, username, pincode, address, mobile_number } = req.body;
        try {
            const newData = await customers.updateOne({ id: req.body.id }, { $set: { first_name: req.body.first_name, last_name: req.body.last_name, username: req.body.username, pincode: req.body.pincode, address: req.body.address, mobile_number: req.body.mobile_number } }, { upsert: true })
            console.log("successfully Updated the customer  Record!!")
        }
        catch (err) {
            console.log(err.message);
            res.send(err.message)
        }

    }
}

const deleteCustomer = async (req, res) => {
    console.log(req.body, 'delete')
    // return false;
    try {
        await customers.deleteOne({ id: req.body.id })
        res.send(res.data)
        console.log("successfully Deleted the customer Record!!")
    }
    catch (err) {
        console.log(err.message)
    }
}


module.exports = {
    getUser, insertCustomer, updateCustomer, deleteCustomer, verifyuser, verifyotp
}