const mongoose=require('mongoose');
require('./employeemodel');
mongoose.connect('mongodb://localhost/employee', {useNewUrlParser: true,useUnifiedTopology: true,useFindAndModify: false })
.then(()=>{
    console.log('connected to mongodb');    
})
.catch(err=>{console.log('error in connection with mongodb',err)})

