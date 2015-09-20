'use strict';

require('should');

var exchange = require('../index');


describe('getBackTestResult', function(){
    describe('when no orders have been placed', function(){
        it('should return 0', function(){
            exchange({
                currency: 'usd',
            }).getBackTestResult().gain.should.be.equal(0);
        });
    });

    describe('when one buy order have been placed', function(){

        var instance;
        before(function(){
            instance = exchange({
                currency: 'usd',
            });

            instance.buy(2, 50);
        });

        it('should return 0', function(){
            instance.getBackTestResult().gain.should.be.equal(0);
        });
    });

    describe('when one buy and one sell order have been placed', function(){

        var instance;
        before(function(){
            instance = exchange({
                currency: 'usd',
            });

            instance.buy(2, 50);
            instance.sell(2, 60);
        });

        it('should return 20%', function(){
            instance.getBackTestResult().gain.should.be.equal(20);
        });
    });
});
