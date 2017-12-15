import {knotHash} from "../day10/knot-hash";
import {Matrix} from "../lib";

//const input = 'flqrgnkx';
const input = 'hwlqcszp';

const matrix = new Matrix();

for (let i = 0; i < 128; i++) {
    const hash = knotHash(input + '-' + i);
    let bin = "";
    for (let j = 0; j < hash.length; j++) {
        bin += ('0000' + parseInt(hash[j], 16).toString(2)).slice(-4);
    }
    for (let j = 0; j < bin.length; j++) {
        matrix.set(i, j, parseInt(bin[j]));
    }
}

function fill(x : number, y : number) {
    if (matrix.get(x, y) !== 1) {
        return;
    }
    matrix.set(x, y, -1);
    fill(x + 1, y);
    fill(x - 1, y);
    fill(x, y + 1);
    fill(x, y - 1);
}

let count = 0;

for (let x = 0; x < 128; x++) {
    for (let y = 0; y < 128; y++) {
        if (matrix.get(x, y) === 1) {
            count++;
            fill(x, y);
        }
    }
}

console.log(count);