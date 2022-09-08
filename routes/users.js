const express = require("express")
const router = express.Router()

router.get("/",(req,res)=>{
    res.send(`User List`)
})

router.get("/new",(req,res)=>{
    res.render("users/new",{firstName:"Testing"})
})

router.post("/",(req,res)=>{
    res.send(`New User Post`)
    //res.render("users/new")
})

router
    .route("/:id")
    .get((req,res)=>{
  
        res.send(`Get User with ID: ${req.params.id}`)
    }).put((req,res)=>{
  
        res.send(`Update User with ID: ${req.params.id}`)
    }).delete((req,res)=>{
  
        res.send(`Delete User with ID: ${req.params.id}`)
    })

    /*router.param("id",(req,res,next,id)=>{
        console.log(id)
        next()
    })*/

module.exports = router