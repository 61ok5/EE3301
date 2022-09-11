console.time()
const heron = (data) => {
    const { river, c1, c2 } = data
    return ({
        river,
        c1,
        c2,
        station: [(c1[0]*c2[1]+c2[0]*c1[1]-river[1]*c1[0]-river[1]*c2[0])/
                 (-2*river[1]+c1[1]+c2[1]),river[1]], 
        shortDIstance: Math.sqrt((c1[0]-c2[0])**2+(c1[1]-(2*river[1]-c2[1]))**2),
    })
}

const test = { river: [null, 0], c1: [1.5,-5], c2: [5,-3.5] }
console.log(heron(test))
console.timeEnd()

\\ output
{ river: [ null, 0 ],
  c1: [ 1.5, -5 ],
  c2: [ 5, -3.5 ],
  station: [ 3.5588235294117645, 0 ],
  shortDIstance: 9.192388155425117 }
default: 7.639ms

const heron = data => {
  const { river, c1, c2 } = data;
  return {
    river,
    c1,
    c2,
    station: [
      (c1[0] * c2[1] + c2[0] * c1[1] - river[1] * c1[0] - river[1] * c2[0]) /
        (-2 * river[1] + c1[1] + c2[1]),
      river[1],
    ],
    shortestDistance: Math.sqrt(
      (c1[0] - c2[0]) ** 2 + (c1[1] - (2 * river[1] - c2[1])) ** 2
    ),
  };
};

const test = { river: [null, 5], c1: [1, 1], c2: [4, 2] };

console.time();
console.log(heron(test));
console.timeEnd();

//  output
{ river: [ null, 5 ],
  c1: [ 1, 1 ],
  c2: [ 4, 2 ],
  station: [ 2.7142857142857144, 5 ],
  shortDIstance: 7.615773105863909 }
default: 0.10000002384185791ms



