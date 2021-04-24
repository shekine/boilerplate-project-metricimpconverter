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
        let numRegex = /\d+(\.\d+)?(\/\d+(\.\d+)?)?/;
        let unitRegex = /[a-zA-Z]+/;
        let initNum = input.split(/\D/)[0];
        let initUnit = input.split(/^\d/)[1];
        
        if(input.match(numRegex)[0] == "") {
          console.log('invalid number');
        }
        if(input.match(unitRegex)[0] == "") {
          console.log('invalid unit');
        }
      }
      
    })

};
