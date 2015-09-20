'use strict';

var initialCurrencyAmont = 100;

module.exports = function (params) {

    var portfolio = {};
    portfolio.btc = 0;
    portfolio[getCurrencyName()] = initialCurrencyAmont;

    var lastOrder;

    return {
        buy: buy,
        sell: sell,
        getFee: getFee,
        getOpenOrders: getOpenOrders,
        cancelOrder: cancelOrder,
        getPorfolio: getPorfolio,
        getCurrencyName: getCurrencyName,
        getAssetName: getAssetName,
        getBackTestResult: getBackTestResult,
    };

    function getBackTestResult(){

        // if the last order is a buy, we cancel that order
        if(lastOrder && lastOrder.type === 'buy'){
            sell(lastOrder.amont, lastOrder.price);
        }

        var gain = (portfolio.usd - initialCurrencyAmont) / initialCurrencyAmont * 100;

        return {
            currencyAmont: portfolio[getCurrencyName()],
            assetAmont: portfolio.btc,
            gain: gain,
        };
    }

    function buy(amont, price){

        var availableCurrency = portfolio[getCurrencyName()];
        if(availableCurrency < amont * price){
            amont = availableCurrency / price;
        }

        portfolio[getCurrencyName()] -= amont * price;
        portfolio.btc += amont;

        lastOrder = {
            amont: amont,
            price: price,
            type: 'buy',
        };
    }

    function sell(amont, price){
        var availableAsset = portfolio.btc;
        if(availableAsset < amont){
            amont = availableAsset;
        }

        portfolio[getCurrencyName()] += amont * price;
        portfolio.btc -= amont;

        lastOrder = {
            amont: amont,
            price: price,
            type: 'sell',
        };
    }

    function getFee(){
        return 0;
    }

    function getOpenOrders(){
        return [];
    }

    function cancelOrder(){

    }

    function getPorfolio(){
        return portfolio;
    }

    function getCurrencyName(){
        return params.currency;
    }

    function getAssetName(){
        return 'btc';
    }
};
