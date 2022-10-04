const minFnc = (graph, node, end, path, cost, result) => {
  if (node == end) {
    if (result[1] > cost) {
      result[0] = path
      result[1] = cost
    }
    console.log(path, cost)
    return 0
  }

  let neighbors = []
  graph[node].map((el, idx) => {
    if (el > -1)
      neighbors.push([el, idx]);
  })
  
  // console.log(path, neighbors.filter(el => el[1] == node))
  // console.log(neighbors.map(el => `node ${node} + node ${el[1]}: ${cost} + ${el[0]}`))
  
  return Math.min(...neighbors.map(el => el[0] + minFnc(graph, el[1], end, [...path, el[1]], cost + el[0], result)))
}

const shortestPath = (graph, start, end) => {
  let result = [Infinity, Infinity]
  minFnc(graph, start, end, [start], 0, result)
  const [path, cost] = result
  console.log('result:')
  console.log(path, cost)
}
// 4189082145367516

const graph = [
  [-1, -1, 4, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, 0, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, 2, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, 1, 4, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, 4, 1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 9, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 9, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9],
  [-1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
]

shortestPath(graph, 0, 1)
