import {getContent} from "../lib";

const lines = getContent('day7/input').split('\n');

const edges = new Map<string, {weight: number, rights: string[]}>();

lines
    .forEach(line => {
        const [leftAndWeight, right] = line.split(' -> ');
        const left = leftAndWeight.split(' ')[0];
        const weight = parseInt(leftAndWeight.slice(leftAndWeight.indexOf('(') + 1, -1));
        const rights = right ? right.split(', ') : [];
        edges.set(left, {weight, rights});
    });

const lefts = Array.from(edges.keys());
const rights = Array.from(edges.values()).reduce((arr, {rights}) => arr.concat(...rights), []);

const bottom = lefts.find(left => !rights.find(r => r === left));

console.log(bottom);

function getFullWeight(left : string) : number {
    const {weight, rights} = edges.get(left);
    if (rights.length === 0) {
        return weight;
    }
    const rWeights = rights.map(right => getFullWeight(right));
    if (Math.min(...rWeights) !== Math.max(...rWeights)) {
        const bad = rWeights.indexOf(Math.max(...rWeights));
        console.log(rWeights);
        console.log(Math.min(...rWeights), Math.max(...rWeights), edges.get(rights[bad]), edges.get(rights[bad]).weight - Math.max(...rWeights) + Math.min(...rWeights));
        process.exit(0);
    }
    return weight + rWeights[0] * rWeights.length;
}

getFullWeight(bottom);