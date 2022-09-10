// const https = require('https');

// const options = {
//     method: 'GET',
//     headers: { 'Authorization': `Bearer 00D8d000005BGrx!AQEAQNp6M_VQ1cSM.XRuAfj1EUt2ojbWDEx_9e454vbfKTSSH0gc25kSPmCihQY7_s6M8HXECi_f1nvdRGk_4q3PF0PWJxQM` },
// };

// const req = https.request("https://rea3-dev-ed.my.salesforce.com/services/apexrest/Property", options, res => {
//     console.log(`statusCode: ${res.statusCode}`);
//     let body = "";
//     console.log('res options: ', res);

//     res.on('data', d => {
//         body += d;
//     });
//     res.on("end", () => {
//         try {
//             let json = JSON.parse(body);
//             console.log('json :', json);

//         } catch (error) {
//             console.error(error.message);
//         };
//     });
// });

// req.on('error', error => {
//     console.error(error);
// });

// req.end();

