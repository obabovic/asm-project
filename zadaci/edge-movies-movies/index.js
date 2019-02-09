

module.exports = {
    format: (obj) => {
        var primary = obj.primary
        var moviesYears = {}
        var edgeMoviesMovies = []
        var actorsMovies = {}

        primary.forEach(row => {
            moviesYears[row.Title] = row.Year

            let actors = row.Actors.split(",").map(item => {
                return item.trim()
            });

            actors.forEach(actor => {
                if (actorsMovies[actor] === undefined) { 
                    actorsMovies[actor] = []
                }

                actorsMovies[actor].push(row.Title)
            })
        });

        Object.keys(actorsMovies).sort().map(actor => {
            for (let i = 0; i < actorsMovies[actor].length - 1; i++) {
                const movie = actorsMovies[actor][i];
                
                for (let j = i+1; j < actorsMovies[actor].length; j++) {
                    const movie2 = actorsMovies[actor][j];
                    
                    let source = (moviesYears[movie] < moviesYears[movie2]) ? movie: movie2
                    let target = (moviesYears[movie] < moviesYears[movie2]) ? movie2: movie
                    
                    edgeMoviesMovies.push({"Source": source, "Target": target})
                }
            }
        })

        return [edgeMoviesMovies]
    } 
}