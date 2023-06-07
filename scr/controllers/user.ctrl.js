const User = require("../model/userSchema.model")
const express = require("express")
const Router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt= require("bcrypt")



Router.post("/register", async(req,res)=>{

    
    try {
           const {user, email,password,role} = req.body

const ispresent = await User.findOne({email})

if (ispresent) {
    return res.send('user is already registered')
}
bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          user: req.body.user,
          email: req.body.email,
          password: hash,
          role: req.body.role
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  const createduser = await User.create({user, email,password, role})

   res.send(createduser)

} catch (error) {
        res.send({error:error.message})
}

})

Router.post("/login", async(req,res)=>{

    try {
           const {email,password} = req.body

const ispresent = await User.findOne({email})

if (!ispresent) {
    return res.send('user is not registered')
}
if(password !== ispresent.password){
res.send("invalid password")
}

const payload = {userId:ispresent._id, role:ispresent._role}
const token = jwt.sign(payload, "kayor", 
{expiresIn:'2h'})
   res.send({message:"logged in successfully", token})

} catch (error) {
        res.send({error:error.message})
}

})

module.exports = Router
