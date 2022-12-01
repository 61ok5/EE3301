const dijkstra = (number, start, mode) => {
  const num = Array.from(number).map(el => Number(el))
  const n = Math.max(...num) + 1

  let matrix = new Array(n).fill(0).map(() => new Array(n).fill(Infinity));
  let visited = [start]
  let queue = [...(new Set(num))].sort().filter(el => el != start)
  let excludes = [...Array(n).keys()].filter(el => !queue.includes(el)).filter(el => el != start)
  let result = new Array(n).fill(Infinity)
  result[start] = 0

  for (let i = 0; i < num.length - 1; i++) {
    const src = num[i]
    const dest = num[i + 1]
    const weight = Math.abs(src - dest)
    console.log(`${src} ${dest} ${weight}`)
    matrix[src][dest] = weight
    if (!mode) matrix[dest][src] = weight
  }

  while (queue.length > 0) {
    console.log('result', result)
    console.log('visited', visited, 'queue', queue)
    let minCompare = []
    let [dist, idx] = matrix[visited.at(-1)].reduce((prev, curr, idx) => {
      let temp = result[idx]
      result[idx] = result[idx] > (result[visited.at(-1)] + curr) ? (result[visited.at(-1)] + curr) : result[idx]
      if (!visited.includes(idx) && result[idx] != Infinity) {
      	minCompare.push(result[idx])
        if (curr != Infinity) 
          console.log(`node ${idx}: min( ${temp} or ${curr} + ${result[visited.at(-1)]} ) = ${result[idx]}`)
        else
          console.log(`node ${idx}: ${result[idx]}`)
      }
      return prev = prev[0] > result[idx] && queue.includes(idx) ? [result[idx], idx] : prev
    }, [Infinity, 0])
		console.log(`min( ${minCompare.join(', ')} ) = ${Math.min(...minCompare)}`)
    if (!visited.indexOf(idx))
      break
    visited.push(idx)
    queue.splice(queue.indexOf(idx), 1)
  }

  console.log('result', result)
  console.log('visited', visited, 'unreachable', [...queue, ...excludes])

}

dijkstra('13602356143', 0, 0)
