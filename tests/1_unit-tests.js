const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    suite('Acceptable Inputs', function() {
        let inputNum = convertHandler.getNum;
        let inputUnit = convertHandler.getUnit;
        let returnUnit = convertHandler.getReturnUnit;
        let stringUnit = convertHandler.spellOutUnit;

        test('ConvertHandler will accept whole number inputs', function () {
            assert.isTrue(inputNum("3mi") % 1 == 0, 'Test failed: input is not a whole number');
        });
        test('ConvertHandler will accept decimal inputs', function() {
            assert.isTrue(inputNum('1.5mi') % 1 !== 0, 'Input is not a decimal number.');
        });
        test('ConvertHandler will accept fraction inputs', function() {
            assert.equal(eval(inputNum('3/2mi')), 1.5, 'Input is not a fraction.');
        });
        test('ConvertHandler will accept inputs using both fraction and decimal.', function() {
            assert.equal(eval(inputNum('3.1/2mi')), 1.55, 'Input is not a mixed input involving fraction input and decimal.');
        });
        test('ConvertHandler will reject inputs using double-fraction (ie. 5/3/2 or 8/2/2)', function() {
            assert.equal(inputNum('3/2/3mi'), 'invalid number', 'Input with double fraction was accepted instead of rejected.');
            assert.equal(inputNum('3/5/2/7/4mi'), 'invalid number', 'Input with double fraction was accepted instead of rejected.');
        });
        test('ConvertHandler will default to input of 1 when no numerical input is provided.', function() {
            assert.equal(inputNum('mi'), 1, 'Input does not default to 1 when no numerical input is provided.');
        });
        test('ConvertHandler should correctly read each valid input unit.', function() {
            assert.equal(inputUnit('3.1mi'), 'mi', 'A valid input was rejected when it should have been accepted. Valid input units are (mi|MI|km|KM|lbs|LBS|kg|KG|gal|GAL|l|L).');
            assert.equal(inputUnit('3.1MI'), 'mi', 'A valid input was rejected when it should have been accepted. Valid input units are (mi|MI|km|KM|lbs|LBS|kg|KG|gal|GAL|l|L).');
        });
        test('ConvertHandler should return an error for an invalid input unit.', function() {
            assert.equal(inputUnit('3.1mil'), 'invalid unit', 'An error was not returned for an invalid input unit.');
        });
        test('ConvertHandler should return the correct return unit for each valid input unit.', function() {
            assert.equal(returnUnit('mi'), 'km', 'The correct unit was not returned.');
            assert.equal(returnUnit('km'), 'mi', 'The correct unit was not returned.');
            assert.equal(returnUnit('lbs'), 'kg', 'The correct unit was not returned.');
            assert.equal(returnUnit('kg'), 'lbs', 'The correct unit was not returned.');
            assert.equal(returnUnit('gal'), 'L', 'The correct unit was not returned.');
            assert.equal(returnUnit('L'), 'gal', 'The correct unit was not returned.');
        });
        test('ConvertHandler should return the spelled-out string unit for each valid input unit.', function() {
            assert.equal(stringUnit('mi'), 'miles', 'The correct spelled out unit was not returned.');
            assert.equal(stringUnit('km'), 'kilometers', 'The correct spelled out unit was not returned.');
            assert.equal(stringUnit('lbs'), 'pounds', 'The correct spelled out  unit was not returned.');
            assert.equal(stringUnit('kg'), 'kilograms', 'The correct spelled out  unit was not returned.');
            assert.equal(stringUnit('gal'), 'gallons', 'The correct spelled out unit was not returned.');
            assert.equal(stringUnit('L'), 'Liters', 'The correct spelled out unit was not returned.');
        });
    });

    suite('ConvertHandler properly converts metric/imperial', function() {
        let convert = convertHandler.convert;

        test('ConvertHandler should correctly convert gallons to Liters.', function() {
            assert.equal(convert(1, 'gal'), 3.78541, 'The correct conversion was not returned.');
        });
        test('ConvertHandler should correctly convert Liters to gallons.', function() {
            assert.equal(convert(1, 'L'), 0.26417, 'The correct conversion was not returned.');
        });
        test('ConvertHandler should correctly convert miles to kilometers.', function() {
            assert.equal(convert(1, 'mi'), 1.60934, 'The correct conversion was not returned.');
        });
        test('ConvertHandler should correctly convert kilometers to miles.', function() {
            assert.equal(convert(1, 'km'), 0.62137, 'The correct conversion was not returned.');
        });
        test('ConvertHandler should correctly convert pounds to kilograms.', function() {
            assert.equal(convert(1, 'lbs'), .45359, 'The correct conversion was not returned.');
        });
        test('ConvertHandler should correctly convert kilograms to pounds.', function() {
            assert.equal(convert(1, 'kg'), 2.20462, 'The correct conversion was not returned.');
        });
    });
});