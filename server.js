require('dotenv').config();
const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

// parse JSON
app.use(bodyParser.json({ type: 'application/json' }))

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/api/amazing_quote', (req, res) => {
    var postData = JSON.stringify(req.body);
    var options = {
        hostname: 'j950rrlta9.execute-api.us-east-2.amazonaws.com',
        port: 443,
        path: '/v1/ArgoChallenge',
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'x-api-key': process.env.AMAZE_KEY
            }
    };

    var postReq = https.request(options, (postRes) => {
        // console.log('statusCode:', postRes.statusCode);
        // console.log('headers:', postRes.headers);

        postRes.on('data', (d) => {
            // process.stdout.write(d);]
            res.send(JSON.parse(d));
        });
    });  

    postReq.on('error', (e) => {
        console.error('ERROR:::::: ', e);
    });

    postReq.write(postData);
    postReq.end();
  
});
/*
0: {name: "owner_name", reason: "Owner name must be a string."}
1: {name: "model", reason: "Jet model name must be a string."}
2: {name: "seat_capacity", reason: "Seating capacity of jet must be a number."}
3: {name: "manufactured_date", reason: "Manufactured date must be a string in ISO format."}
4: {name: "purchase_price", reason: "Purchase price of jet must be a number."}
5: {name: "broker_email", reason: "Broker e-mail must be a string."}
*/

app.listen(port, () => console.log(`Listening on port ${port}`));