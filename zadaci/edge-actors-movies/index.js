

module.exports = {
    format: (obj) => {
        var nodes = {}
        var primary = obj.primary
        var edgeActorsMovies = []
        
        primary.forEach(row => {
            let movie = row.Title

            let actors = row.Actors.split(",").map(item => {
                return item.trim()
            });

            if (nodes[movie] === undefined) {
                nodes[movie] = []
            }
            
            actors.forEach(actor => {
                nodes[movie].push(actor)
            })
        });

        Object.keys(nodes).sort().map(node => {
            nodes[node].forEach(actor => {
                edgeActorsMovies.push({"Source": node, "Target": actor})
            })
        })

        return [edgeActorsMovies]
    } 
}