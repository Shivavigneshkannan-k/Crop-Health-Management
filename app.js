
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const path = require("path");

//importing db models
const user = require("./models/user");
const Data = require("./models/data")
const UserDbURL = "mongodb+srv://shivavigneshkannan:a1%2Ab2%23c3k@cluster0.927qp.mongodb.net/Project_1";


//db connection
mongoose.connect(UserDbURL)
    .then((result)=>{
        console.log("connected to db")
        app.listen(PORT);
        }
    )
    .catch((err)=> console.log("_______________________________not connected",err.message))

const PORT = 5000;
const app = express();
app.use(session({
    secret: "Shiva@2005", // Secret key to sign the session ID cookie
    resave: false, // Do not save session if unmodified
    saveUninitialized: true, // Save a new session that is unmodified
    cookie: { secure: false } // Set secure to true if using HTTPS
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.get("/signInPage", (req, res) => {
    res.sendFile(path.join(__dirname, '/public', '/SignInPage.html'));
});

app.get("/signUpPage", (req, res) => {
    res.sendFile(path.join(__dirname, '/public', '/SignUpPage.html'));
});

//user Session
var user_id;

//Sign In Routing
app.post('/signIn',(req,res)=>{
    const Email = req.body['email'];
    const Password = req.body['password'];
    user.findOne({email: Email, password:Password})
        .then(result => {
            if (result) {
                user_id = result._id;
                res.sendFile(path.join(__dirname, '/public', '/mainPage.html'));
            } else {
                res.send(`
                    <script>
                        alert("Email or password is invalid");
                        window.location.href = '/signInPage';
                    </script>
                `);
            }
        }
    )
    .catch(err=> res.send("error",err));
})

//Sign Up Routing
app.post('/signUp',(req,res)=>{
    const Email = req.body['newEmail'];
    const Password = req.body['newPassword'];
    user.findOne({email:Email})
        .then(result =>{
            if (result) {
                res.send(`
                    <script>
                        alert("This Email already exists");
                        document.getElementById("sign-up-error").classList.remove("hidden");
                        window.location.href = '/signUpPage';
                    </script>
                `);
            } 
            else {
                const User = new user({
                    email:Email,
                    password:Password
                })
                User.save();
                res.redirect("/signInPage");
            }
        }) 
})

//Main Page Routing
app.get('/mainPage',(req,res)=>{
    res.sendFile(path.join(__dirname, '/public', '/mainPage.html'))
})




//Database Storing

app.post("/save",(req,res)=>{

    const Temperature = req.body["temperature"]; 
    const Humidity = req.body["humidity"]; 
    const Moisture = req.body["soil_moisture"]; 
    
    const data = new Data({
        userId:user_id,
        temperature: Temperature,
        soilMoisture:Moisture,
        humidity:Humidity
    })
    data.save() .then(() => {
        res.sendFile(path.join(__dirname, 'public', 'Save.html'));
    })
    .catch(err => {
        console.error('Error saving data:', err);
        res.status(500).send('Error saving data');
    });
    
    
})

//home page
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"/public","/SignInPage.html"))
})

