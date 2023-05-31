const { check } = require("express-validator");
var validator = require("email-validator");

validator.validate("test@email.com");
var emailRegex =
  /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

const emailValidtaion = function isEmailValid(email) {
  if (!email) return false;

  if (email.length > 254) return false;

  var valid = emailRegex.test(email);
  if (!valid) return false;

  // Further checking of some things regex can't handle
  var parts = email.split("@");
  if (parts[0].length > 64) return false;

  var domainParts = parts[1].split(".");
  if (
    domainParts.some(function (part) {
      return part.length > 63;
    })
  )
    return false;

  return email;
};

const validatePin = function validatePIN(pin) {
  if (pin.length === 4 || pin.length === 6) {
    if (/[0-9]/.test(pin)) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
};

const mobileValidation = function validate(phone) {
  var regx = /^[6-9]\d{9}$/;
  if (regx.test(phone)) {
    return true;
  } else return false;
};



var regexp = /^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$/; 

const checkAadharNumber= function checkAadharNumber (aadhar){
  if(regexp.test(aadhar)) { 
    console.log("Valid Aadhaar Number"); 
    return true; 
    }else{ 
    console.log("Invalid Aadhaar Number"); 
     return false; 
    }
}
module.exports = { emailValidtaion, validatePin, mobileValidation ,checkAadharNumber};
