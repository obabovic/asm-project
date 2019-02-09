const primaryPath ='csv/primary.csv';
const secondaryPath ='csv/secondary.csv';
const actorsPath ='csv/actors.csv';
const moviesPath ='csv/movies.csv';
const genresPath ='csv/genres.csv';
const directorsPath ='csv/directors.csv';
const csvToJson = require('csvtojson');
const jsonToCsv = require('json-2-csv');
const fs = require('fs');
var path = require('path');
var glob = require('glob');

var prim = []
var act = []
var mov = []
var gen = []

const zadatak = "edge-years-movies"

csvToJson()
.fromFile(primaryPath)
.then(primary => {
    prim = primary
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
    gen = genres
    return csvToJson()
        .fromFile(directorsPath)
}).then(directors => {
    var obj = {
        "primary": prim,
        "actors": act,
        "movies": mov,
        "genres": gen,
        "directors": directors
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
        var appender = ""
        if (index != 1) appender = "-" + index

        fs.writeFile(`zadaci/${zadatak}/${zadatak}${appender}.csv`, csv, 'utf8', function(err) {
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