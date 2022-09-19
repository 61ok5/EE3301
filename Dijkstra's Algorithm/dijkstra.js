const dijkstra = (number, start) => {
  const num = Array.from(number).map(el => Number(el))
  let matrix = new Array(10).fill(0).map(() => new Array(10).fill(Infinity));
  let visited = [start]
  let queue = [...(new Set(num))].sort().filter(el => el != start)
  let excludes = [0,1,2,3,4,5,6,7,8,9].filter(el => !queue.includes(el)).filter(el => el != start)
  let result = new Array(10).fill(Infinity)
  result[start] = 0

  for (let i = 0; i < num.length - 1; i++) {
    const src = num[i]
    const dest = num[i + 1]
    const weight = Math.abs(src - dest)
    matrix[src][dest] = weight
  }

  while (queue.length > 0) {
    console.log('result', result)
    console.log('visited', visited, 'queue', queue)
    let [dist, idx] = matrix[visited.at(-1)].reduce((prev, curr, idx) => {
      result[idx] = result[idx] > (result[visited.at(-1)] + curr) ? (result[visited.at(-1)] + curr) : result[idx]
      return prev = prev[0] > result[idx] && queue.includes(idx) ? [result[idx], idx] : prev
    }, [Infinity, 0])
		
    if(!visited.indexOf(idx))
    	break
    visited.push(idx)
    queue.splice(queue.indexOf(idx), 1)
  }
 
  console.log('result', result)
  console.log('visited', visited, 'unreachable', [...queue, ...excludes])
  
}

dijkstra('1906257239706356', 0)
