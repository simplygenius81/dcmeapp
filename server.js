const express=require('express')
const { auth } = require('express-openid-connect')
const { requiresAuth } = require('express-openid-connect');
const app = express()


/*app.use(
    auth({
      routes: {
        // Override the default login route to use your own login route as shown below
        login: false,
        // Pass a custom path to redirect users to a different
        // path after logout.
        postLogoutRedirect: '/custom-logout',
      },
    })
  );*/


const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'a long, randomly-generated string stored in env',
    baseURL: 'http://0.0.0.0:4000',
    clientID: 'K4OzmFNXWDPXLoqk0iovxWQk0ehOrSrf',
    issuerBaseURL: 'https://cerebum.au.auth0.com'
    //redirect_uri:'http://0.0.0.0/profile'
  };



  app.use(auth(config));

  

const port=process.env.PORT || 4000

app.use(express.static("public"))

app.set('view engine','ejs')
app.use(logger)

/*
app.get('/',(req,res,next) => {
    //console.log("Here")
    //res.status(500).json({ message: "Error" })
    //res.send("Hi")
    //res.download("server.js")
    res.render('index',{text: "testworld"})
})*/



app.get('/',(req,res,next) => {
    //console.log("Here")
    //res.status(500).json({ message: "Error" })
    //res.send("Login")
    //res.download("server.js")
    //res.render('index',{text: "testworld"})
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
})

app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
  });

app.get('/admin', requiresAuth(), (req, res) => {
    res.send("Admin")
}); 

app.get('/static',(req,res,next) => {
    //console.log("Here")
    //res.status(500).json({ message: "Error" })
    //res.send("Hi")
    //res.download("server.js")
    res.render('index',{text: "testworld"})
})


const userRouter = require("./routes/users")

app.get('/ingress', (req, res) => res.oidc.login({ returnTo: '/profile' }));

app.get('/egress', (req, res) => res.send('Bye!'))

app.use("/users", userRouter)

function logger(req,res,next){
    console.log(req.originalUrl)
    next()
}

app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})