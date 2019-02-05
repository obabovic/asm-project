

module.exports = {
    format: (obj) => {
        var arr = obj.secondary
        var nodes = {}
        var edges = []

        arr.forEach(row => {
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

        for (var key in nodes) {
            if (nodes.hasOwnProperty(key)) {
                var genre = nodes[key]

                genre.forEach(gen => {
                    edges.push({ "Source": key, "Target": gen })
                })
            }
        }

        return [edges]
    }
}