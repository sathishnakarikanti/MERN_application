import React, { Component } from 'react';
import axios from 'axios';
import './style.css'
import Customer from './customers';
import Shop from './shop';

class Userlogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            data: [],
            otp: '',
            loginscreen: true,
            userData: [],
            role: '',
            otpenddata: [],
            userId: '',
        }
    }
    InputHandler = (e, inputName) => {
        this.setState({ [inputName]: e.target.value })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let data1 = {
            username: this.state.username,
            password: this.state.password
        }
        this.setState({ data: data1 })

        axios({
            method: 'post',
            url: 'http://localhost:3001/verifyuser',
            data: data1,
            headers: {
                "Content_Type": "application/json"
            }
        })
            // .then(res => sessionStorage.setItem('user', JSON.stringify(res.data)))
            .then((res) => {
                // console.log(res.data, 'res')
                if (res.data) {
                    this.setState({ userId: res.data })
                    this.setState({ loginscreen: false })
                }
            })
    }

    InputHandlerOtp = (e, inputName) => {
        this.setState({ [inputName]: e.target.value })
    }
    handleSubmitOtp = async (e) => {
        e.preventDefault();
        console.log(this.state.userId, 'userId')
        let data1 = {
            otp: this.state.otp,
            id: this.state.userId
        }

        const headers = {
            'Content-Type': 'application/json',
            "Authorization": `${this.state.userData.token}`
        }
        await axios({
            method: 'post',
            url: 'http://localhost:3001/verifyotp',
            data: data1,
            headers: headers
        }).then((response) => {
            console.log(response.data, 'response,data');
            this.setState({ userData: response.data })
        })
            .catch((error) => {
                console.log(error);
            });
        this.setState({ role: this.state.userData.role, otp: '' })
        console.log(this.state.userData, 'userData')
        console.log(this.state.userData.role, 'userData.role')

    }
    render() {
        return (
            <div>
                <div className='loginpage'>
                    {this.state.loginscreen ?
                        <div>
                            <h1 className="title"> VShop Login Here!!</h1>
                            <form onSubmit={this.handleSubmit}>
                                <input type="text"
                                    value={this.state.username}
                                    onChange={(e) => this.InputHandler(e, "username")}
                                    placeholder="Enter Your Username"
                                    style={{ height: "30px", width: "300px" }}
                                /><br /><br />
                                <input type="password"
                                    value={this.state.password}
                                    onChange={(e) => this.InputHandler(e, "password")}
                                    placeholder="Enter Your Password"
                                    style={{ height: "30px", width: "300px" }}
                                /><br /><br />
                                <input type="button" type="Submit" style={{ height: "30px", width: "60px" }} />
                            </form>
                        </div>
                        : <div>
                            {this.state.role == "admin" ?
                                <div>
                                    <Customer />
                                </div>
                                : <div>{this.state.role == "user" ?
                                    <div><Shop /></div>
                                    : <form onSubmit={this.handleSubmitOtp}>
                                        <h3>Please Enter OTP</h3><br />
                                        <input type="text"
                                            value={this.state.otp}
                                            onChange={(e) => this.InputHandlerOtp(e, "otp")}
                                            placeholder="Enter Your OTP"
                                            style={{ height: "30px", width: "300px" }}
                                        /><br /><br />
                                        <input type="button" type="Submit" style={{ height: "30px", width: "60px" }} />
                                    </form>
                                }
                                </div>
                            }</div>}
                </div>
            </div>

        );
    }
}

export default Userlogin;