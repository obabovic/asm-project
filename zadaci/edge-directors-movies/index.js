

module.exports = {
    format: (obj) => {
        var primary = obj.primary
        var edgeDirectorsMovies = []
        
        primary.forEach(row => {
            let movie = row.Title
            let director = row.Director
            
            edgeDirectorsMovies.push({"Source": director, "Target": movie})
        });

        return [edgeDirectorsMovies]
    } 
}