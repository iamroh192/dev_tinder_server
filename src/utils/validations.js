const validator = require('validator');


const validations = (req)=>{
    const {firstName,emailId,password}=req.body
    console.log("in validation")
    if(!firstName){
        console.log("in firstName")
        throw new Error ("Invalid Name")
    }
    if(!validator.isEmail(emailId)){
        console.log("in email")
        throw new Error ("Invalid Mail")
    }
    if(!validator.isStrongPassword(password)){
        console.log("in password")
        throw new Error ("Password is weak")
    }
    console.log("after validation")

}

const validateEditFields = (req) => {
  const notValidFields = ["emailId", "password", "gender", "age"];

  const hasInvalidField = Object.keys(req.body).some((key) =>
    notValidFields.includes(key)
  );

  return !hasInvalidField;
};


module.exports = {validations,validateEditFields}