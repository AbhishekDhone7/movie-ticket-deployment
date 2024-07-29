const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const keySecret = "abcdefghijklmnopqrstuvwxyz123456";

const adminSchema = new mongoose.Schema({
  isAdmin : Boolean,
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validator(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Not valide email");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  cpassword: {
    type: String,
    required: true,
    minlength: 6,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

adminSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
  }
  next();
});



adminSchema.methods.generateAuthtoken = async function(){
    try {
      let token23 = jwt.sign({_id : this._id }, keySecret,{
        expiresIn : "30d"
      });
      this.tokens = this.tokens.concat({token : token23});
      await this.save();
      return token23;
    } catch (error) {
      res.status(422).json(error)
    }
  }




  const admindb = new mongoose.model("admins", adminSchema);
  module.exports = admindb;