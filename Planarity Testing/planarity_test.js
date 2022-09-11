const combinations = (collection, combinationLength) => {
  let head, tail, result = [];
  if (combinationLength > collection.length || combinationLength < 1) {
    return [];
  }
  if (combinationLength === collection.length) {
    return [collection];
  }
  if (combinationLength === 1) {
    return collection.map(element => [element]);
  }
  for (let i = 0; i < collection.length - combinationLength + 1; i++) {
    head = collection.slice(i, i + 1);
    tail = combinations(collection.slice(i + 1), combinationLength - 1);
    for (let j = 0; j < tail.length; j++) {
      result.push(head.concat(tail[j]));
    }
  }
  return result;
}

function isReachable(s, d, nodes, neighbors, excludes) {
  let visited = new Array([...nodes].length);
  for (const node of [...nodes]) {
    visited[node] = false;
    if (excludes.filter(el => el != d).includes(node)) {
      visited[node] = null
    }
  }

  let queue = [];

  visited[s] = true;
  queue.push(s);

  while (queue.length != 0) {
    n = queue.shift();
    if (n == d)
      return true;
    for (let i = 0; i < [...neighbors.get(n)].length; i++) {
      if (visited[[...neighbors.get(n)][i]] == false && visited[[...neighbors.get(n)][i]] != null) {
        queue.push([...neighbors.get(n)][i]);
        visited[[...neighbors.get(n)][i]] = true;
      }
    }

  }

  return false;
}

function Kuratowski(list) {
  let nodes = new Set();
  let neighbors = new Map();
  let k5 = [];
  let k33 = [];

  list.forEach((el) => {
    const [node, ...neighbor] = el
    nodes.add(node)
    neighbors.set(node, new Set(neighbor))
  })

  if (nodes.size < 2) {
    return [];
  }

  const nc5 = combinations([...nodes], 5)
  const nc3 = combinations([...nodes], 3)

  nc5.forEach(element => {
    let checking = 0
    element.forEach(el => {
      checking += element.filter(e => e != el).reduce((check, curr) => {
        return isReachable(el, curr, nodes, neighbors, element) ? ++check : check
      }, 0)
      if (checking == 20) k5.push(element)
    })
  })

  // console.log(k5)

  nc3.forEach(element => {
    let nc33 = combinations([...nodes].filter(node => !element.includes(node)), 3)
    nc33.forEach(e => {
      let checking = 0
      let excludes = [...element, ...e]
      element.forEach(el => {
        e.forEach(d => {
          if (el != d)
            if (isReachable(el, d, nodes, neighbors, excludes))
              checking++
        })
      })
      if (checking == 9) k33.push(element)
    })
  })

  // console.log(k33)

  return [!!k5.length, !!k33.length]
}

const solve = (list) => {
  console.time()
  let [k5Check, k33Check] = Kuratowski(list);
  const result = !k5Check && !k33Check
  console.log(`Planarity : ${result}`)
  console.timeEnd()
}

let list = [
  [1, 2, 3, 5],
  [2, 1, 4, 9],
  [3, 1, 6, 10],
  [4, 2, 6, 8],
  [5, 1, 7, 8],
  [6, 3, 4, 7],
  [7, 5, 6, 9],
  [8, 4, 5, 10],
  [9, 2, 7, 10],
  [10, 3, 8, 9],
];
solve(list)

let list2 = [
  [1, 2, 3],
  [2, 1, 3],
  [3, 1, 2, 4, 5],
  [4, 3, 5],
  [5, 3, 4]
]
solve(list2)

let list3 = [
  [1, 2, 3, 4, 5],
  [2, 1, 3, 4, 5],
  [3, 1, 2, 4, 5],
  [4, 1, 2, 3, 5],
  [5, 1, 2, 3, 4],
]
solve(list3)

let list4 = [
  [1, 2, 3, 6],
  [2, 1, 4, 6, 7],
  [3, 1, 4, 5, 7],
  [4, 2, 3, 5],
  [5, 3, 4, 6],
  [6, 1, 2, 5, 7],
  [7, 2, 3, 6],
]
solve(list4)
