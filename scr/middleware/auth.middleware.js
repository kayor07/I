const jwt = require("jsonwebtoken")

const isAdminAuthorized = (req,res, next)=>{
const token = req.headers.authorization.split("").splice(7).join('')

if (!token) {
    return res.send("No token found")
}
console.log(token)
jwt.verify(token,"kayor", (err,decoded)=>{
    if(err){
        return null
    }
console.log(decoded)

if (decoded.role == "admin") {
    next()
}

if (decoded.role !== "admin") {
    res.send("you are not authorized to perform this action")
}

})



}


module.exports = isAdminAuthorized