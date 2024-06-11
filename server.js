 const express=require("express");
 const mongojs=require("mongojs");
 const bodyParser=require("body-parser");
const app=express();
var cors = require('cors');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))
var db=mongojs("mongodb+srv://jaswanthvarma:jaswanthvarma@cluster1.dyfqfx7.mongodb.net/netflix_clone",["userlogin"]);
app.get("/",cors(),(req,res)=>{
    res.send("hello");
})
app.post("/userlogin",async(req,res)=>{
    var data=JSON.parse(Object.keys(req.body));
    db.userlogin.find({email:data.email,password:data.password},function(err,docs){
        if(docs.length>=1){
            res.json({status:"true"});
        }
        else{
            res.json({status:"false"});
        }
    });
})
app.post("/usersignup",async(req,res)=>{
    var data=JSON.parse(Object.keys(req.body));
    db.userlogin.find({email:data.email,password:data.password},function(err,docs){
        if(docs.length>=1){
            res.json({status:"exist"});
        }
        else{
            db.userlogin.insert({username:data.username,email:data.email,password:data.password},function(err,docs){
                res.json({status:"true"});
            })
        }
    });
})
app.listen(8000,()=>{
    console.log("server is started");
})
