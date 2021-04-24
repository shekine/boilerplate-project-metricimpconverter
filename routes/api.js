'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');
const express = require('express');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app
    .route('/api/convert')
    .get(function(req, res) {
      let input  = req.query.input;
      let regex = /^\d*(\.\d+)?(\/\d+(\.\d+)?)?(mi|MI|km|KM|lbs|LBS|kg|KG|gal|GAL|l|L)$/;
      if(regex.test(input)) {
        let initNum = convertHandler.getNum(input);
        let initUnit = convertHandler.getUnit(input);
        let returnUnit = convertHandler.getReturnUnit(initUnit);
        let spelledOutInitUnit = convertHandler.spellOutUnit(initUnit);
        let spelledOutReturnUnit = convertHandler.spellOutUnit(returnUnit);
        let returnNum = convertHandler.convert(initNum, initUnit);
        let string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

        console.log(initNum);
        console.log(initUnit);
        console.log(returnUnit);
        console.log(spelledOutInitUnit);
        console.log(spelledOutReturnUnit);
        console.log(returnNum);
        console.log(string);
      } else {
        console.log("something didn't work: was it the number, unit, or both?");
        let numRegex = /^\d+(\.\d+)?(\/\d+(\.\d+)?)?$/;
        let unitRegex = /^(mi|MI|km|KM|lbs|LBS|kg|KG|gal|GAL|l|L)$/;
        let initNum = input.match(/.+?(?=[a-zA-Z])/)[0];
        let initUnit = convertHandler.getUnit(input);

        console.log(initNum);
        console.log(initUnit);

        if(!numRegex.test(initNum) && !unitRegex.test(initUnit)) {
          console.log("invalid number and unit");
        } else if(numRegex.test(initNum) && !unitRegex.test(initUnit)) {
          console.log("invalid unit");
        } else if(!numRegex.test(initNum) && unitRegex.test(initUnit)) {
          console.log("invalid number");
        }
      }
      
    })

};
