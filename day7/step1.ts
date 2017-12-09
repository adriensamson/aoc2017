import {getContent} from "../lib";

const lines = getContent('day7/input').split('\n');

const edges = lines
    .filter(line => line.indexOf('->') !== -1)
    .map(line => {
        const [leftAndWeight, right] = line.split(' -> ');
        const left = leftAndWeight.split(' ')[0];
        const rights = right.split(', ');
        return {left, rights};
    });

const lefts = edges.map(({left}) => left);
const rights = edges.reduce((arr, {rights}) => arr.concat(...rights), []);

const bottom = lefts.find(left => !rights.find(r => r === left));

console.log(bottom);