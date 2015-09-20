'use strict';

require('should');

var exchange = require('../index');


describe('when selling', function(){

    var instance;
    before(function(){
        instance = exchange({
            currency: 'usd'
        });

        instance.buy(2, 50);

        instance.sell(1, 50);
    });

    it('should augmente currency', function(){
        instance.getPorfolio().usd.should.be.equal(50);
    });

    it('should reduce asset', function(){
        instance.getPorfolio().btc.should.be.equal(1);
    });
});

describe('when selling over what\'s available', function(){
    var instance;
    before(function(){
        instance = exchange({
            currency: 'usd'
        });

        instance.buy(2, 50);

        instance.sell(3, 50);
    });

    it('should augment currency', function(){
        instance.getPorfolio().usd.should.be.equal(100);
    });

    it('should reduce asset', function(){
        instance.getPorfolio().btc.should.be.equal(0);
    });
});
