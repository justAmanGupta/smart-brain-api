const express = require('express');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
var cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'postpass',
      database : 'smart-brain'
    }
  });

db.select('*').from('users')
.then(data => {
    console.log(data);  
}).catch(err => console.log(err));

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send(database.users)
})

app.get('/profile/:id', (req, res) => {profile.profileHandler(req, res, db)})

app.post('/signin', (req, res) => {signin.signinHandler(req, res, db, bcrypt)})

app.post('/register', (req, res) => {register.registerHandler(req, res, db , bcrypt)})

app.put('/image', (req, res) => {image.imageHandler(req, res, db)})

app.post('/imageUrl', (req, res) => {image.handleAPICall(req, res)})


app.listen(3000, () => {
    console.log("its running");
});

