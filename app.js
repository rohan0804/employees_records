const express=require('express');
const bodyparser=require('body-parser');
const path=require('path');
const rootdir=require('./utils/path');
const app=express();
app.use(express.static('public'));
app.use(express.static("views"));
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.set('view engine','ejs');
//impoting from a routes
const amdinroute=require('./routes/admin');
const defaultroute=require('./routes/defaultroute');
app.use('/admin',amdinroute);
app.use(defaultroute);
app.listen(2500,()=>{
    console.log('node server is running at port 2500');
});