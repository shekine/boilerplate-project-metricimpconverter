function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    result = input.match(/\d+(\.\d+)?(\/\d+(\.\d+)?)*/);
    let doubleFracReg = /(\/\d+(\.\d+)?){2,}/;
    if(!result) {
      return 1;
    } else if(doubleFracReg.test(result[0])) {
      return "invalid number";
    } else {
      return eval(result[0]);
    }
  };
  
  this.getUnit = function(input) {
    let splitUnits = input.match(/[a-zA-Z]+/);
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
        result = 'gallon';
        break;
      case 'L':
        result = 'Liter';
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