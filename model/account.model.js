const mongoose = require("mongoose");
const generate = require("../helpers/generate.js") ;

const accountSchema = new mongoose.Schema(
  {
    fullname: String,
    email: String,
    password: String,
    token: {
      type : String ,
      default : generate.generateToken(20) ,
    } ,
    phone: String,
    status: String,
    delete: {
      type: Boolean,
      default: false,
    },
    deleteAt: Date,
  },
  {
    timestamps: true,
  }
);

const Account = mongoose.model("Account" , accountSchema , "account") ;

module.exports = Account ;

