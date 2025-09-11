const validator = require('validator');


const validations = (req)=>{
    console.log("in validation")
    const {firstName,emailId,password}=req.body
    if(!firstName){
        throw new Error ("Invalid Name")
    }
    if(!validator.isEmail(emailId)){
        throw new Error ("Invalid Mail")
    }
    if(!validator.isStrongPassword(password)){
        throw new Error ("Password is weak")
    }
}

const validateEditFields = (req) => {
  const notValidFields = ["emailId", "password", "gender", "age"];

  const hasInvalidField = Object.keys(req.body).some((key) =>
    notValidFields.includes(key)
  );

  return !hasInvalidField;
};


module.exports = {validations,validateEditFields}