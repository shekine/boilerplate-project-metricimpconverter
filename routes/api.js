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
      let returnObject = {};
      // let regex = /^\d*(\.\d+)?(\/\d+(\.\d+)?)?(mi|MI|km|KM|lbs|LBS|kg|KG|gal|GAL|l|L)$/;
      // if(1/*regex.test(input)*/) {
        let initNum = convertHandler.getNum(input);
        // if(initNum == "invalid number") {
        //   returnObject.string = initNum;
        //   res.send(returnObject);
        // }
        let initUnit = convertHandler.getUnit(input);
        // if(initUnit == "invalid unit") {
        //   returnObject.string = initUnit;
        //   res.send(returnObject);
        // }


        if(initNum == "invalid number" && initUnit == "invalid unit") {
          returnObject.string = "invalid number and unit";
          return res.send(returnObject);
        } else if(initNum == "invalid number") {
          returnObject.string = "invalid number";
          return res.send(returnObject);
        } else if(initUnit == "invalid unit") {
          returnObject.string = "invalid unit";
          return res.send(returnObject);
        } else {
          let returnUnit = convertHandler.getReturnUnit(initUnit);
          let returnNum = convertHandler.convert(initNum, initUnit);
          let string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
          returnObject.initNum = initNum;
          returnObject.initUnit = initUnit;
          returnObject.returnNum = returnNum;
          returnObject.returnUnit = returnUnit;
          returnObject.string = string;
          res.send(returnObject);
        }

      // } else {
      //   let numRegex = /^\d+(\.\d+)?(\/\d+(\.\d+)?)?$/;
      //   let unitRegex = /^(mi|MI|km|KM|lbs|LBS|kg|KG|gal|GAL|l|L)$/;
      //   let initNum = input.match(/.+?(?=[a-zA-Z])/)[0];
      //   let initUnit = convertHandler.getUnit(input);

      //   if(!numRegex.test(initNum) && !unitRegex.test(initUnit)) {
      //     res.send("invalid number and unit");
      //   } else if(numRegex.test(initNum) && !unitRegex.test(initUnit)) {
      //     res.send("invalid unit");
      //   } else if(!numRegex.test(initNum) && unitRegex.test(initUnit)) {
      //     res.send("invalid number");
      //   }
      // }
      
    })

};
