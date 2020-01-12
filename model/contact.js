const mongoose=require('mongoose');
//defining the schema
const contactSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    }
});
//now i will be using contactSchema schema to make model out of it
//model is just like a table we can think like Contact is a table 
const Contact=mongoose.model('Contact',contactSchema);


//now exporting out Contact
module.exports=Contact;
