const secondaryPath ='csv/secondary.csv';
const actorsPath ='csv/actors.csv';
const moviesPath ='csv/movies.csv';
const genresPath ='csv/genres.csv';
const csvToJson = require('csvtojson');
const jsonToCsv = require('json-2-csv');
const fs = require('fs');
var path = require('path');
var glob = require('glob');

var act = []
var mov = []
var sec = []

const zadatak = "3"

csvToJson()
.fromFile(secondaryPath)
.then(secondary => {
    sec = secondary
    return csvToJson()
        .fromFile(actorsPath)
}).then(actors => {
    act = actors
    return csvToJson()
        .fromFile(moviesPath)
}).then(movies => {
    mov = movies
    return csvToJson()
        .fromFile(genresPath)
}).then(genres => {
    var obj = {
        "secondary": sec,
        "actors": act,
        "movies": mov,
        "genres": genres
    };

    glob.sync(`./zadaci/${zadatak}/index.js`).forEach( function( file ) {
        require(path.resolve(file)).format(obj).forEach((csv, index) => {    
            printToCsv(csv, index+1);
        })
    });
})

function printToCsv(arr, index) {
    let f = function (err, csv) {
        if (err) throw err;
        fs.writeFile(`zadaci/${zadatak}/output-${zadatak}-${index}.csv`, csv, 'utf8', function(err) {
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