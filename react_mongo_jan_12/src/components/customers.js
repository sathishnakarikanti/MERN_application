import React, { Component } from 'react';
import axios from 'axios';
import { Form, Input, InputNumber, Button, Table } from 'antd';
import { Redirect, Link } from 'react-router-dom';
import Createcustomer from './createcustomer';
import './style.css'

class Customer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            passUser: '',
            dataSource: [],
            columns: [
                {
                    title: 'ID',
                    dataIndex: 'id',
                    key: 'name',
                },
                {
                    title: 'first name',
                    dataIndex: 'first_name',
                    key: 'name',
                },
                {
                    title: 'last name',
                    dataIndex: 'last_name',
                    key: 'name',
                },

                {
                    title: 'mobile number',
                    dataIndex: 'mobile_number',
                    key: 'mobile_number',
                },
                {
                    title: 'username',
                    dataIndex: 'username',
                    key: 'username',
                },
                {
                    title: 'address',
                    dataIndex: 'address',
                    key: 'address',
                },
                {
                    title: 'Action',
                    dataIndex: '',
                    key: 'x',
                    render: (text, record) => (
                        <span>
                            {/* <li onClick={this.editHandler(record)}><Link to="/createcustomer">Edit</Link></li> */}
                            <input type="submit" value="Edit" onClick={(e) => this.editHandler(record)} />
                            <input type="submit" value="Delete" onClick={(e) => this.deleteHandler(record)} />
                        </span>




                    ),
                },

            ]
        }
    }

    async componentDidMount() {
        
       await this.customers();
    }
    customers = async () => {
        // const BASE_URL = "http://localhost:3001";
        await axios.get('http://localhost:3001/getCustomers').then((res) => {
             this.setState({ dataSource: res.data })
        })
    }


    editHandler = (row) => {
        this.setState({ passUser: row })
        // this.props.history.push('/createcustomer');
        this.setState({ editable: true })
    }
    deleteHandler =async  (row) => {
        await axios.delete('http://localhost:3001/deleteCustomer',{ data:{id: row.id} }).then(data => {
            console.log(data, 'data')
        })
       await this.customers();
    }

    render() {
        <Createcustomer data={this.state.passUser} />

        return (
            <div>
                <h1 className="title">Welcome TO VShop Admin Panel</h1>
                
                {this.state.editable ? < Createcustomer data={this.state.passUser} Edit={true} />
                    :
                    <div className="table">
                    <Table
                        rowKey={record => record.username}
                        dataSource={this.state.dataSource}
                        columns={this.state.columns}
                        pagination={{ defaultPageSize: 25, locale: { items_per_page: "25" } }}
                    />
                    </div>
                }

            </div>
           
        );
    }
}
export default Customer;