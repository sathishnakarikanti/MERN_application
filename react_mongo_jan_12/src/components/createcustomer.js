import React, { Component } from 'react';
import axios from 'axios';

class Createcustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            mobile_number: '',
            pincode: '',
            username: '',
            password: '',
            address: '',
            id: '',
            data: [],
            edit: false,
            editData: []
        }
    }
    componentDidMount() {
        let Edit = this.props.Edit
        this.setState({ edit: Edit })
        // console.log(this.state.edit, 'edit')
        if (Edit) {
            let row = this.props.data
            console.log(row, 'row')
            // return false
            this.onClickEditRequest(row);

        }
    }
    onClickEditRequest = (row) => {

        console.log(row, 'row')
        this.setState({
            id: row.id.toString(),
            first_name: row.first_name,
            last_name: row.last_name,
            mobile_number: row.mobile_number,
            pincode: row.pincode,
            username: row.username,
            // password: row.password,
            address: row.address,
        })

    }
    SubmitHandler = (e) => {
        e.preventDefault();
        if (this.state.edit) {
            let data1 = {
                id: this.state.id,
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                mobile_number: this.state.mobile_number,
                pincode: this.state.pincode,
                username: this.state.username,
                // password: this.state.password,
                address: this.state.address,
            }
            this.setState({ data: data1 })
            axios({
                method: 'put',
                url: 'http://localhost:3001/updateCustomer',
                data: data1, // you are sending body instead
                headers: {
                    // 'Authorization': `bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            }).then((res) => {
                console.log(res.data, 'res')
            })
        }

        else {
            var digits = '0123456789';
            let ID = '';
            for (let i = 0; i < 6; i++) {
                ID += digits[Math.floor(Math.random() * 10)];
                console.log(ID, 'id')
            }
            let data1 = {
                id: ID,
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                mobile_number: this.state.mobile_number,
                pincode: this.state.pincode,
                username: this.state.username,
                password: this.state.password,
                address: this.state.address,
            }
            this.setState({ data: data1 })
            axios({
                method: 'post',
                url: 'http://localhost:3001/insertCustomer',
                data: data1, // you are sending body instead
                headers: {
                    // 'Authorization': `bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            }).then((res) => {
                console.log(res.data, 'res')
            })
        }
        this.setState({
            id: '',
            first_name: '',
            last_name: '',
            mobile_number: '',
            pincode: '',
            username: '',
            password: '',
            address: ''

        })

    }

    // inputHandler = (e) => {
    //     this.setState({ [e.target.name]: e.target.value })
    //     console.log(this.state.first_name, 'fname')
    // }

    inputHandler = (e, inputName) => {
        this.setState({ [inputName]: e.target.value })
        console.log(this.state.first_name, 'fname')
        console.log(this.state.last_name, 'last_name')
        console.log(this.state.mobile_number, 'mobile_number')
    }
    render() {
        console.log(this.state.data, 'data')


        return (
            <div>

                {this.state.edit ? "" : <h1 className="title">Register Customer</h1>}
                <form onSubmit={this.SubmitHandler}><br />
                    <input type="text"
                        value={this.state.first_name}
                        onChange={(e) => this.inputHandler(e, "first_name")}
                        placeholder='Enter First Name'
                        style={{ height: "30px", width: "300px" }}
                    /><br /><br />

                    <input type="text"
                        value={this.state.last_name}
                        onChange={(e) => this.inputHandler(e, "last_name")}
                        placeholder='Enter Last Name'
                        style={{ height: "30px", width: "300px" }}
                    /><br /><br />

                    <input type="number"
                        value={this.state.mobile_number}
                        onChange={(e) => this.inputHandler(e, "mobile_number")}
                        placeholder='Enter Mobile Number'
                        style={{ height: "30px", width: "300px" }}
                    /><br /><br />

                    <input type="number"
                        value={this.state.pincode}
                        onChange={(e) => this.inputHandler(e, 'pincode')}
                        placeholder='Enter Your Pincode '
                        style={{ height: "30px", width: "300px" }}
                    /><br /><br />

                    <input type="text"
                        value={this.state.username}
                        onChange={(e) => this.inputHandler(e, 'username')}
                        placeholder='Enter Your Username '
                        style={{ height: "30px", width: "300px" }}
                    /><br /><br />

                    {this.state.edit ? "" :
                        <div>
                            <input type="password"
                                value={this.state.password}
                                onChange={(e) => this.inputHandler(e, 'password')}
                                placeholder='EnterYour Password '
                                style={{ height: "30px", width: "300px" }}
                            /><br /><br />
                        </div>}
                    <input type="text"
                        value={this.state.address}
                        onChange={(e) => this.inputHandler(e, 'address')}
                        placeholder='Enter Your Address'
                        style={{ height: "30px", width: "300px" }}
                    /><br /><br />
                    <input type="submit" value="Submit" style={{ height: "30px", width: "100px" }} />
                </form>
            </div>
        );
    }
}
export default Createcustomer