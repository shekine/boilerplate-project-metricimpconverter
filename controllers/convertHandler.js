function ConvertHandler() {
  
  this.getNum = function(input) {
    /* splitNum separates our units from number. result matches expected inputs including some outliers such as double decimals and double fractions. In the logic section, if no number is inputted, input becomes 1. If our numerical input does not match expected input options (such as obvious non numbers 2//2 2..2) it throws an error. If it contains double fractions or decimals (2.2.2 2/2/2) it throws an error. */
    let splitNum = input.match(/.*?(?=[a-zA-Z])/);
    let result = input.match(/\d+(\.\d+)*(\/\d+(\.\d+)*)*/);
    let doubleDecReg = /(\.\d+){2,}/;
    let doubleFracReg = /(\/\d+(\.\d+)?){2,}/;

    if(!result) {
      return 1;
    } else if(splitNum[0] !== result[0]) {
      return "invalid number";
    } else if(doubleDecReg.test(result[0])) {
      return "invalid number";
    } else if(doubleFracReg.test(result[0])) {
      console.log("doublefraction");
      return "invalid number";
    } else {
      return eval(result[0]);
    }
    
  };
  
  this.getUnit = function(input) {
    let splitUnits = input.match(/[a-zA-Z]+/);
    if(splitUnits == null) {return 'invalid unit';}
    let result = splitUnits[0].match(/^(mi|MI|km|KM|lbs|LBS|kg|KG|gal|GAL|l|L)$/);
    if(!result) {
      return 'invalid unit';
    } else if(result[0] == 'L' || result[0] == 'l') {
      return result[0].toUpperCase();
    } else {
      return result[0].toLowerCase();
    }
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    switch(initUnit) {
      case 'gal':
        result = 'L';
        break;
      case 'L':
        result ='gal';
        break;
      case 'lbs':
        result = 'kg';
        break;
      case 'kg':
        result = 'lbs';
        break;
      case 'mi':
        result = 'km';
        break;
      case 'km':
        result = 'mi';
        break;
      default: return "This unit is not included in this converter.";
    }

    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    switch(unit) {
      case 'gal':
        result = 'gallons';
        break;
      case 'L':
        result = 'Liters';
        break;
      case 'lbs':
        result = 'pounds';
        break;
      case 'kg':
        result = 'kilograms';
        break;
      case 'km':
        result = 'kilometers';
        break;
      case 'mi':
        result = 'miles';
        break;
      default: return "This unit is not included in this converter.";
    }
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch(initUnit) {
      case 'gal':
        result = Math.round(initNum * galToL * 100000) / 100000;
        break;
      case 'L':
        result = Math.round(initNum / galToL * 100000) / 100000;
        break;
      case 'lbs':
        result = Math.round(initNum * lbsToKg * 100000) / 100000;
        break;
      case 'kg':
        result = Math.round(initNum / lbsToKg * 100000) / 100000;
        break;
      case 'mi':
        result = Math.round(initNum * miToKm * 100000) / 100000;
        break;
      case 'km':
        result = Math.round(initNum / miToKm * 100000) / 100000;
        break;
      default: return "Conversion failed. Check number and units given.";
    }

    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    return result;
  };
  
}

module.exports = ConvertHandler;