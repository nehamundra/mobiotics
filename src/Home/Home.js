import React, { Component } from 'react';
import axios from 'axios';
import Product from '../Product/Product'
import classes from './Home.module.css';
import Modal from "../Modal/Modal";

class Home extends Component {
    state = {
        productsArr: null,
        quantity: 0,
        total: 0,
        cart: [],
        show: false,
        continueOrder: false
    }

    componentDidMount() {
        axios.get("https://mobiotics-1290b.firebaseio.com/products.json").then(res => {
            this.setState({ productsArr: res.data })

        }, err => {
            console.log(err)
        })
    }

    changeQty = (op, prod) => {
        if (op === 'inc') {
            this.setState((prevState, prevProp) => {
                let newCart = prevState.cart;
                let price = (prod.price.substr(3))
                console.log(price)
                newCart.push(prod);
                return {
                    quantity: prevState.quantity + 1,
                    cart: newCart,
                    total: prevState.total + parseInt(price)
                }
            })
        }

        if (op === 'dec') {
            if (this.state.quantity > 0 && this.state.total > 0) {
                let index = null;
                for (let i = 0; i < this.state.cart.length; i++) {
                    if (this.state.cart[i].id === prod.id) {
                        index = i;
                    }
                }
                if (index != null) {
                    let newCart = this.state.cart.splice(index, 1);
                    let newPrice = this.state.total - parseInt(prod.price.substr(3));

                    this.setState((prevState, prevProp) => {
                        return {
                            quantity: prevState.quantity - 1,
                            total: newPrice,
                            cart: newCart
                        }
                    })
                }


            }
        }
    }

    purchaseCanceled = () => {
        this.setState({ show: false })
    }

    goPurchase = () => {
        this.setState({ show: true });
    }

    render() {
        let products = null;
        let orderSummary = null;
        if (this.state.productsArr) {
            products = this.state.productsArr.map(prod => {
                return (
                    <div className={classes.box} key={prod.id}>
                        <Product prodData={prod} changeqty={this.changeQty} />
                    </div>)
            })

        }

        if (this.state.show) {
            let orderArr = [];
            this.state.cart.forEach(ele => {
                if (orderArr.length > 0) {
                    let found = false;
                    for (let j = 0; j < orderArr.length; j++) {
                        if (ele.id === orderArr[j].prod.id) {
                            orderArr[j].qty += 1;
                            found = true;
                            break;
                        }
                    }
                    if (found === false) {
                        orderArr.push({ prod: ele, qty: 1 })
                    }
                } else {
                    orderArr.push({ prod: ele, qty: 1 });
                }
            })
            console.log(orderArr);

            orderSummary = (
                <React.Fragment>
                    <div style={{ marginBottom: '1em' }}>
                        {orderArr.map((ele, index) => {
                            // let stmt=
                            return (
                                (index + 1) + '. ' + ele.prod.brandName
                                + '-' + ele.prod.ProductName + '-' + ele.qty
                            )
                        })}
                    </div>
                    <div>
                        Total : Rs. {this.state.total}
                    </div>
                    <div className={classes.successmsg}>
                        Transaction Successful!
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <button type="button" className={classes.contbtn}
                        onClick={this.purchaseCanceled}>OK</button>

                    </div>
                </React.Fragment>
            )
        }

        return (
            <React.Fragment>
                <Modal show={this.state.show} modalClosed={this.purchaseCanceled}>
                    {orderSummary}
                </Modal>
                <div className={classes.row}>
                    {products}
                </div>
                <h3>Loading...</h3>
                <footer className={classes.footer}>
                    <div className={classes.row}>
                        <div style={{ "width": "50%" }}>
                            <span>Quantity - </span>
                            <span>{this.state.quantity}</span><br />
                            <span>Total - </span>
                            <span>{this.state.total}</span>
                        </div>
                        <div style={{ "textAlign": "right", "width": "50%" }}>
                            <button type="button" className={classes.coButton} onClick={this.goPurchase}>
                                Checkout
                            </button>
                        </div>
                    </div>
                </footer>
            </React.Fragment>
        )
    }
}

export default Home;