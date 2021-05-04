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
      let initNum = convertHandler.getNum(input);
      let initUnit = convertHandler.getUnit(input);

      if(initNum == "invalid number" && initUnit == "invalid unit") {
        return res.send("invalid number and unit");
      } else if(initNum == "invalid number" && initUnit == "") {
        return res.send(initNum);
      } else if(initNum == "invalid number") {
        return res.send(initNum);
      } else if(initUnit == "invalid unit") {
        return res.send(initUnit);
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
    });

};
