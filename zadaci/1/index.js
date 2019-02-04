

module.exports = {
    format: (obj) => {
        var arr = obj.secondary
        var nodes = {}
        var edges = []

        arr.forEach(row => {
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

        for (var key in nodes) {
            if (nodes.hasOwnProperty(key)) {
                var colaborators = nodes[key]

                colaborators.forEach(colab => {
                    edges.push({ "Source": key, "Target": colab })
                })
            }
        }

        return [Object.keys(nodes).sort().map(node => {
            return {"Id": node, "Label": node}
        }), edges]
    }
}