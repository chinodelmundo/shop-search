import React from 'react';
import AppActions from '../actions/AppActions';
import SearchForm from './SearchForm';
// import FilterForm from './FilterForm';
import Shop from './Shop';
import DummyShops from './DummyShops';

let shops = [];

class App extends React.Component {
    constructor(props) {
        super();
        this.state = {
            searches: '0',
            shops: shops,
            loading: false
        };
        this.handleSearchProduct = this.handleSearchProduct.bind(this);
        // this.handleFilterProducts = this.handleFilterProducts.bind(this);
    }

    setRequestCount = () => {
        AppActions.retrieveRequestCount()
            .then(results => {
                this.setState({
                    searches: results
                });
            })
            .catch(err => {
                console.log('Error on Retrieve Request Count: ' + err);
            });
    };

    componentDidMount = () => {
        this.setRequestCount();
    };

    handleSearchProduct = product => {
        shops = [];
        let lazadaPromise = AppActions.getLazadaProducts(product);
        let shopeePromise = AppActions.getShopeeProducts(product);

        this.setState({
            shops: shops,
            loading: true
        });

        lazadaPromise
            .then(results => {
                shops.push(results);
                this.setState({
                    shops: shops
                });
                this.setRequestCount();
            })
            .catch(err => {
                console.log('Error on Lazada Search: ' + err);
            });

        shopeePromise
            .then(results => {
                shops.push(results);
                this.setState({
                    shops: shops
                });
                this.setRequestCount();
            })
            .catch(err => {
                console.log('Error on Shopee Search: ' + err);
            });
    };

    // handleFilterProducts = (minPrice, maxPrice) => {
    //     shops = shops.map(shop => {
    //         shop.products = shop.products.filter(
    //             product => product.name === 'product1'
    //         );
    //         return shop;
    //     });

    //     this.setState({
    //         shops: shops
    //     });
    // };

    render() {
        return (
            <div className="App">
                <div id="header">
                    <a href="/">Shop Search</a>
                </div>
                <div id="main-content">
                    <SearchForm onSearchProduct={this.handleSearchProduct} />
                    {/* <FilterForm
                        onFilterProducts={this.handleFilterProducts}
                    /> */}

                    <div id="stats-panel">
                        Monthly Search Limit:
                        <b> {this.state.searches} / 1000</b>
                    </div>
                    <div id="results-panel">
                        {this.state.shops.map((shop, index) => (
                            <Shop shop={shop} key={index} />
                        ))}
                    </div>
                    {this.state.loading ? (
                        <DummyShops count={2 - this.state.shops.length} />
                    ) : null}
                </div>
            </div>
        );
    }
}

export default App;
