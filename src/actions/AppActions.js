const request = require('request');
const scraperKey = process.env.REACT_APP_SCRAPER_KEY;

const AppActions = {
    getLazadaProducts: product => {
        return new Promise((resolve, reject) => {
            console.log('Searching for lazada products...');

            const searchInput = product.replace(/ /g, '+');
            const url = 'https://www.lazada.com.ph/catalog/?q=' + searchInput;

            request(
                {
                    method: 'GET',
                    url:
                        'http://api.scraperapi.com/?api_key=' +
                        scraperKey +
                        '&url=' +
                        url,
                    headers: {
                        Accept: 'application/json'
                    }
                },
                (error, response, body) => {
                    if (error) {
                        reject(error);
                    } else {
                        let products = [];
                        let result = body.match(
                            /(?<=window\.pageData=).+?(?=<\/script>)/g
                        );

                        if (result != null) {
                            let listItems = JSON.parse(result[0]).mods
                                .listItems;

                            listItems.forEach(item => {
                                let stars = parseFloat(
                                    item.ratingScore
                                ).toFixed(2);

                                products.push({
                                    name: item.name,
                                    price: item.priceShow,
                                    img: item.thumbs[0].image,
                                    stars: stars,
                                    reviews: item.review,
                                    link: item.productUrl
                                });
                            });
                        }

                        resolve({
                            name: 'Lazada',
                            products: products
                        });
                    }
                }
            );
        });
    },

    getShopeeProducts: product => {
        return new Promise((resolve, reject) => {
            console.log('Searching for shopee products...');

            const searchInput = product.replace(/ /g, '%20');
            const url = 'https://shopee.ph/search?keyword=' + searchInput;

            request(
                {
                    method: 'GET',
                    url:
                        'http://api.scraperapi.com/?api_key=' +
                        scraperKey +
                        '&url=' +
                        url +
                        '&render=true',
                    headers: {
                        Accept: 'application/json'
                    }
                },
                (error, response, body) => {
                    if (error) {
                        reject(error);
                    } else {
                        let resultsItems = body.match(
                            /{"@context":"http:\/\/schema\.org","@type":"Product".+?}(?=<\/script>)/g
                        );
                        let products = [];

                        if (resultsItems != null) {
                            resultsItems.forEach(item => {
                                let itemData = JSON.parse(item);
                                let price = '₱';

                                if (itemData.offers.price) {
                                    price += itemData.offers.price;
                                } else {
                                    price += `${itemData.offers.lowPrice} - ${itemData.offers.highPrice}`;
                                }

                                products.push({
                                    name: itemData.name,
                                    price: price,
                                    img: itemData.image,
                                    stars: itemData.aggregateRating
                                        ? itemData.aggregateRating.ratingValue
                                        : '0',
                                    reviews: itemData.aggregateRating
                                        ? itemData.aggregateRating.ratingCount
                                        : '0',
                                    link: itemData.url
                                });
                            });
                        }

                        resolve({
                            name: 'Shopee',
                            products: products
                        });
                    }
                }
            );
        });
    },

    retrieveRequestCount: () => {
        return new Promise((resolve, reject) => {
            console.log('Retrieving Request Count...');
            request(
                {
                    method: 'GET',
                    url:
                        'http://api.scraperapi.com/account?api_key=' +
                        scraperKey,
                    headers: {
                        Accept: 'application/json'
                    }
                },
                (error, response, body) => {
                    if (error) {
                        reject(error);
                    }

                    let stats = 0;
                    try {
                        stats = JSON.parse(body);
                    } catch (e) {
                        console.log('Error in json parse...' + e);
                    }

                    resolve(stats.requestCount);
                }
            );
        });
    }
};

export default AppActions;
