

module.exports = {
    format: (obj) => {
        var nodes = {}
        var primary = obj.primary
        var edgeActorsActors = []
        
        primary.forEach(row => {
            let actors = row.Actors.split(",").map(item => {
                return item.trim()
            });

            actors.forEach(actor => {
                if (nodes[actor] === undefined) { 
                    nodes[actor] = []
                }

                actors.forEach(actor2 => {
                    if (actor2 === actor) return
                    if ((nodes[actor2] !== undefined) && nodes[actor2].includes(actor)) return
                    nodes[actor].push(actor2)
                })
            })
        });

        Object.keys(nodes).sort().map(node => {
            nodes[node].forEach(actor => {
                edgeActorsActors.push({"Source": node, "Target": actor})
            })
        })

        return [edgeActorsActors]
    } 
}