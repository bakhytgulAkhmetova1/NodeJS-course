const fs = require('fs');
const csv = require('csvtojson');

csv({ colParser:{
    ''
} })
    .fromFile('./csv/cities.csv')
    .then((csvObject) => {
        console.log('[csvObject]', csvObject);
        fs.writeFile('cities.txt', csvObject, (error) => {
            if (error) {
                console.log('[error]', error);
            }
        })
    });
