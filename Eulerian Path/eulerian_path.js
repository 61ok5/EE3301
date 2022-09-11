const generateGraph = ({ pts, edges }) => {
  let graph = {};
  pts.map(element => {
    Object.assign(graph, {
      [element]: [
        ...edges
          .filter(el => el.indexOf(element) >= 0)
          .map(e => e.replace(element, '')),
      ],
    });
  });
  return graph;
};

const Solve = (graph, start) => {
  let stack = [];
  let path = [];
  let cur = start;
  while (stack.length > 0 || graph[cur].length) {
    if (!graph[cur].length) {
      path.push(cur);
      cur = stack.pop();
    } else {
      stack.push(cur);
      let next = graph[cur].shift();
      graph[next].splice(graph[next].indexOf(cur), 1);
      cur = next;
    }
  }
  path.push(cur);
  return path;
};

const eulerianPath = graph => {
  let oddCheck = 0;
  let start = '';
  for (const [key, value] of Object.entries(graph)) {
    oddCheck = value.length % 2 == 1 ? ++oddCheck : oddCheck;
    start = key;
  }
  if (oddCheck > 2) return [];
  return Solve(graph, start);
};

const solution = data => {
  const graph = generateGraph(data);
  for (const [key, value] of Object.entries(graph))
    console.log(`${key} -> ${value}`);
  const result = eulerianPath(graph);
  return result.length ? 'path: '.concat(result.join(' => ')) : 'No Solution';
};

console.log(
  solution({
    pts: ['a', 'b', 'c', 'd'],
    edges: ['ab', 'ab', 'ac', 'bc', 'bd', 'bd', 'cd'],
    // edges: ['ab', 'ab', 'ac', 'ad', 'bc', 'bd', 'cd']
  })
);
