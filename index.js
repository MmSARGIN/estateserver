const express = require('express');
const app = express();
require('dotenv').config()
const bodyParser = require('body-parser');
const https = require('https');
const { createEstate, getEstate } = require('./pg');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const options = {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${process.env.BEARER}` },
};

let info;
let estate;


app.get('/', (request, response) => {

    const req = https.request("https://rea3-dev-ed.my.salesforce.com/services/apexrest/Property", options, res => {
        console.log(`statusCode: ${res.statusCode}`);
        let body = "";
        res.on('data', d => {
            body += d;
        });
        res.on("end", () => {
            try {
                info = JSON.parse(body);

            } catch (error) {
                console.error(error.message);
            };
        });
    });
    req.on('error', error => {
        console.error(error);
    });
    req.end();

    // getEstate()
    //     .then(res => {
    //         console.log('getten gelen', res);


    //     }
    //     )
    if (info) {
        for (let i = 0; i < info.length; i++) {
            estate = info[i];
            createEstate(estate)
                .then(response => {
                    console.log('OLDU');
                })
                .catch(error => {
                    console.log('error mal : ', error);
                })
        }
        response.send(info);
    } else {
        response.send('Refresh Page');
    }


});

app.listen(3000, () => {
    console.log('Server is running :)...');
});