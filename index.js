const express  = require('express')
const app =express();
const morgan = require('morgan')
const userModel= require('./models/user.model.js')
const dbConnection = require("./config/db.js")



app.set('view engine','ejs')


//middleware

//builtin middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
//express cant read body itself need above middlewares for that only after req.body will work 
app.use(express.static("public"))


//third party middleware
app.use(morgan("dev"));

//custom middleware
app.use((req,res,next)=>{
    const a=10
    const b=20
    console.log(10+20)
    return next() // without next server stuck at middleware only , cant reach the final destination
})


//middleware for a particular route
app.use('/login',(req,res,next)=>{
    console.log("hello this is middleware")
    next()

},
(req,res)=>{
    res.send("ha bhai agaya swad")

}
)

app.get("/",(req,res)=>{
    res.render("index")
})
app.get('/register',(req,res)=>{
    res.render('register')
})

// performing crud  operations 


//create operation 
app.post('/register', async (req,res)=>{
    //this is called destructuring
    const {username,password,email}=req.body

    //cretaing new user
    const newuser= await userModel.create({
        username:username,
        password:password,
        email:email,
    })

    res.send(newuser)

})
//read operation
app.get('/get-users',(req,res)=>{
  
    userModel.findOne({
        username:'chikoo'
    }).then((user)=>{
        res.send(user)

    })
})
app.get('/update-user', async (req,res)=>{
    await userModel.findOneAndUpdate({
        username:"chikoo"
    },{
        email:"nikhil@22228"
    })
    res.send("user updated")
})

app.get('/delete-user',async (req,res)=>{
    await userModel.findOneAndDelete({
        username:"chikoo"
    })
    res.send('userdeleted')
})


app.post('/get-form-data',(req,res)=>{
    console.log(req.body)
    res.send('data received')
})

app.listen(3000)