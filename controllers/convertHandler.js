function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    // let splitArr = input.split(/\D/);
    result = input.match(/^\d+(\.\d+)?(\/\d+(\.\d+)?)?$/);
    if(!result) {
      return 1;
    } else {
      return eval(result[0]);
    }
  };
  
  this.getUnit = function(input) {
    let result;
    // let splitArr = input.split(/^\d/);
    // result = input.match(/[a-zA-Z]+/);
    result = input.match(/[a-zA-Z]+/);
    return result[0];
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
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
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