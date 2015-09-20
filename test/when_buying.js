'use strict';

require('should');

var exchange = require('../index');


describe('when buying', function(){

    var instance;
    before(function(){
        instance = exchange({
            currency: 'usd'
        });

        instance.buy(1, 50);
    });

    it('should reduce currency', function(){
        instance.getPorfolio().usd.should.be.equal(50);
    });

    it('should augmente asset', function(){
        instance.getPorfolio().btc.should.be.equal(1);
    });
});

describe('when buying over what\'s available', function(){
    var instance;
    before(function(){
        instance = exchange({
            currency: 'usd'
        });

        instance.buy(3, 50);
    });

    it('should reduce currency', function(){
        instance.getPorfolio().usd.should.be.equal(0);
    });

    it('should augmente asset', function(){
        instance.getPorfolio().btc.should.be.equal(2);
    });
});
