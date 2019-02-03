const csvFilePath='csv/secondary.csv';
const csvToJson = require('csvtojson');
const jsonToCsv = require('json-2-csv');
const fs = require('fs');
var path = require('path');
var glob = require('glob');

csvToJson()
.fromFile(csvFilePath)
.then((arr)=> {
    glob.sync('./zadaci/1/index.js').forEach( function( file ) {
        require(path.resolve(file)).format(arr).forEach((csv, index) => {    
            printToCsv(csv, index+1);
        })
    });
})

function printToCsv(arr, index) {
    let f = function (err, csv) {
        if (err) throw err;
        fs.writeFile(`zadaci/1/output-${index}.csv`, csv, 'utf8', function(err) {
          if (err) {
            console.log('Some error occured - file either not saved or corrupted file saved.');
          } else {
            console.log('It\'s saved!');
          }
        });
    };
    

    jsonToCsv.json2csv(arr, f, {
        prependHeader: true  
    });
}