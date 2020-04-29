const signinHandler = (req, res, db, bcrypt) => {
    if (!req.body.email || !req.body.password){
        return res.status(400).json("Incorrect Form"); 
    }
    db.select('email', 'hash').from('login')
    .where('email','=',req.body.email)
    .then(data => {
        const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
        if (isValid){
            return db.select('*').from('users')
            .where('email','=',req.body.email)
            .then(user => {
                res.json(user[0]);
            })
            .catch(err => res.status(400).json("Error getting user"))
        } else {
            res.status(400).json("Invalid credentials")
        }
    })
    .catch(err => res.status(400).json("Invalid credentials"))
}

module.exports = {
    signinHandler:signinHandlery
};