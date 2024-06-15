const express=require('express');
const mongoose=require('mongoose');
const app=express();
const cookieparser=require('cookie-parser');
const checkauthonticationcookie=require("./middleware/authmid");
const userrouter=require('./routes/user.router');
const bodyparser=require('body-parser');

app.use(express.json());


mongoose.connect('mongodb://localhost:27017/test')
.then(()=>console.log('Connected to MongoDB'))
.catch(err=>console.error('Could not connect to MongoDB',err));
app.use(cookieparser());
app.use(checkauthonticationcookie('token'));

app.get('/',(req,res)=>{
    res.send('Hello World');
}
);
app.get('/user/register',(req,res)=>{
    res.send('Register Page');
});
app.use('/user',userrouter);

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
}
);  