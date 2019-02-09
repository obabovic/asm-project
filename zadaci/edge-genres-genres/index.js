

module.exports = {
    format: (obj) => {
        var nodes = {}
        var primary = obj.primary
        var edgeGenresGenres = []
        
        primary.forEach(row => {
            let genres = row.Genre.split(",").map(item => {
                return item.trim()
            });

            genres.forEach(genre => {
                if (nodes[genre] === undefined) { 
                    nodes[genre] = []
                }

                genres.forEach(genre2 => {
                    if (genre2 === genre) return
                    if ((nodes[genre2] !== undefined) && nodes[genre2].includes(genre)) return
                    nodes[genre].push(genre2)
                })
            })
        });

        Object.keys(nodes).sort().map(node => {
            nodes[node].forEach(genre => {
                edgeGenresGenres.push({"Source": node, "Target": genre})
            })
        })

        return [edgeGenresGenres]
    } 
}