

module.exports = {
    format: (obj) => {
        var actors = {}
        var movies = {}
        var genres = {}
        var directors = {}

        obj.primary.forEach(row => {
            row.Actors.split(",").map(item => {
                actors[item.trim()] = true;
            });

            row.Genre.split(",").map(item => {
                genres[item.trim()] = true;
            });

            directors[row.Director] = true
            
            movies[row.Title] = true
        });

        var csvActors = Object.keys(actors).sort().map(actor => {
            return {"Id": actor, "Label": actor}
        })

        var csvMovies = Object.keys(movies).sort().map(movie => {
            return {"Id": movie, "Label": movie}
        })

        var csvGenres = Object.keys(genres).sort().map(genre => {
            return {"Id": genre, "Label": genre}
        })

        var csvDirectors = Object.keys(movies).sort().map(movie => {
            return {"Id": movie, "Label": movie}
        })

        return ([csvActors, csvMovies, csvGenres, csvDirectors])
    }
}