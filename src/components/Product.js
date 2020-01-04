import React from 'react';

class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = { show: true };
    }

    handleRemoveProduct = () => {
        this.setState({ show: false });
    };

    render() {
        if (!this.state.show) {
            return null;
        } else {
            return (
                <div className="product-container">
                    <div className="product">
                        <div className="product-img-panel">
                            <img
                                className="product-img"
                                src={this.props.product.img}
                                alt="product"
                            />
                        </div>
                        <div className="product-details">
                            <div
                                className="product-name"
                                title={this.props.product.name}
                            >
                                {this.props.product.name}
                            </div>
                            <div className="product-price">
                                {this.props.product.price}
                            </div>
                            <div className="product-ratings">
                                <b>{this.props.product.stars}</b> stars out of{' '}
                                <b>{this.props.product.reviews}</b> reviews.
                            </div>
                            <a
                                className="product-link"
                                href={this.props.product.link}
                            >
                                page link
                            </a>
                        </div>
                        <div>
                            <button
                                className="pure-button product-delete-btn"
                                title="Delete Item"
                                onClick={this.handleRemoveProduct}
                            >
                                X
                            </button>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Product;
