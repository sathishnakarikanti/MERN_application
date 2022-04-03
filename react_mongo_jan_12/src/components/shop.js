import React from 'react'
import './style.css'
class Shop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numberOfLaptops: 10,
        }
    }
    // handleclick = () =>{
    //     this.setState({numberOfLaptops:this.state.numberOfLaptops-1})
    // }
    render() {
        return (
            <div>
                <h1 className="title">Welcome TO VShop</h1>
                <div className="card1">
                    <div className="item">
                        <p>Dell Inspiron Laptop</p>
                        <p>Available: {this.state.numberOfLaptops}</p>
                        <button onClick={this.handleclick}>BUY lap</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Shop;