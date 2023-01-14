const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session')
const connection = require('./db/connector.js')


const bodyParser = require('body-parser');
const indexRouter = require('./routes/index.js');

const app = express();

app.use(cookieSession({
  name: 'session_id',
  keys: ['nobodyknows','shitIforgot'],
  maxAge: 24 * 60 * 60 * 1000,
  secure:false,
  httpOnly:true,
  signed:false}))
app.set("trust proxy", 1);
app.set('view engine', 'ejs');

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit: '1mb', extended: true}));
app.set('views', path.join(__dirname, 'views'));
app.use('/', indexRouter);
app.post('/formdata',async(req,res)=>{
  console.log(req.user);
  res.send();
})
app.use((err,req,res,next)=>{
  if(err)
    res.status(400).send("Congratulations little fellow,you created an uncaught exception! Not enough to win the CTF but atleast you can pat yourself on the back!");
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

module.exports = app;
