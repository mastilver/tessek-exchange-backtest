'use strict';

require('should');
var sinon = require('sinon');

var coindeskApi = require('coindesk-api');

var exchange = require('../index');

describe('getCandles', function(){

    var candles = [];

    before(function(done){
        sinon.stub(coindeskApi.prototype, 'getPricesForSingleCurrency').yields(null, [
            {
                time: 0,
                rate: 100,
            },
            {
                time: 1,
                rate: 101,
            },
            {
                time: 2,
                rate: 102,
            },
            {
                time: 3,
                rate: 103,
            },
            {
                time: 4,
                rate: 104,
            },
        ]);

        exchange.getCandles().subscribe(function(candle){
            candles.push(candle);
        },
        Function.prototype,
        done);
    });

    after(function(){
        coindeskApi.prototype.getPricesForSingleCurrency.restore();
    });

    it('should emit the first candle', function(){
        candles[0].should.be.deepEqual({
            time: 0,
            close: 100,
        });
    });

    it('should emit the second candle', function(){
        candles[1].should.be.deepEqual({
            time: 1,
            close: 101,
        });
    });

    it('should emit the third candle', function(){
        candles[2].should.be.deepEqual({
            time: 2,
            close: 102,
        });
    });

    it('should emit the forth candle', function(){
        candles[3].should.be.deepEqual({
            time: 3,
            close: 103,
        });
    });

    it('should emit the fifth candle', function(){
        candles[4].should.be.deepEqual({
            time: 4,
            close: 104,
        });
    });
});
