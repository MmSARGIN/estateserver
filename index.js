const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const https = require('https');





app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (request, response) => {



    let body = "";
    let json = '';
    const options = {
        method: 'GET',
        headers: { 'Authorization': `Bearer 00D8d000005BGrx!AQEAQNp6M_VQ1cSM.XRuAfj1EUt2ojbWDEx_9e454vbfKTSSH0gc25kSPmCihQY7_s6M8HXECi_f1nvdRGk_4q3PF0PWJxQM` },
    };

    const mel = https.request("https://rea3-dev-ed.my.salesforce.com/services/apexrest/Property", options, res => {
        console.log(`statusCode: ${res.statusCode}`);



        res.on('data', d => {
            body += d;
        });
        res.on("end", () => {
            try {
                this.json = JSON.parse(body);

            } catch (error) {
                console.error(error.message);
            };
        });
    });

    mel.on('data', data => {
        console.log('data :', data);

    })

    mel.on('error', error => {
        console.error(error);
    });

    mel.end();

    response.send('mal');



});


app.listen(3000, () => {
    console.log('Uygulama çalıştırıldı...');
});