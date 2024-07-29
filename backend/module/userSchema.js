const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")


const keySecret = "abcdefghijklmnopqrstuvwxyz123456"
// console.log(keySecret.length) // 32


const userSchema = new mongoose.Schema({
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




// hash password


// ! this method is not working because of arrow function arrow fuction not access of this need to define a regular function to secure the value of this


// userSchema.pre("save", async (next)=>{
//   this.password = await bcrypt.hash(this.password, 12);
//   this.cpassword = await bcrypt.hash(this.cpassword, 12);
//   next()
// })


//* this method works properly

userSchema.pre("save", async function(next){
  if(this.isModified("password")){
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
  }
  next()
})


// token generate

userSchema.methods.generateAuthtoken = async function(){
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








const userdb = new mongoose.model("users", userSchema);
module.exports = userdb;
