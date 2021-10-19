const functions = require("firebase-functions");
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const { document } = require("firebase-functions/v1/firestore");
//const app = require('./app');

//Dentro de la función inicial.
//await app.listen(4000)
//const db = collection();
const app = express();
app.use(cors({origin: true}));

app.get('/hello', (req, res) => {
    return res.status(200).json({message: 'Hello World'});
});

app.use(require('./routes/routes'));

exports.app = functions.https.onRequest(app);