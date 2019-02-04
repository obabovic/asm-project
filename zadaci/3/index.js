

module.exports = {
    format: (obj) => {
        var secondary = obj.secondary
        var moviesActors = {}
        var genresActors = {}
        var edgesMoviesActors = []
        var edgesGenresActors = []

        // create moviesActors map
        secondary.forEach(row => {
            moviesActors[row.Title] = []
            row.Actors.split(",").map(item => {
                moviesActors[row.Title].push(item.trim());
            });
        });

        for (var key in moviesActors) {
            if (moviesActors.hasOwnProperty(key)) {
                var actors = moviesActors[key]

                actors.forEach(actor => {
                    edgesMoviesActors.push({ "Source": key, "Target": actor })
                })
            }
        }

        // create genresActors map
        secondary.forEach(row => {
            row.Genre.split(",").map(item => {
                let genre = item.trim()

                if (genresActors[genre] === undefined) {
                    genresActors[genre] = []
                }

                row.Actors.split(",").map(item => {
                    genresActors[genre].push(item.trim());
                });
            });
        });

        for (var key in genresActors) {
            if (genresActors.hasOwnProperty(key)) {
                var actors = genresActors[key]

                actors.forEach(actor => {
                    edgesGenresActors.push({ "Source": key, "Target": actor })
                })
            }
        }

        return [edgesMoviesActors, edgesGenresActors]
    }
}