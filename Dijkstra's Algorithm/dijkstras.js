const dijkstra = (number, start) => {
  const num = Array.from(number).map(el => Number(el))
  let matrix = new Array(10).fill(0).map(() => new Array(10).fill(Infinity));
  let visited = [start]
  let queue = [...(new Set(num))].sort().filter(el => el != start)
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
    console.log('visited', visited)
    console.log('queue', queue)
    let [dist, idx] = matrix[visited.at(-1)].reduce((prev, curr, idx) => {
      result[idx] = result[idx] > (result[visited.at(-1)] + curr) ? (result[visited.at(-1)] + curr) : result[idx]
      return prev = prev[0] > result[idx] && queue.includes(idx) ? [result[idx], idx] : prev
    }, [Infinity, 0])

    visited.push(idx)
    queue.splice(queue.indexOf(idx), 1)
  }

  console.log('result', result)
  console.log('visited', visited)
  console.log('queue', queue)

}

dijkstra('4382682697512640', 6)
