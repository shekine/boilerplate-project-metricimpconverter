const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    suite('Acceptable Inputs', function() {
        let inputNum = convertHandler.getNum;
        let inputUnit = convertHandler.getUnit;

        test('API will accept whole number inputs', function () {
            assert.isTrue(inputNum("3mi") % 1 == 0, 'Test failed: input is not a whole number');
        });
        test('API will accept decimal inputs', function() {
            assert.isTrue(inputNum('1.5mi') % 1 !== 0, 'Input is not a decimal number.');
        });
        test('API will accept fraction inputs', function() {
            assert.equal(eval(inputNum('3/2mi')), 1.5, 'Input is not a fraction.');
        });
        test('API will accept inputs using both fraction and decimal.', function() {
            assert.equal(eval(inputNum('3.1/2mi')), 1.55, 'Input is not a mixed input involving fraction input and decimal.');
        });
        test('API will reject inputs using double-fraction (ie. 5/3/2 or 8/2/2)', function() {
            assert.equal(inputNum('3/2/3mi'), 'invalid number', 'Input with double fraction was accepted instead of rejected.');
            assert.equal(inputNum('3/5/2/7/4mi'), 'invalid number', 'Input with double fraction was accepted instead of rejected.');
        });
        test('API will default to input of 1 when no numerical input is provided.', function() {
            assert.equal(inputNum('mi'), 1, 'Input does not default to 1 when no numerical input is provided.');
        });
        test('API should correctly read each valid input unit.', function() {
            assert.equal(inputUnit('3.1mi'), 'mi', 'A valid input was rejected when it should have been accepted. Valid input units are (mi|MI|km|KM|lbs|LBS|kg|KG|gal|GAL|l|L).');
            assert.equal(inputUnit('3.1MI'), 'mi', 'A valid input was rejected when it should have been accepted. Valid input units are (mi|MI|km|KM|lbs|LBS|kg|KG|gal|GAL|l|L).');
        });
        test('API should return an error for an invalid input unit.', function() {
            assert.equal(inputUnit('3.1mil'), 'invalid unit', 'An error was not returned for an invalid input unit.');
        });
        test('API should return the correct return unit for each valid input unit.', function() {
            
        })
    });
});