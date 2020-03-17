import React, { Component } from 'react';
import classes from './Product.module.css'
class Product extends Component {
    // let imgurl='/images/ghee1.jpg'
    // let counter = 0;

    state = {
        counter: 0
    }

    decreaseCounter = () => {
        if(this.state.counter>0){
            this.setState((prevState, prevProp) => {
                    return { counter: prevState.counter - 1 }       
            })

            this.props.changeqty('dec',{...this.props.prodData})
        }
        

    }

    increaseCounter = () => {
        this.setState((prevState, prevProp) => {
            return { counter: prevState.counter + 1 }
        })
        this.props.changeqty('inc', {...this.props.prodData});
    }

    render() {
        return (
            <React.Fragment>
                <div className={classes.row}>
                    <div className={classes.col1}>
                        <div className={classes.imgPad}>
                            <img src={this.props.prodData.imageURL} width="100px"
                                height="100px" alt="ghee" /><br />
                            {this.props.prodData.offerText}
                        </div>

                    </div>
                    <div className={classes.col2}>
                        <div className={classes.brand}>{this.props.prodData.brandName}</div>
                        <div>
                            {this.props.prodData.ProductName}<br />
                            {this.props.prodData.quantity}<br />
                            {this.props.prodData.MRP}
                        </div>
                        <div style={{ "fontWeight": 500 }}>
                            {this.props.prodData.price}
                        </div>
                        <div style={{ "marginTop": "0.75em" }}>
                            <button type="button" className={classes.cartButton}>Add To Cart</button>
                            <span style={{ "marginLeft": "2.5em" }}>
                                <button type="button"
                                    className={`${classes.cartButton} ${classes.roundbtn}`}
                                    onClick={this.decreaseCounter}>-</button>

                                <span className={classes.counter}>{this.state.counter}</span>

                                <button type="button"
                                    className={`${classes.cartButton} ${classes.roundbtn}`}
                                    onClick={this.increaseCounter}>+</button>
                            </span>
                        </div>

                    </div>
                </div>
                <hr />
            </React.Fragment>
        )
    }
}

export default Product