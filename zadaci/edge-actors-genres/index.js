

module.exports = {
    format: (obj) => {
        var nodes = {}
        var primary = obj.primary
        var edgeActorsGenres = []
        
        primary.forEach(row => {
            let genres = row.Genre.split(",").map(item => {
                return item.trim()
            });

            let actors = row.Actors.split(",").map(item => {
                return item.trim()
            });

            genres.forEach(genre => {
                if (nodes[genre] === undefined) nodes[genre] = []

                actors.forEach(actor => {
                    nodes[genre].push(actor)
                });
            })
        });

        Object.keys(nodes).sort().map(node => {
            nodes[node].forEach(actor => {
                edgeActorsGenres.push({"Source": node, "Target": actor})
            })
        })

        return [edgeActorsGenres]
    } 
}