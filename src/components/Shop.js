import React from 'react';
import Product from './Product';

class Shop extends React.Component {
    render() {
        return (
            <div className="shop-panel">
                <div className="shop-details">
                    <div className="shop-name">{this.props.shop.name}</div>
                </div>
                <div className="products">
                    {this.props.shop.products.map((product, index) => (
                        <Product product={product} key={index} />
                    ))}
                </div>
            </div>
        );
    }
}

export default Shop;
