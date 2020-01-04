import React from 'react';

class FilterForm extends React.Component {
    constructor() {
        super();

        this.state = { minPrice: '', maxPrice: '' };
        this.onMinPriceChange = this.onMinPriceChange.bind(this);
        this.onMaxPriceChange = this.onMaxPriceChange.bind(this);
    }

    onMinPriceChange(event) {
        this.setState({
            minPrice: event.target.value
        });
        this.props.onFilterProducts(this.state.minPrice, this.state.maxPrice);
    }

    onMaxPriceChange(event) {
        this.setState({
            maxPrice: event.target.value
        });
        this.props.onFilterProducts(this.state.minPrice, this.state.maxPrice);
    }

    handleFilterProducts = () => {
        this.props.onFilterProducts(this.state.minPrice, this.state.maxPrice);
    };

    render() {
        if (this.props.product === '') {
            return <div></div>;
        } else {
            return (
                <div>
                    <input
                        type="number"
                        placeholder="Min Price"
                        autoComplete="off"
                        onChange={this.onMinPriceChange}
                    />
                    <input
                        type="number"
                        placeholder="Max Price"
                        autoComplete="off"
                        onChange={this.onMaxPriceChange}
                    />
                    <input
                        type="button"
                        value="filter"
                        onClick={this.handleFilterProducts}
                    />
                </div>
            );
        }
    }
}

export default FilterForm;
