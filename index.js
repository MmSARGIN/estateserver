const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const https = require('https');
const { createEstate, getEstate } = require('./pg');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const options = {
    method: 'GET',
    headers: { 'Authorization': `Bearer 00D8d000005BGrx!AQEAQNp6M_VQ1cSM.XRuAfj1EUt2ojbWDEx_9e454vbfKTSSH0gc25kSPmCihQY7_s6M8HXECi_f1nvdRGk_4q3PF0PWJxQM` },
};

let info;
let estate;
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

app.get('/', (request, response) => {
    response.send(info);

    // getEstate()
    //     .then(res => {
    //         console.log('getten gelen', res);


    //     }
    //     )

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

});

app.listen(3000, () => {
    console.log('Server is running :)...');
});