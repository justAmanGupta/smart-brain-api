const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '0bd0da2c577d4166b4b7f218fe2a0b2d'
});

const handleAPICall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input) 
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json("Unable to work for the image"))   
}


const imageHandler = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id','=',id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json("Couldn't get entries"))
}

module.exports = {
    imageHandler: imageHandler,
    handleAPICall: handleAPICall
};