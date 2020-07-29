const fs = require('fs');
const csv = require('csvtojson');
const zlib = require('zlib');
const { pipeline } = require('stream');
const readline = require('readline');

const CSV_PATH = './csv/books.csv';
const csvOptions = {
    noheader: false,
    headers: ['book', 'author', 'amount', 'price'],
    colParser: {
        'amount': function (item) { return +item },
        'price': function (item) { return +item }
    }
};

//Load all content into RAM

csv(csvOptions).fromFile(CSV_PATH)
    .then((csvObject) => {
        const cities = formattedData(csvObject);
        fs.writeFile('cities.txt', cities, (error) => {
            if (error) {
                //handle error
            }
        })
    });


const formattedData = (data) => {
    if (Array.isArray(data)) {
        return data.map(rowObj => (JSON.stringify(rowObj))).join('\r\n');
    }
}

//Do not load all content into RAM

function processFile() {
    const readStream = fs.createReadStream(CSV_PATH);
    const writeStream = fs.createWriteStream('file2.txt');
    const lineReader = readline.createInterface({ input: csv(csvOptions).fromStream(readStream) });

    lineReader.on('line', function (line) {
        writeStream.write(line + '\r\n')
    });
}

processFile();

