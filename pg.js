const Pool = require('pg').Pool
require('dotenv').config()
const pool = new Pool({
    user: `${process.env.USER_NAME}`,
    host: `${process.env.HOST}`,
    database: `${process.env.DATABASE}`,
    password: `${process.env.PASSWORD}`,
    port: 5432,
});
let records;
console.log('env', process.env.USER_NAME);


// const getEstate = (body) => {

//     return new Promise(function (resolve, reject) {

//         pool.query('SELECT * FROM estates')
//             .then(res => {
//                 console.log('get oldu kanka')
//                 resolve(res.rows);
//             })
//             .catch(e => console.error(e.stack))

//     })
// }
const createEstate = (body) => {
    return new Promise(async function (resolve, reject) {
        const { Name } = body
        console.log('pgden body : ', Name);
        await pool.query(`SELECT propertyname FROM estates WHERE propertyname = '${Name}'`)
            .then(res => {
                records = res.rows;
                console.log('SELECTTEN GELEN :', records.length);
            })
        if (records.length == 0) {
            pool.query('INSERT INTO estates (propertyname) VALUES ($1) RETURNING *', [Name])
                .then(res => console.log('kanka', res.rows))
                .catch(e => console.error(e.stack))
            resolve(`User created `)
        } else {
            console.log('This name already exist in database');
        }

    })
}
module.exports = {
    createEstate,
    // getEstate
}