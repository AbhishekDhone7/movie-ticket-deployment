const express = require("express");
const router = new express.Router();
const bcrypt = require("bcryptjs")
const userdb = require("../module/userSchema");
const authenticate = require("../middleware/authenticate")

// for user registration
router.post("/register", async (req, res) => {
  // console.log(req.body);
  const { name, email, password, cpassword } = req.body;
  if (!name || !email || !password || !cpassword) {
    res.status(422).json({ error: "Fill all the details" });
  }

  try {
    const preUser = await userdb.findOne({ email: email });
    if (preUser) {
      res.status(422).json({ error: "This user is Alredy Exist." });
    } else if (password !== cpassword) {
      res.status(422).json({ error: "Passward confirm password not match" });
    } else {
      // console.log("pre")
      const finalUser = new userdb({
        name,
        email,
        password,
        cpassword,
      });

      // passaward hasing
      const storeData = await finalUser.save();
      console.log(storeData);
      res.status(201).json({ status: 201, storeData });
    }
  } catch (error) {
    res.status(422).json(error);
    console.log("catch block error");
  }
});


// user login

router.post("/login" , async (req, res)=>{
  // console.log(req.body);
  const {  email, password } = req.body;
  if ( !email || !password ) {
    res.status(422).json({ error: "Fill all the details" });
  }
  try {
    const userValid = await userdb.findOne({email : email});

    if(!userValid){
      return res.status(422).json({error : "Please Register"})
    }
    if(userValid){
      const isMatch = await bcrypt.compare(password , userValid.password);

      if(!isMatch){
        res.status(422).json({error : "invalid password"})
      }else{
        // token generate
        const token = await userValid.generateAuthtoken();
        // console.log(token);
        // cookie generation
        res.cookie("usercookie" , token,{
          expires : new Date(Date.now() + (1000 * 60 * 15 )),
          httpOnly : true
        });

        const result = {
          userValid,
          token
        }
        res.status(201).json({status : 201, result});
      }
    }
  } catch (error) {
    res.status(201).json(error);
    console.log("catch Block error")
  }
})


//  user valid 

router.get("/valid_user/:id" ,authenticate, async (req, res)=>{
  // console.log("done")

  try {
    const  ValideUserOne = await userdb.findOne({_id: req.userId });
    res.status(201).json({status : 201, ValideUserOne})
    
  } catch (error) {
    
    res.status(401).json({status : 401, error})
  }
})


router.get("/logout/:id" ,authenticate, async (req, res)=>{
  // console.log("done")

  try {
    req.rootUser.tokens = req.rootUser.tokens.filter((curentElement)=>{
      return curentElement.token !== req.token
    });

    res.clearCookie("usercookie" , {path : "/"});

    req.rootUser.save();
    
    res.status(201).json( {status : 201} )
    
  } catch (error) {
    
    res.status(401).json({status : 401, error})
  }
})




module.exports = router;
