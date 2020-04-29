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
        connectionString: process.env.DATABASE_URL,
        ssl: true,
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
    res.send("IT IS WORKKKKKKING HUR")
})

app.get('/profile/:id', (req, res) => {profile.profileHandler(req, res, db)})

app.post('/signin', (req, res) => {signin.signinHandler(req, res, db, bcrypt)})

app.post('/register', (req, res) => {register.registerHandler(req, res, db , bcrypt)})

app.put('/image', (req, res) => {image.imageHandler(req, res, db)})

app.post('/imageUrl', (req, res) => {image.handleAPICall(req, res)})


app.listen(process.env.PORT || 3000, () => {
    console.log(`its running on port ${process.env.PORT}`);
});

