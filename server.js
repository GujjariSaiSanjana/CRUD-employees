require('dotenv').config();
const express=require('express');
const session=require('express-session');
const mongoose = require('mongoose');

const app=express();
const PORT =process.env.PORT||4000;

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db=mongoose.connection;
db.on("error",(error)=>console.log(error));
db.once("open",()=>console.log("connected to the database!"));
 //middle middlewares
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(
    session({
        secret:"My secret key",
        saveUninitialized:true,
        resave:false,
    })
);
app.use((req,res,next)=>{
    res.locals.message=req.session.message;
    delete req.session.messgae;
    next();
});

//set template 
app.set('view engine','ejs');

//route 
app.use("",require("./routes/routes"))
app.listen(PORT,()=>{
    console.log(`server started at http://localhost:${PORT}`)
});