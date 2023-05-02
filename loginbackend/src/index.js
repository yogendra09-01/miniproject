const express=require("express")
const {engine}=require('express-handlebars');
const path=require("path")
const a=path.join(__dirname,'../public')
const app=express();
app.use(express.static(a));

const hbs=require("hbs")
//const collection=require("./mongodb")

// const res = require("express/lib/response")


const tempelatePath=path.join(__dirname,'../tempelates')
//app.use(express.static('public'));
app.use(express.json())


app.set("views",tempelatePath)
app.engine('.hbs',engine({
    extname:'.hbs',defaultLayout:false,
    layoutsDir:'templeates'
}))
app.set("view engine","hbs");

app.use(express.urlencoded({extended:true}))
app.get("/",(req,res)=>{
    res.render("login")
})

app.get("/signup",(req,res)=>{
    res.render("signup")
})
app.get("/home",(req,res)=>{
    res.render("home")
})
 

app.get("/about.html",(req,res)=>{
    res.render("about")
})

const { MongoClient } = require('mongodb');
   const url = 'mongodb://127.0.0.1:27017';
   const client = new MongoClient(url);
 const database = 'login';
let collection;

 async function connectdb() {
  let result = await client.connect();
        let db = result.db(database);
    collection = db.collection('C');  } 
    connectdb();
app.post("/signup",async(req,res)=>{

const data={
    "name":req.body.email,
    "password":parseInt(req.body.password)
}    

await collection.insertMany([data]); 

res.sendFile(path.join(__dirname,'../public/home.html'));

})

app.post("/login",async(req,res)=>{

 try{
    const check=await collection.findOne({"name":req.body.email})
     console.log(check.password);
    if(check.password===parseInt(req.body.password)){
        res.sendFile(path.join(__dirname,'../public/home.html'));
    }
    else{
        res.send("wrong password")
    }

 }
 catch{
    res.send("wrong detail")
 }
}
)

app.listen(3000,()=>{
    console.log("port connected");
}) 