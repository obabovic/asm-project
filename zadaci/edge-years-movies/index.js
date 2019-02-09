

module.exports = {
    format: (obj) => {
        var primary = obj.primary
        var edges = []
        var moviesYears = {}

        primary.forEach(row => {
            if (moviesYears[row.Year] === undefined) 
                moviesYears[row.Year] = []
            
            moviesYears[row.Year].push(row.Title)
        });

        Object.keys(moviesYears).sort().map(year => {
            moviesYears[year].forEach(movie => {
                edges.push({"Source": year, "Target": movie})
            })
        })

        return [edges]
    } 
}