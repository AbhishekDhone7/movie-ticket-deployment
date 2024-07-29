// const express = require("express");
const userdb = require("../module/userSchema");
const jwt = require("jsonwebtoken");
const keySecret = "abcdefghijklmnopqrstuvwxyz123456";

const authenticate = async (req, res, next) => {
  try {
    const token = req.params.id;
    // console.log(token);

    const verifyToken = jwt.verify(token, keySecret);
    // console.log(verifyToken);
    const rootUser = await userdb.findOne({ _id: verifyToken._id });
    // console.log(rootUser);

    if (!rootUser) {
      throw new Error("User Not Found");
    }
    req.token = token;
    req.rootUser = rootUser;
    req.userId = rootUser._id;

    next();
  } catch{
    res.status(401).json({status:401,message:"Unauthorized no token provide"})
  }
};

module.exports = authenticate;
