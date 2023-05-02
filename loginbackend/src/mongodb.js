const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/admin")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log("failed to connected");
});

const LogInSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})


const collection=new mongoose.model("C",LogInSchema)

module.exports=collection