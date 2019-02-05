

module.exports = {
    format: (obj) => {
        var directorsMovies = {}
        var edges = []

        obj.secondary.forEach(item => {
            if(directorsMovies[item.Director] === undefined) {
                directorsMovies[item.Director] = []
            }

            edges.push({ "Source": item.Director, "Target": item.Title })
        });

        return [edges]
    }
}