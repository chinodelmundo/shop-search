import React from 'react';

class SearchForm extends React.Component {
    constructor() {
        super();

        this.state = { product: '' };
        this.onSearchTermChange = this.onSearchTermChange.bind(this);
    }

    onSearchTermChange(event) {
        this.setState({
            product: event.target.value
        });
    }

    handleSearchProduct = () => {
        this.props.onSearchProduct(this.state.product);
    };

    render() {
        return (
            <form
                id="search-form"
                className="pure-form"
                onSubmit={e => {
                    e.preventDefault();
                }}
            >
                <fieldset>
                    <input
                        type="text"
                        name="product"
                        id="search-input"
                        placeholder="Search Product"
                        autoComplete="off"
                        onChange={this.onSearchTermChange}
                    />
                    <button
                        type="submit"
                        id="search-btn"
                        className="pure-button pure-button-primary"
                        onClick={this.handleSearchProduct}
                    >
                        Search
                    </button>
                </fieldset>
            </form>
        );
    }
}

export default SearchForm;
