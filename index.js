const express=require('express');
const path=require('path');
const port=8000;


const db=require('./config/mongoose.js');
const Contact=require('./model/contact.js');
const app=express();

app.set('view engine','ejs'); //to tell express about ejs and add property view engine as ejs to app
app.set('views',path.join(__dirname,'views')); //to create path to views dynamicallly
app.use(express.urlencoded()); // this is parser to add browser data to request object in a body key
app.use(express.static('assets'));
//MiddleWare1
// app.use(function(req,res,next){

//     //console.log("Middleware1 called");
//     req.myname="vanshaj kapoor"

//     next();
// });
// //MiddleWare2
// app.use(function(req,res,next){
//     //console.log("MiddleWare2 Called");
//     console.log("My name is vanshaj from MiddleWare2: ",req.myname);
//     next();
// });

// var contactList=[

//     {
//         name:"Vanshaj Kapoor",
//         phone:"0000000000"
//     },
//     {
//         name:"Tony Stark",
//         phone:"1111111111"
//     },
//     {
//         name:"Coding Ninjas",
//         phone:"2222222222"
//     }
// ];
//there are no switch cases like they were present in node.js
app.get('/',function(req,res){
    // console.log(req.myname);
    //console.log(__dirname);
    //res.send('<h1>Cool, I Am atHome</h1>')
    //now instead of sending html like in above statement we will send ejs view . benefits of this is  we dont need any fs to read the whole file
    //and we directly provide with the name of the ejs file which needs to be rendered from views folder
    // res.render('home',{
    //     title:'I am Flying',
    //     contact_list:contactList
    // });

    //code for fetching from the database

    Contact.find({},function(err,contacts){
        if(err){
            console.log("Error in fetching contact from database");
            return;
        }
        res.render('home',{
            title:'I am Flying',
            contact_list:contacts
        });
        
    });

});

app.get('/practice',function(req,res){
   res.render('practice',{
       title:"Let Us Play With EJS"
   })
   
});



app.post('/create-contact',function(req,res){
    //res.redirect('/practice');

    //console.log(req.body);
    //console.log(req.body.name);
    //console.log(req.body.phone);

    //pushing data received from browser into conactList array

    // contactList.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    // });
    // contactList.push(req.body);
    // res.redirect('/');
    // res.redirect('back');

    //following code does not uses contactList aray and uses mongo db to add in contacts

    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    },function(err,newContact){
        if(err){
            console.log('error in creating a new contact');
            return;
        }
        //console.log('******',newContact);
        return res.redirect('back');
    });
});

//the below code is for accessing param

// app.get('/delete-contact/:phone',function(req,res){
//     console.log(req.params);
// });

//the below code for using query

// app.get('/delete-contact',function(req,res){
//     // console.log(req.query);
//     //below code is for deleting from contactList(ram) and not database
//     // let phone=req.query.phone;
//     // let contactIndex=contactList.findIndex(contact => contact.phone==phone);
//     // if(contactIndex!=-1){
//     //     contactList.splice(contactIndex,1);
//     // }
//     // return res.redirect('back');


//     //following code deletes from database mongo db 

//     //get the id from query passed in home.ejs by anchor tag 
//     let id=req.query.id;
//     //find the contact from database matching id and delete ... we will not use for loop and use inbuilt fucntion because it is way more efficient

//     Contact.findByIdAndDelete(id,function(err){
//         if(err){
//             console.log("E");
//             return;
//         }
//         return res.redirect('back');
//     })

    

    
// });

// app.get('/delete-contact',function(req,res){
//     let id=req.query.id;
//     Contact.findByIdAndDelete(id,function(err){
//       if(err){
//             console.log("E");
//             return;
//         }
//         return res.redirect('back');
//     })
// });

app.get('/delete-contact/', function(req, res){
    // console.log(req.query);
    let id = req.query.id;
  
    Contact.deleteOne({_id:id},function(err){
        if(err){
            console.log("Error");
        }
        return res.redirect('back');
    })


   
});




app.listen(port,function(err){
    if(err){
        console.log("Error occured while running server",err);

    }
    console.log("Yup! Server is running fine on port number: ",port);
});

