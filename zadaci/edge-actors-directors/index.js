

module.exports = {
    format: (obj) => {
        var nodes = {}
        var primary = obj.primary
        var edgeActorsDirectors = []
        
        primary.forEach(row => {
            let actors = row.Actors.split(",").map(item => {
                return item.trim()
            });

            if (nodes[row.Director] === undefined) {
                nodes[row.Director] = []
            }

            actors.forEach(actor => {
                nodes[row.Director].push(actor)
            })
        });

        Object.keys(nodes).sort().map(node => {
            nodes[node].forEach(actor => {
                edgeActorsDirectors.push({"Source": node, "Target": actor})
            })
        })

        return [edgeActorsDirectors]
    } 
}