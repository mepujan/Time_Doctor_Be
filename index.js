import express from 'express';

const app = express();

app.get("/",(req,res)=>{
    res.send("Welcome to Time Doctor");
});


app.listen(3000,()=>console.log("App is running"));